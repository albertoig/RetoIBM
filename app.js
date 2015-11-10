'use strict';

const config = require('./config/config.js');

let express = require('express');
let bodyParser = require('body-parser');
let mathRouter = require('./routers/math');
let exchangeRouter = require('./routers/exchange');
let app = express();
let appInstance;

app.use('/math', mathRouter);
app.use(bodyParser);
app.use(exchangeRouter);

appInstance = app.listen(config.app.port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Iniciado en ' + appInstance.address().port);
    }
});