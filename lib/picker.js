'use strict';

const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();
const data = require('./data');

exports.pickRandomPokemon = async (options) => {
    const pokemonToPickFrom = await exports.getFilteredPokemon(options);
    const pokemonKeys = Object.keys(pokemonToPickFrom);
    const numPokemon = pokemonKeys.length;

    let chosenPokemon = [];
    _.times(options.number, () => {
        const randomNum = chance.integer({ min: 0, max: numPokemon - 1 });
        const randomKey = pokemonKeys[randomNum];
        const randomPokemon = pokemonToPickFrom[randomKey];
        chosenPokemon.push(randomPokemon);
    });

    return chosenPokemon;
};

exports.getFilteredPokemon = async (options) => {
    const allPokemon = await data.getPokemon();
    const filteredPokemon = [];
    _.forEach(allPokemon, poke => {
        if (exports.validatePokemon(options, poke)) {
            filteredPokemon.push(poke);
        }
    });

    if (filteredPokemon.length === 0) {
        throw Error('No pokemon satisfy those options');
    }

    return filteredPokemon;
};

exports.validatePokemon = (options, poke) => {
    if (options) {
        if (options.evolved && poke.evolveTo) {
            return false;
        }
        if (options.type) {
            const types = poke.type.split(' ');
            if (!types.includes(options.type)) {
                return false;
            }
        }
    }

    return true;
};
