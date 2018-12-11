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
        const getErrorText = (value) => 'Number of pokemon to pick must be a positive integer. Received: ' + value;
        it('should return expected number of pokemon', async function () {
            const options = {
                number: chance.integer({ min: 1, max: 1000 })
            };

            const result = await picker.pickRandomPokemon(options);
            expect(result.length).to.be.eq(options.number);
        });

        it('should throw an error for 0 number option', async function () {
            const options = {
                number: 0
            };

            try {
                await picker.pickRandomPokemon(options);
                throw new Error(`Didn't throw!`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(options.number));
            }
        });

        it('should throw an error for negative number option', async function () {
            const options = {
                number: chance.integer({ min: Number.MIN_SAFE_INTEGER, max: -1 })
            };

            try {
                await picker.pickRandomPokemon(options);
                throw new Error(`Didn't throw!`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(options.number));
            }
        });

        it('should throw an error for non-integer number option', async function () {
            const options = {
                number: chance.string()
            };

            try {
                await picker.pickRandomPokemon(options);
                throw new Error(`Didn't throw!`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(options.number));
            }
        });
    });
});
