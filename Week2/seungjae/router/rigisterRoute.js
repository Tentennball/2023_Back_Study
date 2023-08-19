const express = require("express");
const path = require("path"); //경로 재설정을 위한 변수
const registerRoute = express.Router();

registerRoute.get("/", (req, res) => {
  //register 페이지
  const registerPath = path.join(__dirname, "../", "views/register.html"); //경로 재설정
  res.sendFile(registerPath);
});

registerRoute.post("/", (req, res) => {
  //register 정보 전달
  require("../auth/registerCheck")(req, res);
});

module.exports = registerRoute;