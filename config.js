"use strict";

const assert = require("assert");
const { setupMailer, serverConfig, jwtConfig } = require("./helpers");

try {
  module.exports = {
    ...serverConfig,
    mailer: setupMailer,
  };
} catch (err) {
  console.error(err);
}
