// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';
const REGISTER_PAGE = PATH + '/src/view/v1/html/mongoLogin/Register.html';

// model
const mongoRegister = require(PATH + '/src/model/v1/login/mongoRegister.js');

router.get('/', async (req, res, next)=>{
    try{
        res.sendFile(REGISTER_PAGE);
    
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    };
});

router.post('/', async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const phoneNumber = req.body.phone;
    
        const [data,status] = await mongoRegister.register(email, phoneNumber,{password, name});
        switch(status) {
            case "completed":
                res.send('Register Complete!');
                break;
            case "failed":
                res.send("Register Failed!");
                break;
            default:
                throw data;
        }
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
});

module.exports = router;