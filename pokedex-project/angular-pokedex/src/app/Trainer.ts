export class TrainerPokemon {
  name: string;
  moves: string[] = [];
  ability?: string;
  item?: string;
  level: number;
  ivs: number = 0;
  isRevealed = false;
  isDefeated = false;
  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }

  static fromString(tPokemonString: string): TrainerPokemon {
    // Match name, optional item, and level
    const nameItemLevelMatch = tPokemonString.match(
      /^([\p{L}\p{N}\-.: '@’♀♂]+?)(?:@(.+?))? Lv(\d+)/u
    );
    if (!nameItemLevelMatch) {
      throw new Error('Invalid Pokémon line: ' + tPokemonString);
    }

    let name = nameItemLevelMatch[1].trim();
    const item = nameItemLevelMatch[2]?.trim() || undefined;
    const level = parseInt(nameItemLevelMatch[3]);

    // Match ability (optional)
    const abilityMatch = tPokemonString.match(/Ability:\s*(.*?)\s*-/);
    const ability = abilityMatch?.[1]?.trim() || undefined;

    // Match moves (optional)
    const lastDashIndex = tPokemonString.lastIndexOf(' - ');
    const movesSegment =
      lastDashIndex !== -1 ? tPokemonString.slice(lastDashIndex + 3) : '';
    const moves = movesSegment
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    if(name.startsWith('Gourgeist')) {
      name = 'Gourgeist'; // Gen 6+ edge case. Randomizer pretends these are cosmetic (they aren't)
    } else if (name.startsWith('Pumpkaboo')) {
      name = 'Pumpkaboo'
    }

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
    tp.isDefeated = ob?.isDefeated ?? false;
    tp.ivs = ob?.ivs ?? 0;
    return tp;
  }

  static createMegaCopy(original: TrainerPokemon): TrainerPokemon {
    let copy_name = original.name + "-Mega";
    if(original.name !== 'Rayquaza' 
      && original.item
      && !original.item.endsWith('ite')) {
        copy_name = copy_name + '-' + original.item.slice(-1);
    }
    let megaCopy = new TrainerPokemon(copy_name, original.level);
    megaCopy.ability = original.ability; //Ability may change on mega evolution, so we won't copy it by default
    megaCopy.item = original.item;
    megaCopy.moves = [...original.moves];
    megaCopy.isRevealed = original.isRevealed;
    megaCopy.isDefeated = original.isDefeated;
    megaCopy.ivs = original.ivs;
    return megaCopy;
  }

  getMoveString(index: number, isFullyRevealed: boolean): string {
    return (this.isRevealed || isFullyRevealed) ? (this.moves[index] || "-") : "???"
  }

  getAbilityString(isFullyRevealed: boolean): string {
    return (this.isRevealed || isFullyRevealed) ? (this.ability || "-") : "???"
  }

  getItemString(isFullyRevealed: boolean): string {
    return (this.isRevealed || isFullyRevealed) ? (this.item || "-") : "???"
  }
  
  canMegaEvolve(): boolean {
    const item = this.item;
    if (!item) return false;

    if(this.isMegaEvolved()) {
      return false;
    }

    if(this.name === "Rayquaza") {
      return this.moves.includes("Dragon Ascent");
    }

    return (
      // Not exactly a perfect check, but collisions should be super rare
      item.startsWith(this.name.substring(0, 4)) &&
      item.split(' ')[0].endsWith("ite")
    );
  }

  isMegaEvolved(): boolean {
    return this.name.includes("-Mega");
  }
}

export class Trainer {
  name: string = '';
  class?: string;
  oldName?: string;
  Pokes: TrainerPokemon[] = [];
  encounterOrder = 0;
  constructor() {}

  contains(mon_name: string): boolean {
    return this.Pokes.some((poke) => (poke.name === mon_name));
  }

  static fromString(trainerString: string): Trainer {
    let res = new Trainer();

    if (trainerString.indexOf('\n') >= 0) {
      //Block string (includes moveset)
      const lines = trainerString.trim().split('\n');

      // Extract trainer names
      const trainerHeader = lines[0];
      const trainerMatch = trainerHeader.match(/\(([^()=]+)(?: => ([^)]+))?\)/);
      if (!trainerMatch) {
        throw new Error('Invalid Trainer Name' + trainerHeader);
      }
      const oldName = trainerMatch?.[1].trim();
      const newName = trainerMatch?.[2]?.trim() || undefined;

      // Parse Pokémon lines
      const tPokemonLines = lines.slice(1);
      const tPokemonList = tPokemonLines.map((line) => {
        return TrainerPokemon.fromString(line);
      });

      res.name = newName ? newName : oldName;
      res.oldName = oldName;
      res.Pokes = tPokemonList;
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
      const tPokemonSegment =
        splitIndex !== -1 ? trainerString.slice(splitIndex + 3) : '';
      const tPokemonStrings = tPokemonSegment
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const tPokemonList = tPokemonStrings.map((str) => {
        return TrainerPokemon.fromString(str);
      });

      res.name = newName ? newName : oldName;
      res.oldName = oldName;
      res.Pokes = tPokemonList;
    }
    // Check for Mega Evolutions (and other forms)and add them to Pokes list
    let megaCopies: TrainerPokemon[] = [];
    for (let poke of res.Pokes) {
      if (poke.canMegaEvolve()) {
        let copy = TrainerPokemon.createMegaCopy(poke);
        megaCopies.push(copy);
      }
    }
    res.Pokes = [...res.Pokes, ...megaCopies];
    return res;
  }

  static loadFromJson(ob: any): Trainer {
    let res = new Trainer();
    res.name = ob?.name ?? '';
    res.class = ob?.class;
    res.oldName = ob?.oldName;
    res.Pokes =
      ob?.Pokes.map((tp: any) => {
        return TrainerPokemon.loadFromJson(tp);
      }) ?? [];
    res.encounterOrder = ob?.encounterOrder ?? 0;
    return res;
  }

  // Will need to be updated if we add more alternate forms that aren't just mega evolutions
  getAltFormsOfPokemon(mon_name: string): TrainerPokemon[] {
    let base_form = this.Pokes.find((poke) => poke.name === mon_name);
    if(!base_form?.canMegaEvolve()) {
      return [];
    }
    return this.Pokes.filter((poke) =>  poke.name.startsWith(mon_name) && poke.name.includes("-Mega"));
  }

  isFullTeamRevealed(): boolean {
    return this.Pokes.every(p => p.isDefeated || p.isRevealed);
  }

  isFullTeamDefeated(): boolean {
    return this.Pokes.every(p => p.isDefeated);
  }
}
