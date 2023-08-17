const axios = require('axios');
const CryptoJS = require("crypto-js");

//env
require('dotenv').config();
const {MSG_SERVICE_KEY, MSG_ACCESS_KEY, MSG_SECRET_KEY,MSG_API_URL,CALLING_NUMBER} = process.env;
const URL = MSG_API_URL + `/services/${MSG_SERVICE_KEY}/messages`;			
const method = "POST";

const makeSignature = (_timestamp) => {
	const space = " ";	
	const newLine = "\n";				
    const timestamp = `${_timestamp}`;
	const accessKey = MSG_ACCESS_KEY;	
    const url = `/sms/v2/services/${MSG_SERVICE_KEY}/messages`;

	const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, MSG_SECRET_KEY);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	const hash = hmac.finalize();

	return hash.toString(CryptoJS.enc.Base64);
}

const sendMsg = async (phoneNumber, text) => {
    try{
        const timestamp = new Date().getTime();
        const response = await axios.post(URL,{
            "type":"SMS",
            "contentType":"COMM",
            "countryCode":"82",
            "from":`${CALLING_NUMBER}`,
            "content":`${text}`,
            "messages":[
                {
                    "to":`${phoneNumber.replace(/-/g, "")}`,
                }
            ]
        },{
            headers:{
                "Content-Type" : "application/json; charset=utf-8",
                "x-ncp-apigw-timestamp": timestamp,
                "x-ncp-iam-access-key": MSG_ACCESS_KEY,
                "x-ncp-apigw-signature-v2": makeSignature(timestamp)
            }
        })
        if (response.statusName === "fail"){
            return [response,"failed"];
        }
        return [response,"completed"];
    }catch(err){
        return [err,"error"];
    }
}

module.exports = sendMsg;