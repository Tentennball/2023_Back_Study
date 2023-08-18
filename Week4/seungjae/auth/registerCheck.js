const User = require("../models/userModel");

const registerCheck = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      console.log("회원가입 진행");
      await User.create({ email, password });
      res.status(200).send("회원가입 완료");
    } else {
      console.log("중복된 이메일 입니다.");
      res.status(401).send("중복된 이메일");
    }
  } catch {
    console.error("오류 발생:", error);
    res.status(500).send("오류 발생"); //db에 유저가 없는 경우
  }
};

module.exports = registerCheck;
