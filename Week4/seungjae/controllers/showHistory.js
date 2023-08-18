const HistoryModel = require("../models/historyModel");

const showHistory = async (req, res) => {
  try { // 모든 history 데이터를 조회
    const histories = await HistoryModel.findAll();
    res.render("history", { histories });
  } catch (error) {
    console.error("결제내역 조회 오류 :", error);
    res.status(500).send("결제내역 조회 오류");
  }
};

module.exports = showHistory;
