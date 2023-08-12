const { DataTypes } = require("sequelize");
const sequelize = require("../database"); 

const TestingUser = sequelize.define(
  "usermodel",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "usermodel" }
);

module.exports = TestingUser;