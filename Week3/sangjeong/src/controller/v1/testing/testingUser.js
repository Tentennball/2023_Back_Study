// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const makeFakeUserInfo = require(PATH+"/src/model/v1/testing/makeFakeUserInfo");
const register = require(PATH+"/src/model/v1/login/register");

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', (req, res)=>{
    const seed = req.body.seed;
    const fakeData = makeFakeUserInfo(seed,100);
    try{
        fakeData.forEach(async(item) => {
            const [data, status] = await register.register(item.email, item.password);
            if(status === "error") throw data;
            if(status === "failed") throw new Error("That email already exists");
        });
        res.send(fakeData);
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

module.exports = router;