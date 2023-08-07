const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const TestingUser = require("./testingUserModel");
const postModel = sequelize.define(
  "postmodel",
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TestingUser,
        key: 'userId',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "postmodel" }
);

module.exports = postModel;