const express = require("express");
const app = express();
const session = require("express-session");
const db = require("../db"); // DB 연결 설정 파일로 가정

const sessionLoginCheck = (req, res) => {
  
};

loginRoute.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
    })
  );
  loginRoute.post("/session", (req, res) => { //login 정보 전달
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "이메일과 비밀번호를 모두 입력해주세요." });
    }
  
    // DB에서 사용자 정보를 검색
    const checkQuery = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
    db.query(checkQuery, (error, rows) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "서버 오류가 발생했습니다." });
      }
  
      if (rows.length !== 0) {
        // DB에 일치하는 레코드가 존재하면 로그인 성공
        req.session.email = email; // 세션에 이메일 저장
        return res.send("Login Complete!");
      } else {
        return res.status(401).json({ error: "이메일 또는 비밀번호가 일치하지 않습니다." });
      }
    });
  });
  loginRoute.post("/sessionVerify", (req, res) => {
    const email = req.session.email;
    if (email) {
      return res.json({ email: email });
    } else {
      return res.status(401).json({ error: "로그인이 필요합니다." });
    }
  });

module.exports = sessionLoginCheck;
