const express = require("express");
const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {  //login 페이지
  res.render("login",{message : null});
});

loginRoute.post("/", (req, res) => { //login 정보 전달
  require("../auth/loginCheck")(req, res);
});

module.exports = loginRoute;
