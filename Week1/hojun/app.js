// env
const dotenv = require('dotenv')
dotenv.config()

// private key
const privateKey = process.env.KEY

// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express')
const app = express()
app.use(express.json())

// connect my_db
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'back_study'
}) // in back_study, TABLE : users, sessions

// node_modules 에 있는 jsonwebtoken 관련 파일을 가져온다.
const jwt = require("jsonwebtoken")

const { v4 } = require('uuid')

// 4000 포트로 서버 오픈
app.listen(4000, function () {
    console.log("start! express server on port 4000")
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/main.html")
})

// localhost:3000//v1/index 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/v1/index', function (req, res) {
    res.sendFile(__dirname + "/v1/index.html")
})

app.post('/v1/index', function (req, res) {
    res.send("hi postman")
})

app.post('/v1/register', async function (req, res) {
    const reqBody = req.body

    let flag
    const setFlag = (value) => flag = value

    connection.connect()

    const sql_search = `SELECT * FROM users WHERE email LIKE '${reqBody.email}'`
    connection.query(sql_search, (error, results, fields) => {
        if (error) throw error
        else {
            console.log(results)
            if (results.length === 0) setFlag(true)
            else setFlag(false)
        }
    })

    const sql_insert = `INSERT INTO users (email, password) VALUES ('${reqBody.email}', '${reqBody.password}')`
    connection.query(sql_insert, (error, results, fields) => {
        if (error) console.log(error)
        else {
            if (flag) res.send('Register Complete')
            else res.send('Already Registerd')
        }
    })

    connection.end()
})

app.post('/v1/login/jwtLogin', function (req, res) {
    const reqBody = req.body

    connection.connect()

    const sql_login = `SELECT * FROM users WHERE email LIKE '${reqBody.email}' AND password LIKE '${reqBody.password}'`
    connection.query(sql_login, (error, results, fields) => {
        if (error) console.log(error)
        else {
            if (results.length === 0) res.send('Invalid email or password')
            else {
                const token = jwt.sign({ email: results[0].email }, privateKey)
                res.header('authorization', token).send('Login Complete!')
            }
        }
    })

    connection.end()
})

app.post('/v1/login/jwtVerify', function (req, res) {
    const reqHead = req.headers

    const verified = jwt.verify(reqHead.authorization, privateKey)
    res.send(verified)
})

app.post('/v1/login/sessionLogin', function (req, res) {
    const reqBody = req.body

    let flag
    const setFlag = (value) => flag = value

    connection.connect()

    const sql_login = `SELECT * FROM users WHERE email LIKE '${reqBody.email}' AND password LIKE '${reqBody.password}'`
    connection.query(sql_login, (error, results, fields) => {
        if (error) console.log(error)
        else {
            if (results.length === 0) setFlag(false)
            else setFlag(true)
        }
    })

    const data = {
        email: reqBody.email
    }

    const sql_insert = `INSERT INTO sessions (session_id, expires, data) VALUES ('${v4()}', '${new Date().getTime()}', '${JSON.stringify(data)}')`
    connection.query(sql_insert, (error, results, fields) => {
        if (error) console.log(error)
        else {
            if (flag) res.send('Login Complete!')
            else res.send('Invalid email or password')
        }
    })

    connection.end()
})

app.post('/v1/login/sessionVerify', function (req, res) {
    const reqBody = req.body

    connection.connect()

    const sql_login = `SELECT * FROM sessions WHERE session_id LIKE '${reqBody.session_id}'`
    connection.query(sql_login, (error, results, fields) => {
        if (error) console.log(error)
        else {
            console.log(results)
            if (results.length === 0) res.send('Invaild session')
            else res.send(JSON.parse(results[0].data).email)
        }
    })

    connection.end()
})
