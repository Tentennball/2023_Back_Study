// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';
const LOGIN_PAGE = PATH + '/src/view/v1/html/mongoLogin/Login.html';

// model
const mongoRegister = require(PATH + '/src/model/v1/login/mongoRegister');
const mongoSession = require(PATH + '/src/model/v1/login/mongoSession');

router.get('/', (req, res, next)=>{
    res.sendFile(LOGIN_PAGE);
});

router.post('/', async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        const [data,status] = await mongoRegister.verifyRegister(email, password);
        switch(status) {
            case "completed":
                req.session.email = email;
                const sessionId = req.sessionID;
                const expires = req.session.cookie.expires;
                const date = new Date(expires);
                const now = new Date();
                const diffrence = expires === 1800000 ? expires : date - now;
                const userId = data._id;

                const [_data, status] = await mongoSession.register(userId, sessionId, diffrence);
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
    }
});

module.exports = router;