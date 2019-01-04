'ust strict';

const picker = require('../lib/picker');
const expect = require('chai').expect;
const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

describe('picker', async function () {
    describe('getFilteredPokemon', async function () {
        it('should handle empty object options', async function () {
            const result = await picker.getFilteredPokemon({});
            expect(result).to.exist;
        });

        it('should handle null options', async function () {
            const result = await picker.getFilteredPokemon(null);
            expect(result).to.exist;
        });

        it('should handle undefined options', async function () {
            const result = await picker.getFilteredPokemon(undefined);
            expect(result).to.exist;
        });

        it('should handle empty array options', async function () {
            const result = await picker.getFilteredPokemon([]);
            expect(result).to.exist;
        });

        it('should filter evolved of pokemon', async function () {
            const options = {
                evolved: true
            };

            const result = await picker.getFilteredPokemon(options);
            _.forEach(result, (poke) => expect(poke.evolveTo).to.be.undefined);
        });

        describe('types', async function () {
            it('should filter type of pokemon', async function () {
                const options = {
                    type: 'fire'
                };
    
                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(poke.type).to.include(options.type));
            });

            it('should filter normal pokemon', async function () {
                const pokemon = ['Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
                    'Spearow', 'Fearow', 'Jigglypuff', 'Wigglytuff', 'Meowth', 'Persian', 'Farfetch\'d',
                    'Doduo', 'Dodrio', 'Lickitung', 'Chansey', 'Kangaskhan', 'Tauros', 'Ditto', 'Eevee',
                    'Porygon', 'Snorlax'];
                const options = {
                    type: 'normal'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter fire pokemon', async function () {
                const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'fire'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter fighting pokemon', async function () {
                const pokemon = ['Mankey', 'Primeape', 'Poliwrath', 'Machop', 'Machoke',
                    'Machamp', 'Hitmonlee', 'Hitmonchan'];
                const options = {
                    type: 'fighting'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter water pokemon', async function () {
                const pokemon = ['Squirtle', 'Wartortle', 'Blastoise', 'Psyduck', 'Golduck',
                    'Poliwag', 'Poliwhirl', 'Poliwrath', 'Tentacool', 'Tentacruel', 'Slowpoke',
                    'Slowbro', 'Seel', 'Dewgong', 'Shellder', 'Cloyster', 'Krabby', 'Kingler',
                    'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Magikarp',
                    'Gyarados', 'Lapras', 'Vaporeon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops'];
                const options = {
                    type: 'water'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter flying pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'flying'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter grass pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'grass'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter poison pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'poison'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter electric pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'electric'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter ground pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'ground'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter psychic pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'psychic'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter rock pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'rock'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter ice pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'ice'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter bug pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'bug'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter dragon pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'dragon'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter ghost pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'ghost'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter dark pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'dark'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter steel pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'steel'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });

            it('should filter fairy pokemon', async function () {
                //const pokemon = ['Charmander', 'Charmeleon', 'Charizard', 'Vulpix', 'Ninetales',
                //    'Growlithe', 'Arcanine', 'Ponyta', 'Rapidash', 'Magmar', 'Flareon', 'Moltres'];
                const options = {
                    type: 'fairy'
                };
    
                const result = await picker.getFilteredPokemon(options);
                const names = result.map(r => r.name);
                _.forEach(pokemon, (poke) => expect(names).to.include(poke));
                expect(names.length).to.be.eq(pokemon.length);
            });
        });

        describe('superEffective', async function () {
            it('should filter super effective against normal', async function () {
                const types = ['fighting'];
                const options = {
                    superEffective: 'normal'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });

            it('should filter super effective against fire', async function () {
                const types = ['water', 'ground', 'rock'];
                const options = {
                    superEffective: 'fire'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });

            it('should filter super effective against fighting', async function () {
                const types = ['psychic', 'flying', 'fairy'];
                const options = {
                    superEffective: 'fighting'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });

            it('should filter super effective against water', async function () {
                const types = ['grass', 'electric'];
                const options = {
                    superEffective: 'water'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });

            it('should filter super effective against flying', async function () {
                const types = ['rock', 'electric', 'ice'];
                const options = {
                    superEffective: 'flying'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against grass', async function () {
                const types = ['flying', 'poison', 'bug', 'fire', 'ice'];
                const options = {
                    superEffective: 'grass'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against poison', async function () {
                const types = ['ground', 'psychic'];
                const options = {
                    superEffective: 'poison'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against electric', async function () {
                const types = ['ground'];
                const options = {
                    superEffective: 'electric'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against ground', async function () {
                const types = ['water', 'grass', 'ice'];
                const options = {
                    superEffective: 'ground'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against psychic', async function () {
                const types = ['bug', 'ghost', 'dark'];
                const options = {
                    superEffective: 'psychic'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against rock', async function () {
                const types = ['fighting', 'ground', 'steel', 'water', 'grass'];
                const options = {
                    superEffective: 'rock'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against ice', async function () {
                const types = ['fighting', 'rock', 'steel', 'fire'];
                const options = {
                    superEffective: 'ice'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against bug', async function () {
                const types = ['flying', 'fire', 'rock'];
                const options = {
                    superEffective: 'bug'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against dragon', async function () {
                const types = ['dragon', 'ice', 'fairy'];
                const options = {
                    superEffective: 'dragon'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against ghost', async function () {
                const types = ['ghost', 'dark'];
                const options = {
                    superEffective: 'ghost'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against dark', async function () {
                const types = ['fighting', 'bug', 'fairy'];
                const options = {
                    superEffective: 'dark'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against steel', async function () {
                const types = ['fighting', 'ground', 'fire'];
                const options = {
                    superEffective: 'steel'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
            
            it('should filter super effective against fairy', async function () {
                const types = ['poison', 'steel'];
                const options = {
                    superEffective: 'fairy'
                };

                const result = await picker.getFilteredPokemon(options);
                _.forEach(result, (poke) => expect(_.intersection(poke.type.split(' '), types).length).to.be.above(0));
            });
        });
    });

    describe('pickRandomPokemon', async function () {
        it('should return expected number of pokemon', async function () {
            const options = {
                number: chance.integer({ min: 1, max: 1000 })
            };

            const result = await picker.pickRandomPokemon(options);
            expect(result.length).to.be.eq(options.number);
        });

        it('should return unique pokemon', async function () {
            const options = {
                number: 6,
                unique: true
            };

            const result = await picker.pickRandomPokemon(options);
            const counts = result.reduce((acc, poke) => {
                if (!acc[poke.name]) {
                    acc[poke.name] = 1;
                } else {
                    acc[poke.name]++;
                }
                return acc;
            }, {});
            _.forEach(counts, (value, key) => {
                expect(value).to.be.eq(1);
            });
        });
    });
});
