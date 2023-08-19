// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const session = require(PATH + '/src/model/v1/login/session');

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', async (req, res)=>{
    try{
        const [data, status] = await session.verifySession(req.sessionID);

        switch(status) {
            case "completed":
                res.send(`session email: ${req.session.email}`);
                break;
            case "failed":
                res.send('Login Failed!');
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