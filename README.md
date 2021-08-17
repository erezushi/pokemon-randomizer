Pokémon Randomizer - By Dylan Stankievech
=========================================
Edits made by Erez Bracha

This is a simple library to generate random teams of Pokémon


Options:

* number: number of random Pokémon to generate **DEFAULT: 6**
* baby: choose only baby Pokémon (Pokémon released in a generation later than their evolution) **DEFAULT: false**
* basic: choose only basic form Pokémon (lowest evolution stage excluding babies) **DEFAULT: false**
* evolved: choose only fully evolved Pokémon **DEFAULT: false**
* type: choose only Pokémon of this type **DEFAULT: *all types***
* randomType: choose only Pokémon of a random type **DEFAULT: false**
* superEffective: choose only Pokémon super effective against this type **DEFAULT: *none***
* unique: choose unique Pokémon **DEFAULT: false**
* starter: choose only starter Pokémon **DEFAULT: false**
* legendary: choose only legendary and mythical Pokémon (legendary is a contraversial term) **DEFAULT: false**
* mythical: choose only mythical Pokémon **DEFAULT: false**
* forms: include alternate forms of Pokémon in results **DEFAULT: false**
* generations: choose Pokémon only from the specified generations  **DEFAULT: *all gens***

Examples:

    import RandomPokemon from '@erezushi/pokemon-randomizer';

    // Chooses 6 random Pokémon
    const result = await RandomPokemon();
    // result = [
    //     { name: 'Pikachu' ... },
    //     { name: 'Mewtwo' ... },
    //     ...
    // ]

    // Chooses 3 random, unique, final stage Pokémon, that are super effective against fire
    const fullyEvolved = await RandomPokemon({
        number: 3,
        unique: true,
        evolved: true,
        superEffective: 'fire'
    });
    // fullyEvolved = [
    //     { name: 'Blastoise' ... },
    //     { name: 'Golem' ... },
    //     { name: 'Omastar' ...},
    // ]

