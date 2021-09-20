module.exports = (server) => {
  const {
    controllers: {
      user: { destroy },
    },
  } = server.app;


  return {
    method: "POST",
    path: `/user/destroy`,
    handler: destroy,
    options: {
      // validate: {
      //   payload: schema,
      // },
    },
  };
}