// @ts-nocheck TODO: remove these no-checks

import { expect } from 'chai';
import _ from 'lodash';
import * as data from '../src/data';

describe('data', function () {
    describe('getPokemon', function () {
        it('should return expected number of pokemon', async function () {
            const results = await data.getPokemon();
            expect(Object.keys(results).length).to.be.eq(151);
        });

        it('should return names for all pokemon', async function () {
            const results = await data.getPokemon();
            _.forEach(results, (result) => {
                expect(result.name).to.exist;
            });
        });

        it('should return pikachu', async function () {
            const results = await data.getPokemon();
            const pikachu = results['25'];
            expect(pikachu).to.exist;
            expect(pikachu.name).to.be.eq('Pikachu');
        });
    });
});
