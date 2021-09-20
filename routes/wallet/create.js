module.exports = (server) => {
  const {
    controllers: {
      wallet: { create },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["POST"],
    path: "/wallet/create",
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
