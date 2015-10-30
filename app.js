'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let mathRouter = require('./routers/math');
const config = require('./config/config.js');

let app = express();
let appInstance;

app.use('/math', mathRouter);

appInstance = app.listen(config.app.port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Iniciado en ' + appInstance.address().port);
    }
});