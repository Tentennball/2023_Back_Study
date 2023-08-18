const HistoryModel = require("../models/historyModel");

const createHistory = async (history) => {
  try { //결제 내역 생성, db에 삽입
    const createdHistory = await HistoryModel.create(history);
    console.log('History 생성:', createdHistory.toJSON());
  } catch (error) {
    console.error('오류:', error);
  }
};

module.exports = createHistory;
