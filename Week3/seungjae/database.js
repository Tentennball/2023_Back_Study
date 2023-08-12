const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test1", "testuser", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;