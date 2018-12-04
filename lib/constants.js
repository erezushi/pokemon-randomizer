'use strict';

exports.POKEMON_FILE = 'data/pokemon.json';

exports.ALL_OPTIONS = [
    {
        short: 'n',
        long: 'number',
        type: '<n>',
        description: 'Number of Pokemon',
        default: 6,
    },
    {
        short: 'e',
        long: 'evolved',
        description: 'Return only fully evolved Pokemon',
        default: false,
    }
];
