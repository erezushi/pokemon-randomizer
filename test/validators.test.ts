// @ts-nocheck
'ust strict';

import * as validators from '../src/validators';
import * as constants from '../src/constants';
import * as data from '../src/data';
import { expect } from 'chai';
import Chance from 'chance';
const chance = new Chance();

describe('validators', function () {
    describe('validateOptions', function () {
        it('should assign default number of pokemon', async function () {
            const options = await validators.validateOptions({});
            expect(options.number).to.be.eq(constants.DEFAULT_NUMBER);
        });

        it('should succeed for valid options', async function () {
            const validOptions = {
                number: chance.integer({ min: 1 }),
                unique: chance.bool(),
                randomType: chance.bool(),
                type: 'fire',
                superEffective: 'fire',
                evolved: chance.bool(),
            };
            const options = await validators.validateOptions(validOptions);
            expect(options).to.deep.eq(validOptions);
        });

        it('should be lenient for option types', async function () {
            const validOptions = {
                number: chance.integer({ min: 1 }).toString(),
                unique: chance.bool().toString(),
                randomType: chance.bool().toString(),
                type: '   FIRE           ',
                superEffective: '        WaTeR       ',
                evolved: chance.bool().toString(),
            };
            const options = await validators.validateOptions(validOptions);
            expect(options).to.exist;
        });

        it('should handle no given options', async function () {
            const options = await validators.validateOptions();
            expect(options.number).to.be.eq(constants.DEFAULT_NUMBER);
        });

        it('should handle null options', async function () {
            const options = await validators.validateOptions(null);
            expect(options.number).to.be.eq(constants.DEFAULT_NUMBER);
        });

        it('should handle undefined options', async function () {
            const options = await validators.validateOptions(undefined);
            expect(options.number).to.be.eq(constants.DEFAULT_NUMBER);
        });

        it('should throw an error if options is a bool', async function () {
            try {
                await validators.validateOptions(chance.bool());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Options must be an object. Received: boolean`);
            }
        });

        it('should throw an error if options is an integer', async function () {
            try {
                await validators.validateOptions(chance.integer());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Options must be an object. Received: number`);
            }
        });

        it('should throw an error if options is a string', async function () {
            try {
                await validators.validateOptions(chance.string());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Options must be an object. Received: string`);
            }
        });

        it('should throw error for non integer number', async function () {
            const invalidOptions = {
                number: chance.string()
            };
            try {
                await validators.validateOptions(invalidOptions);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Option number must be a positive integer. Received: ${invalidOptions.number}`);
            }
        });

        it('should throw error for non bool unique', async function () {
            const invalidOptions = {
                unique: chance.string()
            };
            try {
                await validators.validateOptions(invalidOptions);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Option unique must be a boolean. Received: ${invalidOptions.unique}`);
            }
        });

        it('should throw error for non bool randomType', async function () {
            const invalidOptions = {
                randomType: chance.string()
            };
            try {
                await validators.validateOptions(invalidOptions);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Option randomType must be a boolean. Received: ${invalidOptions.randomType}`);
            }
        });

        it('should throw error for non bool evolved', async function () {
            const invalidOptions = {
                evolved: chance.string()
            };
            try {
                await validators.validateOptions(invalidOptions);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Option evolved must be a boolean. Received: ${invalidOptions.evolved}`);
            }
        });

        it('should throw error for non string type', async function () {
            const invalidOptions = {
                type: chance.bool()
            };
            try {
                await validators.validateOptions(invalidOptions);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(`Option type must be a string. Received: ${invalidOptions.type}`);
            }
        });
    });

    describe('validatePokemon', async function () {
        let allTypes;
        let options;
        let pokemon;

        beforeEach(async function () {
            allTypes = await data.getTypes();
            options = {};
            pokemon = {
                type: 'water'
            };
        });

        it('should return false for unevolved pokemon with evolved option', function () {
            options.evolved = true;
            pokemon.evolveTo = '123';
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.false;
        });

        it('should return true for evolved pokemon with evolved option', function () {
            options.evolved = true;
            pokemon.evolveTo = undefined;
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.true;
        });

        it('should return false for wrong type', function () {
            options.type = 'fire';
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.false;
        });

        it('should return true for right type', function () {
            options.type = 'water';
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.true;
        });

        it('should return false for not super effective', function () {
            options.superEffective = 'normal';
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.false;
        });

        it('should return true for super effective', function () {
            options.superEffective = 'rock';
            const isValid = validators.validatePokemon(options, pokemon, allTypes);
            expect(isValid).to.be.true;
        });
    });

    describe('booleanValidator', function () {
        const getErrorText = (value) => 'Option thing must be a boolean. Received: ' + value;
    
        it('should return true', function () {
            const value = true;
            const result = validators.booleanValidator('thing', value);
            expect(result).to.be.true;
        });
    
        it('should return false', function () {
            const value = false;
            const result = validators.booleanValidator('thing', value);
            expect(result).to.be.false;
        });
        
        it('should return null for undefined', function () {
            const value = undefined;
            const result = validators.booleanValidator('thing', value);
            expect(result).to.be.null;
        });
    
        it('should return null for null', function () {
            const value = null;
            const result = validators.booleanValidator('thing', value);
            expect(result).to.be.null;
        });
    
        it('should throw error for non boolean value', function () {
            const value = chance.string();
            try {
                validators.booleanValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });

    describe('isBoolString', function () {
        it('should return true for true string', function () {
            const value = 'true';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });

        it('should return true for capitalized true string', function () {
            const value = 'TRUE';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });

        it('should return true for true string with whitespace', function () {
            const value = '         true            ';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });
    
        it('should return true for false string', function () {
            const value = 'false';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });

        it('should return true for capitalized false string', function () {
            const value = 'FALSE';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });

        it('should return true for false string with whitespace', function () {
            const value = '         false            ';
            const result = validators.isBoolString(value);
            expect(result).to.be.true;
        });

        it('should return false for an integer', function () {
            const value = chance.integer();
            const result = validators.isBoolString(value);
            expect(result).to.be.false;
        });

        it('should return false for null', function () {
            const value = null;
            const result = validators.isBoolString(value);
            expect(result).to.be.false;
        });

        it('should return false for undefined', function () {
            const value = undefined;
            const result = validators.isBoolString(value);
            expect(result).to.be.false;
        });

        it('should return false for a non-bool string', function () {
            const value = chance.string();
            const result = validators.isBoolString(value);
            expect(result).to.be.false;
        });

        it('should return false for an object', function () {
            const value = {};
            const result = validators.isBoolString(value);
            expect(result).to.be.false;
        });
    });

    describe('positiveIntegerValidator', function () {
        const getErrorText = (value) => 'Option thing must be a positive integer. Received: ' + value;
    
        it('should return positive integer', function () {
            const value = chance.integer({ min: 1, max: 99999 });
            const result = validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.eq(value);
        });

        it('should return positive integer for string', function () {
            const value = chance.integer({ min: 1, max: 99999 });
            const result = validators.positiveIntegerValidator('thing', value.toString());
            expect(result).to.be.eq(value);
        });

        it('should return null for undefined', function () {
            const value = undefined;
            const result = validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should return null for null', function () {
            const value = null;
            const result = validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should throw an error for negative integer', function () {
            const value = chance.integer({ min: -99999, max: -1 });
            try {
                validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for negative integer string', function () {
            const value = chance.integer({ min: -99999, max: -1 });
            try {
                validators.positiveIntegerValidator('thing', value.toString());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for zero', function () {
            const value = 0;
            try {
                validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for zero string', function () {
            const value = 0;
            try {
                validators.positiveIntegerValidator('thing', value.toString());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for floats', function () {
            const value = chance.floating();
            try {
                validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for strings', function () {
            const value = chance.string();
            try {
                validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });

    describe('stringValidator', function () {
        const getErrorText = (value) => 'Option thing must be a string. Received: ' + value;
    
        it('should return string', function () {
            const value = 'test';
            const result = validators.stringValidator('thing', value);
            expect(result).to.be.eq(value);
        });

        it('should return lower case', function () {
            const value = 'TEST';
            const result = validators.stringValidator('thing', value);
            expect(result).to.be.eq(value.toLowerCase());
        });

        it('should return trimmed', function () {
            const value = '       test          ';
            const result = validators.stringValidator('thing', value);
            expect(result).to.be.eq(value.trim());
        });

        it('should return null for undefined', function () {
            const value = null;
            const result = validators.stringValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should return null for null', function () {
            const value = null;
            const result = validators.stringValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should throw an error for an integer', function () {
            const value = chance.integer();
            try {
                validators.stringValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for a boolean', function () {
            const value = chance.bool();
            try {
                validators.stringValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });

    describe('typeValidator', function () {
        const getStringErrorText = (value) => 'Option thing must be a string. Received: ' + value;
        const getTypeErrorText = (value) => 'Option thing must be a valid type. Received: ' + value;
    
        it('should return a type', async function () {
            const value = 'fire';
            const result = await validators.typeValidator('thing', value);
            expect(result).to.be.eq(value);
        });

        it('should return lower case', async function () {
            const value = 'FIRE';
            const result = await validators.typeValidator('thing', value);
            expect(result).to.be.eq(value.toLowerCase());
        });

        it('should return trimmed', async function () {
            const value = '       fire          ';
            const result = await validators.typeValidator('thing', value);
            expect(result).to.be.eq(value.trim());
        });

        it('should return null for undefined', async function () {
            const value = null;
            const result = await validators.typeValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should return null for null', async function () {
            const value = null;
            const result = await validators.typeValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should throw an error for an integer', async function () {
            const value = chance.integer();
            try {
                await validators.typeValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getStringErrorText(value));
            }
        });

        it('should throw an error for a boolean', async function () {
            const value = chance.bool();
            try {
                await validators.typeValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getStringErrorText(value));
            }
        });

        it('should throw an error for an invalid string', async function () {
            const value = chance.string();
            try {
                await validators.typeValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getTypeErrorText(value));
            }
        });
    });
});
