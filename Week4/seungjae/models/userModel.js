const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // sequelize 인스턴스를 import 해야 합니다.

const User = sequelize.define("users", {
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
    },
  { tableName: "users" }
  
);

module.exports = User;