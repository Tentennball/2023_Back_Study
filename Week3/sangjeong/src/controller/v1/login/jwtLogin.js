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
const register = require(PATH + '/src/model/v1/login/register');
const makeJwt = require(PATH + '/src/model/v1/login/jwt').makeJwt;

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        const [data,status] = await register.verifyRegister(email, password);
        switch(status) {
            case "completed":
                const authorizationHeader  = `${makeJwt(email)}`;
                res.setHeader('Authorization', authorizationHeader);
                res.send('Login Complete!');
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
    }
});

module.exports = router;