'use strict';

let router = require('express').Router();
let exchangeReceiver = require('../middlewares/utils/receiver/exchange');
let exchange = require('../middlewares/exchange/exchange');

router.post('/exchange', exchangeReceiver,exchange);

module.exports = router;