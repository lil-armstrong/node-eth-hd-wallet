"use strict";

module.exports = (server) => {
  const {
    controllers: {
      user: { profile },
    },
    helpers: { getJWTDecodedUser },
  } = server.app;

  return {
    method: ["GET"],
    path: "/user/profile",
    config: {
      pre: [
        {
          method: getJWTDecodedUser,
          assign: "user",
        },
      ],
      handler: profile,
      auth: "jwt",
    },
  };
};
