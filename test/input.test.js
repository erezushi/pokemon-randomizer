'ust strict';

const input = require('../lib/input');
const expect = require('chai').expect;
const allOptions = require('../lib/options');
const Chance = require('chance');
const chance = new Chance();

describe('input', async function () {
    describe('getOptions', async function () {
        describe('number', async function () {
            const numberOption = allOptions.ALL_OPTIONS.find(o => o.long === 'number');
            const getErrorText = (value) => 'Number option must be a positive integer. Received: ' + value;

            it('should accept a positive integer', async function () {
                const number = chance.natural();
                const options = await input.getOptions({ number });
                expect(options.number).to.eq(number);
            });
    
            it('should choose default if given undefined', async function () {
                const number = undefined;
                const options = await input.getOptions({ number });
                expect(options.number).to.eq(numberOption.default);
            });

            it('should choose default if given null', async function () {
                const number = null;
                const options = await input.getOptions({ number });
                expect(options.number).to.eq(numberOption.default);
            });

            it('should throw error if given false', async function () {
                const number = false;
                try {
                    await input.getOptions({ number });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(number));
                }
            });

            it('should throw error if given negative integer', async function () {
                const number = ({ min: Number.MIN_SAFE_INTEGER, max: -1 });
                try {
                    await input.getOptions({ number });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(number));
                }
            });

            it('should throw error if given non-number', async function () {
                const number = chance.string();
                try {
                    await input.getOptions({ number });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(number));
                }
            });

            it('should throw error if given non integer number', async function () {
                const number = chance.floating();
                try {
                    await input.getOptions({ number });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(number));
                }
            });
        });

        describe('evolved', async function () {
            const evolvedOption = allOptions.ALL_OPTIONS.find(o => o.long === 'evolved');
            const getErrorText = (value) => 'Evolved option must be a boolean. Received: ' + value;

            it('should accept true', async function () {
                const evolved = true;
                const options = await input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolved);
            });
    
            it('should accept false', async function () {
                const evolved = false;
                const options = await input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolved);
            });

            it('should use default for null', async function () {
                const evolved = null;
                const options = await input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolvedOption.default);
            });

            it('should use default for undefined', async function () {
                const evolved = undefined;
                const options = await input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolvedOption.default);
            });

            it('should throw error if given a number', async function () {
                const evolved = chance.integer();
                try {
                    await input.getOptions({ evolved });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(evolved));
                }
            });

            it('should throw error if given a string', async function () {
                const evolved = chance.string();
                try {
                    await input.getOptions({ evolved });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(evolved));
                }
            });
        });

        describe('type', async function () {
            const typeOption = allOptions.ALL_OPTIONS.find(o => o.long === 'type');
            const getErrorText = (value) => 'Type option must be a valid type. Received: ' + value;

            it('should accept valid types', async function () {
                const types = ['normal', 'fire', 'fighting', 'water', 'flying', 'grass',
                    'poison', 'electric', 'ground', 'psychic', 'rock', 'ice', 'bug',
                    'dragon', 'ghost', 'dark', 'steel', 'fairy'];
                return types.forEach(async type => {
                    const options = await input.getOptions({ type });
                    expect(options.type).to.eq(type);
                });
            });

            it('should allow uppercase', async function () {
                const type = 'DraGOn';
                const options = await input.getOptions({ type });
                expect(options.type).to.eq(type.toLowerCase());
            });

            it('should allow whitespace', async function () {
                const type = '          ghost                   ';
                const options = await input.getOptions({ type });
                expect(options.type).to.eq(type.trim());
            });

            it('should use default for null', async function () {
                const type = null;
                const options = await input.getOptions({ type });
                expect(options.type).to.eq(typeOption.default);
            });

            it('should use default for undefined', async function () {
                const type = undefined;
                const options = await input.getOptions({ type });
                expect(options.type).to.eq(typeOption.default);
            });

            it('should throw error if given a number', async function () {
                const type = chance.integer();
                try {
                    await input.getOptions({ type });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(type));
                }
            });

            it('should throw error if given an invalid type', async function () {
                const type = chance.string();
                try {
                    await input.getOptions({ type });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(type));
                }
            });
        });

        describe('unique', async function () {
            const uniqueOption = allOptions.ALL_OPTIONS.find(o => o.long === 'unique');
            const getErrorText = (value) => 'Unique option must be a boolean. Received: ' + value;

            it('should accept true', async function () {
                const unique = true;
                const options = await input.getOptions({ unique });
                expect(options.unique).to.eq(unique);
            });
    
            it('should accept false', async function () {
                const unique = false;
                const options = await input.getOptions({ unique });
                expect(options.unique).to.eq(unique);
            });

            it('should use default for null', async function () {
                const unique = null;
                const options = await input.getOptions({ unique });
                expect(options.unique).to.eq(uniqueOption.default);
            });

            it('should use default for undefined', async function () {
                const unique = undefined;
                const options = await input.getOptions({ unique });
                expect(options.unique).to.eq(uniqueOption.default);
            });

            it('should throw error if given a number', async function () {
                const unique = chance.integer();
                try {
                    await input.getOptions({ unique });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(unique));
                }
            });

            it('should throw error if given a string', async function () {
                const unique = chance.string();
                try {
                    await input.getOptions({ unique });
                    throw new Error(`Didn't throw!`);
                } catch (err) {
                    expect(err.message).to.be.eq(getErrorText(unique));
                }
            });
        });
    });
});
