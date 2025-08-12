export class TrainerPokemon {
    name: string;
    moves: string[] = [];
    ability?: string;
    item?: string;
    level: number;
    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}

export class Trainer {
    name: string;
    Pokes: TrainerPokemon [] = [];
    constructor(name: string) {
        this.name = name;
    }
}