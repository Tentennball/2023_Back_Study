// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const testingUser = require('./testingUser');
const testingPost = require('./testingPost');
const testingProduct = require('./testingProduct');

router.use('/testingUser', testingUser);
router.use('/testingPost', testingPost);
router.use('/testingProduct', testingProduct);

module.exports = router;