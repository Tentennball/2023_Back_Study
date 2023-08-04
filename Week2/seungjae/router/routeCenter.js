const express = require("express");
const router = express.Router();

const fileRoute = require("./fileRoute"); 
const loginRoute = require("./loginRoute");
const registerRoute = require("./rigisterRoute");
const successRoute = require("./successRoute");

router.use('/v1/files',fileRoute);  //fileRoute 라우팅
router.use("/login",loginRoute);        //loginRoute 라우팅
router.use("/register",registerRoute);   //register 라우팅
router.use("/successPage",successRoute); //success 라우팅

module.exports = router;