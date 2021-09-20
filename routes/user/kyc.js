"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { profile },
    },
    boom,
    helpers: { getJWTDecodedUser },
  } = server.app;

  const schema = Joi.object({
  type: Joi.string().allow("email", "id", "phone", "payment_methods").optional()
  })
   

  return {
    method: ["POST", "PUT"],
    path: "/user/kyc/{type?}",
    config: {
      pre: [
        {
          method: getJWTDecodedUser,
          assign: "user",
        },
      ],
      handler: async (req) => {
        let user_profile = await profile(req).catch(boom.boomify);
        let kyc = user_profile.kyc;
        const { type } = req.params;
        return type ? { [type]: kyc[type] } : kyc;
      },
      validate: {
        params: schema,
      },
      auth: "jwt",
    },
  };
};
