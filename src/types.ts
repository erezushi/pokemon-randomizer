export type Types =
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

export interface Form {
    name: string,
    type: string,
    evolveTo?: string,
}

export interface Pokemon {
    name: string,
    type: string,
    dexNo?: string,
    evolveTo?: string,
    starter?: boolean,
    legendary?: boolean,
    mythical?: boolean,
    basic?: boolean,
    forms?: Form[],
}

export interface PokemonMap {
    [id: string]: Pokemon,
}

export interface Type {
    superEffective: string,
    notEffective: string,
    vulnerable: string,
    resists: string,
    immune: string,
}

export interface TypeMap {
    [name: string]: Type
}

export interface Options {
    number: number,
    baby?: boolean,
    basic?:boolean,
    evolved?: boolean,
    unique?: boolean,
    randomType?: boolean,
    type?: Types,
    superEffective?: Types,
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

export interface GenerationMap {
    [number: string]: Generation
}
