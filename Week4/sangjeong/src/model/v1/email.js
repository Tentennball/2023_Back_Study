
const nodemailer = require('nodemailer');

//env
require('dotenv').config();
const {EMAIL, EMAIL_PASSWORD, EMAIL_SERVICE} = process.env;

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

const sendMail = async(email, subject, text) => {
    try{
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject,
            text
        };
    
        const info = await transporter.sendMail(mailOptions)
        return [info, "completed"];

    }catch(err){
        return [err,"error"];
    }
}

module.exports = sendMail;