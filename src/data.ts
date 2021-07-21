import * as fsp from 'fs/promises';
import * as path from 'path';
import * as constants from './constants';
import * as types from './types';
import POKEMON from './data/pokemon.json';
import TYPES from './data/types.json';

export const getPokemon = async (): Promise<types.PokemonMap> => {
    return (POKEMON as unknown) as types.PokemonMap;
};

export const getTypes = async (): Promise<types.TypeMap> => {
    return (TYPES as unknown) as types.TypeMap;
};
