const express = require("express");
const app = express();
const sequelize = require("./database");
const testingUserRoutes = require("./routes/testingUserRoutes");
const testingPostRoutes = require("./routes/testingPostRoutes");

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결 성공");

    // 라우터 연결
    app.use("/", testingUserRoutes);
    app.use("/", testingPostRoutes);

    app.listen(3000, () => {
      console.log("서버가 3000번 포트에서 실행 중입니다.");
    });
  })
  .catch((err) => {
    console.log(err);
  });