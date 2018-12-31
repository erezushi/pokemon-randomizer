Pokemon Randomizer
==================

This is a simple library to generate random teams of pokemon


Options:

* n: number of random pokemon to generate
* e: choose only fully evolved pokemon

Examples:

    const pokeRand = require('pokemon-randomizer');

    // Chooses 6 random pokemon
    const pokemon = pokeRand.pickRandomPokemon();

    // Chooses 3 random final stage pokemon
    const fullyEvolved = pokeRand.pickRandomPokemon({ number: 3, evolved: true });
