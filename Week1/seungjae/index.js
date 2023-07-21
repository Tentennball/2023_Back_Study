const express = require("express");
const app = express(); 

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/v1/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/v1/index", (req, res) => {
  res.send("hi postman!");
});

app.listen(1724, () => {
  console.log("서버가동");
});
