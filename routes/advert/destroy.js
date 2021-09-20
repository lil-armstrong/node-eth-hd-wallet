const Joi = require("joi");

module.exports = (server) => {
  const {
    controllers: {
      ads: { destroy },
    },
  } = server.app;

  const schema = Joi.object({
    ad: Joi.string().required(),
  });

  return {
    method: "DELETE",
    path: "/ads/destroy",
    config: {
      handler: destroy,
      validate: {
        payload: schema,
      },
      auth: 'jwt'
    },
  };
};
