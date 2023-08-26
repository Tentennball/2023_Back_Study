require('dotenv').config();

const axios = require('axios').default
const firebase = require('../model/firebase');

module.exports = {
    controller: async (req, res) => {
        const result = await firebase('history', 'get');
        console.log(result.data)
        res.send(result.data);
    },
    sms: async (req, res) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const client = require('twilio')(accountSid, authToken);

        const body = await firebase('history', 'get');
        console.log(body.data)
        client.messages.create({
            from: process.env.FROM_PHONE_NUMBER,
            to: process.env.TO_PHONE_NUMBER,
            body: JSON.stringify(body.data)
        })
            .then(message => console.log(message.sid))
    }
}