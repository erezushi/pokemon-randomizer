
const package = require('./package.json');
const program = require('commander');


program
    .version(package.version)
    .option('-n --number <n>', 'Number of Pokemon')
    .parse(process.argv);


console.log('you chose', program.number , 'pokemon');