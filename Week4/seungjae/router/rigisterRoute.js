const express = require("express");
const registerRoute = express.Router();

registerRoute.get("/", (req, res) => { //register 페이지
  res.render("register");
});

registerRoute.post("/", (req, res) => { //register 정보 전달
  require("../auth/registerCheck")(req, res);
});

module.exports = registerRoute;