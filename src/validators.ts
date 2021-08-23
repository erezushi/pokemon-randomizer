import _ from 'lodash';
import * as constants from './constants';
import * as data from './data';
import * as types from './types';

export async function validateOptions(options: unknown) {
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
    sanitizedOptions.baby = booleanValidator('baby', inputOptions?.baby);
    sanitizedOptions.basic = booleanValidator('basic', inputOptions?.basic);
    sanitizedOptions.evolved = booleanValidator('evolved', inputOptions?.evolved);
    sanitizedOptions.unique = booleanValidator('unique', inputOptions?.unique);
    sanitizedOptions.randomType = booleanValidator('randomType', inputOptions?.randomType);
    sanitizedOptions.type = await typeValidator('type', inputOptions?.type);
    sanitizedOptions.superEffective = await typeValidator('superEffective', inputOptions?.superEffective);
    sanitizedOptions.starter = booleanValidator('starter', inputOptions?.starter);
    sanitizedOptions.legendary = booleanValidator('legendary', inputOptions?.legendary);
    sanitizedOptions.mythical = booleanValidator('mythical', inputOptions?.mythical);
    sanitizedOptions.forms = booleanValidator('forms', inputOptions?.forms);
    sanitizedOptions.generations = await generationArrayValidator('generations', inputOptions?.generations);

    return sanitizedOptions;
}

export async function validatePokemon(
    options: types.Options,
    poke: types.Pokemon,
    dexNo: string,
    allTypes: types.TypeMap,
): Promise<types.Pokemon | null> {
    const pokeCopy = { ...poke };
    if (options) {
        if (options.baby && (!pokeCopy.evolveTo || parseInt(pokeCopy.evolveTo, 10) > parseInt(dexNo, 10))) {
            return null;
        }

        if (options.basic && !pokeCopy.basic) {
            return null;
        }
        if (options.evolved && pokeCopy.evolveTo) {
            return null;
        }

        const pokeTypes = pokeCopy.type.split(' ') as types.Types[];
        if (options.type) {
            if (!(pokeTypes.includes(options.type) || (options.forms && pokeCopy.forms && pokeCopy.forms.some((form) => {
                if (options.type) {
                    const formTypes = form.type.split(' ') as types.Types[];

                    return formTypes.includes(options.type);
                }

                return false;
            })))) {
                return null;
            }

            if (pokeCopy.forms) {
                pokeCopy.modifiedForms = pokeCopy.forms.filter((form) => {
                    if (options.type) {
                        const formTypes = form.type.split(' ') as types.Types[];

                        return formTypes.includes(options.type);
                    }

                    return false;
                });
            }
        } else {
            pokeCopy.modifiedForms = pokeCopy.forms;
        }

        if (options.forms && pokeCopy.modifiedForms) {
            pokeCopy.forms = pokeCopy.modifiedForms;
        } else {
            delete pokeCopy.forms;
        }
        delete pokeCopy.modifiedForms;

        if (options.superEffective) {
            const type = allTypes[options.superEffective];

            if (type) {
                const vulnerables = type.vulnerable.split(' ');
                if (!_.intersection(pokeTypes, vulnerables).length) {
                    return null;
                }
            }
        }

        if (options.starter && !pokeCopy.starter) {
            return null;
        }

        if (options.legendary && !(pokeCopy.legendary || pokeCopy.mythical)) {
            return null;
        }

        if (options.mythical && !pokeCopy.mythical) {
            return null;
        }

        if (options.generations) {
            const allGens = await data.getGenerations();
            if (!options.generations.some((gen) => {
                return parseInt(dexNo, 10) >= allGens[gen].first
                && parseInt(dexNo, 10) <= allGens[gen].last;
            })) {
                return null;
            }
        }
    }
    return pokeCopy;
}

export function booleanValidator(optionName: string, value: unknown) {
    if (value === undefined || value === null) {
        return undefined;
    } if (value === true || value === false) {
        return value;
    } if (isBoolString(value)) {
        return (value as string).trim().toLowerCase() === 'true';
    }
    throw Error(`Option ${optionName} must be a boolean. Received: ${value}`);
}

export function isBoolString(value: unknown) {
    if (typeof value === 'string') {
        const lowerCase = value.trim().toLowerCase();
        if (lowerCase === 'true' || lowerCase === 'false') {
            return true;
        }
    }

    return false;
}

export function positiveIntegerValidator(optionName: string, value: unknown) {
    if (value === undefined || value === null) {
        return undefined;
    }

    const parsed = Number(value);
    const isInteger = !!value && !Number.isNaN(parsed) && Number.isInteger(parsed) && parsed > 0;
    if (isInteger) {
        return parsed;
    }
    throw Error(`Option ${optionName} must be a positive integer. Received: ${value}`);
}

export function stringValidator(optionName: string, value: unknown) {
    if (value === undefined || value === null) {
        return undefined;
    } if (_.isString(value)) {
        const lower = (value as string).trim().toLowerCase();
        return lower;
    }
    throw Error(`Option ${optionName} must be a string. Received: ${value}`);
}

export async function typeValidator(optionName: string, value: unknown): Promise<types.Types | undefined> {
    if (value === null || value === undefined) {
        return undefined;
    }

    const lowerCase = stringValidator(optionName, value) ?? '';
    const validTypes = await data.getTypes();
    if (Object.keys(validTypes).includes(lowerCase)) {
        return lowerCase as types.Types;
    }
    throw Error(`Option ${optionName} must be a valid type. Received: ${value}`);
}

export async function generationArrayValidator(optionName: string, value: string[] | undefined | null): Promise<string[] | undefined> {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (_.isArray(value)) {
        const generations = await data.getGenerations();
        const generationList = Object.keys(generations);
        if (value.every((element) => generationList.includes(element))) {
            return value.map((generation) => {
                return generation.toString();
            });
        }
        throw Error(`option ${optionName} must be an array of existing generation numbers. Recieved: ${value}`);
    }
    throw Error(`option ${optionName} must be an array of generation numbers. Recieved: ${value}`);
}
