'use strict';

const packageJson = require('../package.json');
const program = require('commander');
const constants = require('./constants');

/**
 * Uses commander to parse input using the options from constants
 */
exports.parseInput = () => {
    program.version(packageJson.version);
    constants.ALL_OPTIONS.map(o => program.option(`-${o.short} --${o.long} ${o.type}`, o.description));
    program.parse(process.argv);

    return exports.getOptions(program);
};

/**
 * Returns an object with validated or defaulted options.
 */
exports.getOptions = (inputOptions) => {
    let options = {};
    constants.ALL_OPTIONS.map(option => {
        const name = option.long;
        const inputValue = inputOptions[name];
        options[name] = exports.validateOption(inputValue, option);
    });
    return options;
};

/**
 * Validates the given input option.
 * Uses the option's validator, and assumes null value means to use the default value.
 */
exports.validateOption = (inputValue, option) => {
    if (option.validator) {
        const validated = option.validator(inputValue);
        if (validated === null) {
            return option.default;
        } else {
            return validated;
        }
    } else if (inputValue) {
        return inputValue;
    } else {
        return option.default;
    }
};
