'use strict';

module.exports = (() => {
    return (req, res, next)=>{
        if (req.is('text/*')) {
            req.setEncoding('utf8');
            req.cuantity = '';
            req.coins = [];

            req.on('data', (chunk) => {
                let textDoublePointSplit = chunk.split(':');
                let textComaSplit = textDoublePointSplit[0].split(',');

                req.cuantity = textDoublePointSplit[1];

                textComaSplit.forEach((data)=>{
                    if(data.trim()!=='')
                        req.coins.push(data);
                });

            });

            req.on('end', next);
        } else {
            next();
        }
    }
})();