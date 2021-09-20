"use strict";

const Hapi = require("@hapi/hapi");
const database = require("./database/models");
const glob = require("glob");
const path = require("path");
const helpers = require("./helpers");
const consts = require("./consts");
const Boom = require("@hapi/boom");
const config = require("./config");
const cwd = path.join(__dirname);
const Web3 = require('web3');
const web3 = new Web3(
  Web3.givenProvider ||
    new Web3.providers.HttpProvider("http://localhost:8545")
);

const { hostname, port, jwt, mailer, server_url } = config;

// create an hapi server instance
const HapiServer = Hapi.server({ host: hostname, port });

/**************************************
 *  register plugins
 * *************************************/
(async () => {
  HapiServer.register([
    {
      plugin: require("@hapi/jwt"),
      options: {
        name: "jwt",
      },
    },
  ]);
})();
/**************************************
 *  initialize database
 **************************************/
database.sequelize.authenticate();
database.sequelize.sync({ alter: false, force: !true });

/**************************************
 * Server security
 **************************************/
// server.state('data', {
//   ttl: null,
//   isSecure: true,
//   isHttpOnly: true
// });
/**************************************
 *  Hapi server app options
 **************************************/
HapiServer.app.config = config;
HapiServer.app.db = database;
HapiServer.app.consts = consts;
HapiServer.app.helpers = helpers;
HapiServer.app.boom = Boom;
HapiServer.app.controllers = {};
HapiServer.app.mailer = mailer;
HapiServer.app.web3 = web3;

/**************************************
 *  Set auth strategy
 **************************************/
HapiServer.auth.strategy("jwt", "jwt", jwt);

/**************************************
 * dynamically register controllers
 **************************************/
let controllers = glob.sync("/controllers/**/*.js", {
  root: cwd,
});
controllers.forEach((file) => {
  let routeBase = path.basename(file, ".js"),
    filePath = require(file);
  HapiServer.app.controllers[routeBase] = filePath(HapiServer);
});

/**************************************
 * dynamically register routes
 **************************************/
let routes = glob.sync("/routes/**/*.js", {
  root: cwd,
});
routes.forEach((file) => {
  let filePath = require(file);
  HapiServer.route(filePath(HapiServer));
});

exports.init = async () => {
  await HapiServer.initialize().then(() => {
    console.log(`Server has been initialized`);
  });
  return HapiServer;
};

exports.start = async function () {
  await HapiServer.start().then(() => {
    console.log(`Server is running on ${server_url}`);
  });
  return HapiServer;
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
