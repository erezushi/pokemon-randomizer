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
                const options = input.getOptions({ number });
                expect(options.number).to.eq(number);
            });
    
            it('should choose default if given undefined', async function () {
                const number = undefined;
                const options = input.getOptions({ number });
                expect(options.number).to.eq(numberOption.default);
            });

            it('should choose default if given null', async function () {
                const number = null;
                const options = input.getOptions({ number });
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
                const options = input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolved);
            });
    
            it('should accept false', async function () {
                const evolved = false;
                const options = input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolved);
            });

            it('should use default for null', async function () {
                const evolved = null;
                const options = input.getOptions({ evolved });
                expect(options.evolved).to.eq(evolvedOption.default);
            });

            it('should use default for undefined', async function () {
                const evolved = undefined;
                const options = input.getOptions({ evolved });
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
    });
});
