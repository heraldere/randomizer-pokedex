import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

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

  ev_from: string[];
  ev_to: string[];
  is_base: boolean;
  is_final: boolean;
  evo_family: string[];

  forms: string[];
  form_num: number;

  learn_levels: number[];
  learned_moves: string[];

  tms: number[];
  tm_moves: string[];

  type_revealed: boolean;
  stats_revealed: boolean;
  abilities_revealed: boolean;
  ev_from_revealed: number[];
  ev_to_revealed: number[];
  learned_moves_revealed_idx: number;
  tm_indexes_learned: number[];
  fully_revealed: boolean;

  notes: string;

  // We may be able to make this private and only access Pokemon w/ factories
  constructor() {
    // a new Pokemon should be fully defined, but all values should be
    // empty/zeroed defaults

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

    this.ev_from = [];
    this.ev_to = [];
    this.is_base = true;
    this.is_final = true;
    this.evo_family = [];
    this.forms = [];
    this.form_num = 0;

    this.learned_moves = [];
    this.learn_levels = [];

    this.tms = [];
    this.tm_moves = [];

    this.type_revealed = false;
    this.stats_revealed = false;
    this.abilities_revealed = false;
    this.ev_from_revealed = [];
    this.ev_to_revealed = [];
    this.learned_moves_revealed_idx = 0;
    this.tm_indexes_learned = [];

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
    this.speed = parseInt(tokens[labels.indexOf('SPD')]);
    this.special = labels.indexOf('SPE') >= 0 ? parseInt(tokens[labels.indexOf('SPE')]) : undefined;
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

  static loadFromJson(json_data: any): Pokemon {
    // Verify that this object contains all necessary fields
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
      json_data.ev_from === undefined ||
      json_data.ev_to === undefined ||
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
      json_data.ev_from_revealed === undefined ||
      json_data.ev_to_revealed === undefined ||
      json_data.learned_moves_revealed_idx === undefined ||
      json_data.tm_indexes_learned === undefined ||
      json_data.fully_revealed === undefined ||
      json_data.notes === undefined 
      // json_data.ability1 === undefined ||
      // json_data.ability2 === undefined
    ) {
      // if not, we shouldn't continue
      throw new Error("Not A Real Boy");
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
    mon.speed = json_data.speed;
    mon.stat_total = json_data.stat_total;

    mon.type1 = json_data.type1;
    mon.type2 = json_data.type2;

    // Initialize other stats
    mon.ev_from = json_data.ev_from;
    mon.ev_to = json_data.ev_to;
    mon.is_base = json_data.is_base;
    mon.is_final = json_data.is_final;
    mon.evo_family = json_data.evo_family;
    mon.forms = json_data.forms;
    mon.form_num = json_data.form_num;

    mon.learned_moves = json_data.learned_moves;
    mon.learn_levels = json_data.learn_levels;

    mon.tms = json_data.tms;
    mon.tm_moves = json_data.tm_moves;

    mon.type_revealed = json_data.type_revealed;
    mon.stats_revealed = json_data.stats_revealed;
    mon.abilities_revealed = json_data.abilities_revealed;
    mon.ev_from_revealed = json_data.ev_from_revealed;
    mon.ev_to_revealed = json_data.ev_to_revealed;
    mon.learned_moves_revealed_idx = json_data.learned_moves_revealed_idx;
    mon.tm_indexes_learned = json_data.tm_indexes_learned;

    mon.fully_revealed = json_data.fully_revealed;

    mon.notes = json_data.notes;

    mon.ability1 = json_data.ability1;
    mon.ability2 = json_data.ability2;

    return mon;
  }

  addEvolution(evString: string) {
    if (evString.indexOf(this.name) < 0) {
      return;
    }
    const evArr = evString.split('->').map(s => s.trim());
    const leftSide = evArr[0];
    const rightSide = evArr[1];
    const rightArr = rightSide.split(/(and|,)/).map(s => s.trim());
    if (leftSide === this.name) {
      this.ev_from = rightArr;
    } else {
      this.ev_to.push(leftSide);
    }
  }

  get_stat(stat: string): number {
    if (this.stats_revealed || this.fully_revealed) {
      switch (stat) {
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
        default:
          return 0;
      }
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
    return this.ev_from.map((e, i) => this.ev_from_revealed.indexOf(i) >= 0 ? e : "???");
  }

  /**
  * Gets a list of evolutions to this pokemon.
  * This is affected by whether or not the evolutions are revealed
  * @returns a list of Pokemon Names
  */
  get_evos_to(): string[] {
    return this.ev_to.map((e, i) => this.ev_to_revealed.indexOf(i) >= 0 ? e : "???");
  }

  bst(): number {
    return this.special ? this.hp + this.attack + this.defense + this.special + this.speed :
      this.hp + this.attack + this.defense + this.sp_attack + this.sp_defense + this.speed;
  }

  getStatsIfRevealed(): number[] {
    if (this.stats_revealed || this.fully_revealed) {
      return [this.hp, this.attack, this.defense, this.sp_attack, this.sp_defense, this.speed];
    }
    return [0, 0, 0, 0, 0, 0];
  }

  getAbilitiesIfRevealed(): string[] {
    let res: string[] = [];
    if (this.abilities_revealed) {
      if (this.ability1) {
        res.push(this.ability1);
      }
      if (this.ability2) {
        res.push(this.ability2);
      }
      if (this.hiddenAbility) {
        res.push(this.hiddenAbility + "(hidden)");
      }
    } else if (this.ability1) {
      res.push("???");
    }
    return res;
  }
}
