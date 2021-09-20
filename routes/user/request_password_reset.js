const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { requestPasswordReset },
    },
  } = server.app;

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });
  return {
    method: "POST",
    path: "/user/request_password_reset",
    config: {
      handler: requestPasswordReset,
      validate: {
        payload: schema,
      },
    },
  };
};
