const { Sequelize } = require("sequelize");
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize("test1", "testuser", dbPassword, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;