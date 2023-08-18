const axios = require('axios');
const faker = require("faker");
const sequelize = require("../db");
const createHistory = require("./createHistory");
const productModel = require("../models/productModel");

const secretKey = process.env.TOSS_SECRET_KEY;
const clientKey = process.env.TOSS_CLIENT_KEY;
const customerKey = process.env.TOSS_CUSTOMER_KEY;

const toss = {
  renderTossPage: async (req, res) => {
    try {
        const randomProduct = await productModel.findOne({
          order: sequelize.random(),
          attributes: ["price", "name", "seller"],
        });
    
        if (!randomProduct) {
          return res.render("tossPage", { product: null });
        }
        console.log(clientKey);
        res.render("tossPage", { product: randomProduct, TOSS_CLIENT_KEY: clientKey, TOSS_CUSTOMER_KEY:customerKey});
      } catch (error) {
        console.error("오류 발생:", error);
        res.status(500).json({ message: "오류 발생" });
      }
  },

  createTestingProducts: async (req, res) => {
    try {
        faker.seed(req.body.seed);
    
        const testingProducts = [];
        for (let i = 1; i <= 5; i++) { //100명의 랜덤 product 생성( 지금은 5개로 설정 )
          const user = {
            price: faker.datatype.number({ min: 10, max: 1000 }), // 랜덤한 숫자를 생성하여 가격에 할당
            name: faker.commerce.productName(), // 랜덤한 제품 이름 생성
            seller: faker.name.findName(), // 랜덤한 이름 생성
          };
          testingProducts.push(user);
        }
    
        await productModel.bulkCreate(testingProducts);
    
        return res.status(201).json({
          message: `성공적으로 100명의 테스트 사용자를 추가했습니다.`,
        });
      } catch (error) {
        console.error("테스트 사용자 추가 오류:", error);
        return res.status(500)
          .json({ error: "테스트 사용자 추가에 실패했습니다." });
      }
  },

  handleSuccess: async (req, res) => {
    try {
        const response = await axios.post("https://api.tosspayments.com/v1/payments/confirm", {
          orderId: req.query.orderId,
          amount: req.query.amount,
          paymentKey: req.query.paymentKey,
        }, {
          headers: {
            Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
            "Content-Type": "application/json",
          },
        });
    
        const history = {
          status: response.data.status,
          provatedAt: response.data.approvedAt,
          orderId: response.data.orderId,
          orderName: response.data.orderName,
          paymentKey: response.data.paymentKey,
          totalAmount: response.data.totalAmount,
          id: 10,
        };
        await createHistory(history);
    
        res.render("paySuccess", {
          title: "성공적으로 구매했습니다",
          amount: response.data.totalAmount,
        });
      } catch (error) {
        const errorCode = error.response?.data?.code;
        const errorMessage = error.response?.data?.message;
        res.redirect(`/v1/fail?code=${errorCode}&message=${errorMessage}`);
      }
  },

  handleFail: (req, res) => {
    res.render("fail", {
        message: req.query.message,
        code: req.query.code,
      });
  },
};

module.exports = toss;