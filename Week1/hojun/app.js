// env
const dotenv = require('dotenv')
dotenv.config()

// private key
const privateKey = process.env.DB_KEY

const NAVER = {
    ClientID: process.env.NAEVER_CLIENT_ID,
    ClientSecret: process.env.NAEVER_CLIENT_SECRET,
    CallbackURL: process.env.NAEVER_CALLBACK_URL,
}

const KAKAO = {
    ClientID: process.env.KAKAO_CLIENT_ID,
    ClientSecret: process.env.KAKAO_CLIENT_SECRET,
    CallbackURL: process.env.KAKAO_CALLBACK_URL,
}

const GOOGLE = {
    ClientID: process.env.GOOGLE_CLIENT_ID,
    ClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    CallbackURL: process.env.GOOGLE_CALLBACK_URL,
}

// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express')
const session = require('express-session')

const passport = require('passport');
const NaverStrategy = require('passport-naver-v2').Strategy
const KakaoStrategy = require('passport-kakao').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express()
app.use(express.json())
app.use(session({
    secret: 'my_secret_string',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

passport.use(new NaverStrategy(
    {
        clientID: NAVER.ClientID,
        clientSecret: NAVER.ClientSecret,
        callbackURL: NAVER.CallbackURL,
    },
    (accessToken, refreshToken, profile, done) => process.nextTick(() => done(null, profile))
))
passport.use(new KakaoStrategy(
    {
        clientID: KAKAO.ClientID,
        clientSecret: KAKAO.ClientSecret,
        callbackURL: KAKAO.CallbackURL,
    },
    (accessToken, refreshToken, profile, done) => process.nextTick(() => done(null, profile))
))
passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE.ClientID,
        clientSecret: GOOGLE.ClientSecret,
        callbackURL: GOOGLE.CallbackURL,
    },
    (accessToken, refreshToken, profile, done) => process.nextTick(() => done(null, profile))
))

// connect my_db
const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'back_study'
}) // in back_study, TABLE : users, sessions
// connection.connect()

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

app.post('/v1/register', async (req, res) => {
    const reqBody = req.body

    const sql_search = `SELECT * FROM users WHERE email LIKE '${reqBody.email}'`
    const [rows, fields] = await connection.query(sql_search)

    if (rows.length === 0) {
        const sql_insert = `INSERT INTO users (email, password) VALUES ('${reqBody.email}', '${reqBody.password}')`
        connection.query(sql_insert)
        res.send('Register Complete')
    }
    else res.send('Already Registerd')
})

app.post('/v1/login/jwtLogin', async (req, res) => {
    const reqBody = req.body

    const sql_login = `SELECT * FROM users WHERE email LIKE '${reqBody.email}' AND password LIKE '${reqBody.password}'`
    const [rows, fields] = await connection.query(sql_login)

    if (rows.length === 0) res.send('Invalid email or password')
    else {
        const token = jwt.sign({ email: reqBody.email }, privateKey)
        res.header('authorization', token).send('Login Complete!')
    }
})

app.post('/v1/login/jwtVerify', (req, res) => {
    const reqHead = req.headers

    const verified = jwt.verify(reqHead.authorization, privateKey)
    res.send(verified)
})

app.post('/v1/login/sessionLogin', async (req, res) => {
    const reqBody = req.body

    const sql_login = `SELECT * FROM users WHERE email LIKE '${reqBody.email}' AND password LIKE '${reqBody.password}'`
    const [rows1, fields1] = await connection.query(sql_login)

    const sql_search = `SELECT * FROM sessions WHERE data LIKE '{"email":"${reqBody.email}"}'`
    const [rows2, fields2] = await connection.query(sql_search)

    if (rows1.length === 0) res.send('Invalid email or password')
    else {
        if (rows2.length === 0) {
            const data = { email: reqBody.email }
            const sql_insert = `INSERT INTO sessions (session_id, expires, data) VALUES ('${v4()}', '${new Date().getTime()}', '${JSON.stringify(data)}')`
            connection.query(sql_insert)
            res.send('Login Complete!')
        }
        else res.send('Already, exist in session')
    }
})

app.post('/v1/login/sessionVerify', async (req, res) => {
    const reqBody = req.body

    const sql_login = `SELECT * FROM sessions WHERE session_id LIKE '${reqBody.session_id}'`
    const [rows, fields] = await connection.query(sql_login)

    if (rows.length === 0) res.send('Invaild session')
    else res.send(JSON.parse(rows[0].data).email)
})

app.post('/v1/login/sessionLogout', async (req, res) => {
    const reqBody = req.body

    const sql_login = `DELETE FROM sessions WHERE session_id LIKE '${reqBody.session_id}'`
    const [rows, fields] = await connection.query(sql_login)

    if (rows.affectedRows === 0) res.send('Invaild session')
    else res.send('Logout')
})

app.get('/v1/auth', (req, res) => {
    res.sendFile(__dirname + '/v1/auth/login.html')
})

app.get('/v1/auth/naver', passport.authenticate('naver', { authType: 'reprompt' }))
app.get('/v1/auth/callback/naver', passport.authenticate('naver', { failureRedirect: '/' }), async (req, res) => {
    if (req.isAuthenticated()) {
        // req.user contains the user profile from the passport strategy
        const email = req.user.email

        const sql_search = `SELECT * FROM sessions WHERE data LIKE '{"email":"${email}"}'`
        const [rows, fields2] = await connection.query(sql_search)

        const a = `<a href='http://localhost:4000/v1/auth'>auth</a>`
        let h1

        if (rows.length === 0) {
            const data = { email: email }
            const sql_insert = `INSERT INTO sessions (session_id, expires, data) VALUES ('${v4()}', '${new Date().getTime()}', '${JSON.stringify(data)}')`
            connection.query(sql_insert)

            h1 = `<h1>Hello, ${email}!</h1>`
        }
        else h1 = `<h1>Already Registered, ${email}!</h1>`

        res.send(h1 + '<br />' + a)
    } else res.redirect('/')
})

app.get('/v1/auth/kakao', passport.authenticate('kakao', { authType: 'reprompt' }))
app.get('/v1/auth/callback/kakao', passport.authenticate('kakao', { failureRedirect: '/' }), async (req, res) => {
    if (req.isAuthenticated()) {
        // req.user contains the user profile from the passport strategy
        const email = req.user._json.kakao_account.email

        const sql_search = `SELECT * FROM sessions WHERE data LIKE '{"email":"${email}"}'`
        const [rows, fields2] = await connection.query(sql_search)

        const a = `<a href='http://localhost:4000/v1/auth'>auth</a>`
        let h1

        if (rows.length === 0) {
            const data = { email: email }
            const sql_insert = `INSERT INTO sessions (session_id, expires, data) VALUES ('${v4()}', '${new Date().getTime()}', '${JSON.stringify(data)}')`
            connection.query(sql_insert)

            h1 = `<h1>Hello, ${email}!</h1>`
        }
        else h1 = `<h1>Already Registered, ${email}!</h1>`

        res.send(h1 + '<br />' + a)
    } else res.redirect('/')
})

app.get('/v1/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/v1/auth/callback/google', passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
    if (req.isAuthenticated()) {
        // req.user contains the user profile from the passport strategy
        const email = req.user._json.email

        const sql_search = `SELECT * FROM sessions WHERE data LIKE '{"email":"${email}"}'`
        const [rows, fields2] = await connection.query(sql_search)

        const a = `<a href='http://localhost:4000/v1/auth'>auth</a>`
        let h1

        if (rows.length === 0) {
            const data = { email: email }
            const sql_insert = `INSERT INTO sessions (session_id, expires, data) VALUES ('${v4()}', '${new Date().getTime()}', '${JSON.stringify(data)}')`
            connection.query(sql_insert)

            h1 = `<h1>Hello, ${email}!</h1>`
        }
        else h1 = `<h1>Already Registered, ${email}!</h1>`

        res.send(h1 + '<br />' + a)
    } else res.redirect('/')
})

app.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error)
        res.redirect('/')
    })
});