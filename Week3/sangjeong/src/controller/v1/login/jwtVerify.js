// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const decodeJwt = require(PATH + '/src/model/v1/login/jwt').decodeJwt;

router.use( async(req, res, next)=> {
        const token = req.headers.authorization;
    
        if(token){
          const [decodedToken,status] = await decodeJwt(token);
          if(status === "completed"){
              req.email = decodedToken.email;
              next();
          }else{
              res.send('Token Error!');
          }
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