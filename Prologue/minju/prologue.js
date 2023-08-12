const express = require('express');
const app = express(); //해당 모듈은 함수기에 애플리케이션이란 걸 반환함. 그걸 받아주는 변수 app
const port = 1004;

//const bodyParser = require("body-parser"); //json포맷을 읽을 수 있게 해줌 -> 옛날 버전
//app.use(bodyParser.json()); //서버가 현재 req로 오는 모든 데이터들을 읽을 수 있게 해줌 -> 옛날버전

app.use(express.json()); //버전 4.16.0부터 이렇게 내장 미들웨어를 쓰도록 함 -> 여기에 bodyParser 들어있음

const Json_data = [
  {
  "message" : "server"
 }
];

app.get('/', (req, res) => {
  res.send('Hello homepage!');
})

app.get('/v1/index', (req, res) => {
  res.sendFile(__dirname + '/prologue.html');
});

app.post('/v1/index',(req,res) => {
  res.send("hi postman!");
  console.log(`Listening on : ${port}`);
  console.log("post index");

  Json_data.push(req.body);
  console.log(Json_data);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
