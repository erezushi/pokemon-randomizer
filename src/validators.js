'use strict';

const _ = require('lodash');
const constants = require('./constants');
const data = require('./data');

exports.validateOptions = async (options) => {
    let inputOptions;
    if (options === null || options === undefined) {
        inputOptions = {};
    } else if (_.isObject(options)) {
        inputOptions = options;
    } else {
        throw new Error(`Options must be an object. Received: ${typeof options}`);
    }

    const sanitizedOptions = {};
    sanitizedOptions.number = exports.positiveIntegerValidator('number', inputOptions.number);
    if (sanitizedOptions.number === null) {
        sanitizedOptions.number = constants.DEFAULT_NUMBER;
    }

    sanitizedOptions.evolved = exports.booleanValidator('evolved', inputOptions.evolved);
    sanitizedOptions.unique = exports.booleanValidator('unique', inputOptions.unique);
    sanitizedOptions.randomType = exports.booleanValidator('randomType', inputOptions.randomType);
    sanitizedOptions.type = await exports.typeValidator('type', inputOptions.type);
    sanitizedOptions.superEffective = await exports.typeValidator('superEffective', inputOptions.superEffective);

    return sanitizedOptions;
};

exports.validatePokemon = (options, poke, allTypes) => {
    if (options) {
        const pokeTypes = poke.type.split(' ');
        if (options.evolved && poke.evolveTo) {
            return false;
        }

        if (options.type) {
            if (!pokeTypes.includes(options.type)) {
                return false;
            }
        }

        if (options.superEffective) {
            const type = _.find(allTypes, (value, key) => key === options.superEffective);

            if (type) {
                const vulnerables = type.vulnerable.split(' ');
                if (!_.intersection(pokeTypes, vulnerables).length) {
                    return false;
                }
            }
        }
    }

    return true;
};

exports.booleanValidator = (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (value === true || value === false) {
        return value;
    } else if (exports.isBoolString(value)) {
        return value.trim().toLowerCase() === 'true';
    } else {
        throw Error(`Option ${optionName} must be a boolean. Received: ` + value);
    }
};

exports.isBoolString = (value) => {
    if (typeof value === 'string') {
        const lowerCase = value.trim().toLowerCase();
        if (lowerCase === 'true' || lowerCase === 'false') {
            return true;
        }
    }
    
    return false;
};

exports.positiveIntegerValidator = (optionName, value) => {
    const parsed = Number(value);
    const isInteger = !!value && !isNaN(value) && Number.isInteger(parsed) && parsed > 0;
    
    if (value === undefined || value === null) {
        return null;
    } else if (isInteger) {
        return parsed;
    } else {
        throw Error(`Option ${optionName} must be a positive integer. Received: ` + value);
    }
};

exports.stringValidator = (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (_.isString(value)) {
        const lower = value.trim().toLowerCase();
        return lower;
    } else {
        throw Error(`Option ${optionName} must be a string. Received: ` + value);
    }
};

exports.typeValidator = async (optionName, value) => {
    const lowerCase = exports.stringValidator(optionName, value);
    const validTypes = await data.getTypes();
    if (lowerCase === null) {
        return null;
    } else if (Object.keys(validTypes).includes(lowerCase)) {
        return lowerCase;
    } else {
        throw Error(`Option ${optionName} must be a valid type. Received: ` + value);
    }
};
