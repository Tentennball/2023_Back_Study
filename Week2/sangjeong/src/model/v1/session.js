
//env
const env = require('dotenv');
env.config();

const mysql = require('mysql2/promise');
const db = mysql.createPool(JSON.parse(process.env.DATABASE_ACCOUNT));

const register = async (email, req, func) => {
    req.session.email = email;

    const sessionId = req.sessionID;
    const expires = req.session.cookie.expires;
    const session = JSON.stringify(req.session);

    try{
        const [rows] = await db.query(`SELECT * FROM sessions WHERE session_id=?`, [sessionId]);
        if (rows.length !== 0){
            return func(null, "failed");
        }else{
            return verifySession(sessionId, async (error, status)=>{
                if (error) return func(error, "error");
                else{
                    switch (status){
                        case "failed":
                            const date = new Date(expires);
                            const now = new Date();
                            const diffrence = expires === 1800000 ? expires : date - now;
                            await db.query(`INSERT INTO sessions VALUES( ?, ?, ?)`, [sessionId,diffrence,session]);
                        default:
                            return func(null, "completed");
                    }
                }
            });
        }
    }catch(error){
        return func(error, "error");
    }
}

const sessionList = async (func) => {
    try{
        const [rows] = await db.query('SELECT * FROM sessions');
        return func(null, rows);
    }catch(error){
        return func(error, null);
    }
}

const verifySession = async (sessionId, func) => {
    try{
        const [rows] = await db.query(`SELECT * FROM sessions WHERE session_id=?`, [sessionId]);
        if (rows.length !== 0){
            return func(null, "completed" , rows[0]);
        }else{
            return func(null, "failed", rows[0]);
        }
    }catch(error){
        return func(error, "error");
    }
}

module.exports.register = register;
module.exports.sessionList = sessionList;
module.exports.verifySession = verifySession;