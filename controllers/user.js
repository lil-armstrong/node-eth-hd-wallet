const Web3 = require("web3");
const assert = require("assert");
const Jwt = require("@hapi/jwt");

module.exports = (server) => {
  const {
    db,
    boom,
    mailer,
    config: { server_url, client_url },
    helpers: {
      decrypt,
      createNewWallet,
      createJWTToken,
      verifyJWTToken,
      decodeAndVerifyJWTToken,
      encrypt,
    },
  } = server.app;

  return {
    // Creates new user
    create: async function (req, res) {
      try {
        const { email, password } = req.payload;

        assert(email, boom.badRequest("Expected email"));
        assert(password, boom.badRequest("Expected password field"));

        // Check that the user email doesn't already exist
        let user = await db.User.findOne({
          where: {
            email,
          },
        });

        if (user)
          throw boom.notAcceptable(
            `User with the email: ${email} already exist`
          );

        // Create new account in the blockchain with password
        const wallet_address = await createNewWallet(encrypt(password));

        user = await db.User.build({
          ...req.payload,
        });

        // Create new wallet record
        const wallet = await db.Wallet.build({
          address: wallet_address,
          owner: user.id,
        });

        // create JWT token
        const token = createJWTToken(user, 900);

        let confirmationLink = `${server_url}/confim_email?email=${email}&code=${token}`;

        // Send email verification
        const mailObject = {
          to: email,
          htmlTemplate: {
            name: "account_confirmation",
            transform: {
              confirmationLink,
              recipientEmail: email,
            },
          },
          subject: "Cryptcon - Account confirmation",
        };

        // Save
        await user.save({
          fields: ["email", "password", "referrerId"],
        });
        await wallet.save();

        // Send mail
        await mailer.sendMail(mailObject);

        return { access_token: createJWTToken(user) };
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    // authenticate user
    authenticate: async function (req) {
      const { email, password } = req.payload;

      // fetch user record from DB that matches the email
      return await db.User.findOne({
        where: { email },
      })
        .then(
          async (user) =>
            (await decrypt(password, user.password)) && {
              access_token: createJWTToken(user),
            }
        )
        .catch(boom.boomify);
    },

    confirmEmail: async (req) => {
      let { email, token } = req.query;
      assert(email, boom.badRequest("Missing credential to confirm email"));
      assert(token, boom.badRequest("Missing credential to confirm email"));

      const decoded = decodeAndVerifyJWTToken(token);
      return decoded.isValid
        ? await user
            .update(
              { kyc: { email: { confirmed: true } } },
              { where: { id: decoded.payload.user } }
            )
            .catch(boom.boomify)
        : boom.unauthorized("Cannot confirm user account!");
    },

    resetPassword: async function (req) {
      let { password, token } = req.payload;
      // decrypt jwt token
      return (
        decodeAndVerifyJWTToken(token) &&
        user.update({ password }, { where: { id: user_id } })
      );
    },

    requestPasswordReset: async function (req) {
      const { email } = req.payload;

      try {
        const user = db.User.findOne({ where: { email } });

        // Expires in 900s -> 15mins
        const token = createJWTToken(user, 900);

        // generate reset password link with token
        const reset_link = `${client_url}/reset_password/?token=${token}`;

        // Sent reset password link to email of user
        var mailOptions = {
          to: email,
          subject: "Account - Reset Password",
          htmlTemplate: {
            name: "account_reset_password",
            transform: {
              recipientName: "Armstrong Ebong",
              resetLink: reset_link,
              recipientEmail: email,
            },
          },
        };

        return await mailer.sendMail(mailOptions);
      } catch (err) {
        console.error(err);
        return boom.boomify(err);
      }
    },

    profile: async (req, h) => {
      // get user ID from preHandler
      let { user } = req.pre;
      let profile = await db.User.findOne({ where: { id: user } }).then(
        (data) => data.profile
      );
      return profile
    },
    // Temporarily delete user record
    archive: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return await db.User.destroy({ where: { id: user } });
    },
    // Permanently destroy user record
    destroy: async (req) => {
      // get user ID from preHandler
      let { user } = req.pre;
      return db.sequelize.query(`DELETE FROM tbl_users WHERE id = ${user}`, {
        model: db.User,
        mapToModel: true, // pass true here if you have any mapped fields
      });
    },
    async update(req, h) {
      const {
        payload,
        pre: { user },
      } = req;
      return {
        updated: Boolean(
          await db.User.update({ ...payload }, { where: { id: user } })
        ),
      };
    },
  };
};
