"use strict";
const session = require("express-session");
const express = require("express");
//const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json()); //json 파싱

app.use("/controllers", express.static(__dirname + "/controllers")); //경로설정

const RouterCenter = require("./router/routeCenter"); // 파일 가져오기
app.use("/", RouterCenter);


app.get("/", (req, res) => {  //index 페이지
  res.sendFile(__dirname + "/views/index.html");
});
app.use(session({
  secret: 'your_secret_key', // 임의의 시크릿 키를 설정합니다.
  resave: false,
  saveUninitialized: true
}));

app.listen(1724, () => {
  // 서버 주소 설정
  console.log("서버가동");
});
