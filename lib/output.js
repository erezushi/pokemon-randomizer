'use strict';

const _ = require('lodash');

exports.logPokemon = async (options, pokemon) => {
    console.log('Chose', options.number, 'Pokemon');
    _.forEach(pokemon, (poke) => {
        console.log(poke.name);
    });
};
