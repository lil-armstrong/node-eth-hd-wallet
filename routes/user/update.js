"use strict";
const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { update },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  const schema = Joi.object({
    nickname: Joi.string().trim().optional(),
  }).allow("nickname");

  return {
    method: ["POST","PUT"],
    path: "/user/update",
    config: {
      pre: [
        {
          method: getJWTDecodedUser,
          assign: "user",
        },
      ],
      handler: update,
      auth: "jwt",
      validate: {
        payload: schema
      }
    },
  };
};
