// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const index = require('./index');
const register = require('./register');
const jwtLogin = require('./jwtLogin');
const jwtVerify = require('./jwtVerify');
const sessionLogin = require('./sessionLogin');
const sessionVerify = require('./sessionVerify');
const files = require('./files');
const auth = require('./auth');

router.use('/public',express.static(process.env.SERVER_PATH+"/src/view/v1"));
router.use('/index', index);
router.use('/register', register);
router.use('/jwtLogin', jwtLogin);
router.use('/jwtVerify', jwtVerify);
router.use('/sessionLogin', sessionLogin);
router.use('/sessionVerify', sessionVerify);
router.use('/files', files);
router.use('/auth', auth);

module.exports = router;