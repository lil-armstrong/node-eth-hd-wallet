const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      user: { resetPassword },
    },
    consts: { patterns },
  } = server.app;

  const schema = Joi.object({
    password: Joi.string().pattern(patterns.password).required(),
    repeat_password: Joi.ref('password'),
  }).with('password', 'repeat_password');

  return {
    method: "POST",
    path: "/user/password_reset",
    config: {
      handler: resetPassword,
      validate: {
        payload: schema,
      },
    },
  };
};
