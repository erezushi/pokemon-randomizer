Pokémon Randomizer - By Dylan Stankievech
=========================================
*Edits by Erez Bracha, [original library here](https://www.npmjs.com/package/pokemon-randomizer)*

This is a simple library to generate random teams of Pokémon.

For an interactive UI based on this package, [click here](https://react-pokemon-generator.vercel.app/)

***

Options:

* number: Number of random Pokémon to generate **DEFAULT: 6**
* baby: Choose only baby Pokémon (Pokémon released in a generation later than their evolution) **DEFAULT: false**
* basic: Choose only basic form Pokémon (lowest evolution stage excluding babies) **DEFAULT: false**
* evolved: Choose only fully evolved Pokémon **DEFAULT: false**
* type: Choose only Pokémon of this type **DEFAULT: undefined *(all types)***
* randomType: Choose only Pokémon of a random type **DEFAULT: false**
* superEffective: Choose only Pokémon super effective against this type **DEFAULT: undefined *(none)***
* unique: Choose unique Pokémon **DEFAULT: false**
* starter: Choose only starter Pokémon **DEFAULT: false**
* legendary: Choose only legendary and mythical Pokémon (legendary is a contraversial term) **DEFAULT: false**
* mythical: Choose only mythical Pokémon **DEFAULT: false**
* forms: Include alternate forms of Pokémon in results **DEFAULT: false**
* generations: Choose Pokémon only from the specified generations  **DEFAULT: undefined *(all gens)***

*Please note that some options are supposed to be mutually exclusive:*
* *Setting baby to true together with either basic and/or evolved would return no results*
* *Setting starter to true together with either legendary and/or mythical would return no results*
* *Setting both legendary and mythical to true is the same as just setting mythical to true*
* *Random type option won't work if you've set the type option*

***

Returned fields:

* name: The name of the Pokémon.
* type: The type[s] of the Pokémon.
* dexNo: The national Pokédex number of the Pokémon.
* evolveTo: The national Pokédex number[s] of the Pokémon this Pokémon evolves to (where applicable).
* starter: states that this Pokémon is a starter (will wither be true or won't exist).
* legendary: states that this Pokémon is a legendary Pokémon (will wither be true or won't exist).
* mythical: states that this Pokémon is a mythical Pokémon (will wither be true or won't exist).
* basic: states that this Pokémon is a basic stage Pokémon (will wither be true or won't exist).
* forms: an object array with different forms of the Pokémon (where applicable). Form object contains the fields name, type and evolveTo (function the same as these fields above).

***

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

