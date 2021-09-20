module.exports = (server) => {
  const {
    controllers: {
      wallet: { create },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet/account/create",
    config: {
      pre: [
        [
          // To be executed in parallel
          {
            method: getJWTDecodedUser,
            assign: "user",
          },
          
        ],
      ],
      handler: create,
      auth: "jwt",
    },
  };
};
