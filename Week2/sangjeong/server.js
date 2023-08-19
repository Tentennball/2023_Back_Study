/*
  디비 자동 생성? .. == 시퀄라이저

*/

const express = require('express');
const app = express();

//env
const env = require('dotenv');
env.config();
const SECRET_KEY = process.env.SECRET_KEY;

const session = require('express-session');

app.use(session({
  secret: SECRET_KEY, 
  resave: false, 
  saveUninitialized: true,
  cookie: {
      expires: 1800000 // 30분 * 60초 * 1000밀리초
  }
}));

app.use(express.json()); 

// router
const router = require('./src/controller/route');
app.use('/', router);


app.listen(8080, function(){
  console.log('Listening at 8080');
});