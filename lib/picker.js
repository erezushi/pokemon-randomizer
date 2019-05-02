'use strict';

const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();
const data = require('./data');

exports.pickRandomPokemon = async (options) => {
    if (options.randomType === true && !options.type) {
        const types = await data.getTypes();
        const randomType = getRandomKey(types);
        options.type = randomType;
    }

    const pokemonToPickFrom = await exports.getFilteredPokemon(options);
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
    
    return chosenPokemon;
};

const getRandomKey = (items) => {
    const keys = Object.keys(items);
    const numItems = keys.length;
    const randomNum = chance.integer({ min: 0, max: numItems - 1 });
    return keys[randomNum];
};

exports.getFilteredPokemon = async (options) => {
    const allPokemon = await data.getPokemon();
    const allTypes = await data.getTypes();
    const filteredPokemon = [];
    _.forEach(allPokemon, async poke => {
        if (exports.validatePokemon(options, poke, allTypes)) {
            filteredPokemon.push(poke);
        }
    });

    if (filteredPokemon.length === 0) {
        throw Error('No pokemon satisfy those options');
    }

    return filteredPokemon;
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
