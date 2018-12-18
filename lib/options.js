'use strict';

const data = require('./data');
const _ = require('lodash');

exports.ALL_OPTIONS = [
    {
        short: 'n',
        long: 'number',
        type: '<n>',
        description: 'Number of Pokemon',
        validator: (value) => {
            const parsed = Number(value);
            const isInteger = !!value && !isNaN(value) && Number.isInteger(parsed);
            
            if (value === undefined || value === null) {
                return null;
            } else if (isInteger) {
                return parsed;
            } else {
                throw Error('Number option must be a positive integer. Received: ' + value);
            }
        },
        default: 6,
    },
    {
        short: 'e',
        long: 'evolved',
        description: 'Only fully evolved Pokemon',
        validator: (value) => {
            if (value === undefined || value === null) {
                return null;
            } else if (value === true || value === false) {
                return value;
            } else {
                throw Error('Evolved option must be a boolean. Received: ' + value);
            }
        },
        default: false,
    },
    {
        short: 't',
        long: 'type',
        type: '[type]',
        description: 'Only Pokemon of this type',
        validator: async (value) => {
            if (value === undefined || value === null) {
                return null;
            } else if (_.isString(value)) {
                const lower = value.trim().toLowerCase();
                const types = await data.getTypes();
                const type = Object.keys(types).find(t => lower === t);
                if (type) {
                    return type;
                } else {
                    throw Error('Type option must be a valid type. Received: ' + value);
                }
            } else {
                throw Error('Type option must be a valid type. Received: ' + value);
            }
        },
        default: '',
    }
];
