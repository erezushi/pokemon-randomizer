module.exports = {
    extends: [
        'airbnb-typescript',
        'plugin:promise/recommended',
        'plugin:mocha/recommended',
        'plugin:import/recommended'
    ],
    plugins: [
        'promise',
        'mocha',
        'import',
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
        'max-len': ['error', 100],
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        'linebreak-style': 0,
        'func-names': 0,
        'arrow-body-style': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        "prefer-arrow-callback": 0,
        "mocha/prefer-arrow-callback": 2,
        '@typescript-eslint/no-use-before-define': ['error', { variables: true, functions: false }],
    },
};