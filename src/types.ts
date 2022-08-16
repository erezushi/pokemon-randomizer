type PokemonType =
    'bug'
    | 'dark'
    | 'dragon'
    | 'electric'
    | 'fairy'
    | 'fighting'
    | 'fire'
    | 'flying'
    | 'ghost'
    | 'grass'
    | 'ground'
    | 'ice'
    | 'normal'
    | 'poison'
    | 'psychic'
    | 'rock'
    | 'steel'
    | 'water';

export type SpecieType = PokemonType | `${PokemonType} ${PokemonType}` | 'bird normal';

export interface Form {
    name: string,
    type: SpecieType,
    evolveTo?: string,
}

export interface ListPokemon {
    name: string,
    type: SpecieType,
    evolveTo?: string,
    starter?: true,
    legendary?: true,
    mythical?: true,
    basic?: true,
    forms?: Form[],
}

export interface Pokemon extends ListPokemon {
    dexNo: string,
}

export type PokemonMap = Record<string, ListPokemon>;

export interface Type {
    superEffective: string,
    notEffective: string,
    vulnerable: string,
    resists: string,
    immune: string,
}

export type TypeMap = Record<string, Type>;

export interface Options {
    number: number,
    baby?: boolean,
    basic?:boolean,
    evolved?: boolean,
    unique?: boolean,
    randomType?: boolean,
    type?: PokemonType,
    superEffective?: PokemonType,
    starter?: boolean,
    legendary?: boolean,
    mythical?: boolean,
    forms?: boolean,
    generations?: string[],
}

export interface Generation {
    first: number,
    last: number,
}

export type GenerationMap = Record<string, Generation>;
