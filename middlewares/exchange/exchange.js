'use strict';

let coinExchange = require('./../../modules/exchange/exchange');

module.exports = (() => {
    return (req, res, next) => {
        res.status(200).send(coinExchange(req.coins,req.cuantity));
    };
})();