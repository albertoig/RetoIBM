'use strict';

let factorial = require('./../../modules/math/factorial');

module.exports = (() => {
    return (req, res, next) => {
        let base = req.params.base;
        console.log(req.params);
        if(base > 15 && base !== undefined && base.trim() !== ''){
            res.status(400).send('Introduce un número menor o igual que 15 para calcular el factorial.\n\n' +
                                 'Recuerda que el valor introducido no debe estar vacio.');
            next();
        }else{
            let nCalculated = factorial(base);
            res.status(200).send('Resultado: ' + nCalculated);
            next();
        }
    };
})();
