export interface Pokemon {
    name: string,
    attack: number,
    defense: number,
    evolveLevel: number,
    evolveTo: string,
    type: string,
    moves: string[],
};

export interface PokemonMap {
    [id: string]: Pokemon,
};

export interface Type {
    superEffective: string,
    notEffective: string,
    vulnerable: string,
    resists: string,
    immune: string,
};

export interface TypeMap {
    [name: string]: Type
};

export interface Options {
    number: number,
    evolved?: boolean,
    unique?: boolean,
    randomType?: boolean,
    type?: string,
    superEffective?: string, // TODO: type for allowable strings
};
