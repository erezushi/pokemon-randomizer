'use strict';

const input = require('./input');
const output = require('./output');
const picker = require('./picker');

Promise.resolve()
    .then(() => input.parseInput())
    .then((options) => {
        return picker.pickRandomPokemon(options)
            .then((pokemon) => output.logPokemon(options, pokemon));
    })
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
