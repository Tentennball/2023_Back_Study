// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;
const CLIENT_KEY = process.env.TOSS_CLIENT_KEY;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

//model
const registerProduct = require('../../model/v1/product/registerProduct');
const mongoSession = require(PATH + '/src/model/v1/login/mongoSession');
const mongoRegister = require(PATH + '/src/model/v1/login/mongoRegister');
const registerHistory = require(PATH + '/src/model/v1/history/registerHistory');
const email = require(PATH + '/src/model/v1/email');
const msg = require(PATH + '/src/model/v1/msg');


router.post('/', (req, res, next)=>{
    next();
});


router.get('/', async(req, res)=>{
    try{
        const [session, sessionStatus] = await mongoSession.verifySession(req.sessionID);
        if(sessionStatus !=="completed"){
            throw session;
        }
        const userId = session.userId;
        const [user, userStatus] = await mongoRegister.findUserById(userId);
        if(userStatus !=="completed"){
            throw user;
        }
        const [product, status] = await registerProduct.getRandomProduct();
        if(status !== "completed"){
            throw product;
        }
        res.send(`
        <head>
            <meta charset="utf-8" />
            <script src="https://js.tosspayments.com/v1/payment-widget"></script>
        </head>
        <body>
            <script>
            const toss = () => {
                const clientKey = '${CLIENT_KEY}';
                const customerKey = '${userId}';

                const paymentWidget = PaymentWidget(clientKey, customerKey);
                
                const paymentMethodWidget = paymentWidget.renderPaymentMethods('#payment-method',
                    {
                        value: ${Number(product.price)},
                        currency: 'KRW',
                        country: 'KR',
                    }
                )
                const selectedPaymentMethod = paymentMethodWidget.getSelectedPaymentMethod()
                paymentWidget.requestPayment({
                    orderId: '${product._id + userId + (new Date()).getTime()}',
                    orderName: '${product.name}',
                    successUrl: 'http://localhost:8080/v1/toss/success',
                    failUrl: 'http://localhost:8080/v1/toss/fail',
                    customerEmail: '${user.email}',
                    customerName: '${user.name}',
                })
            }
            </script>
            <div>
                <span>판매자: </span>
                <span>${product.seller}</span>
            </div>
            <div>
                <span>가격: </span>
                <span>${product.price} 원</span>
            </div>
            <div>
                <span>품명: </span>
                <span>${product.name}</span>
                <button onClick="toss();">결제하기</button>
            </div>
            <div id="payment-method" style="display:none">
            </div>
        </body>
        `)
    }catch(err){
        console.log(err);
        res.sendFile(ERROR_PAGE);
    }
});

router.get('/fail',async (req,res) => {
    res.send("실패해썽유");
})

router.get('/success', async (req,res) => {
    try{
        const paymentKey = req.query.paymentKey;
        const orderId = req.query.orderId;
        const productId = orderId.slice(0,24);
        const totalAmount = req.query.amount;
        const status = "success";
        const provatedAt = Date();
        const _email = req.session.email;

        const [session, sessionStatus] = await mongoSession.verifySession(req.sessionID);
        if (sessionStatus !== "completed"){
            throw session;
        }
        const userId = session.userId;

        const [product, productStatus] = await registerProduct.getProductById(productId);
        if (productStatus !== "completed"){
            throw product;
        }
        const orderName = product.name;

        const [user, userState] = await mongoRegister.findUserById(userId);
        if (userState !== "completed"){
            throw user;
        }

        const data = {
            paymentKey,
            orderId,
            status,
            provatedAt,
            totalAmount,
            userId,
            orderName
        }
        
        const [register, registerStatus] = await registerHistory.register(data);
        if ( registerStatus !== "completed"){
            throw register;
        }
        const subject = `Toss Payment Complete! ${user.name}`;
        const text = `총금액 : ${totalAmount} \n주문번호: ${orderId}`
        const [info, emailStatus] = await email(_email,subject, text );
        if ( emailStatus !== "completed"){
            throw info;
        }
        res.send(data);


    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }

})

router.get('/payment/:paymentKey?', async(req, res) => {
    try{
        const paymentKey = req.params.paymentKey;
        const [data, status] = await registerHistory.verifyPayment(paymentKey);
        if (status !== "completed"){
            throw data;
        }
        const userId = data.userId;
        const orderId = data.orderId;
        const totalAmount = data.totalAmount;
        const orderName = data.orderName;

        const [user, userStatus] = await mongoRegister.findUserById(userId);
        if (userStatus !== "completed"){
            throw user;
        }
        const phoneNumber = user.phoneNumber;
        const text = `[Web발신]\n주문 번호:${orderId}\n주문 명:${orderName}\n주문 금액:${totalAmount}`
        const [response, responseStatus] = await msg(phoneNumber, text)
        if (responseStatus !== "completed"){
            throw response;
        }
        res.send("message 보냄요");
    }catch(err){
        console.error(err);
        res.sendFile(ERROR_PAGE);
    }
})

module.exports = router;