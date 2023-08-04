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
const decodeJwt = require(PATH + '/src/model/v1/jwt').decodeJwt;

router.use((req, res, next)=> {
        const token = req.headers.authorization;
    
        if(token){
          decodeJwt(token,(decoded)=>{
            if(decoded){
              req.email = decoded.email;
              next();
            }else{
              res.send('Token Error!');
            }
          });
        }else{
            next();
        }
    }
)

router.get('/', (req, res, next)=>{
    next();
});

router.post('/', (req, res)=>{
    res.send(`email: ${req.email}`);
});

module.exports = router;