# Pokémon Randomizer - By Dylan Stankievech

[![Try @erezushi/pokemon-randomizer on RunKit](https://badge.runkitcdn.com/@erezushi/pokemon-randomizer.svg)](https://npm.runkit.com/@erezushi/pokemon-randomizer)
![NPM](https://img.shields.io/npm/l/@erezushi/pokemon-randomizer?style=plastic)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@erezushi/pokemon-randomizer?color=brightgreen&label=size&style=plastic)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@erezushi/pokemon-randomizer?style=plastic)

*Edits by Erez Bracha, [original library here](https://www.npmjs.com/package/pokemon-randomizer)*

This is a simple library to generate random teams of Pokémon.

For an interactive UI based on this package, [click here](https://react-pokemon-generator.vercel.app/)

**Table of Contents:**
- [Options](#options)
- [Returned Fields](#returned-fields)
- [Non-Default Exports](#non-default-exports)
- [Examples](#examples)

## Options

| Option | Type | Description | Default | Notes |
|:---:|:---:|:---:|:---:|:---:|
| number | number | Number of random Pokémon to generate | 6 | integer > 0 |
| baby | boolean | Choose only baby Pokémon (species released in a later generation than their evolutions) | false |  |
| basic | boolean | Choose only basic Pokémon (lowest evolution stage excluding babies) | false |  |
| evolved | boolean | Choose only fully evolved Pokémon | false |  |
| type | string | Choose only Pokémon of this type | - | enter a single type's name in lowercase |
| randomType | boolean | Choose only Pokémon of a random type | false |  |
| superEffective | string | Choose only Pokémon super effective against this type | - | enter a single type's name in lowercase |
| unique | boolean | Choose no duplicate Pokémon | false |  |
| starter | boolean | Choose only Pokémon from the starter lines | false |  |
| legendary | boolean | Choose only Legendary and Mythical Pokémon (Legendary can be a controversial term) | false |  |
| mythical | boolean | Choose only Mythical Pokémon | false |  |
| forms | boolean | Include alternate forms of Pokémon in the results | false |  |
| generations | string[] | Choose Pokémon only from the specified generations | - | Example: ['1', '2', '4', '6'] |
| customList | string[] | Specify names of Pokémon to choose from | - | Pokémon names must match internal names in all but case. Internal list can be obtained using the exported `getPokemon` function for increased ease.

*Please note that some options are supposed to be mutually exclusive:*
* *Setting `baby` to true together with either `basic` and/or `evolved` would return no results*
* *Setting `starter` to true together with either `legendary` and/or `mythical` would return no results*
* *Setting both `legendary` and `mythical` to true is the same as just setting mythical to true*
* *`randomType` option will be ignored if you've set the `type` option*
* *Setting the `customList` option will cause all options except `number`, `unique` and `forms` to be ignored*

*[return to top](#pokémon-randomizer---by-dylan-stankievech)*

## Returned Fields

* name: The name of the Pokémon.
* type: The type[s] of the Pokémon.
* dexNo: The national Pokédex number of the Pokémon.
* evolveTo: The national Pokédex number[s] of the Pokémon this Pokémon evolves to (where applicable).
* starter: states that this Pokémon is a starter (will wither be true or won't exist).
* legendary: states that this Pokémon is a legendary Pokémon (will wither be true or won't exist).
* mythical: states that this Pokémon is a mythical Pokémon (will wither be true or won't exist).
* basic: states that this Pokémon is a basic stage Pokémon (will wither be true or won't exist).
* forms: an object array with different forms of the Pokémon (where applicable). Form object contains the fields name, type and evolveTo (function the same as these fields above).

*[return to top](#pokémon-randomizer---by-dylan-stankievech)*

## Non-Default Exports

* TypeScript types (all types used in the library are exported):
    * PokemonType: String enum of all 18 types.
    * SpecieType: String enum of all possible typings a Pokémon specie can have.
    * Form: The type of the values in the `forms` field of the Pokémon list.
    * ListPokemon: Object detailing a Pokémon species (Returned Fields without dexNo).
    * Pokemon: The type of the values in the main function's result array.
    * PokemonMap: Record<string, ListPokemon> - The type of the internal Pokémon List.
    * TypeMatchups: Object detailing type matchups of a specific type. 
    * TypeMap: Record<PokemonType, TypeMatchups> - The type of the internal type list.
    * Options: Type of the only parameter of the main function.
    * Generation: Object detailing the first and last indices of a generation.
    * GenerationMap: Record<string, Generation> - The type of the internal generation list.
* Extra functions:
    * getPokemon: () => PokemonMap - Returns the internal Pokémon list
    * getTypes: () => TypeMap - Returns the internal type list
    * getGenerations: () => GenerationMap - Returns the internal Generation list

*[return to top](#pokémon-randomizer---by-dylan-stankievech)*

## Examples

    import RandomPokemon from '@erezushi/pokemon-randomizer';

    // No options - Chooses 6 random Pokémon
    const result = RandomPokemon();
    // result = [
    //     { name: 'Pikachu', ... },
    //     { name: 'Mewtwo', ... },
    //     ...
    // ]

    // Chooses 3 random, unique, final stage Pokémon, that are super effective against fire
    const fullyEvolved = RandomPokemon({
        number: 3,
        unique: true,
        evolved: true,
        superEffective: 'fire'
    });
    // fullyEvolved = [
    //     { name: 'Blastoise', ... },
    //     { name: 'Golem', ... },
    //     { name: 'Omastar', ...},
    // ]

    // Using the customList option
    const customList = [
        "charmander",
        "vulpix",
        "eevee",
        "latias",
        "zorua",
        "fennekin",
        "litten",
        "sprigatito",
    ];

    const customFilter = RandomPokemon({
        number: 3,
        unique: true,
        customList,
    });
    // CustomFilter = [
    //     { name: 'Fennekin' ... },
    //     { name: 'Vulpix' ... },
    //     { name: 'Latias' ... },
    // ]

*[return to top](#pokémon-randomizer---by-dylan-stankievech)*
