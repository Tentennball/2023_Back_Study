// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
// const index = require('../../model/v1/index');

router.get('/', (req, res)=>{
    try{
        res.sendFile(PATH+'/src/view/v1/html/index.html');
    }catch(err){
        console.log(err);
        res.sendFile(ERROR_PAGE);
    }
});

router.post('/', (req, res)=>{
    res.send(req.body);
});

module.exports = router;