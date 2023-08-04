const jwt = require("jsonwebtoken");

const loginCheck = (req, res) => {
  const db = require('../db');
  const email = req.body.email;
  const password = req.body.password;
  const checkQuery = `SELECT * FROM users WHERE email='${email}'`;

  db.query(checkQuery, (error, rows) => { //로그인 체크
    if (error) {
      console.error("Database error:", error);
      res.status(500).send("서버 오류가 발생했습니다");
    } else {
      if (rows.length !== 0) {
        //db에 일치하는 이메일이 존재
        if (rows[0].password === password) {
          //비번도 같으면?
          const userEmail = rows[0].email;

          // JWT 토큰 생성
          const secretKey = "your-secret-key"; // 비밀 키
          const token = jwt.sign({userEmail}, secretKey, { expiresIn: "30s" });
          res.send({ token });
          
          console.log(token);
        } else {
          res.send(rows[0]);
          console.log("비밀번호가 불일치");
        }
      } else {
        console.log("해당하는 아이디가 존재하지 않습니다.");
        res.send("해당하는 아이디가 존재하지 않습니다.");
      }
    }
  });
};

module.exports = loginCheck;
