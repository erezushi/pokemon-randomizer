'use strict';

const fsp = require('fs').promises;
const constants = require('./constants');

let POKEMON = null;
let TYPES = null;

exports.getPokemon = async () => {
    if (POKEMON) {
        return POKEMON;
    }

    const pokemonString = await fsp.readFile(constants.POKEMON_FILE, 'utf8');
    POKEMON = JSON.parse(pokemonString);
    return POKEMON;
};

exports.getTypes = async () => {
    if (TYPES) {
        return TYPES;
    }

    const typesString = await fsp.readFile(constants.TYPES_FILE, 'utf8');
    TYPES = JSON.parse(typesString);
    return TYPES;
};
