'use strict';

const ecuationModule = require('./../../../modules/math/ecuation');
const stringUtils = require('./../../../modules/utils/string');
const logger = require('./../../../modules/logger/logger');
const closer = '##';
const separator = '·#·';
const pointSeparator = '·';

let parseRequestToEcuations = (str) => {
    let cleanedStr = cleanStr(str);
    let splitedStr = cleanedStr.split(separator);
    let splitedSeparator = splitStringSeparator(splitedStr);
    return arrayStringToEcuations(splitedSeparator);
};

let cleanStr = (str) => {
    str = str.replace(pointSeparator,'');
    str = str.replace(closer,'');
    return str.replace( /·#·$/ ,'');
};

let splitStringSeparator = (arrStr) => {
    let tempArrStr = [];
    arrStr.forEach((data) => {
        tempArrStr.push(data.split(pointSeparator));
    });
    return tempArrStr;
};

let arrayStringToEcuations = (arrStr) => {
    let ecuations = [];

    arrStr.forEach((data) => {
        let linearEcuation = [];
        data.forEach((ecuation) => {
            linearEcuation.push(ecuationModule.parse(ecuation));
        });
        ecuations.push(linearEcuation);
    });

    return ecuations;
};

let checkIfCloserExist = (str) => {
    return str.indexOf(closer) !== -1;
};

let checkIfEcuationExist = (str) => {
    return str.split(separator).length > 0;
};

let checkSplitedRequest = (str) => {
    return new Promise((resolve,reject) => {
        let tempStr = stringUtils.removeSpaces(str);

        if(!checkIfCloserExist(str)){
            return reject(new Error('Closer not exist in the request, please insert it.'));
        }

        if(!checkIfEcuationExist(str)){
            return reject(new Error('Ecuation not exist on the request.'));
        }

        return resolve(tempStr);
    });
};

module.exports = (() => {
    return (req, res, next) => {
        if (req.is('text/*')) {
            req.setEncoding('utf8');

            req.on('data', (str) => {
                checkSplitedRequest(str)
                    .then((data) => {
                        req.ecuations = parseRequestToEcuations(data);
                        console.log(JSON.stringify(req.ecuations));
                        logger.info(`Linear Ecuation on receiver: ${req.ecuations}`);
                        return next();
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    })
            });

        } else {
            return next();
        }
    }
})();