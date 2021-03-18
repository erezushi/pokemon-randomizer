'use strict';

import * as fsp from 'fs/promises';
import * as constants from './constants';
import * as path from 'path';
import * as types from './types';

let POKEMON: types.PokemonMap = {};
let TYPES: types.TypeMap = {};

export const clearCache = async () => {
    POKEMON = {};
    TYPES = {};
};

export const getPokemon = async (): Promise<types.PokemonMap> => {
    if (Object.keys(POKEMON).length > 0) {
        return POKEMON;
    }

    const filePath = path.join(__dirname, '..', constants.POKEMON_FILE);
    const pokemonString = await fsp.readFile(filePath, 'utf8');
    POKEMON = JSON.parse(pokemonString);
    return POKEMON;
};

export const getTypes = async (): Promise<types.TypeMap> => {
    if (Object.keys(TYPES).length > 0) {
        return TYPES;
    }

    const filePath = path.join(__dirname, '..', constants.TYPES_FILE);
    const typesString = await fsp.readFile(filePath, 'utf8');
    TYPES = JSON.parse(typesString);
    return TYPES;
};
