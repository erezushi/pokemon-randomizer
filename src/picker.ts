import Chance from 'chance';
import _ from 'lodash';

import * as data from './data';
import * as types from './types';
import * as validators from './validators';

const chance = new Chance();

const getRandomKey = (items: types.Pokemon[] | types.TypeMap) => {
  const keys = Object.keys(items);
  const numItems = keys.length;
  const randomNum = chance.integer({ min: 0, max: numItems - 1 });

  return keys[randomNum];
};

const getFilteredPokemon = (options: types.Options) => {
  const allPokemon = data.getPokemon();
  const allTypes = data.getTypes();
  const filteredPokemon: types.Pokemon[] = [];

  Object.entries(allPokemon).forEach(([dexNo, poke]) => {
    const validated = validators.validatePokemon(options, poke, parseInt(dexNo, 10), allTypes);

    if (validated !== null) {
      filteredPokemon.push(validated);
    }
  });

  if (filteredPokemon.length === 0) {
    throw Error(
      `No Pokémon satisfy those options${
        options.randomType ? `\nChosen type: ${options.type}` : ''
      }`
    );
  }

  return filteredPokemon;
};

const pickRandomPokemonAndOptions = (unsanitizedOptions: unknown) => {
  const options = validators.validateOptions(unsanitizedOptions);
  if (options && options.randomType === true && !options.type) {
    const pokemonTypes = data.getTypes();
    const randomType = getRandomKey(pokemonTypes) as types.PokemonType;
    options.type = randomType;
  }

  const pokemonToPickFrom = getFilteredPokemon(options);
  const pokemonKeys = Object.keys(pokemonToPickFrom);
  const numPokemon = pokemonKeys.length;

  if (options.unique && numPokemon < options.number) {
    throw Error(
      `only ${numPokemon} Pokémon satisf${numPokemon === 1 ? 'ies' : 'y'} those options${
        options.randomType ? `\nChosen type: ${options.type}` : ''
      }`
    );
  }

  const chosenPokemon: types.Pokemon[] = [];
  _.times(options.number, () => {
    const randomIndex = parseInt(getRandomKey(pokemonToPickFrom), 10);

    const randomPokemon = options.unique
      ? pokemonToPickFrom.splice(randomIndex, 1)[0]
      : pokemonToPickFrom[randomIndex];
    chosenPokemon.push(randomPokemon);
  });

  return {
    pokemon: chosenPokemon,
    options,
  };
};

const pickRandomPokemon = (unsanitizedOptions?: unknown) => {
  const result = pickRandomPokemonAndOptions(unsanitizedOptions);

  return result.pokemon;
};

export default pickRandomPokemon;
