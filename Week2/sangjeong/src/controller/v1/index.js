// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;

// model
// const index = require('../../model/v1/index');

router.get('/', (req, res)=>{
    res.sendFile(PATH+'/src/view/html/index.html');
});

router.post('/', (req, res)=>{
    res.send(req.body);
});

module.exports = router;