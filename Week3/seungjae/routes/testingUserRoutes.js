const express = require("express");
const router = express.Router();
const testingUserController = require("../controllers/testingUserController");

router.post("/v1/testing/testingUser", testingUserController.addTestingUsers);

module.exports = router;