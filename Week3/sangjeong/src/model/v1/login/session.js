
//env
require('dotenv').config();

const {Session} = require(process.env.SERVER_PATH + "/models");

const register = async (email, req) => {
    req.session.email = email;

    const sessionId = req.sessionID;
    const expires = req.session.cookie.expires;
    const session = JSON.stringify(req.session);

    try{
        const [data,status] = await verifySession(sessionId);
        switch (status){
            case "error":
                throw data;
            case "failed":
                const date = new Date(expires);
                const now = new Date();
                const diffrence = expires === 1800000 ? expires : date - now;
                await Session.create({
                    session_id: sessionId,
                    expires: diffrence,
                    data:session
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
        const rows = await Session.findAll();
        return [rows, "completed"];
    }catch(error){
        return [error, "error"];
    }
}

const verifySession = async (sessionId) => {
    try{
        const rows = await Session.findAll({
            where:{
                session_id:sessionId,
            }
        })
        if (rows.length !== 0){
            return [rows[0], "completed"];
        }else{
            return [null, "failed"];
        }
    }catch(error){
        return [error, "error"];
    }
}

module.exports.register = register;
module.exports.sessionList = sessionList;
module.exports.verifySession = verifySession;