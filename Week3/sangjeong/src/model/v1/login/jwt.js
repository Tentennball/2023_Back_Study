
const jwt = require('jsonwebtoken');

//env
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const makeJwt = (email) => {
    const user = {
        email:email,
    }
    const token = jwt.sign(user, SECRET_KEY, {expiresIn: '1h'});
    return token;
    
}

const decodeJwt = async (token) => {
    try{
        const decodedToken = await jwt.verify(token, SECRET_KEY);
        return [decodedToken, "completed"];
    }catch(err){
        return [err, "error"];
    }
}

module.exports.decodeJwt = decodeJwt;
module.exports.makeJwt = makeJwt;