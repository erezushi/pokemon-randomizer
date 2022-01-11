import * as types from './types';
import POKEMON from './data/pokemon.json';
import TYPES from './data/types.json';
import GENERATIONS from './data/generations.json';

export const getPokemon = () => {
    return (POKEMON as unknown) as types.PokemonMap;
};

export const getTypes = () => {
    return (TYPES as unknown) as types.TypeMap;
};

export const getGenerations = () => {
    return (GENERATIONS as unknown) as types.GenerationMap;
};
