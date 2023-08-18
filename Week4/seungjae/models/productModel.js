const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const productModel = sequelize.define(
  "productmodel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamps: true,
},
  { tableName: "productmodel" }
);

module.exports = productModel;