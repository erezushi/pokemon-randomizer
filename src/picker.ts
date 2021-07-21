import _ from 'lodash';
import Chance from 'chance';
import * as data from './data';
import * as validators from './validators';
import * as types from './types';

const chance = new Chance();

export const pickRandomPokemon = async (unsantizedOptions: unknown) => {
    const result = await pickRandomPokemonAndOptions(unsantizedOptions);
    return result.pokemon;
};

export const pickRandomPokemonWithOptions = async (unsantizedOptions: unknown) => {
    return pickRandomPokemonAndOptions(unsantizedOptions);
};

const pickRandomPokemonAndOptions = async (unsanitizedOptions: unknown) => {
    const options = await validators.validateOptions(unsanitizedOptions);
    if (options && options.randomType === true && !options.type) {
        const types = await data.getTypes();
        const randomType = getRandomKey(types);
        options.type = randomType;
    }

    const pokemonToPickFrom = await getFilteredPokemon(options);
    const pokemonKeys = Object.keys(pokemonToPickFrom);
    const numPokemon = pokemonKeys.length;

    if (options.unique && numPokemon < options.number) {
        throw Error('Not enough pokemon satisfy those options');
    }

    const chosenPokemon: types.Pokemon[] = [];
    _.times(options.number, () => {
        const randomIndex = parseInt(getRandomKey(pokemonToPickFrom), 10);

        const randomPokemon = options.unique
            ? pokemonToPickFrom.splice(randomIndex, 1)[0]
            : pokemonToPickFrom[randomIndex];
        chosenPokemon.push(randomPokemon);
    });

    return {
        pokemon: chosenPokemon,
        options,
    };
};

const getRandomKey = (items: types.Pokemon[] | types.TypeMap) => {
    const keys = Object.keys(items);
    const numItems = keys.length;
    const randomNum = chance.integer({ min: 0, max: numItems - 1 });
    return keys[randomNum];
};

export const getFilteredPokemon = async (options: types.Options) => {
    const allPokemon = await data.getPokemon();
    const allTypes = await data.getTypes();
    const filteredPokemon: types.Pokemon[] = [];
    _.forEach(allPokemon, async (poke: types.Pokemon) => {
        if (validators.validatePokemon(options, poke, allTypes)) {
            filteredPokemon.push(poke);
        }
    });

    if (filteredPokemon.length === 0) {
        throw Error('No pokemon satisfy those options');
    }

    return filteredPokemon;
};
