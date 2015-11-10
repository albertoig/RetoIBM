'use strict';

const arrayModule = require('./../utils/array');
const logger = require('./../logger/logger');

//TODO: incluir incognitas con otras letras (x o y).

let parse = (ecuation) => {
    return splitFormula(ecuation);
};

let splitFormula = (ecuation) => {
    let splitedEcuation = ecuation.match(/-?[0-9]*(x|y)/gm);
    splitedEcuation.push(ecuation.match(/=[0-9]*/gm)[0]);
    return splitedEcuation;
};

let checkLinearEcuation = (linearEcuation) => {

    let error = [];

    linearEcuation.forEach((ecuation) => {
        let minLengthError = checkMinLength(ecuation);
        let dimensionsLengthError = checkDimensionLength(ecuation, linearEcuation.length);

        if(minLengthError !== null){
            error.push(minLengthError);
        }

        if(dimensionsLengthError !== null){
            error.push(dimensionsLengthError);
        }
    });

    return error;
};

let checkMinLength = (ecuation) => {
    const minIncognitas = 2;

    if(ecuation.length <= minIncognitas){
        let errorText = `El número minimo de incognitas es 2. Ecuación: : ${ecuation}`;
        return new Error(errorText);
    }

    return null;
};


let checkDimensionLength = (ecuation, length) => {
    const ecuationLength = (ecuation.length - 1);

    if(ecuationLength !== length){
        let errorText = `Las ecuaciones liniales deben tener las mismas dimensiones. Length: ${length} Ecuation length: ${ecuationLength}`;
        return new Error(errorText);
    }

    return null;
};

let makeDeterminants = (determinants) => {
    let resolvedDeterminants = [];
    determinants.forEach((determinant) => {
        resolvedDeterminants.push(makeDeterminant(determinant));
    });
    return resolvedDeterminants;
};

let makeDeterminant = (determinant) => {
    let diagonalDeterminantResult = diagonalDeterminant(determinant);
    let diagonalCoefficientResult = diagonalCoefficient(determinant);
    return diagonalDeterminantResult-(diagonalCoefficientResult);
};

let diagonalDeterminant = (linearEcuation) => {
    return linearEcuation.reduce((prev,current,index) => {
        return returnCleanNumberFromIncognita(prev[index-1]) *
            returnCleanNumberFromIncognita(current[index]);
    });
};

let diagonalCoefficient = (linearEcuation) => {
    return linearEcuation.reduce((prev,current,index) => {
        return returnCleanNumberFromIncognita(prev[index]) *
            returnCleanNumberFromIncognita(current[index-1]);
    });
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

        let copiedLinearEcuation = arrayModule.cloneArray(linearEcuation);
        let errors = checkLinearEcuation(copiedLinearEcuation);

        if(errors.length !== 0){
            reject(errors);
        }

        let determinants = prepareDeterminants(linearEcuation);
        let determinantsMaked = makeDeterminants(determinants);
        let result = resolveDeterminants(determinantsMaked);
        logger.info('Resultado: '+result);
        return resolve(result);
    });
};

let prepareDeterminants = (linearEcuation) => {
    let mainDeterminant = arrayModule.cloneArray(linearEcuation);
    let determinants = makeDeterminantsReplacement(linearEcuation);
    mainDeterminant = prepareMainDeterminant(mainDeterminant);
    determinants.unshift(mainDeterminant);
    return determinants;
};

let prepareMainDeterminant = (linearEcuation) => {
    linearEcuation.forEach((ecuation) => {
        ecuation.pop();
    });
    return linearEcuation;
};

let makeDeterminantsReplacement = (linearEcuation) => {
    const numberOfIncognitas = linearEcuation[0].length - 2;
    let determinants = [];
    let copiedLinearEcuation = arrayModule.cloneArray(linearEcuation);

    for(let i = 0; i <= numberOfIncognitas;i++){
        determinants.push(
            makeDeterminantReplacement(copiedLinearEcuation,i)
        );
    }

    return determinants;
};

let makeDeterminantReplacement = (linearEcuation, position) => {
    let copiedLinearEcuation = arrayModule.cloneArray(linearEcuation);

    copiedLinearEcuation.forEach((ecuation,index) => {
        let len = copiedLinearEcuation[index].length - 1;
        copiedLinearEcuation[index][position] = copiedLinearEcuation[index][len];
        copiedLinearEcuation[index].pop();
    });

    return copiedLinearEcuation;
};

let returnCleanNumberFromIncognita = (incognita) => {
    let result = incognita.replace( /[^0-9]/g, '');

    if(result === ''){
        return parseInt(1);
    }else{
        return parseInt(result);
    }
};

module.exports = {
    parse:parse,
    resolveLinearEcuation:resolveLinearEcuation
};