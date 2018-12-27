'use strict';

const fsp = require('fs').promises;
const constants = require('./constants');
const path = require('path');

let POKEMON = null;
let TYPES = null;

exports.clearCache = async () => {
    POKEMON = null;
    TYPES = null;
};

exports.getPokemon = async () => {
    if (POKEMON) {
        return POKEMON;
    }

    const filePath = path.join(__dirname, '..', constants.POKEMON_FILE);
    const pokemonString = await fsp.readFile(filePath, 'utf8');
    POKEMON = JSON.parse(pokemonString);
    return POKEMON;
};

exports.getTypes = async () => {
    if (TYPES) {
        return TYPES;
    }

    const filePath = path.join(__dirname, '..', constants.TYPES_FILE);
    const typesString = await fsp.readFile(filePath, 'utf8');
    TYPES = JSON.parse(typesString);
    return TYPES;
};
