const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { authenticate },
    },
    consts: { patterns },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
  }).with('email', 'password');

  return {
    method: "POST",
    path: "/user/authenticate",
    config: {
      handler: authenticate,
      validate: {
        payload: schema,
      },
    },
  };
};
