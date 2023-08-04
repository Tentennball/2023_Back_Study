// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const makeFakePost = require(PATH+"/src/model/v1/testing/makeFakePost");
const registerPost = require(PATH+"/src/model/v1/post/registerPost");
const register = require(PATH+"/src/model/v1/login/register");

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', async (req, res)=>{
    try{
        const seed = req.body.seed;
        const [users, status] = await register.userList();
        if(status === "error") throw users;
        const fakeData = makeFakePost(seed,100, users);
        fakeData.forEach(async(item) => {
            const [data, status] =  await registerPost.register(item);
            if(status === "error") throw data;
        });
        res.send(fakeData);
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

module.exports = router;