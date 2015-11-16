'use strict';

let cloneArray = (arr) => {
    let clone = [];
    for (let i=0; i<arr.length; i++) {
        clone.push( arr[i].slice(0) )
    }
    return clone;
};

module.exports = {
    cloneArray:cloneArray
};