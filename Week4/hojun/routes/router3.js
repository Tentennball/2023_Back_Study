const express = require("express");
const app = express.Router();

const testingProductController = require('../controller/testingProductController');
const tossController = require('../controller/tossController');
const successController = require('../controller/successController')
const paymentController = require('../controller/paymentController')

app.post('/v1/testing/testingProduct', testingProductController.controller);
app.get('/v1/toss', (req, res) => res.sendFile(__dirname.substring(0, __dirname.length - 6) + '/public/toss.html'));
app.get('/v1/tosspayments', tossController.controller);

app.get('/v1/toss/success', successController.controller)
app.get('/v1/toss/fail', (req, res) => res.send('fail'))

app.get('/v1/toss/payments', paymentController.controller);
app.get('/v1/toss/payments/:paymentKey', paymentController.sms);

module.exports = app;