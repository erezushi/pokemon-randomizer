'use strict';

const packageJson = require('../package.json');
const program = require('commander');
const constants = require('./constants');

exports.parseInput = () => {
    program.version(packageJson.version);
    constants.ALL_OPTIONS.map(o => program.option(`-${o.short} --${o.long} ${o.type}`, o.description));
    program.parse(process.argv);

    return exports.getOptions(program);
};

exports.getOptions = (program) => {
    let options = {};
    constants.ALL_OPTIONS.map(o => {
        if (program[o.long]) {
            options[o.long] = program[o.long];
        } else {
            options[o.long] = o.default;
        }
    });
    return options;
};
