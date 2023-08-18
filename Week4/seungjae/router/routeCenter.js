const express = require("express");
const router = express.Router();

const loginRoute = require("./loginRoute");
const registerRoute = require("./rigisterRoute");
const tossRoute = require("./tossRoute");

router.use("/login", loginRoute); //loginRoute 라우팅
router.use("/register", registerRoute); //register 라우팅
router.use("/v1", tossRoute); //success 라우팅

router.get("/", (req, res) => { //기본 브라우저
  res.render("index");
});

module.exports = router;
