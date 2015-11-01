'use strict';

let router = require('express').Router();
let factorialReceiver = require('../middlewares/utils/receiver/factorial');
let ecuationReceiver = require('../middlewares/utils/receiver/ecuation');
let factorial = require('../middlewares/math/factorial');
let ecuation = require('../middlewares/math/ecuation');

router.post('/factorial', factorialReceiver, factorial);
router.post('/ecuation', ecuationReceiver, ecuation);

module.exports = router;