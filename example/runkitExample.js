// Default export is messed up on requires, import statements can be done normally
const { deafult: randomPokemon } = require('@erezushi/pokemon-randomizer');

const options = {
    number: 3,
    unique: true,
    forms: true,
};

console.log(randomPokemon(options));