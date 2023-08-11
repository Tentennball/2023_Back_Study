// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const makeFakeProduct = require(PATH+"/src/model/v1/testing/makeFakeProduct");
const registerProduct = require(PATH+"/src/model/v1/product/registerProduct");

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', async (req, res)=>{
    try{
        const seed = req.body.seed;
        const fakeData = makeFakeProduct(seed,100);
        fakeData.forEach(async(item) => {
            const [data, status] =  await registerProduct.register(item);
            if(status === "error") throw data;
        });
        res.send(fakeData);
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

module.exports = router;