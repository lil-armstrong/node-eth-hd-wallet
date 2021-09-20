const fs = require("fs");

module.exports = {
  development: {
    username: "cryptcon",
    password: "cryptcon_password",
    database: "cryptcon",
    host: "localhost",
    port: 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: false
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: "127.0.0.1",
    port: 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: false

  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_NAME,
    host: process.env.PRODUCTION_DB_HOSTNAME,
    port: process.env.PRODUCTION_DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    use_env_variable: 'DB_DIALECT',
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  },
};
