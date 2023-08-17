// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const jwtLogin = require('./jwtLogin');
const jwtVerify = require('./jwtVerify');
const sessionLogin = require('./sessionLogin');
const sessionVerify = require('./sessionVerify');
const mongoLogin = require('./mongoLogin');
const mongoRegister = require('./mongoRegister');
const mongoVerify = require('./mongoVerify');

router.use('/jwtLogin', jwtLogin);
router.use('/jwtVerify', jwtVerify);
router.use('/sessionLogin', sessionLogin);
router.use('/sessionVerify', sessionVerify);
router.use('/mongoLogin', mongoLogin);
router.use('/mongoRegister', mongoRegister);
router.use('/mongoVerify', mongoVerify);

module.exports = router;