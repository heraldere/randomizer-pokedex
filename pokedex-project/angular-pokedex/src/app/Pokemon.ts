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


  name: string = "";
  pokedex_num: number = 0;
  uid: string = "000";
  
  stat_total: number = 0;
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  sp_attack: number = 0;
  sp_defense: number = 0;
  speed: number = 0;
  special?: number;
  
  type1: PokeType = "unknown" as PokeType;;
  type2: PokeType = "none" as PokeType;;
  
  ability1?: string;
  ability2?: string;
  hiddenAbility?: string;
  
  next_evos: string[] = [];
  prev_evos: string[] = [];
  is_base: boolean = false;
  is_final: boolean = false;
  evo_family: string[] = [];
  
  forms: string[] = [];
  form_num: number = 0;

  learn_levels: number[] = [];
  learned_moves: string[] = [];

  tms: number[] = [];
  tm_moves: string[] = [];
  hms: number[] = [];
  hm_moves: string[] = [];

  locations: string[] = [];

  type_revealed: boolean = false;
  stats_revealed: boolean = false;
  abilities_revealed: boolean = false;
  next_evos_revealed: number[] = [];
  prev_evos_revealed: number[] = [];
  learned_moves_revealed_idx: number = 0;
  tm_indexes_learned: number[] = [];
  locations_revealed: boolean = false;
  fully_revealed: boolean = false;

  notes: string = "";
  bst_revealed: boolean = false;
  
  // We may be able to make this private and only access Pokemon w/ factories
  private constructor() {
  }

  static createPokemonFromTraits(statString: string, labelString: string): Pokemon {
    let res = new Pokemon();
    const tokens = statString.split('|').map(s => s.trim());
    const labels = labelString.split('|').map(s => s.trim());
    
    res.name = tokens[labels.indexOf('NAME')];
    res.pokedex_num = parseInt(tokens[labels.indexOf('NUM')]);
    res.uid = String(res.pokedex_num).padStart(3, '0');
    res.hp = parseInt(tokens[labels.indexOf('HP')]);
    res.attack = parseInt(tokens[labels.indexOf('ATK')]);
    res.defense = parseInt(tokens[labels.indexOf('DEF')]);
    res.sp_attack = labels.indexOf('SATK') >= 0 ? parseInt(tokens[labels.indexOf('SATK')]) : 0;
    res.sp_defense = labels.indexOf('SDEF')>= 0 ? parseInt(tokens[labels.indexOf('SDEF')]) : 0;
    res.speed = labels.indexOf('SPEC') >= 0 ? parseInt(tokens[labels.indexOf('SPE')]) : parseInt(tokens[labels.indexOf('SPD')]);
    res.special = labels.indexOf('SPEC') >= 0 ? parseInt(tokens[labels.indexOf('SPEC')]) : undefined;
    res.stat_total = res.bst();
    
    const typeString = tokens[labels.indexOf('TYPE')];
    res.type1 = typeString.split('/')[0].toLowerCase() as PokeType;
    res.type2 = typeString.indexOf('/') >= 0 ? typeString.split('/')[1].toLowerCase() as PokeType : "none" as PokeType;
    
    if (labels.indexOf('ABILITY1') >= 0) {
      res.ability1 = tokens[labels.indexOf('ABILITY1')];
    }
    if (labels.indexOf('ABILITY2') >= 0) {
      res.ability2 = tokens[labels.indexOf('ABILITY2')];
    }
    if (labels.indexOf('ABILITY3') >= 0) {
      res.hiddenAbility = tokens[labels.indexOf('ABILITY3')];
    }
    return res;
  }

  static createCloneFromTraits(defaultMon: Pokemon): Pokemon {
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
  
  static loadFromJson(json_data: any): Pokemon {
    let mon = new Pokemon();
    //TODO: Validate json_data
    Object.assign(mon, json_data);
    return mon;
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
