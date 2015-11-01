'use strict';

let factorial = require('./../../modules/math/factorial');

module.exports = (() => {
    return (req, res, next) => {

        let textResponse = '';
        let statusCode;

        if(req.textplain !== undefined && req.textplain.length !== 0 ){
            statusCode = 200;
            req.textplain.forEach((data)=> {
                let base = data;
                if(base.trim() !== '#' && base !== undefined && base.trim() !== ''){
                    if(base > 15){
                        textResponse += 'El número ' + base + ' es mayor de 15, no es valido.\n';
                        next();
                    }else{
                        textResponse += factorial(base) + '\n';
                        next();
                    }
                }
            });
        }else{
            statusCode = 400;
            textResponse = 'No has enviado ningún dato, formato incorrecto';
        }

        res.status(statusCode).send(textResponse);
    };
})();
