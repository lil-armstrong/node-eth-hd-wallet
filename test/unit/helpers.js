const {
  generateReferralCode,
  generateOTP,
  encrypt,
  decrypt,
  decodeAndVerifyJWTToken,
  createJWTToken,
} = require("../../helpers");
const database = require("../../database/models");
const test_password = "p@55w0rd";
const test_email = "test@mail";
const otp_length = 6;
const otp_code = generateOTP(otp_length);

module.exports = async () => {
   describe("Helper functions test", () => {
    test.only(`Connects to Database`, async () => {
      let connected = false;
      await database.sequelize.authenticate().then(() => (connected = true));
      expect(connected).toBeTruthy();
    });

    test.only(`Checks that generated referral code length is 8`, () => {
      const referral_code = generateReferralCode(test_email);
      expect(referral_code).toHaveLength(8);
    });

    describe(`Creates and verifies JWT Token`, () => {
      let validToken = createJWTToken(
        {
          role: "xxxx",
          id: "xxxx-xxx-xxx-xxxx",
        },
        10
      );
      console.log(validToken)
      let invalidToken = createJWTToken(
        {
          role: "xxxx",
          id: "xxxx-xxx-xxx-xxxx",
        },
        10,
        "invalid_shared_secret"
      );

      it.only("Expects a valid response", async () => {
        const goodResp = decodeAndVerifyJWTToken(validToken);

        expect(goodResp).toStrictEqual(
          expect.objectContaining({
            isValid: true,
            credentials: expect.objectContaining({
              decoded: expect.objectContaining({
                payload: expect.objectContaining({
                  user: "xxxx-xxx-xxx-xxxx",
                }),
              }),
            }),
          })
        );
      });

      it.only("Expects an invalid response", async () => {
        const badResp = decodeAndVerifyJWTToken(invalidToken, {});
        expect(badResp).toStrictEqual(
          expect.objectContaining({
            isValid: false,
            error: expect.any(String),
          })
        );
      });
    });

    test.only(`Check text encryption and decryption`, async () => {
      const encrypted = await encrypt(test_password);
      const decrypted = await decrypt(test_password, encrypted);

      // console.log({encrypted });
      expect(decrypted).toBe(true);
    });

    test.only(`Generates OTP with a max length of ${otp_length}`, () => {
      expect(otp_code).toHaveLength(otp_length);
    });
  });
};
