const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { confirmEmail },
    },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    token: Joi.string().required(),
  }).with("token", "email");

  return {
    method: "GET",
    path: `/user/confirm_email`,
    config: {
      handler: confirmEmail,
      validate: {
        query: schema,
      },
    },
  };
};
