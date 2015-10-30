'use strict';

let getCoins = (coins, cuantity) => {
    let textResult = '';

    coins.forEach((coin) => {
        let disible = coin / cuantity;

        if(disible !== 0 ){
            textResult += coin + 'X' + disible + ' ' ;
        }
    });

    return textResult;
};

module.exports = getCoins;