// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const registerPost = require(PATH+"/src/model/v1/post/registerPost");

router.get('/', async (req, res, next)=>{
    try{
        const type = req.query.type;
        const number = req.query.number;

        const [posts, status] = await registerPost.getMostPost(type ,number);
        if(status === "error") throw posts;
        res.send(posts);

    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

router.use('/',(req, res, next)=>{
    res.sendFile(ERROR_PAGE );
});

module.exports = router;