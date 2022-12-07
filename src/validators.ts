import _ from 'lodash';
import * as data from './data';
import * as types from './types';

const DEFAULT_NUMBER = 6;

export function validateOptions(options: unknown) {
    const defaultNumber = DEFAULT_NUMBER;
    let inputOptions: types.Options | undefined | null = {
        number: defaultNumber,
    };
    if (_.isObject(options)) {
        inputOptions = options as types.Options;
    } else if (options !== null && options !== undefined) {
        throw new Error(`Options must be an object. Received: ${typeof options}`);
    }

    const sanitizedOptions: types.Options = {
        number: DEFAULT_NUMBER,
    };

    sanitizedOptions.number = positiveIntegerValidator('number',
        inputOptions?.number) || DEFAULT_NUMBER;
    sanitizedOptions.baby = booleanValidator('baby',
        inputOptions?.baby);
    sanitizedOptions.basic = booleanValidator('basic',
        inputOptions?.basic);
    sanitizedOptions.evolved = booleanValidator('evolved',
        inputOptions?.evolved);
    sanitizedOptions.unique = booleanValidator('unique',
        inputOptions?.unique);
    sanitizedOptions.randomType = booleanValidator('randomType',
        inputOptions?.randomType);
    sanitizedOptions.type = typeValidator('type',
        inputOptions?.type);
    sanitizedOptions.superEffective = typeValidator('superEffective',
        inputOptions?.superEffective);
    sanitizedOptions.starter = booleanValidator('starter',
        inputOptions?.starter);
    sanitizedOptions.legendary = booleanValidator('legendary',
        inputOptions?.legendary);
    sanitizedOptions.mythical = booleanValidator('mythical',
        inputOptions?.mythical);
    sanitizedOptions.forms = booleanValidator('forms',
        inputOptions?.forms);
    sanitizedOptions.generations = generationArrayValidator('generations',
        inputOptions?.generations);

    return sanitizedOptions;
}

export function validatePokemon(
    options: types.Options,
    poke: types.ListPokemon,
    dexNo: string,
    allTypes: types.TypeMap,
): types.Pokemon | null {
    const pokeCopy = { ...poke };
    if (options) {
        if (!options.forms) {
            delete pokeCopy.forms;
        }

        if (options.baby
            && (!pokeCopy.evolveTo
                || parseInt(pokeCopy.evolveTo, 10) > parseInt(dexNo, 10))) {
            return null;
        }

        if (options.basic && !pokeCopy.basic) {
            return null;
        }
        if (options.evolved) {
            if (pokeCopy.evolveTo) {
                return null;
            }
            if (options.forms && pokeCopy.forms) {
                pokeCopy.forms = pokeCopy.forms.filter((form) => !form.evolveTo);
            }
        }

        const pokeTypes = pokeCopy.type.split(' ') as types.PokemonType[];
        if (options.type) {
            if (options.forms && pokeCopy.forms) {
                let allMonTypes = pokeTypes;
                pokeCopy.forms.forEach(
                    (form) => allMonTypes.push(...form.type.split(' ') as types.PokemonType[]),
                );
                allMonTypes = _.uniq(allMonTypes);

                if (!allMonTypes.includes(options.type)) {
                    return null;
                }

                pokeCopy.forms = pokeCopy.forms.filter((form) => {
                    const formTypes = form.type.split(' ') as types.PokemonType[];

                    return formTypes.includes(options.type!);
                });
            }
            if (!pokeTypes.includes(options.type!)) {
                return null;
            }
        }

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
            const allGens = data.getGenerations();
            if (!options.generations.some((gen) => {
                return parseInt(dexNo, 10) >= allGens[gen].first
                && parseInt(dexNo, 10) <= allGens[gen].last;
            })) {
                return null;
            }
        }
    }
    return { ...pokeCopy, dexNo };
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

export function typeValidator(optionName: string,
    value: unknown): types.PokemonType | undefined {
    if (value === null || value === undefined) {
        return undefined;
    }

    const lowerCase = stringValidator(optionName, value) ?? '';
    const validTypes = data.getTypes();
    if (Object.keys(validTypes).includes(lowerCase)) {
        return lowerCase as types.PokemonType;
    }
    throw Error(`Option ${optionName} must be a valid type. Received: ${value}`);
}

export function generationArrayValidator(optionName: string,
    value: string[] | undefined | null): string[] | undefined {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (_.isArray(value)) {
        const generations = data.getGenerations();
        const generationList = Object.keys(generations);
        if (value.every((element) => generationList.includes(element))) {
            return value.map((generation) => {
                return generation.toString();
            });
        }
        throw Error(
            `option ${
                optionName
            } must be an array of existing generation numbers. Recieved: ${
                value
            }`,
        );
    }
    throw Error(`option ${optionName} must be an array of generation numbers. Recieved: ${value}`);
}
