const assert = require("assert");
const Account = require("web3-eth-accounts");
const Web3 = require('web3');

function WalletAccountController(server) {
  const { db, boom } = server.app;
  const accounts = new Account()
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

module.exports = WalletAccountController;
