'use strict';

let getCoins = (coins, cuantity) => {
    let result = '';

    coins.forEach((coin) => {
        let disible = Math.floor(cuantity/coin);
        cuantity = subtraction(cuantity, coin);
        result += coin + 'X' + disible + ' ' ;
    });

    return result;
};

let subtraction = (quantity,coin) => {
    if(parseInt(coin) <= parseInt(quantity)){
        let rest = (quantity - coin);
        return subtraction(rest,coin);
    }
    return quantity;
};

module.exports = getCoins;