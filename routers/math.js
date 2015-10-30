'use strict';

let router = require('express').Router();
let factorial = require('../middlewares/math/factorial');
let textPlainReciver = require('../middlewares/utils/receiver/factorial');

router.post('/factorial', textPlainReciver,factorial);

module.exports = router;