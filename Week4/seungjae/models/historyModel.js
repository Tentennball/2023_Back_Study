const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sequelize 연결 설정 파일
const User = require('./userModel');
const HistoryModel = sequelize.define('historymodel', {
  historyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID, 
    references: {
      model: User, 
      key: 'id',
    },
    allowNull: false,
  },
}, 
  { tableName: "historymodel" }
);

module.exports = HistoryModel;