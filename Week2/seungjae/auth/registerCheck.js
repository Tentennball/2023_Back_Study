const registerCheck = (req, res) => {
  const db = require("../db.js");
  const email = req.body.id;
  const password = req.body.pw;
  const checkQuery = `SELECT * FROM users WHERE email='${email}'`;

  db.query(checkQuery, (error, rows) => { //회원가입 전 중복 체크
    if (error) {
      console.error("Database error:", error);
      res.status(500).send("서버 오류가 발생했습니다.");
    } else {
      if (rows.length !== 0) {
        //db에 일치하는 이메일이 존재
        console.log("이미 존재하는 이메일 입니다.");
        res.send("이미 사용중인 이메일 입니다!");
      } else { //회원가입 진행( db에 추가 )


        //db에 정보를 추가하는 코드
        const insertQuery = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;

        db.query(insertQuery, (error) => {
          if (error) {
            console.error("Database insert error:", error);
            res.status(500).send("서버 오류가 발생했습니다.");
          } else {
            console.log("회원가입 완료");
            res.send("회원가입이 완료되었습니다!");
          }
        });
      }
    }
  });
};

module.exports = registerCheck;
