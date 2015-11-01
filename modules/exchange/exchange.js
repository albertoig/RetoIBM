'use strict';

let getCoins = (coins, cuantity) => {
    let result = '';
    let tempCuantity =cuantity;

    coins.forEach((coin) => {
        let disible = Math.floor(parseFloat(tempCuantity) / parseFloat(coin));
        tempCuantity = subtraction(tempCuantity, coin);

        result += coin + 'X' + disible + ' ' ;
    });

    return textResult;
};

let subtraction = (quantity,coin) => {
    if(parseInt(coin) <= parseInt(quantity)){
        let rest = (quantity - coin);
        return subtraction(rest,coin);
    }
    return quantity;
};

module.exports = getCoins;