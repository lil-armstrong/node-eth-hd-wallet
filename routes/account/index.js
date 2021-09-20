module.exports = (server) => {
  const {
    controllers: {
      wallet: { get, getByID },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["GET"],
    path: "/wallet/account/{identifier?}",
    config: {
      pre: [
        [
          // To be executed in parallel
          {
            method: getJWTDecodedUser,
            assign: "user",
          },
          {
            method: (req, h) => {
              const { identifier } = req.params;
              return identifier ? getByID : get;
            },
            assign: "fetch",
          },
        ],
      ],
      handler: (req, h) => req.pre.fetch(req, h),
      auth: "jwt",
    },
  };
};
