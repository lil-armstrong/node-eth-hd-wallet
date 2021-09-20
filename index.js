"use strict";
const server = require("./server");

module.exports = (async () => {
  const { start }= await server.then((_app) => _app);
  const app = await start();
  return app;
})();
