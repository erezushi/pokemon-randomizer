
const packageJson = require('./package.json');
const program = require('commander');
const fsp = require('fs').promises;
const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

let allPokemon = {};

/**
 * Ideas for options:
 * -r: allow repeated pokemon?
 * -g: gens to pick from? list?
 * -e: evolved forms only?
 * -b: babies / first form only?
 * -l: level? range? list of ranges?
 * -t: type list?
 * -s: super effective against?
 * -b: sort by best stats?
 * -m: include randomized moves? attacking vs non-attacking?
 * -n: include nature?
 * -i: include IVs?
 * -ev: include EVs?
 * -s: include shiny chance?
 * -u: all unique? unique types?
 * -f: parse options from file
 * -v: verbose?
 * -h: help?
 * -o: output to file?
 * -p: format output somehow?
 * use prompt?? spinner??
 */
const allOptions = [
    {
        short: 'n',
        long: 'number',
        type: '<n>',
        description: 'Number of Pokemon',
        default: 6,
    },
];

const pokemonFile = 'pokemon.json';
loadPokemon()
    .then(handleInput)
    .catch((err) => {
        console.error('errored at top level!');
        console.error(err);
        process.exit(-1);
    });

async function loadPokemon () {
    const pokemonString = await fsp.readFile(pokemonFile, 'utf8');
    allPokemon = JSON.parse(pokemonString);
}

async function handleInput () {
    try {
        const parsedOptions = await parseInput();
        return await pickRandomPokemon(parsedOptions);
    } catch (err) {
        console.error('error trying to handle input');
        console.error(err);
        process.exit(-1);
    }
}

async function parseInput () {
    program.version(packageJson.version);
    allOptions.map(o => program.option(`-${o.short} --${o.long} ${o.type}`, o.description));
    program.parse(process.argv);

    return getOptions(program);
}

async function getOptions (program) {
    let options = {};
    allOptions.map(o => {
        if (program[o.long]) {
            options[o.long] = program[o.long];
        } else {
            options[o.long] = o.default;
        }
    });
    return options;
}

async function pickRandomPokemon (options) {
    const pokemonKeys = Object.keys(allPokemon);
    const numPokemon = pokemonKeys.length;
    let chosenPokemon = [];
    console.log('picking', options.number, 'random pokemon');
    _.times(options.number, () => {
        const randomNum = chance.integer({ min: 0, max: numPokemon - 1 });
        const randomKey = pokemonKeys[randomNum];
        const randomPokemon = allPokemon[randomKey];
        console.log('chose', randomPokemon.name);
        chosenPokemon.push(randomPokemon);
    });
}
