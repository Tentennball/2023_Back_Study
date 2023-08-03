// express router
const express = require('express');
const router = express.Router();

// v1 folder routes
const list = require('./list');
const search = require('./search');

router.use('/list', list);
router.use('/search', search);

module.exports = router;