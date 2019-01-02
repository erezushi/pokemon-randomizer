Pokemon Randomizer
==================

This is a simple library to generate random teams of pokemon


Options:

* number: number of random pokemon to generate
* evolved: choose only fully evolved pokemon
* type: choose only pokemon of this type
* superEffective: choose only pokemon super effective against this type
* unique: choose unique pokemon

Examples:

    const pokeRand = require('pokemon-randomizer');

    // Chooses 6 random pokemon
    const pokemon = pokeRand.pickRandomPokemon();

    // Chooses 3 random, unique, final stage pokemon, that are super effective against fire
    const fullyEvolved = pokeRand.pickRandomPokemon({
        number: 3,
        unique: true,
        evolved: true,
        superEffective: 'fire'
    });
