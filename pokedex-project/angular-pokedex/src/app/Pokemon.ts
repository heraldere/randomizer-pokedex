export enum PokeType {
  Normal = "normal",
  Fire = "fire",
  Fighting = "fighting",
  Water = "water",
  Flying = "flying",
  Grass = "grass",
  Poison = "poison",
  Electric = "electric",
  Ground = "ground",
  Psychic = "psychic",
  Rock = "rock",
  Ice = "ice",
  Bug = "bug",
  Dragon = "dragon",
  Ghost = "ghost",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
  None = "none",
  Unknown = "curse"
}

export const TypeColors = {
  "fire": ["#ff6966", "#9b1414"],
  "water": ["#6765ff", "#3b3e9b"],
  "grass": ["#84d472", "#359b21"],
  "bug": ["#83ff78", "#4fb525"],
  "ground": ["#ffae35", "#9b772f"],
  "rock": ["#ff6f40", "#9b6145"],
  "steel": ["#c0b4b6", "#726a6a"],
  "fairy": ["#ffadc7", "#9b1e44"],
  "dark": ["#686766", "#3e3b39"],
  "psychic": ["#ffbde0", "#9b4e90"],
  "ghost": ["#e486ff", "#8d689b"],
  "poison": ["#bf68bb", "#755671"],
  "dragon": ["#9782ff", "#71669b"],
  "ice": ["#bafff6", "#647c9b"],
  "flying": ["#aaa5ff", "#668d9b"],
  "normal": ["#f2ffb8", "#9b996d"],
  "fighting": ["#ff9a78", "#9b532f"],
  "electric": ["#ffffa3", "#c8c24a"],
  "missing": ["#505050", "#0c0c0c"]
};

export interface learned_move {
  level: number,
  move: string
};

export interface tm_move {
  tm: number,
  move: string
};


export class Pokemon {


  name: string;
  pokedex_num: number;
  uid: string;
  
  stat_total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
  special?: number;
  
  type1: PokeType;
  type2: PokeType;
  
  ability1?: string;
  ability2?: string;
  hiddenAbility?: string;
  
  next_evos: string[];
  prev_evos: string[];
  is_base: boolean;
  is_final: boolean;
  evo_family: string[];
  
  forms: string[];
  form_num: number;

  learn_levels: number[];
  learned_moves: string[];

  tms: number[];
  tm_moves: string[];
  hms: number[];
  hm_moves: string[];

  locations: string[] = [];

  type_revealed: boolean;
  stats_revealed: boolean;
  abilities_revealed: boolean;
  next_evos_revealed: number[];
  prev_evos_revealed: number[];
  learned_moves_revealed_idx: number;
  tm_indexes_learned: number[];
  locations_revealed: boolean;
  fully_revealed: boolean;

  notes: string;
  bst_revealed: boolean;
  
  // We may be able to make this private and only access Pokemon w/ factories
  constructor() {
    // a new Pokemon should be fully defined, but all values should be
    // empty/zeroed defaults
    // TODO: Clear out constructor and just define values by default

    this.name = "";
    this.pokedex_num = 0;
    this.uid = "000";
    this.hp = 0;
    this.attack = 0;
    this.defense = 0;
    this.sp_attack = 0;
    this.sp_defense = 0;
    this.speed = 0;
    this.stat_total = 0;

    this.type1 = "unknown" as PokeType;
    this.type2 = "none" as PokeType;

    this.next_evos = [];
    this.prev_evos = [];
    this.is_base = true;
    this.is_final = true;
    this.evo_family = [];
    this.forms = [];
    this.form_num = 0;

    this.learned_moves = [];
    this.learn_levels = [];

    this.tms = [];
    this.tm_moves = [];

    this.hms = [];
    this.hm_moves = [];

    this.type_revealed = false;
    this.stats_revealed = false;
    this.bst_revealed = false;
    this.abilities_revealed = false;
    this.next_evos_revealed = [];
    this.prev_evos_revealed = [];
    this.learned_moves_revealed_idx = 0;
    this.tm_indexes_learned = [];
    this.locations_revealed = false

    this.fully_revealed = false;

    this.notes = "";
  }

  //TODO: Refactor into a factory (for posterity)
  setBasicStats(statString: string, labelString: string) {
    const tokens = statString.split('|').map(s => s.trim());
    const labels = labelString.split('|').map(s => s.trim());

    this.name = tokens[labels.indexOf('NAME')];
    this.pokedex_num = parseInt(tokens[labels.indexOf('NUM')]);
    this.uid = String(this.pokedex_num).padStart(3, '0');
    this.hp = parseInt(tokens[labels.indexOf('HP')]);
    this.attack = parseInt(tokens[labels.indexOf('ATK')]);
    this.defense = parseInt(tokens[labels.indexOf('DEF')]);
    this.sp_attack = parseInt(tokens[labels.indexOf('SATK')]);
    this.sp_defense = parseInt(tokens[labels.indexOf('SDEF')]);
    this.speed = labels.indexOf('SPEC') >= 0 ? parseInt(tokens[labels.indexOf('SPE')]) : parseInt(tokens[labels.indexOf('SPD')]);
    this.special = labels.indexOf('SPEC') >= 0 ? parseInt(tokens[labels.indexOf('SPEC')]) : undefined;
    this.stat_total = this.bst();

    const typeString = tokens[labels.indexOf('TYPE')];
    this.type1 = typeString.split('/')[0].toLowerCase() as PokeType;
    this.type2 = typeString.indexOf('/') >= 0 ? typeString.split('/')[1].toLowerCase() as PokeType : "none" as PokeType;

    if (labels.indexOf('ABILITY1') >= 0) {
      this.ability1 = tokens[labels.indexOf('ABILITY1')];
    }
    if (labels.indexOf('ABILITY2') >= 0) {
      this.ability2 = tokens[labels.indexOf('ABILITY2')];
    }
    if (labels.indexOf('ABILITY3') >= 0) {
      this.hiddenAbility = tokens[labels.indexOf('ABILITY3')];
    }
  }

  public setBasicStatsFromObject(data: any) {
    this.name = data.name;
    this.pokedex_num = data.pokedex_num;
    this.uid = data.uid;
    this.hp = data.hp;
    this.attack = data.attack;
    this.defense = data.defense;
    this.sp_attack = data.sp_attack;
    this.sp_defense = data.sp_defense;
    this.speed = data.speed;
    this.special = data.special;
    this.stat_total = data.stat_total;
    this.type1 = data.type1;
    this.type2 = data.type2;
    this.ability1 = data.ability1;
    this.ability2 = data.ability2;
    this.hiddenAbility = data.hiddenAbility;
    this.form_num = data.form_num;
    this.forms = data.forms as string[];
  }

  static copyStatsFromDefault(defaultMon: Pokemon): Pokemon {
    let cpy = new Pokemon();
    cpy.name = defaultMon.name;
    cpy.pokedex_num = defaultMon.pokedex_num;
    cpy.uid = defaultMon.uid;
    cpy.hp = defaultMon.hp;
    cpy.attack = defaultMon.attack;
    cpy.defense = defaultMon.defense;
    cpy.sp_attack = defaultMon.sp_attack;
    cpy.sp_defense = defaultMon.sp_defense;
    cpy.speed = defaultMon.speed;
    cpy.special = defaultMon.special;
    cpy.stat_total = defaultMon.stat_total;
    cpy.type1 = defaultMon.type1;
    cpy.type2 = defaultMon.type2;
    cpy.ability1 = defaultMon.ability1;
    cpy.ability2 = defaultMon.ability2;
    cpy.hiddenAbility = defaultMon.hiddenAbility;
    cpy.form_num = defaultMon.form_num;
    cpy.forms = defaultMon.forms as string[];
    return cpy;
  }

  public setEvolutionsFromObject(data: any, currentDexDict: Map<string, Pokemon>) {
    this.next_evos = (data.next_evos as string[]).filter(evo => currentDexDict.has(evo));
    this.prev_evos = (data.prev_evos as string[]).filter(evo => currentDexDict.has(evo));
  }

  public setMovesFromObject(data: any) {
    this.learned_moves = data.learned_moves as string[];
    this.learn_levels = data.learn_levels as number[];
  }

  public setTMMovesFromObject(data: any, dexTmMoves?: string[]) {
    this.tm_moves = data.tm_moves as string[];
    this.tms = data.tms as number[];
    if(dexTmMoves && dexTmMoves.length !== 0) {
      for(let [idx, tm] of this.tms.entries()) {
        this.tm_moves[idx] = dexTmMoves[tm];
      }
    }
  }

  public setTMMovesFromDefault(defaultMon: Pokemon, tm_moves_by_index?: string[]) {
    this.tms = defaultMon.tms;
    this.tm_moves = defaultMon.tm_moves;
    if(tm_moves_by_index && tm_moves_by_index.length > 0) {
      for(let [idx, tm] of this.tms.entries()) {
        this.tm_moves[idx] = tm_moves_by_index[tm];
      }
    }
  }

  //TODO: Make better use of Null Coalescing
  static loadFromJson(json_data: any): Pokemon {
    // What fields do we ACTUALLY need here?
    if (
      json_data.name === undefined ||
      json_data.pokedex_num === undefined ||
      json_data.uid === undefined ||
      json_data.hp === undefined ||
      json_data.attack === undefined ||
      json_data.defense === undefined ||
      json_data.sp_attack === undefined ||
      json_data.sp_defense === undefined ||
      json_data.speed === undefined ||
      json_data.stat_total === undefined ||
      json_data.type1 === undefined ||
      json_data.type2 === undefined ||
      json_data.next_evos === undefined ||
      json_data.prev_evos === undefined ||
      json_data.is_base === undefined ||
      json_data.is_final === undefined ||
      json_data.evo_family === undefined ||
      json_data.forms === undefined ||
      json_data.form_num === undefined ||
      json_data.learned_moves === undefined ||
      json_data.learn_levels === undefined ||
      json_data.tms === undefined ||
      json_data.tm_moves === undefined ||
      json_data.type_revealed === undefined ||
      json_data.stats_revealed === undefined ||
      json_data.abilities_revealed === undefined ||
      json_data.next_evos_revealed === undefined ||
      json_data.prev_evos_revealed === undefined ||
      json_data.learned_moves_revealed_idx === undefined ||
      json_data.tm_indexes_learned === undefined ||
      json_data.fully_revealed === undefined ||
      json_data.notes === undefined ||

      json_data.bst_revealed === undefined
      // json_data.ability1 === undefined ||
      // json_data.ability2 === undefined
    ) {
      // if not, we shouldn't continue
      throw new Error("Trouble Parsing Pokemon");
    }
    let mon = new Pokemon();
    mon.name = json_data.name;
    mon.pokedex_num = json_data.pokedex_num;
    mon.uid = json_data.uid;
    mon.hp = json_data.hp;
    mon.attack = json_data.attack;
    mon.defense = json_data.defense;
    mon.sp_attack = json_data.sp_attack;
    mon.sp_defense = json_data.sp_defense;
    mon.special = json_data.special;
    mon.speed = json_data.speed;
    mon.stat_total = json_data.stat_total;

    mon.type1 = json_data.type1;
    mon.type2 = json_data.type2;
    
    // Initialize other stats
    mon.next_evos = json_data.next_evos;
    mon.prev_evos = json_data.prev_evos;
    mon.is_base = json_data.is_base;
    mon.is_final = json_data.is_final;
    mon.evo_family = json_data.evo_family;
    mon.forms = json_data.forms;
    mon.form_num = json_data.form_num;
    
    mon.learned_moves = json_data.learned_moves;
    mon.learn_levels = json_data.learn_levels;
    
    mon.tms = json_data.tms;
    mon.tm_moves = json_data.tm_moves;
    mon.hms = json_data.hms ? json_data.hms : [];
    mon.hm_moves = json_data.hm_moves ? json_data.hm_moves : [];

    mon.locations = json_data?.locations ?? [];
    
    mon.type_revealed = json_data.type_revealed;
    mon.stats_revealed = json_data.stats_revealed;
    mon.bst_revealed = json_data.bst_revealed;
    mon.abilities_revealed = json_data.abilities_revealed;
    mon.next_evos_revealed = json_data.next_evos_revealed;
    mon.prev_evos_revealed = json_data.prev_evos_revealed;
    mon.learned_moves_revealed_idx = json_data.learned_moves_revealed_idx;
    mon.tm_indexes_learned = json_data.tm_indexes_learned;
    mon.locations_revealed = json_data?.locations_revealed ?? false;
    
    mon.fully_revealed = json_data.fully_revealed;
    
    mon.notes = json_data.notes;

    mon.ability1 = json_data.ability1;
    mon.ability2 = json_data.ability2;
    mon.hiddenAbility = json_data.hiddenAbility;

    return mon;
  }

  addEvolution(evString: string) {
    if (evString.indexOf(this.name) < 0) {
      return;
    }
    const evArr = evString.split('->').map(s => s.trim());
    const leftSide = evArr[0];
    const rightSide = evArr[1];
    const rightArr = rightSide.split(/(?: and |,)/).map(s => s.trim());
    if (leftSide === this.name) {
      this.next_evos = rightArr;
    } else {
      this.prev_evos.push(leftSide);
    }
    this.is_base = this.prev_evos.length==0;
    this.is_final = this.next_evos.length==0;
  }

  get_stat(stat: string): number {
    if (this.stats_revealed || this.fully_revealed) {
      switch (stat) {
        case "hp":
          return this.hp;
        case "attack":
          return this.attack;
        case "defense":
          return this.defense;
        case "sp_attack":
          return this.sp_attack;
        case "sp_defense":
          return this.sp_defense;
        case "special":
          return this.special ? this.special : 0;
        case "speed":
          return this.speed;
        case "stat_total":
          return this.bst();
        default:
          return 0;
      }
    } else if (this.checkBSTRevealed() && stat === "stat_total") {
      return this.bst();
    } else {
      return 0;
    }
  }

  get_full_moveset(): string[] {
    return this.learned_moves.concat(
      this.tm_moves.filter(m => this.learned_moves.indexOf(m) === -1));
  }

  get_revealed_learned_move_pairs(): learned_move[] {
    return this.learn_levels.map((e, i) => {
      return {
        level: e,
        move: i < this.learned_moves_revealed_idx || this.fully_revealed
          ? this.learned_moves[i]
          : '???'
      } as learned_move;
    });
  }

  get_revealed_tm_move_pairs(): tm_move[] {
    return this.tms.map((e, i) => {
      return {
        tm: e,
        move: this.tm_indexes_learned.indexOf(i) >= 0 || this.fully_revealed
          ? this.tm_moves[i]
          : "???"
      } as tm_move;
    });
  }

  get_type1(): PokeType {
    return this.type_revealed || this.fully_revealed ? this.type1 : PokeType.Unknown;
  }

  get_type2(): PokeType {
    return this.type_revealed || this.fully_revealed ? this.type2 : PokeType.None;
  }

  /**
  * Gets a list of Evolutions from this pokemon.
  * This is affected by whether or not those evolutions are revealed.
  * @returns a list of Pokemon Names
  */
  get_evos_from(): string[] {
    return this.next_evos.map((e, i) => (this.next_evos_revealed.indexOf(i)  >= 0|| this.fully_revealed) ? e : "unknown");
  }

  /**
  * Gets a list of evolutions to this pokemon.
  * This is affected by whether or not the evolutions are revealed
  * @returns a list of Pokemon Names
  */
  get_evos_to(): string[] {
    return this.prev_evos.map((e, i) => (this.prev_evos_revealed.indexOf(i)  >= 0 || this.fully_revealed) ? e : "unknown");
  }

  bst(): number {
    return this.special ? this.hp + this.attack + this.defense + this.special + this.speed :
      this.hp + this.attack + this.defense + this.sp_attack + this.sp_defense + this.speed;
  }

  getStatsIfRevealed(): number[] {
    if (this.stats_revealed || this.fully_revealed) {
      if (this.special) {
        return [this.hp, this.attack, this.defense, this.special, this.speed];
      } else {
        return [this.hp, this.attack, this.defense, this.sp_attack, this.sp_defense, this.speed];
      }
    }
    return [0, 0, 0, 0, 0, 0];
  }

  getAbilitiesIfRevealed(): string[] {
    let res: string[] = [];
    if (this.abilities_revealed || this.fully_revealed) {
      if (this.ability1) {
        res.push(this.ability1);
      }
      if (this.ability2) {
        res.push(this.ability2);
      }
      if (this.hiddenAbility) {
        res.push(this.hiddenAbility);
      }
    } else if (this.ability1) {
      res.push("???");
    }
    return res;
  }

  
  getMovesIfRevealed(): string[] {
    let res: string[] = []
    if (this.fully_revealed) {
      res = this.learned_moves.concat(this.tm_moves)
    } else {
      res = res.concat(this.learned_moves.slice(0, this.learned_moves_revealed_idx))
      res = res.concat(this.tm_indexes_learned.map(id => this.tm_moves[id]));
    }
    return res;
  }

  hideTM(tm: number) {
    let tmIdx = this.tms.indexOf(tm);
    if(tmIdx>=0 && this.tm_indexes_learned.includes(tmIdx)) {
      this.tm_indexes_learned.splice(this.tm_indexes_learned.indexOf(tmIdx), 1)
    }
  }
  revealTM(tm: number) {
    let tmIdx = this.tms.indexOf(tm);
    if(tmIdx >= 0 && !this.tm_indexes_learned.includes(tmIdx))
      this.tm_indexes_learned.push(tmIdx);

  }

  checkTypeRevealed() {
      return this.fully_revealed || this.type_revealed;
  }
  
  checkStatsRevealed() {
    return this.fully_revealed || this.stats_revealed;
  } 
  
  checkBSTRevealed() {
    return this.fully_revealed || this.stats_revealed || this.bst_revealed;
  }

  checkAbilityRevealed() {
    return this.fully_revealed || this.abilities_revealed;
  }

  sanitizedName() {
    return this.name.replace(':','').replace('\u2640', 'f').replace('\u2642', 'm').toLowerCase();
  }
}
