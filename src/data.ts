import GENERATIONS from './data/generations.json';
import POKEMON from './data/pokemon.json';
import TYPES from './data/types.json';
import * as types from './types';

export const getPokemon = () => POKEMON as unknown as types.PokemonMap;

export const getTypes = (): types.TypeMap => TYPES;

export const getGenerations = (): types.GenerationMap => GENERATIONS;
