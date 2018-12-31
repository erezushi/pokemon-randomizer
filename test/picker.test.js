'ust strict';

const picker = require('../lib/picker');
const expect = require('chai').expect;
const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

describe('picker', async function () {
    describe('getFilteredPokemon', async function () {
        it('should handle empty object options', async function () {
            const result = await picker.getFilteredPokemon({});
            expect(result).to.exist;
        });

        it('should handle null options', async function () {
            const result = await picker.getFilteredPokemon(null);
            expect(result).to.exist;
        });

        it('should handle undefined options', async function () {
            const result = await picker.getFilteredPokemon(undefined);
            expect(result).to.exist;
        });

        it('should handle empty array options', async function () {
            const result = await picker.getFilteredPokemon([]);
            expect(result).to.exist;
        });

        it('should filter evolved of pokemon', async function () {
            const options = {
                evolved: true
            };

            const result = await picker.getFilteredPokemon(options);
            _.forEach(result, (poke) => expect(poke.evolveTo).to.be.undefined);
        });

        it('should filter type of pokemon', async function () {
            const options = {
                type: 'fire'
            };

            const result = await picker.getFilteredPokemon(options);
            _.forEach(result, (poke) => expect(poke.type).to.include(options.type));
        });

        it('should filter fire pokemon', async function () {
            const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
            const options = {
                type: 'fire'
            };

            const result = await picker.getFilteredPokemon(options);
            const names = result.map(r => r.name);
            _.forEach(pokemon, (poke) => expect(names).to.include(poke));
            expect(names.length).to.be.eq(pokemon.length);
        });

        it('should filter super effective against fire', async function () {
            const types = ['water', 'ground', 'rock'];
            const options = {
                superEffective: 'fire'
            };

            const result = await picker.getFilteredPokemon(options);
            _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
        });
    });

    describe('pickRandomPokemon', async function () {
        it('should return expected number of pokemon', async function () {
            const options = {
                number: chance.integer({ min: 1, max: 1000 })
            };

            const result = await picker.pickRandomPokemon(options);
            expect(result.length).to.be.eq(options.number);
        });

        it('should return unique pokemon', async function () {
            const options = {
                number: 6,
                unique: true
            };

            const result = await picker.pickRandomPokemon(options);
            const counts = result.reduce((acc, poke) => {
                if (!acc[poke.name]) {
                    acc[poke.name] = 1;
                } else {
                    acc[poke.name]++;
                }
                return acc;
            }, {});
            _.forEach(counts, (value, key) => {
                expect(value).to.be.eq(1);
            });
        });
    });
});
