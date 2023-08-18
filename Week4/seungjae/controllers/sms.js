// const twilio = require("twilio");
// const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
// const authToken = "YOUR_TWILIO_AUTH_TOKEN";
// const client = require("twilio")(accountSid, authToken);
// api 사이트 회원가입 오류로 구현 x

const sms = async (req, res) => {
  const paymentKey = req.params.paymentKey; // :paymentKey에서 전달된 값
  console.log(paymentKey);
  const authToken = process.env.TWILIO_KEY;

  const url = `https://api.tosspayments.com/v1/payments/${paymentKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      const smsData = {
        "주문 번호": data.orderId,
        "주문 명": data.orderName,
        "주문 금액": data.easyPay.amount,
      };
      console.log(smsData);
      res.send(smsData);
    //   client.messages
    //     .create({
    //       body: `주문 번호: ${smsData["주문 번호"]}, 주문 명: ${smsData["주문 명"]}, 주문 금액: ${smsData["주문 금액"]}`,
    //       from: "YOUR_TWILIO_PHONE_NUMBER",
    //       to: "RECIPIENT_PHONE_NUMBER",
    //     })
    //     .then((message) => console.log(message.sid));
    } else {
      res
        .status(response.status)
        .json({ error: "Failed to fetch payment data" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching payment data" });
  }
};
module.exports = sms;
