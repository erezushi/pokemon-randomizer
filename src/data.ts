import * as types from './types';
import POKEMON from './data/pokemon.json';
import TYPES from './data/types.json';
import GENERATIONS from './data/generations.json';

export const getPokemon = (): types.PokemonMap => {
    return (POKEMON as unknown) as types.PokemonMap;
};

export const getTypes = (): types.TypeMap => {
    return (TYPES as unknown) as types.TypeMap;
};

export const getGenerations = (): types.GenerationMap => {
    return (GENERATIONS as unknown) as types.GenerationMap;
};
