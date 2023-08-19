
//env
require('dotenv').config();

const {History} = require(process.env.SERVER_PATH + "/mongoose/mongoose");

const register = async (data) => {
    try{
        await History.create({
            ...data
        });
        return [null, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const historyList = async () => {
    try{
        const rows = await History.find();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const verifyPayment= async (paymentKey) => {
    try{
        const rows = await History.find({
            paymentKey,
        })
        if (rows.length !== 0){
            return [rows[0], "completed"];
        }else{
            return [new Error("paymentKey undefinded"), "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.historyList = historyList;
module.exports.verifyPayment = verifyPayment;