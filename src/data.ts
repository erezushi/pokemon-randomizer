'use strict';

import * as fsp from 'fs/promises';
import * as constants from './constants';
import * as path from 'path';

let POKEMON = null;
let TYPES = null;

export const clearCache = async () => {
    POKEMON = null;
    TYPES = null;
};

export const getPokemon = async () => {
    if (POKEMON) {
        return POKEMON;
    }

    const filePath = path.join(__dirname, '..', constants.POKEMON_FILE);
    const pokemonString = await fsp.readFile(filePath, 'utf8');
    POKEMON = JSON.parse(pokemonString);
    return POKEMON;
};

export const getTypes = async () => {
    if (TYPES) {
        return TYPES;
    }

    const filePath = path.join(__dirname, '..', constants.TYPES_FILE);
    const typesString = await fsp.readFile(filePath, 'utf8');
    TYPES = JSON.parse(typesString);
    return TYPES;
};
