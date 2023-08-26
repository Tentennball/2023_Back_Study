require('dotenv').config()

const axios = require('axios').default
const firebase = require('../model/firebase');

module.exports = {
    controller: (req, res) => {
        const link = 'http://localhost:4000' + req.url;
        console.log(link);

        const url = require('url');
        const queryData = url.parse(link, true).query;
        console.log(queryData);

        // const token = Buffer.from(process.env.TOSS_CLN_KEY + ":", "utf8").toString('base64')
        const token = Buffer.from(process.env.TOSS_SCR_KEY + ":", "utf8").toString('base64')
        const option = {
            method: 'post',
            url: 'https://api.tosspayments.com/v1/payments/confirm',
            headers: {
                Authorization: 'Basic ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                paymentKey: queryData.paymentKey,
                amount: queryData.amount,
                orderId: queryData.orderId
            },
            responseType: 'json'
        }
        axios.request(option)
            .then(async (response) => {
                console.log(response.data)
                await firebase(`history/${response.data.paymentKey}`, 'put', response.data)
                res.send(response.data)
            })
            .catch((error) => console.error(error))
    }
}