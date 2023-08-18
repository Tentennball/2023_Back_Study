const User = require("../models/userModel"); // User 모델을 import 해야 합니다.

const loginCheck = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: { email: email }
    });

    if (user) { // 일치하는 이메일이 존재
      if (user.password === password) { // 비밀번호도 일치
        console.log("로그인 성공");
        res.redirect("/v1/toss"); // toss페이지로 이동
      } else {
        res.status(401).redirect("/login"); // 비번 오류
      }
    } else {
      res.status(404).redirect("/login"); // 사용자 없음
    }
  } catch (error) {
    console.error("오류 발생:", error);
    res.status(500).send("오류 발생"); //db에 유저가 없는 경우
  }
};

module.exports = loginCheck;
