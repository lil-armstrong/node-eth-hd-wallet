const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { create },
    },
    consts: { patterns },
  } = server.app;

  // define Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(patterns.password).required(),
    repeat_password: Joi.ref("password"),
    referrer: Joi.string().min(21).optional(),
  }).with("password", "repeat_password");

  return {
    method: "POST",
    path: `/user/create`,
    handler: create,
    options: {
      validate: {
        payload: schema,
      },
    },
  };
};
