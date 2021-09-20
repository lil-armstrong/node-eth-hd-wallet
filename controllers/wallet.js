const assert = require("assert");

function WalletController(server) {
  const { db, boom } = server.app;

  return {
    get: async () => {
      return ["In the get controller"];
    },
    getByID: async () => {
      return "In the getByID controller";
    },
    create: async () => {},
  };
}
module.exports = WalletController;
