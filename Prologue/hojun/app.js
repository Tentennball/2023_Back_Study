// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express')

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express()

// 4000 포트로 서버 오픈
app.listen(4000, function () {
    console.log("start! express server on port 4000")
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/main.html")
})

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/v1/index', function (req, res) {
    res.sendFile(__dirname + "/v1/index.html")
})

app.post('/v1/index', function (req, res) {
    res.send("hi postman")
})