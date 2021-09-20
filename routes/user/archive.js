module.exports = (server) => {
  const {
    controllers: {
      user: { archive },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["POST", "DELETE", "PUT"],
    path: `/user/archive`,
    config: {
      pre: [
        {
          method: getJWTDecodedUser,
          assign: "user",
        },
      ],
      handler: archive,
      auth: "jwt",
    },
  };
};
