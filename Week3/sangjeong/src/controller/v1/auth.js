// express router
const express = require('express');
const router = express.Router();

//env
const env = require('dotenv');
env.config();
const PATH = process.env.SERVER_PATH;
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// model
const kakao = require(PATH+"/src/model/v1/kakao");
const session = require(PATH+"/src/model/v1/login/session");

router.get('/', (req, res)=>{
    session.verifySession(req.sessionID, (error, status, data) => {
        if(error){
            console.log(error);
            res.sendFile(ERROR_PAGE);
        }else{
            if(status === "completed"){
                const email = JSON.parse(data.data).email;
                res.send(email);
            }else{
                res.sendFile(PATH+'/src/view/v1/html/socialLogin.html');
            }
        }
    })
});

router.post('/', (req, res)=>{
    res.send(req.body);
});

router.post('/unlink', (req, res)=>{
    res.send(req.body);
});

router.get('/login', (req, res) => {
    const path = kakao.register();
    res.redirect(path);
})

router.use('/kakao', async (req, res, next)=>{
    try{
        const code = req.query.code;
		const authToken = await kakao.getToken(code);
        const authInfo = await kakao.getData(authToken);

        req.session.access_token = authToken.data.access_token;
        
        await session.register(authInfo.data.kakao_account.email,req,(error, state) => {
            if(error){
                console.log(error);
                res.sendFile(ERROR_PAGE);
            }
        })

    }catch(error) {
        console.log(error);
        res.sendFile(PATH+'/src/view/v1/html/socialLogin.html');
    }

    res.redirect('./');
})


module.exports = router;