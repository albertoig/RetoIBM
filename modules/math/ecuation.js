'use strict';

let parse = (ecuation) => {
    return splitFormula(ecuation);
};

let splitFormula = (ecuation) => {
    let splitedEcuation = ecuation.match(/-?[0-9]*(x|y)/gm);
    splitedEcuation.push(ecuation.match(/=[0-9]*/gm)[0]);
    return splitedEcuation;
};

let checkFormula = (ecuation) => {
    let prueba = ecuation ;
    prueba = true;
    return prueba;
};

let mainDiagonalDeterminant = (linearEcuation) => {
    let result = linearEcuation.reduce((prev,current,index) => {
        let temp1 = returnCleanNumberFromIncognita(prev[index-1]);
        let temp2 = returnCleanNumberFromIncognita(current[index]);

        return temp1 * temp2;
    });
    return result;
};

let mainDiagonalCoefficient = (linearEcuation) => {
    let result = linearEcuation.reduce((prev,current,index) => {
        let temp1 = returnCleanNumberFromIncognita(prev[index]);
        let temp2 = returnCleanNumberFromIncognita(current[index-1]);

        return temp1 * temp2;
    });
    return result;
};

let makeDeterminant = (determinant) => {
    let mainDiagonalDeterminantResult = mainDiagonalDeterminant(determinant);
    let mainDiagonalCoefficientResult = mainDiagonalCoefficient(determinant);
    return mainDiagonalDeterminantResult-(mainDiagonalCoefficientResult);
};

let makeDeterminantsSubstitution = (linearEcuation) => {
    const numberOfIncognitas = linearEcuation[0].length - 2;
    let determinants = [];
    let copiedLinearEcuation = cloneArray(linearEcuation);

    for(let i = 0; i <= numberOfIncognitas;i++){
        determinants.push(
            makeDeterminantSubstitution(copiedLinearEcuation,i)
        );
    }

    return determinants;
};

let makeDeterminantSubstitution = (linearEcuation, position) => {
    let copiedLinearEcuation = cloneArray(linearEcuation);

    copiedLinearEcuation.forEach((ecuation,index) => {
        let len = copiedLinearEcuation[index].length - 1;
        copiedLinearEcuation[index][position] = copiedLinearEcuation[index][len];
        cleanDeterminant(copiedLinearEcuation[index]);
    });

    return copiedLinearEcuation;
};

let resolveDeterminants = (determinants) => {
    let result = [];
    let mainDeterminant = determinants[0];

    for(let i = 1; i < determinants.length;i++){
        result.push(resolveIncognita(mainDeterminant,determinants[i]));
    }

    return result;
};

let resolveIncognita = (mainDeterminant,incognitaDeterminant) => {
    return incognitaDeterminant / mainDeterminant;
};

let resolveLinearEcuation = (linearEcuation) => {
    return new Promise((resolve,reject) => {

        let cleanedLinearEcuation = cloneArray(linearEcuation);

        cleanedLinearEcuation.forEach((ecuation) => {
            if(!checkFormula(ecuation)){
                return reject(new Error('Malformed ecuation: ' + ecuation));
            }else{
                cleanDeterminant(ecuation);
            }
        });

        let determinats = [];
        let incognitasDeterminant = makeDeterminantsSubstitution(linearEcuation);
        incognitasDeterminant.unshift(cleanedLinearEcuation);

        incognitasDeterminant.forEach((determinant) => {
            determinats.push(makeDeterminant(determinant));
        });
console.log(determinats);
        let result = resolveDeterminants(determinats);
console.log(result);
        return resolve(result);
    });
};

let returnCleanNumberFromIncognita = (incognita) => {
    let result = incognita.replace( /[^0-9]/g, '');

    if(result === ''){
        return parseInt(1);
    }else{
        return parseInt(result);
    }
};

let cloneArray = (arr) => {
    let clone = [];
    for (let i=0; i<arr.length; i++) {
        clone.push( arr[i].slice(0) )
    }
    return clone;
};

let cleanDeterminant = (ecuation) => {
    ecuation.splice(ecuation.length-1);
    return ecuation;
};

module.exports = {
    parse:parse,
    splitFormula:splitFormula,
    checkFormula:checkFormula,
    resolveLinearEcuation:resolveLinearEcuation
};