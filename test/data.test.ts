// @ts-nocheck TODO: remove these no-checks
'ust strict';

import * as data from '../src/data';
import { expect } from 'chai';
import Chance from 'chance';
import _ from 'lodash';
import proxyquire from 'proxyquire';

const chance = new Chance();

describe('data', async function () {
    let fakeData;
    let fileContents;

    beforeEach(async function () {
        fakeData = proxyquire('../src/data', {
            'fs': {
                promises: {
                    readFile: async () => fileContents
                }
            }
        });
        fakeData.clearCache();
    });

    describe('stubbed data', async function () {
        describe('getPokemon', async function () {
            it('should parse file JSON', async function () {
                const key = chance.string();
                const value = chance.string();
                fileContents = `{ "${key}": "${value}" }`;
                const results = await fakeData.getPokemon();
                expect(results[`${key}`]).to.be.eq(value);
            });
    
            it('should return cached version', async function () {
                const value1 = chance.string();
                const value2 = chance.string();
                fileContents = `{ "thing": "${value1}" }`;
                await fakeData.getPokemon();
                fileContents = `{ "thing": "${value2}" }`;
                const results = await fakeData.getPokemon();
                expect(results.thing).to.be.eq(value1);
            });
        });
    
        describe('getTypes', async function () {
            it('should parse file JSON', async function () {
                const key = chance.string();
                const value = chance.string();
                fileContents = `{ "${key}": "${value}" }`;
                const results = await fakeData.getTypes();
                expect(results[`${key}`]).to.be.eq(value);
            });
    
            it('should return cached version', async function () {
                const value1 = chance.string();
                const value2 = chance.string();
                fileContents = `{ "thing": "${value1}" }`;
                await fakeData.getTypes();
                fileContents = `{ "thing": "${value2}" }`;
                const results = await fakeData.getTypes();
                expect(results.thing).to.be.eq(value1);
            });
        });

        describe('clearCache', async function () {
            it('should return new file contents', async function () {
                const value1 = chance.string();
                const value2 = chance.string();
                fileContents = `{ "thing": "${value1}" }`;
                await fakeData.getPokemon();
                await fakeData.clearCache();
                fileContents = `{ "thing": "${value2}" }`;
                const results = await fakeData.getPokemon();
                expect(results.thing).to.be.eq(value2);
            });
        });
    });

    describe('real data', async function () {
        beforeEach(async function () {
            data.clearCache();
        });

        describe('getPokemon', async function () {
            it('should return expected number of pokemon', async function () {
                const results = await data.getPokemon();
                expect(Object.keys(results).length).to.be.eq(151);
            });

            it('should return names for all pokemon', async function () {
                const results = await data.getPokemon();
                _.forEach(results, (result, key) => {
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
});
