"use strict";
const {sendMail} = require("../helpers");

module.exports = {
  name: "mail",
  version: "1.0.0",
  register: async (server, options) => server.method('sendMail', sendMail)
};
