
//env
const env = require('dotenv');
env.config();

const mysql = require('mysql2/promise');
const db = mysql.createPool(JSON.parse(process.env.DATABASE_ACCOUNT));

const register = async (email, password, func) => {
    try{
        const [rows] = await db.query(`SELECT * FROM users where email= ?`, [email]);
        if (rows.length === 0){
            await db.query(`INSERT INTO users (email, password) VALUES(? , ?)`, [email, password]);
            return func(null, "completed");
        }else{
            return func(null, "failed");
        }
    }catch(error){
        return func(error, "error");
    }
}

const userList = async (func) => {
    try{
        const [rows] = await db.query('SELECT * FROM users');
        return func(null, rows);
    }catch(error){
        return func(error, null);
    }
}

const verifyRegister = async (email, password, func) => {
    try{
        const [rows] = await db.query(`SELECT * FROM users where email= ? and password = ?`, [email, password]);
        if (rows.length === 0){
            return func(null, "failed");
        }else{
            return func(null, "completed");
        }
    }catch(error){
        return func(error, "error");
    }
}

module.exports.register = register;
module.exports.userList = userList;
module.exports.verifyRegister = verifyRegister;