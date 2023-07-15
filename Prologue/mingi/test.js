const express = require("express");
const path = require("path");
const app = express();

// Define routes and middleware here

const port = 3000; // Choose the port you want your app to run on

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/v1/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/v1/index", (req, res) => {
  const requestData = req.body; // 요청 본문 데이터

  console.log(requestData); // Console에 데이터 출력

  const responseData = {
    message: "POST 요청이 성공적으로 수행되었습니다.",
    data: requestData,
  };

  res.json(responseData); // JSON 형식으로 응답
});
