
//env
require('dotenv').config();

const {User} = require(process.env.SERVER_PATH + "/mongoose/mongoose");

const register = async (email,phoneNumber, data) => {
    try{
        const rows = await User.find({
            $or:[
                {email},
                {phoneNumber}
            ]
        });
        if (rows.length === 0){
            const newUser = new User({
                email,
                phoneNumber,
                ...data
            });
            await newUser.save();
            return [null, "completed"];
        }else{
            return [null, "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const userList = async () => {
    try{
        const rows = await User.find();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const verifyRegister = async (email, password) => {
    try{
        const rows = await User.find({
                email: email,
                password: password
        });
        if (rows.length === 0){
            return [null, "failed"];
        }else{
            return [rows[0], "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const findUserById = async (_id) => {
    try{
        const rows = await User.find({
                _id: _id
        });
        if (rows.length === 0){
            return [null, "failed"];
        }else{
            return [rows[0], "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.userList = userList;
module.exports.verifyRegister = verifyRegister;
module.exports.findUserById = findUserById;
// module.exports.getIdByEmail = getIdByEmail;