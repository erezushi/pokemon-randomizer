'use strict';

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
        description: 'Return only fully evolved Pokemon',
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
    }
];
