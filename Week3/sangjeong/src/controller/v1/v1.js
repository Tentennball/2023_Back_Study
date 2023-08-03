// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const index = require('./index');
const register = require('./register');
const files = require('./files');
const auth = require('./auth');

const testing = require('./testing/testing');
const login = require('./login/login');
const post = require('./post/post');

router.use('/public',express.static(process.env.SERVER_PATH+"/src/view/v1"));
router.use('/index', index);
router.use('/register', register);
router.use('/files', files);
router.use('/auth', auth);

router.use('/testing', testing);
router.use('/login', login);
router.use('/post', post);

module.exports = router;