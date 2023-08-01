// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const register = require(PATH + '/src/model/v1/register');
const session = require(PATH + '/src/model/v1/session');

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    register.verifyRegister(email, password, (error, status) => {
        if(error){
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }
        else{
            switch(status) {
                case "completed":
                    session.register(email, req, (error, status) => {
                        if(error){
                            console.log(error);
                            res.sendFile(ERROR_PAGE);
                        }else{
                            switch(status){
                                case "completed":
                                case "failed":
                                    res.send('Login Complete!');
                                    break;
                                default:
                                    res.sendFile(ERROR_PAGE);
                            }
                        }
                    })
                    break;
                case "failed":
                    res.send("Login Failed!");
                    break;
                default:
                    res.sendFile(ERROR_PAGE);
            }
        }
    })
});

module.exports = router;