module.exports = (server) => {
  const {
    controllers: {
      wallet: { get },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet",
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
      handler: get,
      auth: "jwt",
    },
  };
};
