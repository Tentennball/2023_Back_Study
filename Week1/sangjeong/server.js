const express = require('express');
const app = express();
app.use(express.json());

app.get('/v1/index', function(req,res){
    //res.send('인덱스 페이지');
    res.sendFile(__dirname+'/v1/index.html')
});

app.post('/v1/index', function(req,res){
    console.log(req.body);
    res.send(req.body);
});


app.listen(8080, function(){
  console.log('Listening at 8080');
});