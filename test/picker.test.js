'ust strict';

const picker = require('../lib/picker');
const expect = require('chai').expect;

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
});
