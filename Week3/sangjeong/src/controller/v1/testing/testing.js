// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const testingUser = require('./testingUser');
const testingPost = require('./testingPost');

router.use('/testingUser', testingUser);
router.use('/testingPost', testingPost);

module.exports = router;