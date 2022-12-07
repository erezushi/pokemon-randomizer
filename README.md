Pokémon Randomizer - By Dylan Stankievech
=========================================
*Edits by Erez Bracha, [original library here](https://www.npmjs.com/package/pokemon-randomizer)*

This is a simple library to generate random teams of Pokémon.

For an interactive UI based on this package, [click here](https://react-pokemon-generator.vercel.app/)

***

**Options**:

| Option | Type | Description | Default | Notes |
|:---:|:---:|:---:|:---:|:---:|
| number | number | Number of random Pokémon to generate | 6 | integer > 0 |
| baby | boolean | Choose only baby Pokémon (species released in a later generation than their evolutions) | false |  |
| basic | boolean | Choose only basic Pokémon (lowest evolution stage excluding babies) | false |  |
| evolved | boolean | Choose only fully evolved Pokémon | false |  |
| type | string | Choose only Pokémon of this type |  | enter a single type's name in lowercase |
| randomType | boolean | Choose only Pokémon of a random type | false |  |
| superEffective | string | Choose only Pokémon super effective against this type |  | enter a single type's name in lowercase |
| unique | boolean | Choose no duplicate Pokémon | false |  |
| starter | boolean | Choose only Pokémon from the starter lines | false |  |
| legendary | boolean | Choose only Legendary and Mythical Pokémon (Legendary can be a controversial term) | false |  |
| mythical | boolean | Choose only Mythical Pokémon | false |  |
| forms | boolean | Include alternate forms of Pokémon in the results | false |  |
| generations | string[] | Choose Pokémon only from the specified generations |  | Example: ['1', '2', '4', '6'] |

*Please note that some options are supposed to be mutually exclusive:*
* *Setting baby to true together with either basic and/or evolved would return no results*
* *Setting starter to true together with either legendary and/or mythical would return no results*
* *Setting both legendary and mythical to true is the same as just setting mythical to true*
* *Random type option won't work if you've set the type option*

***

**Returned fields**:

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

**Examples**:

    import RandomPokemon from '@erezushi/pokemon-randomizer';

    // Chooses 6 random Pokémon
    const result = RandomPokemon();
    // result = [
    //     { name: 'Pikachu' ... },
    //     { name: 'Mewtwo' ... },
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
    //     { name: 'Blastoise' ... },
    //     { name: 'Golem' ... },
    //     { name: 'Omastar' ...},
    // ]

