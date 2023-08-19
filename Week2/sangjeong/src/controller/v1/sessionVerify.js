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
const session = require(PATH + '/src/model/v1/session');

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', (req, res)=>{
    session.verifySession(req.sessionID,(error, status) => {
        if(error){
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }
        else{
            switch(status) {
                case "completed":
                    res.send(`session email: ${req.session.email}`);
                    break;
                case "failed":
                    res.send('Login Failed!');
                    break;
                default:
                    res.sendFile(ERROR_PAGE);
            }
        }
    })
});

module.exports = router;