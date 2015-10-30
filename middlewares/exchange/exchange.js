'use strict';

let moneyExchange = require('./../../modules/exchange/exchange');

module.exports = (() => {
    return (req, res, next) => {
        res.status(200).send(''+moneyExchange(req.coins,req.cuantity));
    };
})();