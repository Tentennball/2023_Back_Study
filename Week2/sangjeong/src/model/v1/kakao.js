const axios = require('axios');

//env
const env = require('dotenv');
env.config();
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

//path
const KAKAO_AUTORIZE_PATH = 'https://kauth.kakao.com/oauth/authorize?client_id=' + KAKAO_REST_API_KEY + '&redirect_uri=' + encodeURIComponent(`http://localhost:8080/v1/auth/kakao`) + '&response_type=code';

const register = () => {
    return KAKAO_AUTORIZE_PATH;
}

const getToken = async(code) => {
    const authToken = await axios.post('https://kauth.kakao.com/oauth/token', {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params:{
            grant_type: 'authorization_code',
            client_id: KAKAO_REST_API_KEY,
            code,
            redirect_uri: `http://localhost:8080/v1/auth/kakao`
        }
    });
    return authToken;
}

const getData = async(authToken) => {
    const authInfo = await axios.post('https://kapi.kakao.com/v2/user/me', {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Bearer ' + authToken.data.access_token
        }
    });
    return authInfo;
}

const unlink = async(authToken) => {
    await axios.get('https://kapi.kakao.com/v1/user/unlink', {}, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Bearer ' + authToken.data.access_token
        }
    });
}

module.exports.register = register;
module.exports.getToken = getToken;
module.exports.getData = getData;
module.exports.unlink = unlink;