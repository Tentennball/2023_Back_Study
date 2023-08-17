
//env
require('dotenv').config();

const {Session} = require(process.env.SERVER_PATH + "/mongoose/mongoose");

const register = async (userId, sessionId, expires) => {
    try{
        const [data,status] = await verifySession(sessionId);
        switch (status){
            case "error":
                throw data;
            case "failed":
                await Session.create({
                    userId,
                    sessionId,
                    expires,

                });
            default:
                return [null, "completed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

const sessionList = async () => {
    try{
        const rows = await Session.find();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const verifySession = async (sessionId) => {
    try{
        const rows = await Session.find({
                sessionId,
        })
        if (rows.length !== 0){
            return [rows[0], "completed"];
        }else{
            return [new Error("session undefinded"), "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.sessionList = sessionList;
module.exports.verifySession = verifySession;