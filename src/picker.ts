'use strict';

import _ from 'lodash';
import Chance from 'chance';
import * as data from './data';
import * as validators from './validators';
const chance = new Chance();

export const pickRandomPokemon = async (unsantizedOptions) => {
    const result = await pickRandomPokemonAndOptions(unsantizedOptions);
    return result.pokemon;
};

export const pickRandomPokemonWithOptions = async (unsantizedOptions) => {
    return pickRandomPokemonAndOptions(unsantizedOptions);
};

const pickRandomPokemonAndOptions = async (unsanitizedOptions) => {
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

    let chosenPokemon = [];
    _.times(options.number, () => {
        const randomKey = getRandomKey(pokemonToPickFrom);

        let randomPokemon;
        if (options.unique) {
            randomPokemon = pokemonToPickFrom.splice(randomKey, 1)[0];
        } else {
            randomPokemon = pokemonToPickFrom[randomKey];
        }
        chosenPokemon.push(randomPokemon);
    });
    
    return {
        pokemon: chosenPokemon,
        options
    };
};

const getRandomKey = (items) => {
    const keys = Object.keys(items);
    const numItems = keys.length;
    const randomNum = chance.integer({ min: 0, max: numItems - 1 });
    return keys[randomNum];
};

export const getFilteredPokemon = async (options) => {
    const allPokemon = await data.getPokemon();
    const allTypes = await data.getTypes();
    const filteredPokemon = [];
    _.forEach(allPokemon, async poke => {
        if (validators.validatePokemon(options, poke, allTypes)) {
            filteredPokemon.push(poke);
        }
    });

    if (filteredPokemon.length === 0) {
        throw Error('No pokemon satisfy those options');
    }

    return filteredPokemon;
};
