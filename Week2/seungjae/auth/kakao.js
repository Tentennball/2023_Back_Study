const axios = require('axios');
//require("dotenv").config();
let access_Token;
exports.socialLogin = (req, res, next) => {
    console.log("hji");
    res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=002828d31ecb8bfe135bc79e184b3713&redirect_uri=http://127.0.0.1:1724/login/callback&response_type=code&scope=account_email`);
    
};

exports.socialCallback = async (req, res, next) => {
    const token = req.query.code;
    console.log(token);

    try {
        const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            `grant_type=authorization_code&client_id=002828d31ecb8bfe135bc79e184b3713&redirect_uri=http://127.0.0.1:1724/login/callback&code=${token}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;',
                },
            }
        );

        access_Token = response.data.access_token;
        console.log(access_Token);

        //res.redirect('http://127.0.0.1:1724/login');
        //res.send(access_Token);
        console.log("good");

        const user_info_response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${access_Token}`,
            },
        });
        res.send("tmdwp0910@naver.com");
        const user_info = user_info_response.data;
        //const email = user_info.kakao_account.email;  
        //req.session.email = email;
        //res.send(email);
        //res.redirect('http://127.0.0.1:1724/login/kakao');
    } catch (err) {
        if (!err.response) {
            err.statusCode = 500;
            next(err);
        } else {
            // 만약 요청을 보냈지만 서버가 2xx 이외의 상태 코드로 응답한 경우
            console.error(err.response.data);
            console.error(err.response.status);
            next(err);
        }
    }
};