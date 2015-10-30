'use strict';

let router = require('express').Router();
let factorial = require('../middlewares/math/factorial');

router.get('/factorial/:base', factorial);

module.exports = router;