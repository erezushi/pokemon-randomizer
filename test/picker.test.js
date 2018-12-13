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
    });

    describe('pickRandomPokemon', async function () {
        it('should return expected number of pokemon', async function () {
            const options = {
                number: chance.integer({ min: 1, max: 1000 })
            };

            const result = await picker.pickRandomPokemon(options);
            expect(result.length).to.be.eq(options.number);
        });
    });
});
