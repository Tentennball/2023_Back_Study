// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const register = require(PATH + '/src/model/v1/register');

router.get('/', (req, res)=>{
    register.userList((error, users)=>{
        if(error){
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }else{
            res.send(users);
        }
    })
});

router.post('/', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    register.register(email, password, (error, status)=>{
        if(error){
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }
        else{
            switch(status) {
                case "completed":
                    res.send('Registration completed');
                    break;
                case "failed":
                    res.send("Already Registerd!");
                    break;
                default:
                    res.sendFile(ERROR_PAGE);
            }
        }
    })
});

module.exports = router;