const Sequelize = require("sequelize");

const conn = new Sequelize("events", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = conn;
