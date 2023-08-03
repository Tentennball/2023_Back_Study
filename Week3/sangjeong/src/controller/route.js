// 최상위 라우터

// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// children routes
const v1 = require('./v1/v1');

router.use('/v1', v1);

router.use((req,res,next) => {
    res.sendFile(ERROR_PAGE);
});

module.exports = router;