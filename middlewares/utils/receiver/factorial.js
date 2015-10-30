'use strict';

module.exports = (() => {
    return (req, res, next)=>{
        if (req.is('text/*')) {
            req.setEncoding('utf8');
            req.textplain = [];

            req.on('data', (chunk) => {
                let textSplit = chunk.split('\n');
                textSplit.forEach((data)=>{
                    req.textplain.push(data);
                });
            });

            req.on('end', next);
        } else {
            next();
        }
    }
})();
