// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const register = require(PATH + '/src/model/v1/login/register');

router.get('/', async (req, res)=>{
    const [data, status] = await register.userList();
    if(status === "error"){
        console.error(data);
        res.sendFile(ERROR_PAGE);
    }else{
        res.send(data);
    }
});

router.post('/', async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const [data, status] = await register.register(email, password);
        switch(status) {
            case "completed":
                res.send('Registration completed');
                break;
            case "failed":
                res.send("Already Registerd!");
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