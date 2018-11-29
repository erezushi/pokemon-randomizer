
const package = require('./package.json');
const program = require('commander');
const fsp = require('fs').promises;

let pokemon = {};
const pokemonFile = 'pokemon.json';
loadPokemon()
    .then(() => {
        console.log('loaded pokemon');
    })
    .catch((err) => {
        console.error('errored at top level!');
        console.error(err);
        process.exit(-1);
    });

async function loadPokemon() {
    try {
        const pokemonString = await fsp.readFile(pokemonFile, 'utf8');
        pokemon = JSON.parse(pokemonString);
    } catch (error) {
        console.error('failed to read', pokemonFile);
        console.error(error);
        process.exit(-1);
    }
}

async function parseInput() {
    program
    .version(package.version)
    .option('-n --number <n>', 'Number of Pokemon')
    .parse(process.argv);
}
