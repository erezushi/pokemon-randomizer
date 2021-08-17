import _ from 'lodash';
import Chance from 'chance';
import * as data from './data';
import * as validators from './validators';
import * as types from './types';

const chance = new Chance();

export async function pickRandomPokemon(unsantizedOptions: unknown) {
    const result = await pickRandomPokemonAndOptions(unsantizedOptions);
    return result.pokemon;
}

export async function pickRandomPokemonWithOptions(unsantizedOptions: unknown) {
    return pickRandomPokemonAndOptions(unsantizedOptions);
}

async function pickRandomPokemonAndOptions(unsanitizedOptions: unknown) {
    const options = await validators.validateOptions(unsanitizedOptions);
    if (options && options.randomType === true && !options.type) {
        const pokemonTypes = await data.getTypes();
        const randomType = getRandomKey(pokemonTypes) as types.Types;
        options.type = randomType;
    }

    const pokemonToPickFrom = await getFilteredPokemon(options);
    const pokemonKeys = Object.keys(pokemonToPickFrom);
    const numPokemon = pokemonKeys.length;

    if (options.unique && numPokemon < options.number) {
        throw Error('Not enough pokemon satisfy those options');
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
}

function getRandomKey(items: types.Pokemon[] | types.TypeMap) {
    const keys = Object.keys(items);
    const numItems = keys.length;
    const randomNum = chance.integer({ min: 0, max: numItems - 1 });
    return keys[randomNum];
}

export async function getFilteredPokemon(options: types.Options) {
    const allPokemon = await data.getPokemon();
    const allTypes = await data.getTypes();
    const filteredPokemon: types.Pokemon[] = [];

    await Promise.all(Object.entries(allPokemon).map(async ([dexNo, poke]) => {
        const validated = await validators.validatePokemon(options, poke, dexNo.toString(), allTypes);

        if (validated !== null) {
            filteredPokemon.push(validated);
        }
    }));

    if (filteredPokemon.length === 0) {
        throw Error('No pokemon satisfy those options');
    }

    return filteredPokemon;
}
