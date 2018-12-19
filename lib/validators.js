'use strict';

const _ = require('lodash');
const data = require('./data');
const fsp = require('fs').promises;
const fs = require('fs');

exports.booleanValidator = async (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (value === true || value === false) {
        return value;
    } else {
        throw Error(`${optionName} option must be a boolean. Received: ` + value);
    }
};

exports.positiveIntegerValidator = async (optionName, value) => {
    const parsed = Number(value);
    const isInteger = !!value && !isNaN(value) && Number.isInteger(parsed);
    
    if (value === undefined || value === null) {
        return null;
    } else if (isInteger) {
        return parsed;
    } else {
        throw Error(`${optionName} option must be a positive integer. Received: ` + value);
    }
};

exports.stringValidator = async (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (_.isString(value)) {
        return value;
    } else {
        throw Error(`${optionName} option must be a string. Received: ` + value);
    }
};

exports.typeValidator = async (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (_.isString(value)) {
        const lower = value.trim().toLowerCase();
        const types = await data.getTypes();
        const type = Object.keys(types).find(t => lower === t);
        if (type) {
            return type;
        } else {
            throw Error(`${optionName} option must be a valid type. Received: ` + value);
        }
    } else {
        throw Error(`${optionName} option must be a valid type. Received: ` + value);
    }
};

exports.fileValidator = async (optionName, value) => {
    if (value === undefined || value === null) {
        return null;
    } else if (_.isString(value)) {
        const fileExists = fs.existsSync(value);
        if (fileExists) {
            const optionsString = await fsp.readFile(value, 'utf8');
            const options = JSON.parse(optionsString);
            return options;
        } else {
            throw Error(`File doesn't exist. Received: ` + value);
        }
    } else {
        throw Error(`${optionName} option must be a string. Received: ` + value);
    }
};
