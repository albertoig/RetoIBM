'use strict';

let ecuation = require('./../../modules/math/ecuation');

module.exports = (() => {
    return (req, res, next) => {
        let results = [];
        req.ecuations.forEach((linearEcuation) => {
            ecuation.resolveLinearEcuation(linearEcuation)
                .then((result) => {
                    results.push(result);
                })
                .catch((error) => {
                    next(error);
                });
        });

        res.status(200).send(results);
    };
})();
