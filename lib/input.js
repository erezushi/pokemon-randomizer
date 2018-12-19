'use strict';

const packageJson = require('../package.json');
const program = require('commander');
const allOptions = require('./options');

/**
 * Uses commander to parse input using the options from constants
 */
exports.parseInput = async () => {
    program.version(packageJson.version);
    allOptions.ALL_OPTIONS.map(o => program.option(`-${o.short} --${o.long} ${o.type}`, o.description));
    program.parse(process.argv);

    return exports.getOptions(program);
};

exports.handleFileOption = async (options) => {
    let fileOptions = {};
    if (options.file) {
        const option = allOptions.ALL_OPTIONS.find(o => o.long === 'file');

        if (option) {
            fileOptions = await exports.validateOption(options.file, option);
        }
    }

    return fileOptions;
};

/**
 * Returns an object with validated or defaulted options.
 */
exports.getOptions = async (inputOptions) => {
    const fileOptions = await exports.handleFileOption(inputOptions);
    const mergedOptions = Object.assign({}, fileOptions, inputOptions);
    const validatedOptions = {};
    const promises = allOptions.ALL_OPTIONS.map(async option => {
        const name = option.long;
        const inputValue = mergedOptions[name];
        validatedOptions[name] = await exports.validateOption(inputValue, option);
    });

    return Promise.all(promises).then(() => validatedOptions);
};

/**
 * Validates the given input option.
 * Uses the option's validator, and assumes null value means to use the default value.
 */
exports.validateOption = async (inputValue, option) => {
    if (option.validator) {
        const validated = await option.validator(inputValue);
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
