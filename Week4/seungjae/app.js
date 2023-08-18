require('dotenv').config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const path = require("path"); 
const RouterCenter = require("./router/routeCenter"); // 파일 가져오기

const execute = async () => {
  try {
    await sequelize.sync();
    console.log("데이터베이스 연결 성공");

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views")); //views 파일 경로 설정

    app.use(express.urlencoded({ extended: false })); //form-data 파싱
    app.use(express.json()); //json 파싱
    
    app.use("/controllers", express.static(__dirname + "/controllers")); //정적 파일 제공
    app.use("/auth", express.static(__dirname + "/auth")); //정적 파일 제공
    app.use("/", RouterCenter); //라우팅
    
    app.listen(1724, () => { 
      console.log("1724 포트 연결 성공");
    });
  }
  catch (error) {
    console.error("오류 발생:", error);
  }
}

execute();