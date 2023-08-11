const mongoose = require('mongoose');
const User = require('./models/User');
const History = require('./models/History');
const Product = require('./models/Product');
const Session = require('./models/Session');

require('dotenv').config();
const ID = process.env.MONGODB_ID;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_NAME;
const URI = `mongodb://${ID}:${encodeURIComponent(PASSWORD)}@localhost:27017/${DB_NAME}`

try{    
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(e => {
        console.error(e);
    })

    const db = {
        mongoose,
        User,
        History,
        Product,
        Session
    }
    console.log("몽고디비 연결 완료");
    module.exports = db;
}catch(e){
    console.error("Failed to connect to MongoDB:", error);
}
