'ust strict';

const validators = require('../lib/validators');
const expect = require('chai').expect;
const Chance = require('chance');
const chance = new Chance();

describe('validators', async function () {
    describe('booleanValidator', async function () {
        const getErrorText = (value) => 'Option thing must be a boolean. Received: ' + value;
    
        it('should return true', async function () {
            const value = true;
            const result = await validators.booleanValidator('thing', value);
            expect(result).to.be.true;
        });
    
        it('should return false', async function () {
            const value = false;
            const result = await validators.booleanValidator('thing', value);
            expect(result).to.be.false;
        });
        
        it('should return null for undefined', async function () {
            const value = undefined;
            const result = await validators.booleanValidator('thing', value);
            expect(result).to.be.null;
        });
    
        it('should return null for null', async function () {
            const value = null;
            const result = await validators.booleanValidator('thing', value);
            expect(result).to.be.null;
        });
    
        it('should throw error for non boolean value', async function () {
            const value = chance.string();
            try {
                await validators.booleanValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });

    describe('positiveIntegerValidator', async function () {
        const getErrorText = (value) => 'Option thing must be a positive integer. Received: ' + value;
    
        it('should return positive integer', async function () {
            const value = chance.integer({ min: 1, max: 99999 });
            const result = await validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.eq(value);
        });

        it('should return positive integer for string', async function () {
            const value = chance.integer({ min: 1, max: 99999 });
            const result = await validators.positiveIntegerValidator('thing', value.toString());
            expect(result).to.be.eq(value);
        });

        it('should return null for undefined', async function () {
            const value = undefined;
            const result = await validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should return null for null', async function () {
            const value = null;
            const result = await validators.positiveIntegerValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should throw an error for negative integer', async function () {
            const value = chance.integer({ min: -99999, max: -1 });
            try {
                await validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for negative integer string', async function () {
            const value = chance.integer({ min: -99999, max: -1 });
            try {
                await validators.positiveIntegerValidator('thing', value.toString());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for zero', async function () {
            const value = 0;
            try {
                await validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for zero string', async function () {
            const value = 0;
            try {
                await validators.positiveIntegerValidator('thing', value.toString());
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for floats', async function () {
            const value = chance.floating();
            try {
                await validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for strings', async function () {
            const value = chance.string();
            try {
                await validators.positiveIntegerValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });

    describe('stringValidator', async function () {
        const getErrorText = (value) => 'Option thing must be a string. Received: ' + value;
    
        it('should return string', async function () {
            const value = 'test';
            const result = await validators.stringValidator('thing', value);
            expect(result).to.be.eq(value);
        });

        it('should return lower case', async function () {
            const value = 'TEST';
            const result = await validators.stringValidator('thing', value);
            expect(result).to.be.eq(value.toLowerCase());
        });

        it('should return trimmed', async function () {
            const value = '       test          ';
            const result = await validators.stringValidator('thing', value);
            expect(result).to.be.eq(value.trim());
        });

        it('should return null for undefined', async function () {
            const value = null;
            const result = await validators.stringValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should return null for null', async function () {
            const value = null;
            const result = await validators.stringValidator('thing', value);
            expect(result).to.be.null;
        });

        it('should throw an error for an integer', async function () {
            const value = chance.integer();
            try {
                await validators.stringValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });

        it('should throw an error for a boolean', async function () {
            const value = chance.bool();
            try {
                await validators.stringValidator('thing', value);
                throw new Error(`Didn't throw`);
            } catch (err) {
                expect(err.message).to.be.eq(getErrorText(value));
            }
        });
    });
});
