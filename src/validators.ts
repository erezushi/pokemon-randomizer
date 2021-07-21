import _ from 'lodash';
import * as constants from './constants';
import * as data from './data';
import * as types from './types';

export const validateOptions = async (options: unknown) => {
    const defaultNumber = constants.DEFAULT_NUMBER;
    let inputOptions: types.Options | undefined | null = {
        number: defaultNumber,
    };
    if (_.isObject(options)) {
        inputOptions = options as types.Options;
    } else if (options !== null && options !== undefined) {
        throw new Error(`Options must be an object. Received: ${typeof options}`);
    }

    const sanitizedOptions: types.Options = {
        number: constants.DEFAULT_NUMBER,
    };
    sanitizedOptions.number = positiveIntegerValidator('number', inputOptions?.number) || constants.DEFAULT_NUMBER;
    sanitizedOptions.evolved = booleanValidator('evolved', inputOptions?.evolved);
    sanitizedOptions.unique = booleanValidator('unique', inputOptions?.unique);
    sanitizedOptions.randomType = booleanValidator('randomType', inputOptions?.randomType);
    sanitizedOptions.type = await typeValidator('type', inputOptions?.type);
    sanitizedOptions.superEffective = await typeValidator('superEffective', inputOptions?.superEffective);

    return sanitizedOptions;
};

export const validatePokemon = (options: types.Options, poke: types.Pokemon, allTypes: types.TypeMap) => {
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

export const booleanValidator = (optionName: string, value: unknown) => {
    if (value === undefined || value === null) {
        return undefined;
    } if (value === true || value === false) {
        return value;
    } if (isBoolString(value)) {
        return (value as string).trim().toLowerCase() === 'true';
    }
    throw Error(`Option ${optionName} must be a boolean. Received: ${value}`);
};

export const isBoolString = (value: unknown) => {
    if (typeof value === 'string') {
        const lowerCase = value.trim().toLowerCase();
        if (lowerCase === 'true' || lowerCase === 'false') {
            return true;
        }
    }

    return false;
};

export const positiveIntegerValidator = (optionName: string, value: unknown) => {
    if (value === undefined || value === null) {
        return undefined;
    }

    const parsed = Number(value);
    const isInteger = !!value && !isNaN(parsed) && Number.isInteger(parsed) && parsed > 0;
    if (isInteger) {
        return parsed;
    }
    throw Error(`Option ${optionName} must be a positive integer. Received: ${value}`);
};

export const stringValidator = (optionName: string, value: unknown) => {
    if (value === undefined || value === null) {
        return undefined;
    } if (_.isString(value)) {
        const lower = (value as string).trim().toLowerCase();
        return lower;
    }
    throw Error(`Option ${optionName} must be a string. Received: ${value}`);
};

export const typeValidator = async (optionName: string, value: unknown) => {
    if (value === null || value === undefined) {
        return undefined;
    }

    const lowerCase = stringValidator(optionName, value) ?? '';
    const validTypes = await data.getTypes();
    if (Object.keys(validTypes).includes(lowerCase)) {
        return lowerCase;
    }
    throw Error(`Option ${optionName} must be a valid type. Received: ${value}`);
};
