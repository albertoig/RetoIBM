'use strict';

let getFactorial = (base) => {
    if(base >= 1){
        return getFactorial(base -1) * base;
    }
    return 1;
};

module.exports = getFactorial;