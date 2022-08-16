import * as types from './types';
import POKEMON from './data/pokemon.json';
import TYPES from './data/types.json';
import GENERATIONS from './data/generations.json';

export const getPokemon = () => {
    return POKEMON as unknown as types.PokemonMap;
};

export const getTypes = (): types.TypeMap => {
    return TYPES;
};

export const getGenerations = (): types.GenerationMap => {
    return GENERATIONS;
};
