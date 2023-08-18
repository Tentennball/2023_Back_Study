const express = require("express");
const tossRoute = express.Router();
const toss = require("../controllers/toss");

tossRoute.get("/toss", toss.renderTossPage);
tossRoute.post("/testingProduct", toss.createTestingProducts);
tossRoute.get("/success", toss.handleSuccess);
tossRoute.get("/fail", toss.handleFail);
tossRoute.get("/toss/payments", function (req, res) {  //모든 결제 기록 보여주기
  require("../controllers/showHistory")(req, res);
});
tossRoute.get("/toss/payments/:paymentKey", async (req, res) => {  //paymentKey에 해당하는 결제 기록 보여주기
  require("../controllers/sms")(req, res);
});


module.exports = tossRoute;
