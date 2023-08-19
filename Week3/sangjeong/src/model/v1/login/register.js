
//env
require('dotenv').config();

const {User} = require(process.env.SERVER_PATH + "/models");

const register = async (email, password) => {
    try{
        const rows = await User.findAll({
            where: {
                email: email,
            },
        });
        if (rows.length === 0){
            await User.create({
                email: email,
                password: password
            });
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
        const rows = await User.findAll();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const verifyRegister = async (email, password) => {
    try{
        const rows = await User.findAll({
            where: {
                email: email,
                password: password
            },
        });
        if (rows.length === 0){
            return [null, "failed"];
        }else{
            return [null, "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const getIdByEmail = async (email) => {
    try{
        const rows = await User.findAll({
            where:{
                email:email,
            }
        });
        if (rows.length === 0){
            return [new Error("not found"), "error"];
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
module.exports.getIdByEmail = getIdByEmail;