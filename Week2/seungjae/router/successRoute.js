const express = require("express");
const path = require("path"); //경로 재설정을 위한 변수
const successRoute = express.Router();

successRoute.get("/", (req, res) => {
  const successPath = path.join(__dirname, "../", "views/successPage.html"); //경로 재설정
  res.sendFile(successPath);
});

module.exports = successRoute;
