'use strict';

let router = require('express').Router();
let factorial = require('../middlewares/math/factorial');

router.post('/factorial', factorial);

module.exports = router;