// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const registerPost = require(PATH+"/src/model/v1/post/registerPost");
const register = require(PATH+"/src/model/v1/login/register");

router.get('/', async (req, res, next)=>{
    try{
        const type = req.query.type;
        const text = req.query.text;

        switch(type){
            case "writer":
                const [user, userStatus] = await register.getIdByEmail(text);
                if (userStatus === "error") throw user;
                const [writer, writerStatus] = await registerPost.getUserPost(user.dataValues.id);
                if (writerStatus === "error") throw user;
                res.send(writer);
                break;
            default:
                const [posts, status] = await registerPost.search(type, text);
                if(status === "error") throw posts;
                res.send(posts);
        }
    

    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

router.use('/',(req, res, next)=>{
    res.sendFile(ERROR_PAGE );
});

module.exports = router;