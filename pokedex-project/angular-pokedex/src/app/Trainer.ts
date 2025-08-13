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
  Pokes: TrainerPokemon[] = [];
  constructor(name: string) {
    this.name = name;
  }

  contains(mon_name: string): boolean {
    return this.Pokes.some((poke) => (poke.name = mon_name));
  }

  
  static loadFromJson(ob: any) {
    throw new Error('Method not implemented.');
  }
}
