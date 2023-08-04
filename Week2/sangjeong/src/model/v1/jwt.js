
const jwt = require('jsonwebtoken');

//env
const env = require('dotenv');
env.config();
const SECRET_KEY = process.env.SECRET_KEY;

const makeJwt = (email) => {
    const user = {
        email:email,
    }
    const token = jwt.sign(user, SECRET_KEY, {expiresIn: '1h'});
    return token;
    
}

const decodeJwt = (token, callBack) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) =>{
        if(err){
            return callBack(false);
        }else{
            return callBack(decoded);
        }
    });
}

module.exports.decodeJwt = decodeJwt;
module.exports.makeJwt = makeJwt;