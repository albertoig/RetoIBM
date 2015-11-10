'use strict';

const ecuation = require('./../../modules/math/ecuation');
const logger = require('./../../modules/logger/logger');

module.exports = (() => {
    return (req, res, next) => {
        let results = [];

        logger.info(`Linear Ecuations on ecuation middleware: ${req.ecuations.toString()}`);

        req.ecuations.forEach((linearEcuation) => {
            ecuation.resolveLinearEcuation(linearEcuation)
                .then((result) => {
                    results.push(result);
                    if(req.ecuations.length === results.length){
                        res.status(200).send(results);
                    }
                })
                .catch((error) => {
                    logger.error('Error: ' + error);
                    res.status(400).send(error);
                });
        });
    };
})();
