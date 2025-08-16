export class TrainerPokemon {
  name: string;
  moves: string[] = [];
  ability?: string;
  item?: string;
  level: number;
  isRevealed = false;
  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }

  static fromString(pokemonString: string): TrainerPokemon {
    // Match name, optional item, and level
    const nameItemLevelMatch = pokemonString.match(
      /^([\p{L}\p{N}\-.: '@’♀♂]+?)(?:@(.+?))? Lv(\d+)/u
    );
    if (!nameItemLevelMatch) {
      throw new Error('Invalid Pokémon line: ' + pokemonString);
    }

    const name = nameItemLevelMatch[1].trim();
    const item = nameItemLevelMatch[2]?.trim() || undefined;
    const level = parseInt(nameItemLevelMatch[3]);

    // Match ability (optional)
    const abilityMatch = pokemonString.match(/Ability:\s*(.*?)\s*-/);
    const ability = abilityMatch?.[1]?.trim() || undefined;

    // Match moves (optional)
    const lastDashIndex = pokemonString.lastIndexOf(' - ');
    const movesSegment =
      lastDashIndex !== -1 ? pokemonString.slice(lastDashIndex + 3) : '';
    const moves = movesSegment
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    let res = new TrainerPokemon(name, level);
    res.ability = ability;
    res.item = item;
    res.moves = moves;

    return res;
  }

  static loadFromJson(ob: any): TrainerPokemon {
    if(!ob.name || !ob.level) {
      throw new Error("Couldn't load Pokemon" + ob)
    }
    let tp =  new TrainerPokemon(ob.name, ob.level);
    tp.ability = ob?.ability;
    tp.moves = ob?.moves ?? [];
    tp.item = ob?.item;
    tp.isRevealed = ob?.isRevealed ?? false;
    return tp;
  }
}

export class Trainer {
  name: string = '';
  class?: string;
  oldName?: string;
  Pokes: TrainerPokemon[] = [];
  constructor() {}

  contains(mon_name: string): boolean {
    return this.Pokes.some((poke) => (poke.name = mon_name));
  }

  static fromString(trainerString: string): Trainer {
    //TODO: 2 Cases, one multiline, one single line
    let res = new Trainer();

    if (trainerString.indexOf('\r\n') >= 0) {
      //Block string (includes moveset)
      const lines = trainerString.trim().split('\r\n');

      // Extract trainer names
      const trainerHeader = lines[0];
      const trainerMatch = trainerHeader.match(/\(([^()=]+)(?: => ([^)]+))?\)/);
      if (!trainerMatch) {
        throw new Error('Invalid Trainer Name' + trainerHeader);
      }
      const oldName = trainerMatch?.[1].trim();
      const newName = trainerMatch?.[2]?.trim() || undefined;

      // Parse Pokémon lines
      const pokemonLines = lines.slice(1);
      const pokemonList = pokemonLines.map((line) => {
        return TrainerPokemon.fromString(line);
      });

      res.name = newName ? newName : oldName;
      res.oldName = oldName;
      res.Pokes = pokemonList;
    } else {
      //Line string (does not include ability or moveset)
      const trainerMatch = trainerString.match(/\(([^()=]+)(?: => ([^)]+))?\)/);
      if (!trainerMatch) {
        throw new Error('Invalid Trainer Name' + trainerString);
      }
      const oldName = trainerMatch?.[1].trim();
      const newName = trainerMatch?.[2]?.trim() || undefined;

      // Extract Pokémon segment
      const splitIndex = trainerString.indexOf(' - ');
      const pokemonSegment =
        splitIndex !== -1 ? trainerString.slice(splitIndex + 3) : '';
      const pokemonStrings = pokemonSegment
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const pokemonList = pokemonStrings.map((str) => {
        return TrainerPokemon.fromString(str);
      });

      res.name = newName ? newName : oldName;
      res.oldName = oldName;
      res.Pokes = pokemonList;
    }
    return res;
  }

  static loadFromJson(ob: any): Trainer {
    // throw new Error('Method not implemented.');
    let res = new Trainer();
    res.name = ob?.name ?? '';
    res.class = ob?.class;
    res.oldName = ob?.oldName;
    res.Pokes =
      ob?.Pokes.map((tp: any) => {
        return TrainerPokemon.loadFromJson(tp);
      }) ?? [];
    return res;
  }
}
