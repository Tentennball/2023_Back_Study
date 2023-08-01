// 최상위 라우터

// express router
const express = require('express');
const router = express.Router();

// children routes
const v1 = require('./v1/v1');

router.use('/v1', v1);

module.exports = router;