// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const jwtLogin = require('./jwtLogin');
const jwtVerify = require('./jwtVerify');
const sessionLogin = require('./sessionLogin');
const sessionVerify = require('./sessionVerify');

router.use('/jwtLogin', jwtLogin);
router.use('/jwtVerify', jwtVerify);
router.use('/sessionLogin', sessionLogin);
router.use('/sessionVerify', sessionVerify);

module.exports = router;