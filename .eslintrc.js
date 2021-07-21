module.exports = {
    extends: [
        'airbnb-typescript',
        'plugin:chai-friendly/recommended',
        'plugin:promise/recommended',
        'plugin:mocha/recommended',
    ],
    plugins: [
        'chai-friendly',
        'promise',
        'mocha',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        commonjs: true,
        node: true,
        mocha: true,
    },
    globals: {
        expect: true,
        chance: true,
    },
    rules: {
        'max-len': ['error', 150],
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        'linebreak-style': 0,
        'func-names': 0,
        'arrow-body-style': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2,
        "prefer-arrow-callback": 0,
        "mocha/prefer-arrow-callback": 2,
        '@typescript-eslint/no-use-before-define': ['error', { variables: true, functions: false }],
    },
};