// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const register = require(PATH + '/src/model/v1/login/register');
const session = require(PATH + '/src/model/v1/login/session');

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const [data,status] = await register.verifyRegister(email, password);
        switch(status) {
            case "completed":
                const [_data, status] = await session.register(email, req);
                switch(status){
                    case "completed":
                    case "failed":
                        res.send('Login Complete!');
                        break;
                    default:
                        throw _data;
                }
                break;
            case "failed":
                res.send("Login Failed!");
                break;
            default:
                throw data;
        }
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    };
});

module.exports = router;