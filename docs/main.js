"use strict";
(self["webpackChunkangular_pokedex"] = self["webpackChunkangular_pokedex"] || []).push([["main"],{

/***/ 5328:
/*!****************************!*\
  !*** ./src/app/Pokemon.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PokeType": () => (/* binding */ PokeType),
/* harmony export */   "Pokemon": () => (/* binding */ Pokemon),
/* harmony export */   "TypeColors": () => (/* binding */ TypeColors)
/* harmony export */ });
var PokeType;
(function (PokeType) {
    PokeType["Normal"] = "normal";
    PokeType["Fire"] = "fire";
    PokeType["Fighting"] = "fighting";
    PokeType["Water"] = "water";
    PokeType["Flying"] = "flying";
    PokeType["Grass"] = "grass";
    PokeType["Poison"] = "poison";
    PokeType["Electric"] = "electric";
    PokeType["Ground"] = "ground";
    PokeType["Psychic"] = "psychic";
    PokeType["Rock"] = "rock";
    PokeType["Ice"] = "ice";
    PokeType["Bug"] = "bug";
    PokeType["Dragon"] = "dragon";
    PokeType["Ghost"] = "ghost";
    PokeType["Dark"] = "dark";
    PokeType["Steel"] = "steel";
    PokeType["Fairy"] = "fairy";
    PokeType["None"] = "none";
    PokeType["Unknown"] = "curse";
})(PokeType || (PokeType = {}));
const TypeColors = {
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
;
;
class Pokemon {
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
        this.type1 = "unknown";
        this.type2 = "none";
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
        this.fully_revealed = false;
        this.notes = "";
    }
    //TODO: Refactor into a factory (for posterity)
    setBasicStats(statString, labelString) {
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
        this.type1 = typeString.split('/')[0].toLowerCase();
        this.type2 = typeString.indexOf('/') >= 0 ? typeString.split('/')[1].toLowerCase() : "none";
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
    setBasicStatsFromObject(data) {
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
        this.forms = data.forms;
    }
    setEvolutionsFromObject(data, currentDexDict) {
        this.next_evos = data.next_evos.filter(evo => currentDexDict.has(evo));
        this.prev_evos = data.prev_evos.filter(evo => currentDexDict.has(evo));
    }
    setMovesFromObject(data) {
        this.learned_moves = data.learned_moves;
        this.learn_levels = data.learn_levels;
    }
    setTMMovesFromObject(data, dexTmMoves) {
        this.tm_moves = data.tm_moves;
        this.tms = data.tms;
        if (dexTmMoves && dexTmMoves.length !== 0) {
            for (let [idx, tm] of this.tms.entries()) {
                this.tm_moves[idx] = dexTmMoves[tm];
            }
        }
    }
    static loadFromJson(json_data) {
        // Verify that this object contains all necessary fields
        if (json_data.name === undefined ||
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
        mon.type_revealed = json_data.type_revealed;
        mon.stats_revealed = json_data.stats_revealed;
        mon.bst_revealed = json_data.bst_revealed;
        mon.abilities_revealed = json_data.abilities_revealed;
        mon.next_evos_revealed = json_data.next_evos_revealed;
        mon.prev_evos_revealed = json_data.prev_evos_revealed;
        mon.learned_moves_revealed_idx = json_data.learned_moves_revealed_idx;
        mon.tm_indexes_learned = json_data.tm_indexes_learned;
        mon.fully_revealed = json_data.fully_revealed;
        mon.notes = json_data.notes;
        mon.ability1 = json_data.ability1;
        mon.ability2 = json_data.ability2;
        mon.hiddenAbility = json_data.hiddenAbility;
        return mon;
    }
    addEvolution(evString) {
        if (evString.indexOf(this.name) < 0) {
            return;
        }
        const evArr = evString.split('->').map(s => s.trim());
        const leftSide = evArr[0];
        const rightSide = evArr[1];
        const rightArr = rightSide.split(/(?: and |,)/).map(s => s.trim());
        if (leftSide === this.name) {
            this.next_evos = rightArr;
        }
        else {
            this.prev_evos.push(leftSide);
        }
        this.is_base = this.prev_evos.length == 0;
        this.is_final = this.next_evos.length == 0;
    }
    get_stat(stat) {
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
        }
        else if (this.checkBSTRevealed() && stat === "stat_total") {
            return this.bst();
        }
        else {
            return 0;
        }
    }
    get_full_moveset() {
        return this.learned_moves.concat(this.tm_moves.filter(m => this.learned_moves.indexOf(m) === -1));
    }
    get_revealed_learned_move_pairs() {
        return this.learn_levels.map((e, i) => {
            return {
                level: e,
                move: i < this.learned_moves_revealed_idx || this.fully_revealed
                    ? this.learned_moves[i]
                    : '???'
            };
        });
    }
    get_revealed_tm_move_pairs() {
        return this.tms.map((e, i) => {
            return {
                tm: e,
                move: this.tm_indexes_learned.indexOf(i) >= 0 || this.fully_revealed
                    ? this.tm_moves[i]
                    : "???"
            };
        });
    }
    get_type1() {
        return this.type_revealed || this.fully_revealed ? this.type1 : PokeType.Unknown;
    }
    get_type2() {
        return this.type_revealed || this.fully_revealed ? this.type2 : PokeType.None;
    }
    /**
    * Gets a list of Evolutions from this pokemon.
    * This is affected by whether or not those evolutions are revealed.
    * @returns a list of Pokemon Names
    */
    get_evos_from() {
        return this.next_evos.map((e, i) => (this.next_evos_revealed.indexOf(i) >= 0 || this.fully_revealed) ? e : "unknown");
    }
    /**
    * Gets a list of evolutions to this pokemon.
    * This is affected by whether or not the evolutions are revealed
    * @returns a list of Pokemon Names
    */
    get_evos_to() {
        return this.prev_evos.map((e, i) => (this.prev_evos_revealed.indexOf(i) >= 0 || this.fully_revealed) ? e : "unknown");
    }
    bst() {
        return this.special ? this.hp + this.attack + this.defense + this.special + this.speed :
            this.hp + this.attack + this.defense + this.sp_attack + this.sp_defense + this.speed;
    }
    getStatsIfRevealed() {
        if (this.stats_revealed || this.fully_revealed) {
            if (this.special) {
                return [this.hp, this.attack, this.defense, this.special, this.speed];
            }
            else {
                return [this.hp, this.attack, this.defense, this.sp_attack, this.sp_defense, this.speed];
            }
        }
        return [0, 0, 0, 0, 0, 0];
    }
    getAbilitiesIfRevealed() {
        let res = [];
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
        }
        else if (this.ability1) {
            res.push("???");
        }
        return res;
    }
    getMovesIfRevealed() {
        let res = [];
        if (this.fully_revealed) {
            res = this.learned_moves.concat(this.tm_moves);
        }
        else {
            res = res.concat(this.learned_moves.slice(0, this.learned_moves_revealed_idx));
            res = res.concat(this.tm_indexes_learned.map(id => this.tm_moves[id]));
        }
        return res;
    }
    hideTM(tm) {
        let tmIdx = this.tms.indexOf(tm);
        if (tmIdx >= 0 && this.tm_indexes_learned.includes(tmIdx)) {
            this.tm_indexes_learned.splice(this.tm_indexes_learned.indexOf(tmIdx), 1);
        }
    }
    revealTM(tm) {
        let tmIdx = this.tms.indexOf(tm);
        if (tmIdx >= 0 && !this.tm_indexes_learned.includes(tmIdx))
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
        return this.name.replace(':', '').replace('\u2640', 'f').replace('\u2642', 'm').toLowerCase();
    }
}


/***/ }),

/***/ 8696:
/*!****************************************************!*\
  !*** ./src/app/about-page/about-page.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutPageComponent": () => (/* binding */ AboutPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class AboutPageComponent {
    constructor() { }
    ngOnInit() {
    }
}
AboutPageComponent.ɵfac = function AboutPageComponent_Factory(t) { return new (t || AboutPageComponent)(); };
AboutPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutPageComponent, selectors: [["app-about-page"]], decls: 56, vars: 0, consts: [[1, "about-content"], ["href", "https://github.com/Ajarmar/universal-pokemon-randomizer-zx/releases", "target", "_blank", "rel", "noopener noreferrer"]], template: function AboutPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Welcome to the Randomizer Pokedex Tool! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " This tool was created to help explore randomized Pokemon games. It can be during play to help keep track of information, or after a playthrough to analyze all of the different pokemon. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " I made this tool because my favorite part of Pokemon randomizers is exploring a brand new world filled with entirely \"new\" Pokemon. Think of this as a sort of Pokedex you can carry with you on a journey, filling it in as you go. For example, the way I use the tool is I reveal types immediately upon encountering any Pokemon. After defeating a Pokemon at least once, I reveal its abilities and stats. Everyone is free to come up with their own way to reveal information\u2014I tried to make the tool flexible. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Usage ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " This tool is configured to accept spoiler log files generated by the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Universal Pokemon Randomizer ZX");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, ". To begin, click the upload button on the home page or on the pokedex page and select the spoiler log generated when you used the randomizer (be sure to generate the spoiler log when randomizing your game). ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " You can use the search bar in the \"Pokemon\" tab to select any pokemon to view. By default, the type, stat, ability and other information about each pokemon is hidden. Any unknown information can be revealed by clicking on it. The page will remember what informtion you reveal about which pokemon. You also have the option to reveal all information about every pokemon by clicking the Spoil button at the top. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " If you want to save your progress, you can click the save button, which will download a .pkdx file with all of the log's information and what you've revealed so far. Next time you visit the page, you can just upload the .pkdx file and the site will load all of the progress that you had made. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " This page is still under development, so not all information from the log file can be displayed yet. In no particular order, I would like to add the following features: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ul")(23, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Matchup information ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " A Team Builder/Analysis section ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " Location data (this might be difficult, so don't count on it) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Credits ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "ul")(33, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " heraldere - Log/Save parser, Stat Graphs, Site Design, Structure, and Logic ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " pinkpoppey - Table View and Filter functionality, CSS Consultant ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " Known Issues ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "ul")(41, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Clicking BST at the top of the chart does not reveal the Pokemon's Base Stat Total. It should, but it's a bit troublesome to fix without impacting the way the chart looks. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Some of the images can have a slight jitter when loading in (especially in Type sections, and cases where a Pokemon has multiple Evolutions) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, " This page will not work with extremely old versions of the Randomizer. I will not fix this. It should be compatible with most recent versions of the Randomizer (4.0.0 and up) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, " Move Tutor and Breeding Moves are not currently displayed. These shouldn't impact a randomized playthrough too much, but I would like the information available somehow. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " Log files for Gens 6 and 7 can take a second to parse. I would like to add visual feedback for when the page is loading data. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " THANKS FOR READING, AND GOOD LUCK PLAYING! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "-heraldere");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } }, styles: [".about-content[_ngcontent-%COMP%] {\n  width: 70%;\n  max-width: 700px;\n  margin: auto;\n  padding-bottom: 10px;\n}\n\n.text-warning[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: #eb8181;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtBQUNGIiwiZmlsZSI6ImFib3V0LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWJvdXQtY29udGVudHtcclxuICB3aWR0aDogNzAlO1xyXG4gIG1heC13aWR0aDogNzAwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4udGV4dC13YXJuaW5ne1xyXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICBjb2xvcjogcmdiKDIzNSwgMTI5LCAxMjkpO1xyXG59Il19 */"] });


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _pokedex_page_pokedex_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pokedex-page/pokedex-page.component */ 1644);
/* harmony import */ var _about_page_about_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./about-page/about-page.component */ 8696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);






const routes = [
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent },
    { path: 'pokedex', component: _pokedex_page_pokedex_page_component__WEBPACK_IMPORTED_MODULE_1__.PokedexPageComponent },
    { path: 'about', component: _about_page_about_page_component__WEBPACK_IMPORTED_MODULE_2__.AboutPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/header.component */ 3482);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



class AppComponent {
    constructor() {
        this.title = 'angular-pokedex';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header")(1, "router-outlet");
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/select */ 1434);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/autocomplete */ 3188);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/form-field */ 4770);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tabs */ 2379);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ 3482);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ 5067);
/* harmony import */ var _pokedex_page_pokedex_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pokedex-page/pokedex-page.component */ 1644);
/* harmony import */ var _pokedex_page_table_view_table_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pokedex-page/table-view/table-view.component */ 4130);
/* harmony import */ var _pokedex_page_cards_view_cards_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pokedex-page/cards-view/cards-view.component */ 8053);
/* harmony import */ var ngx_easy_table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-easy-table */ 1994);
/* harmony import */ var _pokedex_page_table_view_filter_dialog_content_filter_dialog_content_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pokedex-page/table-view/filter-dialog-content/filter-dialog-content.component */ 7792);
/* harmony import */ var angular2_query_builder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular2-query-builder */ 1054);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
/* harmony import */ var _pokedex_page_cards_view_individual_summary_individual_summary_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pokedex-page/cards-view/individual-summary/individual-summary.component */ 9122);
/* harmony import */ var _pokedex_page_cards_view_team_builder_team_builder_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pokedex-page/cards-view/team-builder/team-builder.component */ 2301);
/* harmony import */ var _pokedex_page_cards_view_vs_summary_vs_summary_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pokedex-page/cards-view/vs-summary/vs-summary.component */ 53);
/* harmony import */ var _pokedex_page_cards_view_card_card_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pokedex-page/cards-view/card/card.component */ 3006);
/* harmony import */ var _about_page_about_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./about-page/about-page.component */ 8696);
/* harmony import */ var _pokedex_page_cards_view_world_view_world_view_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pokedex-page/cards-view/world-view/world-view.component */ 474);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 3184);



























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
            ngx_easy_table__WEBPACK_IMPORTED_MODULE_18__.TableModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__.MatDialogModule,
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__.MatTabsModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule,
            angular2_query_builder__WEBPACK_IMPORTED_MODULE_8__.QueryBuilderModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_22__.MatSelectModule,
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__.MatAutocompleteModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatFormFieldModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule
        ], angular2_query_builder__WEBPACK_IMPORTED_MODULE_8__.QueryBuilderModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent,
        _home_home_component__WEBPACK_IMPORTED_MODULE_3__.HomeComponent,
        _pokedex_page_pokedex_page_component__WEBPACK_IMPORTED_MODULE_4__.PokedexPageComponent,
        _pokedex_page_table_view_table_view_component__WEBPACK_IMPORTED_MODULE_5__.TableViewComponent,
        _pokedex_page_cards_view_cards_view_component__WEBPACK_IMPORTED_MODULE_6__.CardsViewComponent,
        _pokedex_page_table_view_filter_dialog_content_filter_dialog_content_component__WEBPACK_IMPORTED_MODULE_7__.FilterDialogContentComponent,
        _pokedex_page_cards_view_individual_summary_individual_summary_component__WEBPACK_IMPORTED_MODULE_9__.IndividualSummaryComponent,
        _pokedex_page_cards_view_team_builder_team_builder_component__WEBPACK_IMPORTED_MODULE_10__.TeamBuilderComponent,
        _pokedex_page_cards_view_vs_summary_vs_summary_component__WEBPACK_IMPORTED_MODULE_11__.VsSummaryComponent,
        _pokedex_page_cards_view_card_card_component__WEBPACK_IMPORTED_MODULE_12__.CardComponent,
        _about_page_about_page_component__WEBPACK_IMPORTED_MODULE_13__.AboutPageComponent,
        _pokedex_page_cards_view_world_view_world_view_component__WEBPACK_IMPORTED_MODULE_14__.WorldViewComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
        ngx_easy_table__WEBPACK_IMPORTED_MODULE_18__.TableModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__.MatDialogModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_20__.MatTabsModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule,
        angular2_query_builder__WEBPACK_IMPORTED_MODULE_8__.QueryBuilderModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_22__.MatSelectModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_23__.MatAutocompleteModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_25__.MatFormFieldModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule], exports: [angular2_query_builder__WEBPACK_IMPORTED_MODULE_8__.QueryBuilderModule] }); })();


/***/ }),

/***/ 3482:
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _pokedex_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pokedex.service */ 4044);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



class HeaderComponent {
    constructor(dexService) {
        this.dexService = dexService;
    }
    ngOnInit() {
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_pokedex_service__WEBPACK_IMPORTED_MODULE_0__.PokedexService)); };
HeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 15, vars: 0, consts: [[1, "header-title"], [1, "tabs"], ["routerLink", "/home", "routerLinkActive", "selected", 1, "tab"], [1, "material-icons"], ["routerLink", "/pokedex", "routerLinkActive", "selected", 1, "tab"], ["src", "assets/images/pokeball-icon.png", 1, "pokeball-icon"], ["routerLink", "/about", "routerLinkActive", "selected", 1, "tab"], ["id", "help-icon", 1, "material-icons"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Randomizer Pokedex");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1)(4, "a", 2)(5, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "home");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Pokedex");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 6)(12, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "help");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive], styles: [".pokeball-icon[_ngcontent-%COMP%] {\n  height: 24px;\n  width: 24px;\n  display: block;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding-inline-start: 10px;\n  padding-inline-end: 10px;\n  margin-bottom: 10px;\n  color: #e7e7e7;\n}\n\n.header-text[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding-inline-start: 10px;\n  padding-inline-end: 10px;\n  color: #e7e7e7;\n}\n\n.tabs[_ngcontent-%COMP%] {\n  border-bottom: 5px #9c9c9c solid;\n  color: #2c2c2c;\n}\n\n.tabs[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  margin-bottom: 0px;\n}\n\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%] {\n  background-color: #e7e7e7;\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 16px;\n  font-size: 14px;\n  cursor: pointer;\n  color: #2c2c2c;\n  border: none;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%]   i.material-icons[_ngcontent-%COMP%] {\n  color: #2c2c2c;\n}\n\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%]:hover {\n  background-color: #cecece;\n  font-weight: 300;\n}\n\n.tabs[_ngcontent-%COMP%]   a.tab.selected[_ngcontent-%COMP%] {\n  background-color: #9c9c9c;\n}\n\n.tabs[_ngcontent-%COMP%]   a.tab.selected[_ngcontent-%COMP%]:hover {\n  background-color: dimgray;\n}\n\n#help-icon[_ngcontent-%COMP%] {\n  margin-right: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTtFQUVJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQVBKOztBQVVBO0VBQ0ksb0JBQUE7RUFDQSwwQkFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQWZjO0FBUWxCOztBQVVBO0VBQ0ksb0JBQUE7RUFDQSwwQkFBQTtFQUNBLHdCQUFBO0VBQ0EsY0F0QmM7QUFlbEI7O0FBVUE7RUFDSSxnQ0FBQTtFQUlBLGNBL0JXO0FBcUJmOztBQU9JO0VBQ0ksa0JBQUE7QUFMUjs7QUFRSTtFQUNJLHlCQUFBO0VBRUEsb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBRUEsZUFBQTtFQUNBLGVBQUE7RUFDQSxjQXpDTztFQTBDUCxZQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtBQVJSOztBQVNRO0VBQ0ksY0E5Q0c7QUF1Q2Y7O0FBU1E7RUFDSSx5QkFBQTtFQUNBLGdCQUFBO0FBUFo7O0FBU1E7RUFDSSx5QkF2RFE7QUFnRHBCOztBQVFZO0VBQ0kseUJBQUE7QUFOaEI7O0FBWUE7RUFDSSxpQkFBQTtBQVRKIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4kc2VsZWN0ZWRUYWJDb2xvciA6IHJnYigxNTYsIDE1NiwgMTU2KTtcclxuJHRhYkNvbG9yIDogcmdiKDIzMSwgMjMxLCAyMzEpO1xyXG4kdGFiRm9udENvbG9yOiByZ2IoNDQsIDQ0LCA0NCk7XHJcbiRoZWFkZXJGb250Q29sb3I6IHJnYigyMzEsMjMxLDIzMSk7XHJcblxyXG5cclxuLnBva2ViYWxsLWljb24ge1xyXG4gICAgLy8gYmFja2dyb3VuZDogJ3VybCguLi8uLi9hc3NldHMvaW1hZ2VzL3Bva2ViYWxsLWxvZ28ucG5nKSc7XHJcbiAgICBoZWlnaHQ6IDI0cHg7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uaGVhZGVyLXRpdGxlIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWlubGluZS1lbmQ6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgY29sb3I6ICRoZWFkZXJGb250Q29sb3I7XHJcbn1cclxuXHJcbi5oZWFkZXItdGV4dCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAxMHB4O1xyXG4gICAgcGFkZGluZy1pbmxpbmUtZW5kOiAxMHB4O1xyXG4gICAgY29sb3I6ICRoZWFkZXJGb250Q29sb3I7XHJcbn1cclxuXHJcbi50YWJzIHtcclxuICAgIGJvcmRlci1ib3R0b206IDVweCAkc2VsZWN0ZWRUYWJDb2xvciBzb2xpZDtcclxuICAgICoge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcclxuICAgIH1cclxuICAgIGNvbG9yOiAkdGFiRm9udENvbG9yO1xyXG4gICAgYS50YWIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzEsIDIzMSwgMjMxKTtcclxuICAgIFxyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICAgICAgLy8gYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgY29sb3I6ICR0YWJGb250Q29sb3I7XHJcbiAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgaS5tYXRlcmlhbC1pY29ucyB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAkdGFiRm9udENvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2VuKCRjb2xvcjogJHRhYkNvbG9yLCAkYW1vdW50OiAxMCk7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICYuc2VsZWN0ZWQge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2VsZWN0ZWRUYWJDb2xvcjtcclxuICAgICAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGNvbG9yOiAkc2VsZWN0ZWRUYWJDb2xvciwgJGFtb3VudDogMjApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4jaGVscC1pY29uIHtcclxuICAgIG1hcmdpbi1yaWdodDogMnB4O1xyXG59XHJcblxyXG4iXX0= */"] });


/***/ }),

/***/ 5067:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _pokedex_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pokedex.service */ 4044);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



const _c0 = ["downloadButton"];
class HomeComponent {
    constructor(dex, router) {
        // TODO: This should be owned by the pokedex service
        this.validFileUploaded = false;
        this.dex = dex;
        this.router = router;
    }
    ngOnInit() {
        if (!this.dex.validDexUploaded) {
            this.dex.loadDefaultData();
        }
    }
    onFileSelected(e) {
        const target = e.target;
        const files = target === null || target === void 0 ? void 0 : target.files;
        const file = files && files[0];
        if (file) {
            this.validFileUploaded = false;
            this.dex.readSelectedFile(file);
            this.router.navigate(['/', 'pokedex']);
        }
    }
    vanillaDataButtonClicked() {
        this.dex.loadDefaultData()
            .then(() => this.router.navigate(['/', 'pokedex']));
    }
    sampleRandomDataButtonClicked() {
        this.dex.loadSampleRandomData()
            .then(() => this.router.navigate(['/', 'pokedex']));
    }
    detailButtonClicked() {
        this.router.navigate(['/', 'about']);
    }
    save() {
        let dexString = JSON.stringify(this.dex.pokedex);
        this.downloadRef.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dexString);
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_pokedex_service__WEBPACK_IMPORTED_MODULE_0__.PokedexService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
HomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], viewQuery: function HomeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.downloadRef = _t.first);
    } }, decls: 29, vars: 0, consts: [["id", "home-background"], ["id", "home-box"], ["id", "button-stack"], [2, "margin-block-start", "5px"], ["id", "home-file-input1", "type", "file", "accept", ".log", 1, "home-file-input", 3, "change"], ["for", "home-file-input1", 1, "home-button"], ["id", "home-file-input2", "type", "file", "accept", ".pkdx", 1, "home-file-input", 3, "change"], ["for", "home-file-input2", 1, "home-button"], [1, "home-button", 3, "click"], ["href", "https://github.com/Ajarmar/universal-pokemon-randomizer-zx/releases", "target", "_blank", "rel", "noopener noreferrer", 2, "width", "100%"], [1, "home-button"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Howdy!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " This is a tool created to help out with randomized Pokemon adventures/challenges. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Part of the fun of randomized runs is exploring a world filled with \"brand-new\" Pokemon. This \"Pok\u00E9dex\" can help you keep notes on all of your discoveries, including stats, typing, and abilities (with plans for more). ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " You can \"spoil\" as much or as little as you want, so you can have the experience most suited to your style. Or, if you just want to see what Pokemon were generated, this is a great way to do it without having to sift through a giant log file. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 1)(11, "div", 2)(12, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Get Started");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function HomeComponent_Template_input_change_14_listener($event) { return ctx.onFileSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Upload Randomized Log File");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function HomeComponent_Template_input_change_17_listener($event) { return ctx.onFileSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Upload Saved Pokedex File");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_20_listener() { return ctx.vanillaDataButtonClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Explore With Vanilla Game Data");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_22_listener() { return ctx.sampleRandomDataButtonClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Explore With Sample Random Data");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_24_listener() { return ctx.detailButtonClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "More Details and Credits");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "a", 9)(27, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Check Out The Universal Pokemon Randomizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    } }, styles: [".mat-badge-content[_ngcontent-%COMP%]{font-weight:600;font-size:12px;font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-badge-small[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{font-size:9px}.mat-badge-large[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{font-size:24px}.mat-h1[_ngcontent-%COMP%], .mat-headline[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-headline[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font:400 24px/32px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0 0 16px}.mat-h2[_ngcontent-%COMP%], .mat-title[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h2[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-title[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0 0 16px}.mat-h3[_ngcontent-%COMP%], .mat-subheading-2[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h3[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-subheading-2[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:400 16px/28px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0 0 16px}.mat-h4[_ngcontent-%COMP%], .mat-subheading-1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h4[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-subheading-1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font:400 15px/24px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0 0 16px}.mat-h5[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h5[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font:400 calc(14px * 0.83)/20px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 12px}.mat-h6[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-h6[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font:400 calc(14px * 0.67)/20px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 12px}.mat-body-strong[_ngcontent-%COMP%], .mat-body-2[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body-strong[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body-2[_ngcontent-%COMP%]{font:500 14px/24px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-body[_ngcontent-%COMP%], .mat-body-1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body-1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .mat-body-1[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-body-1[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 12px}.mat-small[_ngcontent-%COMP%], .mat-caption[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-small[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-caption[_ngcontent-%COMP%]{font:400 12px/20px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-display-4[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-display-4[_ngcontent-%COMP%]{font:300 112px/112px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:-0.05em;margin:0 0 56px}.mat-display-3[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-display-3[_ngcontent-%COMP%]{font:400 56px/56px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:-0.02em;margin:0 0 64px}.mat-display-2[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-display-2[_ngcontent-%COMP%]{font:400 45px/48px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:-0.005em;margin:0 0 64px}.mat-display-1[_ngcontent-%COMP%], .mat-typography[_ngcontent-%COMP%]   .mat-display-1[_ngcontent-%COMP%]{font:400 34px/40px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0 0 64px}.mat-bottom-sheet-container[_ngcontent-%COMP%]{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-button[_ngcontent-%COMP%], .mat-raised-button[_ngcontent-%COMP%], .mat-icon-button[_ngcontent-%COMP%], .mat-stroked-button[_ngcontent-%COMP%], .mat-flat-button[_ngcontent-%COMP%], .mat-fab[_ngcontent-%COMP%], .mat-mini-fab[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-button-toggle[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-card[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-card-title[_ngcontent-%COMP%]{font-size:24px;font-weight:500}.mat-card-header[_ngcontent-%COMP%]   .mat-card-title[_ngcontent-%COMP%]{font-size:20px}.mat-card-subtitle[_ngcontent-%COMP%], .mat-card-content[_ngcontent-%COMP%]{font-size:14px}.mat-checkbox[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-checkbox-layout[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%]{line-height:24px}.mat-chip[_ngcontent-%COMP%]{font-size:14px;font-weight:500}.mat-chip[_ngcontent-%COMP%]   .mat-chip-trailing-icon.mat-icon[_ngcontent-%COMP%], .mat-chip[_ngcontent-%COMP%]   .mat-chip-remove.mat-icon[_ngcontent-%COMP%]{font-size:18px}.mat-table[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-header-cell[_ngcontent-%COMP%]{font-size:12px;font-weight:500}.mat-cell[_ngcontent-%COMP%], .mat-footer-cell[_ngcontent-%COMP%]{font-size:14px}.mat-calendar[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-calendar-body[_ngcontent-%COMP%]{font-size:13px}.mat-calendar-body-label[_ngcontent-%COMP%], .mat-calendar-period-button[_ngcontent-%COMP%]{font-size:14px;font-weight:500}.mat-calendar-table-header[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px;font-weight:400}.mat-dialog-title[_ngcontent-%COMP%]{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-expansion-panel-header[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content[_ngcontent-%COMP%]{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-form-field[_ngcontent-%COMP%]{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-form-field-wrapper[_ngcontent-%COMP%]{padding-bottom:1.34375em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:150%;line-height:1.125}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]{height:1.5em;width:1.5em}.mat-form-field-prefix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .mat-form-field-suffix[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{height:1.125em;line-height:1.125}.mat-form-field-infix[_ngcontent-%COMP%]{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[_ngcontent-%COMP%]:focus + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.34375em) scale(0.75);width:133.3333333333%}.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[label][_ngcontent-%COMP%]:not(:label-shown) + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.34374em) scale(0.75);width:133.3333433333%}.mat-form-field-label-wrapper[_ngcontent-%COMP%]{top:-0.84375em;padding-top:.84375em}.mat-form-field-label[_ngcontent-%COMP%]{top:1.34375em}.mat-form-field-underline[_ngcontent-%COMP%]{bottom:1.34375em}.mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{font-size:75%;margin-top:.6666666667em;top:calc(100% - 1.7916666667em)}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-wrapper[_ngcontent-%COMP%]{padding-bottom:1.25em}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[_ngcontent-%COMP%]:focus + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);width:133.3333333333%}.mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);width:133.3333433333%}.mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[label][_ngcontent-%COMP%]:not(:label-shown) + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);width:133.3333533333%}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{top:1.28125em}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]{bottom:1.25em}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-subscript-wrapper[_ngcontent-%COMP%]{margin-top:.5416666667em;top:calc(100% - 1.6666666667em)}@media print{.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[_ngcontent-%COMP%]:focus + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.28122em) scale(0.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-autofill-control[_ngcontent-%COMP%]:-webkit-autofill + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.28121em) scale(0.75)}.mat-form-field-appearance-legacy.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[label][_ngcontent-%COMP%]:not(:label-shown) + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.2812em) scale(0.75)}}.mat-form-field-appearance-fill[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{padding:.25em 0 .75em 0}.mat-form-field-appearance-fill[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{top:1.09375em;margin-top:-0.5em}.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-form-field-appearance-fill.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[_ngcontent-%COMP%]:focus + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-0.59375em) scale(0.75);width:133.3333333333%}.mat-form-field-appearance-fill.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[label][_ngcontent-%COMP%]:not(:label-shown) + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-0.59374em) scale(0.75);width:133.3333433333%}.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{padding:1em 0 1em 0}.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{top:1.84375em;margin-top:-0.25em}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-form-field-appearance-outline.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[_ngcontent-%COMP%]:focus + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.59375em) scale(0.75);width:133.3333333333%}.mat-form-field-appearance-outline.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-input-server[label][_ngcontent-%COMP%]:not(:label-shown) + .mat-form-field-label-wrapper[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{transform:translateY(-1.59374em) scale(0.75);width:133.3333433333%}.mat-grid-tile-header[_ngcontent-%COMP%], .mat-grid-tile-footer[_ngcontent-%COMP%]{font-size:14px}.mat-grid-tile-header[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%], .mat-grid-tile-footer[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2), .mat-grid-tile-footer[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2){font-size:12px}input.mat-input-element[_ngcontent-%COMP%]{margin-top:-0.0625em}.mat-menu-item[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:400}.mat-paginator[_ngcontent-%COMP%], .mat-paginator-page-size[_ngcontent-%COMP%]   .mat-select-trigger[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px}.mat-radio-button[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-select[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-select-trigger[_ngcontent-%COMP%]{height:1.125em}.mat-slide-toggle-content[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-slider-thumb-label-text[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px;font-weight:500}.mat-stepper-vertical[_ngcontent-%COMP%], .mat-stepper-horizontal[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-step-label[_ngcontent-%COMP%]{font-size:14px;font-weight:400}.mat-step-sub-label-error[_ngcontent-%COMP%]{font-weight:normal}.mat-step-label-error[_ngcontent-%COMP%]{font-size:14px}.mat-step-label-selected[_ngcontent-%COMP%]{font-size:14px;font-weight:500}.mat-tab-group[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-tab-label[_ngcontent-%COMP%], .mat-tab-link[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-toolbar[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal;margin:0}.mat-tooltip[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset[_ngcontent-%COMP%]{font-size:14px;padding-top:8px;padding-bottom:8px}.mat-list-item[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-list-option[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{font-size:16px}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2){font-size:14px}.mat-list-base[_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]{font-size:16px}.mat-list-base[_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2){font-size:14px}.mat-list-base[_ngcontent-%COMP%]   .mat-subheader[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{font-size:12px}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2){font-size:12px}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]{font-size:12px}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]   .mat-line[_ngcontent-%COMP%]:nth-child(n+2){font-size:12px}.mat-list-base[dense][_ngcontent-%COMP%]   .mat-subheader[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px;font-weight:500}.mat-option[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:16px}.mat-optgroup-label[_ngcontent-%COMP%]{font:500 14px/24px Roboto, \"Helvetica Neue\", sans-serif;letter-spacing:normal}.mat-simple-snackbar[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px}.mat-simple-snackbar-action[_ngcontent-%COMP%]{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree[_ngcontent-%COMP%]{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-tree-node[_ngcontent-%COMP%], .mat-nested-tree-node[_ngcontent-%COMP%]{font-weight:400;font-size:14px}.mat-ripple[_ngcontent-%COMP%]{overflow:hidden;position:relative}.mat-ripple[_ngcontent-%COMP%]:not(:empty){transform:translateZ(0)}.mat-ripple.mat-ripple-unbounded[_ngcontent-%COMP%]{overflow:visible}.mat-ripple-element[_ngcontent-%COMP%]{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(0)}.cdk-high-contrast-active[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{display:none}.cdk-visually-hidden[_ngcontent-%COMP%]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;outline:0;-webkit-appearance:none;-moz-appearance:none;left:0}[dir=rtl][_ngcontent-%COMP%]   .cdk-visually-hidden[_ngcontent-%COMP%]{left:auto;right:0}.cdk-overlay-container[_ngcontent-%COMP%], .cdk-global-overlay-wrapper[_ngcontent-%COMP%]{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container[_ngcontent-%COMP%]{position:fixed;z-index:1000}.cdk-overlay-container[_ngcontent-%COMP%]:empty{display:none}.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane[_ngcontent-%COMP%]{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:1}.cdk-high-contrast-active[_ngcontent-%COMP%]   .cdk-overlay-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:.6}.cdk-overlay-dark-backdrop[_ngcontent-%COMP%]{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop[_ngcontent-%COMP%]{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:0;visibility:visible}.cdk-overlay-connected-position-bounding-box[_ngcontent-%COMP%]{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock[_ngcontent-%COMP%]{position:fixed;width:100%;overflow-y:scroll}textarea.cdk-textarea-autosize[_ngcontent-%COMP%]{resize:none}textarea.cdk-textarea-autosize-measuring[_ngcontent-%COMP%]{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox[_ngcontent-%COMP%]{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{}@keyframes cdk-text-field-autofill-end{}.cdk-text-field-autofill-monitored[_ngcontent-%COMP%]:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored[_ngcontent-%COMP%]:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}.mat-focus-indicator[_ngcontent-%COMP%]{position:relative}.mat-mdc-focus-indicator[_ngcontent-%COMP%]{position:relative}.mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1)}.mat-option[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-option[_ngcontent-%COMP%]:hover:not(.mat-option-disabled), .mat-option[_ngcontent-%COMP%]:focus:not(.mat-option-disabled){background:rgba(0,0,0,.04)}.mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-option-multiple):not(.mat-option-disabled){background:rgba(0,0,0,.04)}.mat-option.mat-active[_ngcontent-%COMP%]{background:rgba(0,0,0,.04);color:rgba(0,0,0,.87)}.mat-option.mat-option-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-primary[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-option-disabled){color:#673ab7}.mat-accent[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-option-disabled){color:#ffd740}.mat-warn[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-option-disabled){color:#f44336}.mat-optgroup-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-optgroup-disabled[_ngcontent-%COMP%]   .mat-optgroup-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-pseudo-checkbox[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-pseudo-checkbox[_ngcontent-%COMP%]::after{color:#fafafa}.mat-pseudo-checkbox-disabled[_ngcontent-%COMP%]{color:#b0b0b0}.mat-primary[_ngcontent-%COMP%]   .mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-primary[_ngcontent-%COMP%]   .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%]{background:#673ab7}.mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%], .mat-accent[_ngcontent-%COMP%]   .mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-accent[_ngcontent-%COMP%]   .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%]{background:#ffd740}.mat-warn[_ngcontent-%COMP%]   .mat-pseudo-checkbox-checked[_ngcontent-%COMP%], .mat-warn[_ngcontent-%COMP%]   .mat-pseudo-checkbox-indeterminate[_ngcontent-%COMP%]{background:#f44336}.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled[_ngcontent-%COMP%], .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled[_ngcontent-%COMP%]{background:#b0b0b0}.mat-app-background[_ngcontent-%COMP%]{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-elevation-z0[_ngcontent-%COMP%]{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z1[_ngcontent-%COMP%]{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z2[_ngcontent-%COMP%]{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z3[_ngcontent-%COMP%]{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z4[_ngcontent-%COMP%]{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z5[_ngcontent-%COMP%]{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z6[_ngcontent-%COMP%]{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-elevation-z7[_ngcontent-%COMP%]{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)}.mat-elevation-z8[_ngcontent-%COMP%]{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-elevation-z9[_ngcontent-%COMP%]{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)}.mat-elevation-z10[_ngcontent-%COMP%]{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)}.mat-elevation-z11[_ngcontent-%COMP%]{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)}.mat-elevation-z12[_ngcontent-%COMP%]{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-elevation-z13[_ngcontent-%COMP%]{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)}.mat-elevation-z14[_ngcontent-%COMP%]{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)}.mat-elevation-z15[_ngcontent-%COMP%]{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)}.mat-elevation-z16[_ngcontent-%COMP%]{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)}.mat-elevation-z17[_ngcontent-%COMP%]{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)}.mat-elevation-z18[_ngcontent-%COMP%]{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)}.mat-elevation-z19[_ngcontent-%COMP%]{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)}.mat-elevation-z20[_ngcontent-%COMP%]{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)}.mat-elevation-z21[_ngcontent-%COMP%]{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)}.mat-elevation-z22[_ngcontent-%COMP%]{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)}.mat-elevation-z23[_ngcontent-%COMP%]{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)}.mat-elevation-z24[_ngcontent-%COMP%]{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)}.mat-theme-loaded-marker[_ngcontent-%COMP%]{display:none}.mat-autocomplete-panel[_ngcontent-%COMP%]{background:#fff;color:rgba(0,0,0,.87)}.mat-autocomplete-panel[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)}.mat-autocomplete-panel[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-active):not(:hover){background:#fff}.mat-autocomplete-panel[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,.87)}.mat-badge[_ngcontent-%COMP%]{position:relative}.mat-badge.mat-badge[_ngcontent-%COMP%]{overflow:visible}.mat-badge-hidden[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{display:none}.mat-badge-content[_ngcontent-%COMP%]{position:absolute;text-align:center;display:inline-block;border-radius:50%;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none}.ng-animate-disabled[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%], .mat-badge-content._mat-animation-noopable[_ngcontent-%COMP%]{transition:none}.mat-badge-content.mat-badge-active[_ngcontent-%COMP%]{transform:none}.mat-badge-small[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{width:16px;height:16px;line-height:16px}.mat-badge-small.mat-badge-above[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{top:-8px}.mat-badge-small.mat-badge-below[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{bottom:-8px}.mat-badge-small.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-16px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-small.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-16px}.mat-badge-small.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-16px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-small.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-16px}.mat-badge-small.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-8px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-small.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-8px}.mat-badge-small.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-8px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-small.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-8px}.mat-badge-medium[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{width:22px;height:22px;line-height:22px}.mat-badge-medium.mat-badge-above[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{top:-11px}.mat-badge-medium.mat-badge-below[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{bottom:-11px}.mat-badge-medium.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-22px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-medium.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-22px}.mat-badge-medium.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-22px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-medium.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-22px}.mat-badge-medium.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-11px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-medium.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-11px}.mat-badge-medium.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-11px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-medium.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-11px}.mat-badge-large[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{width:28px;height:28px;line-height:28px}.mat-badge-large.mat-badge-above[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{top:-14px}.mat-badge-large.mat-badge-below[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{bottom:-14px}.mat-badge-large.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-28px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-large.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-28px}.mat-badge-large.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-28px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-large.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-28px}.mat-badge-large.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:-14px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-large.mat-badge-overlap.mat-badge-before[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{left:auto;right:-14px}.mat-badge-large.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:-14px}[dir=rtl][_ngcontent-%COMP%]   .mat-badge-large.mat-badge-overlap.mat-badge-after[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{right:auto;left:-14px}.mat-badge-content[_ngcontent-%COMP%]{color:#fff;background:#673ab7}.cdk-high-contrast-active[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{outline:solid 1px;border-radius:0}.mat-badge-accent[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{background:#ffd740;color:rgba(0,0,0,.87)}.mat-badge-warn[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{color:#fff;background:#f44336}.mat-badge-disabled[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{background:#b9b9b9;color:rgba(0,0,0,.38)}.mat-bottom-sheet-container[_ngcontent-%COMP%]{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12);background:#fff;color:rgba(0,0,0,.87)}.mat-button[_ngcontent-%COMP%], .mat-icon-button[_ngcontent-%COMP%], .mat-stroked-button[_ngcontent-%COMP%]{color:inherit;background:transparent}.mat-button.mat-primary[_ngcontent-%COMP%], .mat-icon-button.mat-primary[_ngcontent-%COMP%], .mat-stroked-button.mat-primary[_ngcontent-%COMP%]{color:#673ab7}.mat-button.mat-accent[_ngcontent-%COMP%], .mat-icon-button.mat-accent[_ngcontent-%COMP%], .mat-stroked-button.mat-accent[_ngcontent-%COMP%]{color:#ffd740}.mat-button.mat-warn[_ngcontent-%COMP%], .mat-icon-button.mat-warn[_ngcontent-%COMP%], .mat-stroked-button.mat-warn[_ngcontent-%COMP%]{color:#f44336}.mat-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-icon-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-icon-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-icon-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-icon-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-stroked-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-stroked-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-stroked-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-stroked-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.26)}.mat-button.mat-primary[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-icon-button.mat-primary[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-stroked-button.mat-primary[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%]{background-color:#673ab7}.mat-button.mat-accent[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-icon-button.mat-accent[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-stroked-button.mat-accent[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%]{background-color:#ffd740}.mat-button.mat-warn[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-icon-button.mat-warn[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-stroked-button.mat-warn[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%]{background-color:#f44336}.mat-button.mat-button-disabled[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-icon-button.mat-button-disabled[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%], .mat-stroked-button.mat-button-disabled[_ngcontent-%COMP%]   .mat-button-focus-overlay[_ngcontent-%COMP%]{background-color:transparent}.mat-button[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-icon-button[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-stroked-button[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{opacity:.1;background-color:currentColor}.mat-button-focus-overlay[_ngcontent-%COMP%]{background:#000}.mat-stroked-button[_ngcontent-%COMP%]:not(.mat-button-disabled){border-color:rgba(0,0,0,.12)}.mat-flat-button[_ngcontent-%COMP%], .mat-raised-button[_ngcontent-%COMP%], .mat-fab[_ngcontent-%COMP%], .mat-mini-fab[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);background-color:#fff}.mat-flat-button.mat-primary[_ngcontent-%COMP%], .mat-raised-button.mat-primary[_ngcontent-%COMP%], .mat-fab.mat-primary[_ngcontent-%COMP%], .mat-mini-fab.mat-primary[_ngcontent-%COMP%]{color:#fff}.mat-flat-button.mat-accent[_ngcontent-%COMP%], .mat-raised-button.mat-accent[_ngcontent-%COMP%], .mat-fab.mat-accent[_ngcontent-%COMP%], .mat-mini-fab.mat-accent[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-flat-button.mat-warn[_ngcontent-%COMP%], .mat-raised-button.mat-warn[_ngcontent-%COMP%], .mat-fab.mat-warn[_ngcontent-%COMP%], .mat-mini-fab.mat-warn[_ngcontent-%COMP%]{color:#fff}.mat-flat-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.26)}.mat-flat-button.mat-primary[_ngcontent-%COMP%], .mat-raised-button.mat-primary[_ngcontent-%COMP%], .mat-fab.mat-primary[_ngcontent-%COMP%], .mat-mini-fab.mat-primary[_ngcontent-%COMP%]{background-color:#673ab7}.mat-flat-button.mat-accent[_ngcontent-%COMP%], .mat-raised-button.mat-accent[_ngcontent-%COMP%], .mat-fab.mat-accent[_ngcontent-%COMP%], .mat-mini-fab.mat-accent[_ngcontent-%COMP%]{background-color:#ffd740}.mat-flat-button.mat-warn[_ngcontent-%COMP%], .mat-raised-button.mat-warn[_ngcontent-%COMP%], .mat-fab.mat-warn[_ngcontent-%COMP%], .mat-mini-fab.mat-warn[_ngcontent-%COMP%]{background-color:#f44336}.mat-flat-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-flat-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-raised-button.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-fab.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-primary.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-accent.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-warn.mat-button-disabled[_ngcontent-%COMP%], .mat-mini-fab.mat-button-disabled.mat-button-disabled[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.12)}.mat-flat-button.mat-primary[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-raised-button.mat-primary[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-fab.mat-primary[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-mini-fab.mat-primary[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(255,255,255,.1)}.mat-flat-button.mat-accent[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-raised-button.mat-accent[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-fab.mat-accent[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-mini-fab.mat-accent[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1)}.mat-flat-button.mat-warn[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-raised-button.mat-warn[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-fab.mat-warn[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-mini-fab.mat-warn[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(255,255,255,.1)}.mat-stroked-button[_ngcontent-%COMP%]:not([class*=mat-elevation-z]), .mat-flat-button[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-raised-button[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-raised-button[_ngcontent-%COMP%]:not(.mat-button-disabled):active:not([class*=mat-elevation-z]){box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-raised-button.mat-button-disabled[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-fab[_ngcontent-%COMP%]:not([class*=mat-elevation-z]), .mat-mini-fab[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-fab[_ngcontent-%COMP%]:not(.mat-button-disabled):active:not([class*=mat-elevation-z]), .mat-mini-fab[_ngcontent-%COMP%]:not(.mat-button-disabled):active:not([class*=mat-elevation-z]){box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-fab.mat-button-disabled[_ngcontent-%COMP%]:not([class*=mat-elevation-z]), .mat-mini-fab.mat-button-disabled[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-button-toggle-standalone[_ngcontent-%COMP%]:not([class*=mat-elevation-z]), .mat-button-toggle-group[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]:not([class*=mat-elevation-z]), .mat-button-toggle-group-appearance-standard[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:none}.mat-button-toggle[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-button-toggle[_ngcontent-%COMP%]   .mat-button-toggle-focus-overlay[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.12)}.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);background:#fff}.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]   .mat-button-toggle-focus-overlay[_ngcontent-%COMP%]{background-color:#000}.mat-button-toggle-group-appearance-standard[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%] + .mat-button-toggle[_ngcontent-%COMP%]{border-left:solid 1px #e0e0e0}[dir=rtl][_ngcontent-%COMP%]   .mat-button-toggle-group-appearance-standard[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%] + .mat-button-toggle[_ngcontent-%COMP%]{border-left:none;border-right:solid 1px #e0e0e0}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical[_ngcontent-%COMP%]   .mat-button-toggle[_ngcontent-%COMP%] + .mat-button-toggle[_ngcontent-%COMP%]{border-left:none;border-right:none;border-top:solid 1px #e0e0e0}.mat-button-toggle-checked[_ngcontent-%COMP%]{background-color:#e0e0e0;color:rgba(0,0,0,.54)}.mat-button-toggle-checked.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-button-toggle-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.26);background-color:#eee}.mat-button-toggle-disabled.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]{background:#fff}.mat-button-toggle-disabled.mat-button-toggle-checked[_ngcontent-%COMP%]{background-color:#bdbdbd}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard[_ngcontent-%COMP%], .mat-button-toggle-group-appearance-standard[_ngcontent-%COMP%]{border:solid 1px #e0e0e0}.mat-button-toggle-appearance-standard[_ngcontent-%COMP%]   .mat-button-toggle-label-content[_ngcontent-%COMP%]{line-height:48px}.mat-card[_ngcontent-%COMP%]{background:#fff;color:rgba(0,0,0,.87)}.mat-card[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)}.mat-card.mat-card-flat[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mat-card-subtitle[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-checkbox-frame[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.54)}.mat-checkbox-checkmark[_ngcontent-%COMP%]{fill:#fafafa}.mat-checkbox-checkmark-path[_ngcontent-%COMP%]{stroke:#fafafa !important}.mat-checkbox-mixedmark[_ngcontent-%COMP%]{background-color:#fafafa}.mat-checkbox-indeterminate.mat-primary[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%], .mat-checkbox-checked.mat-primary[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%]{background-color:#673ab7}.mat-checkbox-indeterminate.mat-accent[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%], .mat-checkbox-checked.mat-accent[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%]{background-color:#ffd740}.mat-checkbox-indeterminate.mat-warn[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%], .mat-checkbox-checked.mat-warn[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%]{background-color:#f44336}.mat-checkbox-disabled.mat-checkbox-checked[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%], .mat-checkbox-disabled.mat-checkbox-indeterminate[_ngcontent-%COMP%]   .mat-checkbox-background[_ngcontent-%COMP%]{background-color:#b0b0b0}.mat-checkbox-disabled[_ngcontent-%COMP%]:not(.mat-checkbox-checked)   .mat-checkbox-frame[_ngcontent-%COMP%]{border-color:#b0b0b0}.mat-checkbox-disabled[_ngcontent-%COMP%]   .mat-checkbox-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-checkbox[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#000}.mat-checkbox-checked[_ngcontent-%COMP%]:not(.mat-checkbox-disabled).mat-primary   .mat-ripple-element[_ngcontent-%COMP%], .mat-checkbox[_ngcontent-%COMP%]:active:not(.mat-checkbox-disabled).mat-primary   .mat-ripple-element[_ngcontent-%COMP%]{background:#673ab7}.mat-checkbox-checked[_ngcontent-%COMP%]:not(.mat-checkbox-disabled).mat-accent   .mat-ripple-element[_ngcontent-%COMP%], .mat-checkbox[_ngcontent-%COMP%]:active:not(.mat-checkbox-disabled).mat-accent   .mat-ripple-element[_ngcontent-%COMP%]{background:#ffd740}.mat-checkbox-checked[_ngcontent-%COMP%]:not(.mat-checkbox-disabled).mat-warn   .mat-ripple-element[_ngcontent-%COMP%], .mat-checkbox[_ngcontent-%COMP%]:active:not(.mat-checkbox-disabled).mat-warn   .mat-ripple-element[_ngcontent-%COMP%]{background:#f44336}.mat-chip.mat-standard-chip[_ngcontent-%COMP%]{background-color:#e0e0e0;color:rgba(0,0,0,.87)}.mat-chip.mat-standard-chip[_ngcontent-%COMP%]   .mat-chip-remove[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);opacity:.4}.mat-chip.mat-standard-chip[_ngcontent-%COMP%]:not(.mat-chip-disabled):active{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0, 0, 0, 0.12)}.mat-chip.mat-standard-chip[_ngcontent-%COMP%]:not(.mat-chip-disabled)   .mat-chip-remove[_ngcontent-%COMP%]:hover{opacity:.54}.mat-chip.mat-standard-chip.mat-chip-disabled[_ngcontent-%COMP%]{opacity:.4}.mat-chip.mat-standard-chip[_ngcontent-%COMP%]::after{background:#000}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary[_ngcontent-%COMP%]{background-color:#673ab7;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary[_ngcontent-%COMP%]   .mat-chip-remove[_ngcontent-%COMP%]{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(255,255,255,.1)}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn[_ngcontent-%COMP%]{background-color:#f44336;color:#fff}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn[_ngcontent-%COMP%]   .mat-chip-remove[_ngcontent-%COMP%]{color:#fff;opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(255,255,255,.1)}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent[_ngcontent-%COMP%]{background-color:#ffd740;color:rgba(0,0,0,.87)}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent[_ngcontent-%COMP%]   .mat-chip-remove[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);opacity:.4}.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1)}.mat-table[_ngcontent-%COMP%]{background:#fff}.mat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], .mat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], .mat-table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%], mat-header-row[_ngcontent-%COMP%], mat-row[_ngcontent-%COMP%], mat-footer-row[_ngcontent-%COMP%], [mat-header-row][_ngcontent-%COMP%], [mat-row][_ngcontent-%COMP%], [mat-footer-row][_ngcontent-%COMP%], .mat-table-sticky[_ngcontent-%COMP%]{background:inherit}mat-row[_ngcontent-%COMP%], mat-header-row[_ngcontent-%COMP%], mat-footer-row[_ngcontent-%COMP%], th.mat-header-cell[_ngcontent-%COMP%], td.mat-cell[_ngcontent-%COMP%], td.mat-footer-cell[_ngcontent-%COMP%]{border-bottom-color:rgba(0,0,0,.12)}.mat-header-cell[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-cell[_ngcontent-%COMP%], .mat-footer-cell[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-calendar-arrow[_ngcontent-%COMP%]{fill:rgba(0,0,0,.54)}.mat-datepicker-toggle[_ngcontent-%COMP%], .mat-datepicker-content[_ngcontent-%COMP%]   .mat-calendar-next-button[_ngcontent-%COMP%], .mat-datepicker-content[_ngcontent-%COMP%]   .mat-calendar-previous-button[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-calendar-table-header-divider[_ngcontent-%COMP%]::after{background:rgba(0,0,0,.12)}.mat-calendar-table-header[_ngcontent-%COMP%], .mat-calendar-body-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-calendar-body-cell-content[_ngcontent-%COMP%], .mat-date-range-input-separator[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);border-color:transparent}.mat-calendar-body-disabled[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){color:rgba(0,0,0,.38)}.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-date-range-input-separator[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-calendar-body-in-preview[_ngcontent-%COMP%]{color:rgba(0,0,0,.24)}.mat-calendar-body-today[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){border-color:rgba(0,0,0,.38)}.mat-calendar-body-disabled[_ngcontent-%COMP%] > .mat-calendar-body-today[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){border-color:rgba(0,0,0,.18)}.mat-calendar-body-in-range[_ngcontent-%COMP%]::before{background:rgba(103,58,183,.2)}.mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%]::before{background:rgba(249,171,0,.2)}.mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before, [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before{background:linear-gradient(to right, rgba(103, 58, 183, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before, [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before{background:linear-gradient(to left, rgba(103, 58, 183, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-calendar-body-in-range[_ngcontent-%COMP%] > .mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-calendar-body-in-comparison-range.mat-calendar-body-in-range[_ngcontent-%COMP%]::after{background:#a8dab5}.mat-calendar-body-comparison-identical.mat-calendar-body-selected[_ngcontent-%COMP%], .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background:#46a35e}.mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:#673ab7;color:#fff}.mat-calendar-body-disabled[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:rgba(103,58,183,.4)}.mat-calendar-body-today.mat-calendar-body-selected[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 1px #fff}.cdk-keyboard-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(103,58,183,.3)}@media(hover: hover){.mat-calendar-body-cell[_ngcontent-%COMP%]:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(103,58,183,.3)}}.mat-datepicker-content[_ngcontent-%COMP%]{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12);background-color:#fff;color:rgba(0,0,0,.87)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-in-range[_ngcontent-%COMP%]::before{background:rgba(255,215,64,.2)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%]::before{background:rgba(249,171,0,.2)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before, .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before{background:linear-gradient(to right, rgba(255, 215, 64, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before, .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before{background:linear-gradient(to left, rgba(255, 215, 64, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-in-range[_ngcontent-%COMP%] > .mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range.mat-calendar-body-in-range[_ngcontent-%COMP%]::after{background:#a8dab5}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-comparison-identical.mat-calendar-body-selected[_ngcontent-%COMP%], .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background:#46a35e}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:#ffd740;color:rgba(0,0,0,.87)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-disabled[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:rgba(255,215,64,.4)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-today.mat-calendar-body-selected[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 1px rgba(0,0,0,.87)}.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .cdk-keyboard-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .cdk-program-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(255,215,64,.3)}@media(hover: hover){.mat-datepicker-content.mat-accent[_ngcontent-%COMP%]   .mat-calendar-body-cell[_ngcontent-%COMP%]:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(255,215,64,.3)}}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-in-range[_ngcontent-%COMP%]::before{background:rgba(244,67,54,.2)}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%]::before{background:rgba(249,171,0,.2)}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before, .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before{background:linear-gradient(to right, rgba(244, 67, 54, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-end[_ngcontent-%COMP%]::before, .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   [dir=rtl][_ngcontent-%COMP%]   .mat-calendar-body-comparison-bridge-start[_ngcontent-%COMP%]::before{background:linear-gradient(to left, rgba(244, 67, 54, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%)}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-in-range[_ngcontent-%COMP%] > .mat-calendar-body-comparison-identical[_ngcontent-%COMP%], .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range.mat-calendar-body-in-range[_ngcontent-%COMP%]::after{background:#a8dab5}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-comparison-identical.mat-calendar-body-selected[_ngcontent-%COMP%], .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-in-comparison-range[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background:#46a35e}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:#f44336;color:#fff}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-disabled[_ngcontent-%COMP%] > .mat-calendar-body-selected[_ngcontent-%COMP%]{background-color:rgba(244,67,54,.4)}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-today.mat-calendar-body-selected[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 1px #fff}.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .cdk-keyboard-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .cdk-program-focused[_ngcontent-%COMP%]   .mat-calendar-body-active[_ngcontent-%COMP%] > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(244,67,54,.3)}@media(hover: hover){.mat-datepicker-content.mat-warn[_ngcontent-%COMP%]   .mat-calendar-body-cell[_ngcontent-%COMP%]:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content[_ngcontent-%COMP%]:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical){background-color:rgba(244,67,54,.3)}}.mat-datepicker-content-touch[_ngcontent-%COMP%]{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)}.mat-datepicker-toggle-active[_ngcontent-%COMP%]{color:#673ab7}.mat-datepicker-toggle-active.mat-accent[_ngcontent-%COMP%]{color:#ffd740}.mat-datepicker-toggle-active.mat-warn[_ngcontent-%COMP%]{color:#f44336}.mat-date-range-input-inner[disabled][_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-dialog-container[_ngcontent-%COMP%]{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12);background:#fff;color:rgba(0,0,0,.87)}.mat-divider[_ngcontent-%COMP%]{border-top-color:rgba(0,0,0,.12)}.mat-divider-vertical[_ngcontent-%COMP%]{border-right-color:rgba(0,0,0,.12)}.mat-expansion-panel[_ngcontent-%COMP%]{background:#fff;color:rgba(0,0,0,.87)}.mat-expansion-panel[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-action-row[_ngcontent-%COMP%]{border-top-color:rgba(0,0,0,.12)}.mat-expansion-panel[_ngcontent-%COMP%]   .mat-expansion-panel-header.cdk-keyboard-focused[_ngcontent-%COMP%]:not([aria-disabled=true]), .mat-expansion-panel[_ngcontent-%COMP%]   .mat-expansion-panel-header.cdk-program-focused[_ngcontent-%COMP%]:not([aria-disabled=true]), .mat-expansion-panel[_ngcontent-%COMP%]:not(.mat-expanded)   .mat-expansion-panel-header[_ngcontent-%COMP%]:hover:not([aria-disabled=true]){background:rgba(0,0,0,.04)}@media(hover: none){.mat-expansion-panel[_ngcontent-%COMP%]:not(.mat-expanded):not([aria-disabled=true])   .mat-expansion-panel-header[_ngcontent-%COMP%]:hover{background:#fff}}.mat-expansion-panel-header-title[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-expansion-panel-header-description[_ngcontent-%COMP%], .mat-expansion-indicator[_ngcontent-%COMP%]::after{color:rgba(0,0,0,.54)}.mat-expansion-panel-header[aria-disabled=true][_ngcontent-%COMP%]{color:rgba(0,0,0,.26)}.mat-expansion-panel-header[aria-disabled=true][_ngcontent-%COMP%]   .mat-expansion-panel-header-title[_ngcontent-%COMP%], .mat-expansion-panel-header[aria-disabled=true][_ngcontent-%COMP%]   .mat-expansion-panel-header-description[_ngcontent-%COMP%]{color:inherit}.mat-expansion-panel-header[_ngcontent-%COMP%]{height:48px}.mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]{height:64px}.mat-form-field-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.6)}.mat-hint[_ngcontent-%COMP%]{color:rgba(0,0,0,.6)}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#673ab7}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-label.mat-accent[_ngcontent-%COMP%]{color:#ffd740}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-label.mat-warn[_ngcontent-%COMP%]{color:#f44336}.mat-focused[_ngcontent-%COMP%]   .mat-form-field-required-marker[_ngcontent-%COMP%]{color:#ffd740}.mat-form-field-ripple[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.87)}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{background-color:#673ab7}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-ripple.mat-accent[_ngcontent-%COMP%]{background-color:#ffd740}.mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-form-field-ripple.mat-warn[_ngcontent-%COMP%]{background-color:#f44336}.mat-form-field-type-mat-native-select.mat-focused[_ngcontent-%COMP%]:not(.mat-form-field-invalid)   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:#673ab7}.mat-form-field-type-mat-native-select.mat-focused[_ngcontent-%COMP%]:not(.mat-form-field-invalid).mat-accent   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:#ffd740}.mat-form-field-type-mat-native-select.mat-focused[_ngcontent-%COMP%]:not(.mat-form-field-invalid).mat-warn   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:#f44336}.mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#f44336}.mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-label.mat-accent[_ngcontent-%COMP%], .mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]   .mat-form-field-required-marker[_ngcontent-%COMP%]{color:#f44336}.mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-form-field.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-ripple.mat-accent[_ngcontent-%COMP%]{background-color:#f44336}.mat-error[_ngcontent-%COMP%]{color:#f44336}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-hint[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-legacy.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]{background-image:linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-standard[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-standard.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]{background-image:linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.mat-form-field-appearance-fill[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.04)}.mat-form-field-appearance-fill.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-flex[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.02)}.mat-form-field-appearance-fill[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]::before{background-color:rgba(0,0,0,.42)}.mat-form-field-appearance-fill.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-form-field-appearance-fill.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%]::before{background-color:transparent}.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-outline[_ngcontent-%COMP%]{color:rgba(0,0,0,.12)}.mat-form-field-appearance-outline[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-form-field-appearance-outline.mat-focused[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:#673ab7}.mat-form-field-appearance-outline.mat-focused.mat-accent[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:#ffd740}.mat-form-field-appearance-outline.mat-focused.mat-warn[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:#f44336}.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-outline-thick[_ngcontent-%COMP%]{color:#f44336}.mat-form-field-appearance-outline.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-form-field-appearance-outline.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-outline[_ngcontent-%COMP%]{color:rgba(0,0,0,.06)}.mat-icon.mat-primary[_ngcontent-%COMP%]{color:#673ab7}.mat-icon.mat-accent[_ngcontent-%COMP%]{color:#ffd740}.mat-icon.mat-warn[_ngcontent-%COMP%]{color:#f44336}.mat-form-field-type-mat-native-select[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:rgba(0,0,0,.54)}.mat-input-element[_ngcontent-%COMP%]:disabled, .mat-form-field-type-mat-native-select.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:rgba(0,0,0,.38)}.mat-input-element[_ngcontent-%COMP%]{caret-color:#673ab7}.mat-input-element[_ngcontent-%COMP%]::placeholder{color:rgba(0,0,0,.42)}.mat-input-element[_ngcontent-%COMP%]::-moz-placeholder{color:rgba(0,0,0,.42)}.mat-input-element[_ngcontent-%COMP%]::-webkit-input-placeholder{color:rgba(0,0,0,.42)}.mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{color:rgba(0,0,0,.42)}.mat-form-field.mat-accent[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{caret-color:#ffd740}.mat-form-field.mat-warn[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%], .mat-form-field-invalid[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{caret-color:#f44336}.mat-form-field-type-mat-native-select.mat-form-field-invalid[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]::after{color:#f44336}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-list-base[_ngcontent-%COMP%]   .mat-list-option[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-list-base[_ngcontent-%COMP%]   .mat-subheader[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-list-base[_ngcontent-%COMP%]   .mat-list-item-disabled[_ngcontent-%COMP%]{background-color:#eee;color:rgba(0,0,0,.38)}.mat-list-option[_ngcontent-%COMP%]:hover, .mat-list-option[_ngcontent-%COMP%]:focus, .mat-nav-list[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]:hover, .mat-nav-list[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]:focus, .mat-action-list[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]:hover, .mat-action-list[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]:focus{background:rgba(0,0,0,.04)}.mat-list-single-selected-option[_ngcontent-%COMP%], .mat-list-single-selected-option[_ngcontent-%COMP%]:hover, .mat-list-single-selected-option[_ngcontent-%COMP%]:focus{background:rgba(0,0,0,.12)}.mat-menu-panel[_ngcontent-%COMP%]{background:#fff}.mat-menu-panel[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)}.mat-menu-item[_ngcontent-%COMP%]{background:transparent;color:rgba(0,0,0,.87)}.mat-menu-item[disabled][_ngcontent-%COMP%], .mat-menu-item[disabled][_ngcontent-%COMP%]   .mat-menu-submenu-icon[_ngcontent-%COMP%], .mat-menu-item[disabled][_ngcontent-%COMP%]   .mat-icon-no-color[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-menu-item[_ngcontent-%COMP%]   .mat-icon-no-color[_ngcontent-%COMP%], .mat-menu-submenu-icon[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-menu-item[_ngcontent-%COMP%]:hover:not([disabled]), .mat-menu-item.cdk-program-focused[_ngcontent-%COMP%]:not([disabled]), .mat-menu-item.cdk-keyboard-focused[_ngcontent-%COMP%]:not([disabled]), .mat-menu-item-highlighted[_ngcontent-%COMP%]:not([disabled]){background:rgba(0,0,0,.04)}.mat-paginator[_ngcontent-%COMP%]{background:#fff}.mat-paginator[_ngcontent-%COMP%], .mat-paginator-page-size[_ngcontent-%COMP%]   .mat-select-trigger[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-paginator-decrement[_ngcontent-%COMP%], .mat-paginator-increment[_ngcontent-%COMP%]{border-top:2px solid rgba(0,0,0,.54);border-right:2px solid rgba(0,0,0,.54)}.mat-paginator-first[_ngcontent-%COMP%], .mat-paginator-last[_ngcontent-%COMP%]{border-top:2px solid rgba(0,0,0,.54)}.mat-icon-button[disabled][_ngcontent-%COMP%]   .mat-paginator-decrement[_ngcontent-%COMP%], .mat-icon-button[disabled][_ngcontent-%COMP%]   .mat-paginator-increment[_ngcontent-%COMP%], .mat-icon-button[disabled][_ngcontent-%COMP%]   .mat-paginator-first[_ngcontent-%COMP%], .mat-icon-button[disabled][_ngcontent-%COMP%]   .mat-paginator-last[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.38)}.mat-paginator-container[_ngcontent-%COMP%]{min-height:56px}.mat-progress-bar-background[_ngcontent-%COMP%]{fill:#d5cae9}.mat-progress-bar-buffer[_ngcontent-%COMP%]{background-color:#d5cae9}.mat-progress-bar-fill[_ngcontent-%COMP%]::after{background-color:#673ab7}.mat-progress-bar.mat-accent[_ngcontent-%COMP%]   .mat-progress-bar-background[_ngcontent-%COMP%]{fill:#fbf1cc}.mat-progress-bar.mat-accent[_ngcontent-%COMP%]   .mat-progress-bar-buffer[_ngcontent-%COMP%]{background-color:#fbf1cc}.mat-progress-bar.mat-accent[_ngcontent-%COMP%]   .mat-progress-bar-fill[_ngcontent-%COMP%]::after{background-color:#ffd740}.mat-progress-bar.mat-warn[_ngcontent-%COMP%]   .mat-progress-bar-background[_ngcontent-%COMP%]{fill:#f9ccc9}.mat-progress-bar.mat-warn[_ngcontent-%COMP%]   .mat-progress-bar-buffer[_ngcontent-%COMP%]{background-color:#f9ccc9}.mat-progress-bar.mat-warn[_ngcontent-%COMP%]   .mat-progress-bar-fill[_ngcontent-%COMP%]::after{background-color:#f44336}.mat-progress-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .mat-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#673ab7}.mat-progress-spinner.mat-accent[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .mat-spinner.mat-accent[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#ffd740}.mat-progress-spinner.mat-warn[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .mat-spinner.mat-warn[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#f44336}.mat-radio-outer-circle[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.54)}.mat-radio-button.mat-primary.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-outer-circle[_ngcontent-%COMP%]{border-color:#673ab7}.mat-radio-button.mat-primary[_ngcontent-%COMP%]   .mat-radio-inner-circle[_ngcontent-%COMP%], .mat-radio-button.mat-primary[_ngcontent-%COMP%]   .mat-radio-ripple[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-primary.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-persistent-ripple[_ngcontent-%COMP%], .mat-radio-button.mat-primary[_ngcontent-%COMP%]:active   .mat-radio-persistent-ripple[_ngcontent-%COMP%]{background-color:#673ab7}.mat-radio-button.mat-accent.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-outer-circle[_ngcontent-%COMP%]{border-color:#ffd740}.mat-radio-button.mat-accent[_ngcontent-%COMP%]   .mat-radio-inner-circle[_ngcontent-%COMP%], .mat-radio-button.mat-accent[_ngcontent-%COMP%]   .mat-radio-ripple[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-accent.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-persistent-ripple[_ngcontent-%COMP%], .mat-radio-button.mat-accent[_ngcontent-%COMP%]:active   .mat-radio-persistent-ripple[_ngcontent-%COMP%]{background-color:#ffd740}.mat-radio-button.mat-warn.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-outer-circle[_ngcontent-%COMP%]{border-color:#f44336}.mat-radio-button.mat-warn[_ngcontent-%COMP%]   .mat-radio-inner-circle[_ngcontent-%COMP%], .mat-radio-button.mat-warn[_ngcontent-%COMP%]   .mat-radio-ripple[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-warn.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-persistent-ripple[_ngcontent-%COMP%], .mat-radio-button.mat-warn[_ngcontent-%COMP%]:active   .mat-radio-persistent-ripple[_ngcontent-%COMP%]{background-color:#f44336}.mat-radio-button.mat-radio-disabled.mat-radio-checked[_ngcontent-%COMP%]   .mat-radio-outer-circle[_ngcontent-%COMP%], .mat-radio-button.mat-radio-disabled[_ngcontent-%COMP%]   .mat-radio-outer-circle[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.38)}.mat-radio-button.mat-radio-disabled[_ngcontent-%COMP%]   .mat-radio-ripple[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-radio-button.mat-radio-disabled[_ngcontent-%COMP%]   .mat-radio-inner-circle[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.38)}.mat-radio-button.mat-radio-disabled[_ngcontent-%COMP%]   .mat-radio-label-content[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-radio-button[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#000}.mat-select-value[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-select-placeholder[_ngcontent-%COMP%]{color:rgba(0,0,0,.42)}.mat-select-disabled[_ngcontent-%COMP%]   .mat-select-value[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-select-arrow[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-select-panel[_ngcontent-%COMP%]{background:#fff}.mat-select-panel[_ngcontent-%COMP%]:not([class*=mat-elevation-z]){box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)}.mat-select-panel[_ngcontent-%COMP%]   .mat-option.mat-selected[_ngcontent-%COMP%]:not(.mat-option-multiple){background:rgba(0,0,0,.12)}.mat-form-field.mat-focused.mat-primary[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:#673ab7}.mat-form-field.mat-focused.mat-accent[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:#ffd740}.mat-form-field.mat-focused.mat-warn[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:#f44336}.mat-form-field[_ngcontent-%COMP%]   .mat-select.mat-select-invalid[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:#f44336}.mat-form-field[_ngcontent-%COMP%]   .mat-select.mat-select-disabled[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-drawer-container[_ngcontent-%COMP%]{background-color:#fafafa;color:rgba(0,0,0,.87)}.mat-drawer[_ngcontent-%COMP%]{background-color:#fff;color:rgba(0,0,0,.87)}.mat-drawer.mat-drawer-push[_ngcontent-%COMP%]{background-color:#fff}.mat-drawer[_ngcontent-%COMP%]:not(.mat-drawer-side){box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)}.mat-drawer-side[_ngcontent-%COMP%]{border-right:solid 1px rgba(0,0,0,.12)}.mat-drawer-side.mat-drawer-end[_ngcontent-%COMP%]{border-left:solid 1px rgba(0,0,0,.12);border-right:none}[dir=rtl][_ngcontent-%COMP%]   .mat-drawer-side[_ngcontent-%COMP%]{border-left:solid 1px rgba(0,0,0,.12);border-right:none}[dir=rtl][_ngcontent-%COMP%]   .mat-drawer-side.mat-drawer-end[_ngcontent-%COMP%]{border-left:none;border-right:solid 1px rgba(0,0,0,.12)}.mat-drawer-backdrop.mat-drawer-shown[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.6)}.mat-slide-toggle.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-thumb[_ngcontent-%COMP%]{background-color:#ffd740}.mat-slide-toggle.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-bar[_ngcontent-%COMP%]{background-color:rgba(255,215,64,.54)}.mat-slide-toggle.mat-checked[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#ffd740}.mat-slide-toggle.mat-primary.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-thumb[_ngcontent-%COMP%]{background-color:#673ab7}.mat-slide-toggle.mat-primary.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-bar[_ngcontent-%COMP%]{background-color:rgba(103,58,183,.54)}.mat-slide-toggle.mat-primary.mat-checked[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#673ab7}.mat-slide-toggle.mat-warn.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-thumb[_ngcontent-%COMP%]{background-color:#f44336}.mat-slide-toggle.mat-warn.mat-checked[_ngcontent-%COMP%]   .mat-slide-toggle-bar[_ngcontent-%COMP%]{background-color:rgba(244,67,54,.54)}.mat-slide-toggle.mat-warn.mat-checked[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#f44336}.mat-slide-toggle[_ngcontent-%COMP%]:not(.mat-checked)   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#000}.mat-slide-toggle-thumb[_ngcontent-%COMP%]{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12);background-color:#fafafa}.mat-slide-toggle-bar[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.38)}.mat-slider-track-background[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.26)}.mat-slider.mat-primary[_ngcontent-%COMP%]   .mat-slider-track-fill[_ngcontent-%COMP%], .mat-slider.mat-primary[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-primary[_ngcontent-%COMP%]   .mat-slider-thumb-label[_ngcontent-%COMP%]{background-color:#673ab7}.mat-slider.mat-primary[_ngcontent-%COMP%]   .mat-slider-thumb-label-text[_ngcontent-%COMP%]{color:#fff}.mat-slider.mat-primary[_ngcontent-%COMP%]   .mat-slider-focus-ring[_ngcontent-%COMP%]{background-color:rgba(103,58,183,.2)}.mat-slider.mat-accent[_ngcontent-%COMP%]   .mat-slider-track-fill[_ngcontent-%COMP%], .mat-slider.mat-accent[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-accent[_ngcontent-%COMP%]   .mat-slider-thumb-label[_ngcontent-%COMP%]{background-color:#ffd740}.mat-slider.mat-accent[_ngcontent-%COMP%]   .mat-slider-thumb-label-text[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-slider.mat-accent[_ngcontent-%COMP%]   .mat-slider-focus-ring[_ngcontent-%COMP%]{background-color:rgba(255,215,64,.2)}.mat-slider.mat-warn[_ngcontent-%COMP%]   .mat-slider-track-fill[_ngcontent-%COMP%], .mat-slider.mat-warn[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-warn[_ngcontent-%COMP%]   .mat-slider-thumb-label[_ngcontent-%COMP%]{background-color:#f44336}.mat-slider.mat-warn[_ngcontent-%COMP%]   .mat-slider-thumb-label-text[_ngcontent-%COMP%]{color:#fff}.mat-slider.mat-warn[_ngcontent-%COMP%]   .mat-slider-focus-ring[_ngcontent-%COMP%]{background-color:rgba(244,67,54,.2)}.mat-slider[_ngcontent-%COMP%]:hover   .mat-slider-track-background[_ngcontent-%COMP%], .mat-slider.cdk-focused[_ngcontent-%COMP%]   .mat-slider-track-background[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.38)}.mat-slider.mat-slider-disabled[_ngcontent-%COMP%]   .mat-slider-track-background[_ngcontent-%COMP%], .mat-slider.mat-slider-disabled[_ngcontent-%COMP%]   .mat-slider-track-fill[_ngcontent-%COMP%], .mat-slider.mat-slider-disabled[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.26)}.mat-slider.mat-slider-disabled[_ngcontent-%COMP%]:hover   .mat-slider-track-background[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.26)}.mat-slider.mat-slider-min-value[_ngcontent-%COMP%]   .mat-slider-focus-ring[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.12)}.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing[_ngcontent-%COMP%]   .mat-slider-thumb-label[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.87)}.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused[_ngcontent-%COMP%]   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused[_ngcontent-%COMP%]   .mat-slider-thumb-label[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.26)}.mat-slider.mat-slider-min-value[_ngcontent-%COMP%]:not(.mat-slider-thumb-label-showing)   .mat-slider-thumb[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.26);background-color:transparent}.mat-slider.mat-slider-min-value[_ngcontent-%COMP%]:not(.mat-slider-thumb-label-showing):hover   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-slider-min-value[_ngcontent-%COMP%]:not(.mat-slider-thumb-label-showing).cdk-focused   .mat-slider-thumb[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.38)}.mat-slider.mat-slider-min-value[_ngcontent-%COMP%]:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled   .mat-slider-thumb[_ngcontent-%COMP%], .mat-slider.mat-slider-min-value[_ngcontent-%COMP%]:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled   .mat-slider-thumb[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.26)}.mat-slider-has-ticks[_ngcontent-%COMP%]   .mat-slider-wrapper[_ngcontent-%COMP%]::after{border-color:rgba(0,0,0,.7)}.mat-slider-horizontal[_ngcontent-%COMP%]   .mat-slider-ticks[_ngcontent-%COMP%]{background-image:repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);background-image:-moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent)}.mat-slider-vertical[_ngcontent-%COMP%]   .mat-slider-ticks[_ngcontent-%COMP%]{background-image:repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent)}.mat-step-header.cdk-keyboard-focused[_ngcontent-%COMP%], .mat-step-header.cdk-program-focused[_ngcontent-%COMP%], .mat-step-header[_ngcontent-%COMP%]:hover:not([aria-disabled]), .mat-step-header[_ngcontent-%COMP%]:hover[aria-disabled=false]{background-color:rgba(0,0,0,.04)}.mat-step-header[_ngcontent-%COMP%]:hover[aria-disabled=true]{cursor:default}@media(hover: none){.mat-step-header[_ngcontent-%COMP%]:hover{background:none}}.mat-step-header[_ngcontent-%COMP%]   .mat-step-label[_ngcontent-%COMP%], .mat-step-header[_ngcontent-%COMP%]   .mat-step-optional[_ngcontent-%COMP%]{color:rgba(0,0,0,.54)}.mat-step-header[_ngcontent-%COMP%]   .mat-step-icon[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.54);color:#fff}.mat-step-header[_ngcontent-%COMP%]   .mat-step-icon-selected[_ngcontent-%COMP%], .mat-step-header[_ngcontent-%COMP%]   .mat-step-icon-state-done[_ngcontent-%COMP%], .mat-step-header[_ngcontent-%COMP%]   .mat-step-icon-state-edit[_ngcontent-%COMP%]{background-color:#673ab7;color:#fff}.mat-step-header.mat-accent[_ngcontent-%COMP%]   .mat-step-icon[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-step-header.mat-accent[_ngcontent-%COMP%]   .mat-step-icon-selected[_ngcontent-%COMP%], .mat-step-header.mat-accent[_ngcontent-%COMP%]   .mat-step-icon-state-done[_ngcontent-%COMP%], .mat-step-header.mat-accent[_ngcontent-%COMP%]   .mat-step-icon-state-edit[_ngcontent-%COMP%]{background-color:#ffd740;color:rgba(0,0,0,.87)}.mat-step-header.mat-warn[_ngcontent-%COMP%]   .mat-step-icon[_ngcontent-%COMP%]{color:#fff}.mat-step-header.mat-warn[_ngcontent-%COMP%]   .mat-step-icon-selected[_ngcontent-%COMP%], .mat-step-header.mat-warn[_ngcontent-%COMP%]   .mat-step-icon-state-done[_ngcontent-%COMP%], .mat-step-header.mat-warn[_ngcontent-%COMP%]   .mat-step-icon-state-edit[_ngcontent-%COMP%]{background-color:#f44336;color:#fff}.mat-step-header[_ngcontent-%COMP%]   .mat-step-icon-state-error[_ngcontent-%COMP%]{background-color:transparent;color:#f44336}.mat-step-header[_ngcontent-%COMP%]   .mat-step-label.mat-step-label-active[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-step-header[_ngcontent-%COMP%]   .mat-step-label.mat-step-label-error[_ngcontent-%COMP%]{color:#f44336}.mat-stepper-horizontal[_ngcontent-%COMP%], .mat-stepper-vertical[_ngcontent-%COMP%]{background-color:#fff}.mat-stepper-vertical-line[_ngcontent-%COMP%]::before{border-left-color:rgba(0,0,0,.12)}.mat-horizontal-stepper-header[_ngcontent-%COMP%]::before, .mat-horizontal-stepper-header[_ngcontent-%COMP%]::after, .mat-stepper-horizontal-line[_ngcontent-%COMP%]{border-top-color:rgba(0,0,0,.12)}.mat-horizontal-stepper-header[_ngcontent-%COMP%]{height:72px}.mat-stepper-label-position-bottom[_ngcontent-%COMP%]   .mat-horizontal-stepper-header[_ngcontent-%COMP%], .mat-vertical-stepper-header[_ngcontent-%COMP%]{padding:24px 24px}.mat-stepper-vertical-line[_ngcontent-%COMP%]::before{top:-16px;bottom:-16px}.mat-stepper-label-position-bottom[_ngcontent-%COMP%]   .mat-horizontal-stepper-header[_ngcontent-%COMP%]::after, .mat-stepper-label-position-bottom[_ngcontent-%COMP%]   .mat-horizontal-stepper-header[_ngcontent-%COMP%]::before{top:36px}.mat-stepper-label-position-bottom[_ngcontent-%COMP%]   .mat-stepper-horizontal-line[_ngcontent-%COMP%]{top:36px}.mat-sort-header-arrow[_ngcontent-%COMP%]{color:#757575}.mat-tab-nav-bar[_ngcontent-%COMP%], .mat-tab-header[_ngcontent-%COMP%]{border-bottom:1px solid rgba(0,0,0,.12)}.mat-tab-group-inverted-header[_ngcontent-%COMP%]   .mat-tab-nav-bar[_ngcontent-%COMP%], .mat-tab-group-inverted-header[_ngcontent-%COMP%]   .mat-tab-header[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.12);border-bottom:none}.mat-tab-label[_ngcontent-%COMP%], .mat-tab-link[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.38)}.mat-tab-header-pagination-chevron[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.87)}.mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%]{border-color:rgba(0,0,0,.38)}.mat-tab-group[class*=mat-background-][_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-nav-bar[class*=mat-background-][_ngcontent-%COMP%]{border-bottom:none;border-top:none}.mat-tab-group.mat-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(209,196,233,.3)}.mat-tab-group.mat-primary[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-primary[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:#673ab7}.mat-tab-group.mat-primary.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-group.mat-primary.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-primary.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-primary.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:#fff}.mat-tab-group.mat-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(255,229,127,.3)}.mat-tab-group.mat-accent[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-accent[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:#ffd740}.mat-tab-group.mat-accent.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-group.mat-accent.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-accent.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-accent.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.87)}.mat-tab-group.mat-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-warn[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-warn[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:#f44336}.mat-tab-group.mat-warn.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-group.mat-warn.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-warn.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-warn.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ink-bar[_ngcontent-%COMP%]{background-color:#fff}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(209,196,233,.3)}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]{background-color:#673ab7}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%]{color:#fff}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%]{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before{border-color:#fff}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%]{border-color:#fff;opacity:.4}.mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-primary[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#fff;opacity:.12}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(255,229,127,.3)}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]{background-color:#ffd740}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%]{color:rgba(0,0,0,.4)}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before{border-color:rgba(0,0,0,.87)}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%]{border-color:#000;opacity:.4}.mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-accent[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#000;opacity:.12}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-group.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-label.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-keyboard-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%]   .mat-tab-link.cdk-program-focused[_ngcontent-%COMP%]:not(.mat-tab-disabled){background-color:rgba(255,205,210,.3)}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]{background-color:#f44336}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%]{color:#fff}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-label.mat-tab-disabled[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-disabled[_ngcontent-%COMP%]{color:rgba(255,255,255,.4)}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before, .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-focus-indicator[_ngcontent-%COMP%]::before{border-color:#fff}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination-disabled[_ngcontent-%COMP%]   .mat-tab-header-pagination-chevron[_ngcontent-%COMP%]{border-color:#fff;opacity:.4}.mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-group.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-link-container[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%], .mat-tab-nav-bar.mat-background-warn[_ngcontent-%COMP%] > .mat-tab-header-pagination[_ngcontent-%COMP%]   .mat-ripple-element[_ngcontent-%COMP%]{background-color:#fff;opacity:.12}.mat-toolbar[_ngcontent-%COMP%]{background:#f5f5f5;color:rgba(0,0,0,.87)}.mat-toolbar.mat-primary[_ngcontent-%COMP%]{background:#673ab7;color:#fff}.mat-toolbar.mat-accent[_ngcontent-%COMP%]{background:#ffd740;color:rgba(0,0,0,.87)}.mat-toolbar.mat-warn[_ngcontent-%COMP%]{background:#f44336;color:#fff}.mat-toolbar[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-focused[_ngcontent-%COMP%]   .mat-form-field-ripple[_ngcontent-%COMP%]{background-color:currentColor}.mat-toolbar[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-focused[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-select-value[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%], .mat-toolbar[_ngcontent-%COMP%]   .mat-form-field.mat-focused[_ngcontent-%COMP%]   .mat-select-arrow[_ngcontent-%COMP%]{color:inherit}.mat-toolbar[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{caret-color:currentColor}.mat-toolbar-multiple-rows[_ngcontent-%COMP%]{min-height:64px}.mat-toolbar-row[_ngcontent-%COMP%], .mat-toolbar-single-row[_ngcontent-%COMP%]{height:64px}@media(max-width: 599px){.mat-toolbar-multiple-rows[_ngcontent-%COMP%]{min-height:56px}.mat-toolbar-row[_ngcontent-%COMP%], .mat-toolbar-single-row[_ngcontent-%COMP%]{height:56px}}.mat-tooltip[_ngcontent-%COMP%]{background:rgba(97,97,97,.9)}.mat-tree[_ngcontent-%COMP%]{background:#fff}.mat-tree-node[_ngcontent-%COMP%], .mat-nested-tree-node[_ngcontent-%COMP%]{color:rgba(0,0,0,.87)}.mat-tree-node[_ngcontent-%COMP%]{min-height:48px}.mat-snack-bar-container[_ngcontent-%COMP%]{color:rgba(255,255,255,.7);background:#323232;box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)}.mat-simple-snackbar-action[_ngcontent-%COMP%]{color:#ffd740}.file-input[_ngcontent-%COMP%] {\n  margin: 5px;\n}.home-button[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  max-width: 400px;\n  width: 80%;\n  padding: 10px;\n  font-size: 14px;\n  font-family: \"Roboto\", Arial, sans-serif;\n  font-weight: bold;\n  color: #cfcfcf;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 8px 16px;\n  border-radius: 10px;\n  background-color: #156615;\n}.home-button[_ngcontent-%COMP%]:hover {\n  background-color: #0c3c0c;\n}.home-file-input[_ngcontent-%COMP%] {\n  height: 0;\n  width: 0;\n}#home-box[_ngcontent-%COMP%] {\n  margin: auto;\n  border: solid 1px #9c9c9c;\n  max-width: 500px;\n}#button-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 5px;\n}#home-background[_ngcontent-%COMP%] {\n  width: 70%;\n  margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9wcmVidWlsdC10aGVtZXMvZGVlcHB1cnBsZS1hbWJlci5jc3MiLCJob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1CQUFtQixlQUFlLENBQUMsY0FBYyxDQUFDLGdEQUFnRCxDQUFDLG9DQUFvQyxhQUFhLENBQUMsb0NBQW9DLGNBQWMsQ0FBQywrRkFBK0YsdURBQXVELENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLHlGQUF5Rix1REFBdUQsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsdUdBQXVHLHVEQUF1RCxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyx1R0FBdUcsdURBQXVELENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLG1EQUFtRCxvRUFBb0UsQ0FBQyxlQUFlLENBQUMsbURBQW1ELG9FQUFvRSxDQUFDLGVBQWUsQ0FBQywwRkFBMEYsdURBQXVELENBQUMscUJBQXFCLENBQUMsNEZBQTRGLHVEQUF1RCxDQUFDLHFCQUFxQixDQUFDLHNHQUFzRyxlQUFlLENBQUMsZ0ZBQWdGLHVEQUF1RCxDQUFDLHFCQUFxQixDQUFDLDhDQUE4Qyx5REFBeUQsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsOENBQThDLHVEQUF1RCxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyw4Q0FBOEMsdURBQXVELENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLDhDQUE4Qyx1REFBdUQsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLHVEQUF1RCxDQUFDLHFCQUFxQixDQUFDLDRHQUE0RyxnREFBZ0QsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLG1CQUFtQixnREFBZ0QsQ0FBQyxVQUFVLGdEQUFnRCxDQUFDLGdCQUFnQixjQUFjLENBQUMsZUFBZSxDQUFDLGlDQUFpQyxjQUFjLENBQUMscUNBQXFDLGNBQWMsQ0FBQyxjQUFjLGdEQUFnRCxDQUFDLHlDQUF5QyxnQkFBZ0IsQ0FBQyxVQUFVLGNBQWMsQ0FBQyxlQUFlLENBQUMsK0VBQStFLGNBQWMsQ0FBQyxXQUFXLGdEQUFnRCxDQUFDLGlCQUFpQixjQUFjLENBQUMsZUFBZSxDQUFDLDJCQUEyQixjQUFjLENBQUMsY0FBYyxnREFBZ0QsQ0FBQyxtQkFBbUIsY0FBYyxDQUFDLHFEQUFxRCxjQUFjLENBQUMsZUFBZSxDQUFDLDhCQUE4QixjQUFjLENBQUMsZUFBZSxDQUFDLGtCQUFrQix1REFBdUQsQ0FBQyxxQkFBcUIsQ0FBQyw0QkFBNEIsZ0RBQWdELENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyw2QkFBNkIsdURBQXVELENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxnREFBZ0QsQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0Isd0JBQXdCLENBQUMsa0VBQWtFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxnRkFBZ0YsWUFBWSxDQUFDLFdBQVcsQ0FBQyxvR0FBb0csY0FBYyxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixjQUFjLENBQUMscUNBQXFDLENBQUMsa0xBQWtMLDRDQUE0QyxDQUFDLHFCQUFxQixDQUFDLHlIQUF5SCw0Q0FBNEMsQ0FBQyxxQkFBcUIsQ0FBQyw4QkFBOEIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixhQUFhLENBQUMsMEJBQTBCLGdCQUFnQixDQUFDLGtDQUFrQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsK0JBQStCLENBQUMsMERBQTBELHFCQUFxQixDQUFDLHdEQUF3RCxpQkFBaUIsQ0FBQyxvUEFBb1AsbUZBQW1GLENBQUMscUJBQXFCLENBQUMsaUtBQWlLLHFGQUFxRixDQUFDLHFCQUFxQixDQUFDLDBKQUEwSixxRkFBcUYsQ0FBQyxxQkFBcUIsQ0FBQyx3REFBd0QsYUFBYSxDQUFDLDREQUE0RCxhQUFhLENBQUMsb0VBQW9FLHdCQUF3QixDQUFDLCtCQUErQixDQUFDLGFBQWEsb1BBQW9QLDRDQUE0QyxDQUFDLGlLQUFpSyw0Q0FBNEMsQ0FBQywwSkFBMEosMkNBQTJDLENBQUMsQ0FBQyxzREFBc0QsdUJBQXVCLENBQUMsc0RBQXNELGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxnUEFBZ1AsNENBQTRDLENBQUMscUJBQXFCLENBQUMsd0pBQXdKLDRDQUE0QyxDQUFDLHFCQUFxQixDQUFDLHlEQUF5RCxtQkFBbUIsQ0FBQyx5REFBeUQsYUFBYSxDQUFDLGtCQUFrQixDQUFDLHNQQUFzUCw0Q0FBNEMsQ0FBQyxxQkFBcUIsQ0FBQywySkFBMkosNENBQTRDLENBQUMscUJBQXFCLENBQUMsNENBQTRDLGNBQWMsQ0FBQyxnRUFBZ0Usa0JBQWtCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyw4RkFBOEYsY0FBYyxDQUFDLHdCQUF3QixvQkFBb0IsQ0FBQyxlQUFlLGdEQUFnRCxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsNERBQTRELGdEQUFnRCxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsZ0RBQWdELENBQUMsWUFBWSxnREFBZ0QsQ0FBQyxvQkFBb0IsY0FBYyxDQUFDLDBCQUEwQixnREFBZ0QsQ0FBQyw2QkFBNkIsZ0RBQWdELENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyw4Q0FBOEMsZ0RBQWdELENBQUMsZ0JBQWdCLGNBQWMsQ0FBQyxlQUFlLENBQUMsMEJBQTBCLGtCQUFrQixDQUFDLHNCQUFzQixjQUFjLENBQUMseUJBQXlCLGNBQWMsQ0FBQyxlQUFlLENBQUMsZUFBZSxnREFBZ0QsQ0FBQyw2QkFBNkIsZ0RBQWdELENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyw2R0FBNkcsdURBQXVELENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLGFBQWEsZ0RBQWdELENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsY0FBYyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLGdEQUFnRCxDQUFDLGlCQUFpQixnREFBZ0QsQ0FBQyw4QkFBOEIsY0FBYyxDQUFDLHdDQUF3QyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLHVEQUF1RCxjQUFjLENBQUMsZ0NBQWdDLGNBQWMsQ0FBQywwQ0FBMEMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyx5REFBeUQsY0FBYyxDQUFDLDhCQUE4QixnREFBZ0QsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxjQUFjLENBQUMsK0NBQStDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsOERBQThELGNBQWMsQ0FBQyx1Q0FBdUMsY0FBYyxDQUFDLGlEQUFpRCxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLGdFQUFnRSxjQUFjLENBQUMscUNBQXFDLGdEQUFnRCxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsWUFBWSxnREFBZ0QsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLHVEQUF1RCxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixnREFBZ0QsQ0FBQyxjQUFjLENBQUMsNEJBQTRCLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxnREFBZ0QsQ0FBQyxxQ0FBcUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxZQUFZLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsdUJBQXVCLENBQUMsaUNBQWlDLGdCQUFnQixDQUFDLG9CQUFvQixpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQywyREFBMkQsQ0FBQyxrQkFBa0IsQ0FBQyw4Q0FBOEMsWUFBWSxDQUFDLHFCQUFxQixRQUFRLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLCtCQUErQixTQUFTLENBQUMsT0FBTyxDQUFDLG1EQUFtRCxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLGNBQWMsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLFlBQVksQ0FBQyw0QkFBNEIsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxrQkFBa0IsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLHNCQUFzQixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLHVDQUF1QyxDQUFDLHlEQUF5RCxDQUFDLFNBQVMsQ0FBQyxtREFBbUQsU0FBUyxDQUFDLDZFQUE2RSxVQUFVLENBQUMsMkJBQTJCLDBCQUEwQixDQUFDLGtDQUFrQyxtREFBbUQsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsK0RBQStELFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyw2Q0FBNkMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLHdCQUF3QixjQUFjLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLCtCQUErQixXQUFXLENBQUMseUNBQXlDLHdCQUF3QixDQUFDLGlDQUFpQyxDQUFDLHNCQUFzQixDQUFDLDBCQUEwQixDQUFDLGlEQUFpRCx3QkFBd0IsQ0FBQyxpQ0FBaUMsQ0FBQyxtQkFBbUIsQ0FBQyx5Q0FBeUMsSUFBSSxDQUFDLENBQUMsdUNBQXVDLElBQUksQ0FBQyxDQUFDLG9EQUFvRCw4Q0FBOEMsQ0FBQywwREFBMEQsNENBQTRDLENBQUMscUJBQXFCLGlCQUFpQixDQUFDLHlCQUF5QixpQkFBaUIsQ0FBQyxvQkFBb0IsK0JBQStCLENBQUMsWUFBWSxxQkFBcUIsQ0FBQyx3RkFBd0YsMEJBQTBCLENBQUMsNkVBQTZFLDBCQUEwQixDQUFDLHVCQUF1QiwwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQyxnQ0FBZ0MscUJBQXFCLENBQUMsZ0VBQWdFLGFBQWEsQ0FBQywrREFBK0QsYUFBYSxDQUFDLDZEQUE2RCxhQUFhLENBQUMsb0JBQW9CLHFCQUFxQixDQUFDLDJDQUEyQyxxQkFBcUIsQ0FBQyxxQkFBcUIscUJBQXFCLENBQUMsNEJBQTRCLGFBQWEsQ0FBQyw4QkFBOEIsYUFBYSxDQUFDLDBGQUEwRixrQkFBa0IsQ0FBQyx3SkFBd0osa0JBQWtCLENBQUMsb0ZBQW9GLGtCQUFrQixDQUFDLDBIQUEwSCxrQkFBa0IsQ0FBQyxvQkFBb0Isd0JBQXdCLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLHFIQUFxSCxDQUFDLGtCQUFrQixzSEFBc0gsQ0FBQyxrQkFBa0Isc0hBQXNILENBQUMsa0JBQWtCLHNIQUFzSCxDQUFDLGtCQUFrQix1SEFBdUgsQ0FBQyxrQkFBa0IsdUhBQXVILENBQUMsa0JBQWtCLHdIQUF3SCxDQUFDLGtCQUFrQix3SEFBd0gsQ0FBQyxrQkFBa0Isd0hBQXdILENBQUMsa0JBQWtCLHdIQUF3SCxDQUFDLG1CQUFtQix5SEFBeUgsQ0FBQyxtQkFBbUIseUhBQXlILENBQUMsbUJBQW1CLHlIQUF5SCxDQUFDLG1CQUFtQix5SEFBeUgsQ0FBQyxtQkFBbUIseUhBQXlILENBQUMsbUJBQW1CLHlIQUF5SCxDQUFDLG1CQUFtQiwwSEFBMEgsQ0FBQyxtQkFBbUIsMEhBQTBILENBQUMsbUJBQW1CLDBIQUEwSCxDQUFDLG1CQUFtQiwwSEFBMEgsQ0FBQyxtQkFBbUIsMkhBQTJILENBQUMsbUJBQW1CLDJIQUEySCxDQUFDLG1CQUFtQiwySEFBMkgsQ0FBQyxtQkFBbUIsMkhBQTJILENBQUMsbUJBQW1CLDJIQUEySCxDQUFDLHlCQUF5QixZQUFZLENBQUMsd0JBQXdCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxzREFBc0QsdUhBQXVILENBQUMsOEVBQThFLGVBQWUsQ0FBQyx3R0FBd0cscUJBQXFCLENBQUMsV0FBVyxpQkFBaUIsQ0FBQyxxQkFBcUIsZ0JBQWdCLENBQUMscUNBQXFDLFlBQVksQ0FBQyxtQkFBbUIsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsc0NBQXNDLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLG1GQUFtRixlQUFlLENBQUMsb0NBQW9DLGNBQWMsQ0FBQyxvQ0FBb0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxvREFBb0QsUUFBUSxDQUFDLG9EQUFvRCxXQUFXLENBQUMscURBQXFELFVBQVUsQ0FBQywrREFBK0QsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvREFBb0QsV0FBVyxDQUFDLDhEQUE4RCxVQUFVLENBQUMsVUFBVSxDQUFDLHVFQUF1RSxTQUFTLENBQUMsaUZBQWlGLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0VBQXNFLFVBQVUsQ0FBQyxnRkFBZ0YsVUFBVSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxxREFBcUQsU0FBUyxDQUFDLHFEQUFxRCxZQUFZLENBQUMsc0RBQXNELFVBQVUsQ0FBQyxnRUFBZ0UsU0FBUyxDQUFDLFdBQVcsQ0FBQyxxREFBcUQsV0FBVyxDQUFDLCtEQUErRCxVQUFVLENBQUMsVUFBVSxDQUFDLHdFQUF3RSxVQUFVLENBQUMsa0ZBQWtGLFNBQVMsQ0FBQyxXQUFXLENBQUMsdUVBQXVFLFdBQVcsQ0FBQyxpRkFBaUYsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQ0FBb0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxvREFBb0QsU0FBUyxDQUFDLG9EQUFvRCxZQUFZLENBQUMscURBQXFELFVBQVUsQ0FBQywrREFBK0QsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvREFBb0QsV0FBVyxDQUFDLDhEQUE4RCxVQUFVLENBQUMsVUFBVSxDQUFDLHVFQUF1RSxVQUFVLENBQUMsaUZBQWlGLFNBQVMsQ0FBQyxXQUFXLENBQUMsc0VBQXNFLFdBQVcsQ0FBQyxnRkFBZ0YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLDZDQUE2QyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMscUNBQXFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLG1DQUFtQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsdUNBQXVDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLDRCQUE0QiwwSEFBMEgsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsaURBQWlELGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxxRkFBcUYsYUFBYSxDQUFDLGtGQUFrRixhQUFhLENBQUMsNEVBQTRFLGFBQWEsQ0FBQyxnbEJBQWdsQixxQkFBcUIsQ0FBQyxtS0FBbUssd0JBQXdCLENBQUMsZ0tBQWdLLHdCQUF3QixDQUFDLDBKQUEwSix3QkFBd0IsQ0FBQywyTEFBMkwsNEJBQTRCLENBQUMsNkdBQTZHLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQywwQkFBMEIsZUFBZSxDQUFDLDhDQUE4Qyw0QkFBNEIsQ0FBQywyREFBMkQscUJBQXFCLENBQUMscUJBQXFCLENBQUMsMkdBQTJHLFVBQVUsQ0FBQyx1R0FBdUcscUJBQXFCLENBQUMsK0ZBQStGLFVBQVUsQ0FBQyw0dkJBQTR2QixxQkFBcUIsQ0FBQywyR0FBMkcsd0JBQXdCLENBQUMsdUdBQXVHLHdCQUF3QixDQUFDLCtGQUErRix3QkFBd0IsQ0FBQyw0dkJBQTR2QixnQ0FBZ0MsQ0FBQywyTEFBMkwscUNBQXFDLENBQUMsdUxBQXVMLCtCQUErQixDQUFDLCtLQUErSyxxQ0FBcUMsQ0FBQyxpR0FBaUcscUhBQXFILENBQUMsaURBQWlELHNIQUFzSCxDQUFDLGtGQUFrRix3SEFBd0gsQ0FBQyxxRUFBcUUscUhBQXFILENBQUMsbUZBQW1GLHdIQUF3SCxDQUFDLHFKQUFxSix5SEFBeUgsQ0FBQywySEFBMkgscUhBQXFILENBQUMsbUhBQW1ILHNIQUFzSCxDQUFDLDZLQUE2SyxlQUFlLENBQUMsbUJBQW1CLHFCQUFxQixDQUFDLG9EQUFvRCxnQ0FBZ0MsQ0FBQyx1Q0FBdUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLHdFQUF3RSxxQkFBcUIsQ0FBQyxtRkFBbUYsNkJBQTZCLENBQUMsNkZBQTZGLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLDhHQUE4RyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQywyQkFBMkIsd0JBQXdCLENBQUMscUJBQXFCLENBQUMsaUVBQWlFLHFCQUFxQixDQUFDLDRCQUE0QixxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxrRUFBa0UsZUFBZSxDQUFDLHNEQUFzRCx3QkFBd0IsQ0FBQyxpSEFBaUgsd0JBQXdCLENBQUMsd0VBQXdFLGdCQUFnQixDQUFDLFVBQVUsZUFBZSxDQUFDLHFCQUFxQixDQUFDLHdDQUF3QyxzSEFBc0gsQ0FBQyxzREFBc0QscUhBQXFILENBQUMsbUJBQW1CLHFCQUFxQixDQUFDLG9CQUFvQiw0QkFBNEIsQ0FBQyx3QkFBd0IsWUFBWSxDQUFDLDZCQUE2Qix5QkFBeUIsQ0FBQyx3QkFBd0Isd0JBQXdCLENBQUMsNEhBQTRILHdCQUF3QixDQUFDLDBIQUEwSCx3QkFBd0IsQ0FBQyxzSEFBc0gsd0JBQXdCLENBQUMsZ0pBQWdKLHdCQUF3QixDQUFDLHNFQUFzRSxvQkFBb0IsQ0FBQywyQ0FBMkMscUJBQXFCLENBQUMsa0NBQWtDLHFCQUFxQixDQUFDLG1LQUFtSyxrQkFBa0IsQ0FBQyxpS0FBaUssa0JBQWtCLENBQUMsNkpBQTZKLGtCQUFrQixDQUFDLDRCQUE0Qix3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyw2Q0FBNkMscUJBQXFCLENBQUMsVUFBVSxDQUFDLDJEQUEyRCxzSEFBc0gsQ0FBQywyRUFBMkUsV0FBVyxDQUFDLDhDQUE4QyxVQUFVLENBQUMsbUNBQW1DLGVBQWUsQ0FBQywwREFBMEQsd0JBQXdCLENBQUMsVUFBVSxDQUFDLDJFQUEyRSxVQUFVLENBQUMsVUFBVSxDQUFDLDhFQUE4RSxxQ0FBcUMsQ0FBQyx1REFBdUQsd0JBQXdCLENBQUMsVUFBVSxDQUFDLHdFQUF3RSxVQUFVLENBQUMsVUFBVSxDQUFDLDJFQUEyRSxxQ0FBcUMsQ0FBQyx5REFBeUQsd0JBQXdCLENBQUMscUJBQXFCLENBQUMsMEVBQTBFLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyw2RUFBNkUsK0JBQStCLENBQUMsV0FBVyxlQUFlLENBQUMsdUpBQXVKLGtCQUFrQixDQUFDLHdGQUF3RixtQ0FBbUMsQ0FBQyxpQkFBaUIscUJBQXFCLENBQUMsMkJBQTJCLHFCQUFxQixDQUFDLG9CQUFvQixvQkFBb0IsQ0FBQywrSEFBK0gscUJBQXFCLENBQUMsMENBQTBDLDBCQUEwQixDQUFDLG9EQUFvRCxxQkFBcUIsQ0FBQyxnRUFBZ0UscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsMElBQTBJLHFCQUFxQixDQUFDLHlEQUF5RCxxQkFBcUIsQ0FBQyw4QkFBOEIscUJBQXFCLENBQUMsdUdBQXVHLDRCQUE0QixDQUFDLG1JQUFtSSw0QkFBNEIsQ0FBQyxvQ0FBb0MsOEJBQThCLENBQUMsdUZBQXVGLDZCQUE2QixDQUFDLDhHQUE4Ryw2RkFBNkYsQ0FBQyw4R0FBOEcsNEZBQTRGLENBQUMsNklBQTZJLGtCQUFrQixDQUFDLHNJQUFzSSxrQkFBa0IsQ0FBQyw0QkFBNEIsd0JBQXdCLENBQUMsVUFBVSxDQUFDLHdEQUF3RCxvQ0FBb0MsQ0FBQyxvREFBb0QsK0JBQStCLENBQUMsMlRBQTJULG9DQUFvQyxDQUFDLHFCQUFxQiw2S0FBNkssb0NBQW9DLENBQUMsQ0FBQyx3QkFBd0IsdUhBQXVILENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsdUVBQXVFLDhCQUE4QixDQUFDLDZKQUE2Siw2QkFBNkIsQ0FBQyxvTEFBb0wsNkZBQTZGLENBQUMsb0xBQW9MLDRGQUE0RixDQUFDLG1OQUFtTixrQkFBa0IsQ0FBQyw0TUFBNE0sa0JBQWtCLENBQUMsK0RBQStELHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLDJGQUEyRixvQ0FBb0MsQ0FBQyx1RkFBdUYsMENBQTBDLENBQUMsaVlBQWlZLG9DQUFvQyxDQUFDLHFCQUFxQixnTkFBZ04sb0NBQW9DLENBQUMsQ0FBQyxxRUFBcUUsNkJBQTZCLENBQUMseUpBQXlKLDZCQUE2QixDQUFDLGdMQUFnTCw0RkFBNEYsQ0FBQyxnTEFBZ0wsMkZBQTJGLENBQUMsK01BQStNLGtCQUFrQixDQUFDLHdNQUF3TSxrQkFBa0IsQ0FBQyw2REFBNkQsd0JBQXdCLENBQUMsVUFBVSxDQUFDLHlGQUF5RixtQ0FBbUMsQ0FBQyxxRkFBcUYsK0JBQStCLENBQUMsNlhBQTZYLG1DQUFtQyxDQUFDLHFCQUFxQiw4TUFBOE0sbUNBQW1DLENBQUMsQ0FBQyw4QkFBOEIsMkhBQTJILENBQUMsOEJBQThCLGFBQWEsQ0FBQyx5Q0FBeUMsYUFBYSxDQUFDLHVDQUF1QyxhQUFhLENBQUMsc0NBQXNDLHFCQUFxQixDQUFDLHNCQUFzQiwySEFBMkgsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsYUFBYSxnQ0FBZ0MsQ0FBQyxzQkFBc0Isa0NBQWtDLENBQUMscUJBQXFCLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxtREFBbUQsc0hBQXNILENBQUMsZ0JBQWdCLGdDQUFnQyxDQUFDLG1TQUFtUywwQkFBMEIsQ0FBQyxvQkFBb0Isb0dBQW9HLGVBQWUsQ0FBQyxDQUFDLGtDQUFrQyxxQkFBcUIsQ0FBQyx3RUFBd0UscUJBQXFCLENBQUMsZ0RBQWdELHFCQUFxQixDQUFDLDBLQUEwSyxhQUFhLENBQUMsNEJBQTRCLFdBQVcsQ0FBQyx5Q0FBeUMsV0FBVyxDQUFDLHNCQUFzQixvQkFBb0IsQ0FBQyxVQUFVLG9CQUFvQixDQUFDLGtEQUFrRCxhQUFhLENBQUMsNkRBQTZELGFBQWEsQ0FBQywyREFBMkQsYUFBYSxDQUFDLDZDQUE2QyxhQUFhLENBQUMsdUJBQXVCLGdDQUFnQyxDQUFDLG1EQUFtRCx3QkFBd0IsQ0FBQyw4REFBOEQsd0JBQXdCLENBQUMsNERBQTRELHdCQUF3QixDQUFDLDZHQUE2RyxhQUFhLENBQUMsd0hBQXdILGFBQWEsQ0FBQyxzSEFBc0gsYUFBYSxDQUFDLDZEQUE2RCxhQUFhLENBQUMscUtBQXFLLGFBQWEsQ0FBQyx1SUFBdUksd0JBQXdCLENBQUMsV0FBVyxhQUFhLENBQUMsd0RBQXdELHFCQUFxQixDQUFDLDRDQUE0QyxxQkFBcUIsQ0FBQyw0REFBNEQsZ0NBQWdDLENBQUMsb0ZBQW9GLDJHQUEyRyxDQUFDLHdCQUF3QixDQUFDLDBCQUEwQixDQUFDLDhEQUE4RCxnQ0FBZ0MsQ0FBQyxzRkFBc0YsMkdBQTJHLENBQUMsd0JBQXdCLENBQUMsMEJBQTBCLENBQUMscURBQXFELGdDQUFnQyxDQUFDLDZFQUE2RSxnQ0FBZ0MsQ0FBQyxrRUFBa0UsZ0NBQWdDLENBQUMsOEVBQThFLHFCQUFxQixDQUFDLDBGQUEwRiw0QkFBNEIsQ0FBQywyREFBMkQscUJBQXFCLENBQUMsaUVBQWlFLHFCQUFxQixDQUFDLDZFQUE2RSxhQUFhLENBQUMsd0ZBQXdGLGFBQWEsQ0FBQyxzRkFBc0YsYUFBYSxDQUFDLCtHQUErRyxhQUFhLENBQUMsaUZBQWlGLHFCQUFxQixDQUFDLG1GQUFtRixxQkFBcUIsQ0FBQyxzQkFBc0IsYUFBYSxDQUFDLHFCQUFxQixhQUFhLENBQUMsbUJBQW1CLGFBQWEsQ0FBQyxvRUFBb0UscUJBQXFCLENBQUMsd0hBQXdILHFCQUFxQixDQUFDLG1CQUFtQixtQkFBbUIsQ0FBQyxnQ0FBZ0MscUJBQXFCLENBQUMscUNBQXFDLHFCQUFxQixDQUFDLDhDQUE4QyxxQkFBcUIsQ0FBQyx5Q0FBeUMscUJBQXFCLENBQUMsOENBQThDLG1CQUFtQixDQUFDLHVGQUF1RixtQkFBbUIsQ0FBQywyRkFBMkYsYUFBYSxDQUFDLDhCQUE4QixxQkFBcUIsQ0FBQyxnQ0FBZ0MscUJBQXFCLENBQUMsOEJBQThCLHFCQUFxQixDQUFDLHVDQUF1QyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxnTUFBZ00sMEJBQTBCLENBQUMsK0dBQStHLDBCQUEwQixDQUFDLGdCQUFnQixlQUFlLENBQUMsOENBQThDLHVIQUF1SCxDQUFDLGVBQWUsc0JBQXNCLENBQUMscUJBQXFCLENBQUMscUhBQXFILHFCQUFxQixDQUFDLHlEQUF5RCxxQkFBcUIsQ0FBQyx1TEFBdUwsMEJBQTBCLENBQUMsZUFBZSxlQUFlLENBQUMsNERBQTRELHFCQUFxQixDQUFDLGtEQUFrRCxvQ0FBb0MsQ0FBQyxzQ0FBc0MsQ0FBQyx5Q0FBeUMsb0NBQW9DLENBQUMsdU1BQXVNLDRCQUE0QixDQUFDLHlCQUF5QixlQUFlLENBQUMsNkJBQTZCLFlBQVksQ0FBQyx5QkFBeUIsd0JBQXdCLENBQUMsOEJBQThCLHdCQUF3QixDQUFDLDBEQUEwRCxZQUFZLENBQUMsc0RBQXNELHdCQUF3QixDQUFDLDJEQUEyRCx3QkFBd0IsQ0FBQyx3REFBd0QsWUFBWSxDQUFDLG9EQUFvRCx3QkFBd0IsQ0FBQyx5REFBeUQsd0JBQXdCLENBQUMsaURBQWlELGNBQWMsQ0FBQyx1RUFBdUUsY0FBYyxDQUFDLG1FQUFtRSxjQUFjLENBQUMsd0JBQXdCLDRCQUE0QixDQUFDLHdFQUF3RSxvQkFBb0IsQ0FBQywyU0FBMlMsd0JBQXdCLENBQUMsdUVBQXVFLG9CQUFvQixDQUFDLHVTQUF1Uyx3QkFBd0IsQ0FBQyxxRUFBcUUsb0JBQW9CLENBQUMsK1JBQStSLHdCQUF3QixDQUFDLDRJQUE0SSw0QkFBNEIsQ0FBQyx3SUFBd0ksZ0NBQWdDLENBQUMsOERBQThELHFCQUFxQixDQUFDLHNDQUFzQyxxQkFBcUIsQ0FBQyxrQkFBa0IscUJBQXFCLENBQUMsd0JBQXdCLHFCQUFxQixDQUFDLHVDQUF1QyxxQkFBcUIsQ0FBQyxrQkFBa0IscUJBQXFCLENBQUMsa0JBQWtCLGVBQWUsQ0FBQyxnREFBZ0QsdUhBQXVILENBQUMscUVBQXFFLDBCQUEwQixDQUFDLDBEQUEwRCxhQUFhLENBQUMseURBQXlELGFBQWEsQ0FBQyx1REFBdUQsYUFBYSxDQUFDLGlFQUFpRSxhQUFhLENBQUMsa0VBQWtFLHFCQUFxQixDQUFDLHNCQUFzQix3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixxQkFBcUIsQ0FBQyxrQ0FBa0MsMEhBQTBILENBQUMsaUJBQWlCLHNDQUFzQyxDQUFDLGdDQUFnQyxxQ0FBcUMsQ0FBQyxpQkFBaUIsQ0FBQywyQkFBMkIscUNBQXFDLENBQUMsaUJBQWlCLENBQUMsMENBQTBDLGdCQUFnQixDQUFDLHNDQUFzQyxDQUFDLHNDQUFzQywrQkFBK0IsQ0FBQyxzREFBc0Qsd0JBQXdCLENBQUMsb0RBQW9ELHFDQUFxQyxDQUFDLGtEQUFrRCx3QkFBd0IsQ0FBQyxrRUFBa0Usd0JBQXdCLENBQUMsZ0VBQWdFLHFDQUFxQyxDQUFDLDhEQUE4RCx3QkFBd0IsQ0FBQywrREFBK0Qsd0JBQXdCLENBQUMsNkRBQTZELG9DQUFvQyxDQUFDLDJEQUEyRCx3QkFBd0IsQ0FBQyx3REFBd0QscUJBQXFCLENBQUMsd0JBQXdCLHNIQUFzSCxDQUFDLHdCQUF3QixDQUFDLHNCQUFzQixnQ0FBZ0MsQ0FBQyw2QkFBNkIsZ0NBQWdDLENBQUMseUlBQXlJLHdCQUF3QixDQUFDLHFEQUFxRCxVQUFVLENBQUMsK0NBQStDLG9DQUFvQyxDQUFDLHNJQUFzSSx3QkFBd0IsQ0FBQyxvREFBb0QscUJBQXFCLENBQUMsOENBQThDLG9DQUFvQyxDQUFDLGdJQUFnSSx3QkFBd0IsQ0FBQyxrREFBa0QsVUFBVSxDQUFDLDRDQUE0QyxtQ0FBbUMsQ0FBQyxvR0FBb0csZ0NBQWdDLENBQUMsc0tBQXNLLGdDQUFnQyxDQUFDLG1FQUFtRSxnQ0FBZ0MsQ0FBQyx3REFBd0QsZ0NBQWdDLENBQUMsMEtBQTBLLGdDQUFnQyxDQUFDLGtNQUFrTSxnQ0FBZ0MsQ0FBQyx3RkFBd0YsNEJBQTRCLENBQUMsNEJBQTRCLENBQUMsa01BQWtNLDRCQUE0QixDQUFDLDBPQUEwTyw0QkFBNEIsQ0FBQyxpREFBaUQsMkJBQTJCLENBQUMseUNBQXlDLDRIQUE0SCxDQUFDLGtJQUFrSSxDQUFDLHVDQUF1Qyw2SEFBNkgsQ0FBQyxtS0FBbUssZ0NBQWdDLENBQUMsMkNBQTJDLGNBQWMsQ0FBQyxvQkFBb0IsdUJBQXVCLGVBQWUsQ0FBQyxDQUFDLHFFQUFxRSxxQkFBcUIsQ0FBQyxnQ0FBZ0MsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLCtIQUErSCx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsMkNBQTJDLHFCQUFxQixDQUFDLGdLQUFnSyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyx5Q0FBeUMsVUFBVSxDQUFDLDBKQUEwSix3QkFBd0IsQ0FBQyxVQUFVLENBQUMsNENBQTRDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQyx1REFBdUQscUJBQXFCLENBQUMsc0RBQXNELGFBQWEsQ0FBQyw4Q0FBOEMscUJBQXFCLENBQUMsbUNBQW1DLGlDQUFpQyxDQUFDLDBHQUEwRyxnQ0FBZ0MsQ0FBQywrQkFBK0IsV0FBVyxDQUFDLCtGQUErRixpQkFBaUIsQ0FBQyxtQ0FBbUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxtSkFBbUosUUFBUSxDQUFDLGdFQUFnRSxRQUFRLENBQUMsdUJBQXVCLGFBQWEsQ0FBQyxpQ0FBaUMsdUNBQXVDLENBQUMsK0ZBQStGLG9DQUFvQyxDQUFDLGtCQUFrQixDQUFDLDZCQUE2QixxQkFBcUIsQ0FBQywrREFBK0QscUJBQXFCLENBQUMsbUNBQW1DLDRCQUE0QixDQUFDLHVFQUF1RSw0QkFBNEIsQ0FBQyxnR0FBZ0csa0JBQWtCLENBQUMsZUFBZSxDQUFDLGdyQkFBZ3JCLHFDQUFxQyxDQUFDLGtGQUFrRix3QkFBd0IsQ0FBQyxnVkFBZ1YscUJBQXFCLENBQUMsd3FCQUF3cUIscUNBQXFDLENBQUMsZ0ZBQWdGLHdCQUF3QixDQUFDLHdVQUF3VSxnQ0FBZ0MsQ0FBQyx3cEJBQXdwQixxQ0FBcUMsQ0FBQyw0RUFBNEUsd0JBQXdCLENBQUMsd1RBQXdULHFCQUFxQixDQUFDLHd3QkFBd3dCLHFDQUFxQyxDQUFDLGdYQUFnWCx3QkFBd0IsQ0FBQyxzU0FBc1MsVUFBVSxDQUFDLDBXQUEwVywwQkFBMEIsQ0FBQyw4dEJBQTh0QixpQkFBaUIsQ0FBQyx3ZEFBd2QsaUJBQWlCLENBQUMsVUFBVSxDQUFDLHdlQUF3ZSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsZ3dCQUFnd0IscUNBQXFDLENBQUMsMFdBQTBXLHdCQUF3QixDQUFDLGtTQUFrUyxxQkFBcUIsQ0FBQyxzV0FBc1csb0JBQW9CLENBQUMsc3RCQUFzdEIsNEJBQTRCLENBQUMsb2RBQW9kLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxrZUFBa2UscUJBQXFCLENBQUMsV0FBVyxDQUFDLGd2QkFBZ3ZCLHFDQUFxQyxDQUFDLDhWQUE4Vix3QkFBd0IsQ0FBQywwUkFBMFIsVUFBVSxDQUFDLDhWQUE4ViwwQkFBMEIsQ0FBQyxzc0JBQXNzQixpQkFBaUIsQ0FBQyw0Y0FBNGMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLHNkQUFzZCxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsYUFBYSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUIsa0JBQWtCLENBQUMsVUFBVSxDQUFDLHdCQUF3QixrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0Isa0JBQWtCLENBQUMsVUFBVSxDQUFDLDRIQUE0SCw2QkFBNkIsQ0FBQyw0TUFBNE0sYUFBYSxDQUFDLGdDQUFnQyx3QkFBd0IsQ0FBQywyQkFBMkIsZUFBZSxDQUFDLHlDQUF5QyxXQUFXLENBQUMseUJBQXlCLDJCQUEyQixlQUFlLENBQUMseUNBQXlDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsNEJBQTRCLENBQUMsVUFBVSxlQUFlLENBQUMscUNBQXFDLHFCQUFxQixDQUFDLGVBQWUsZUFBZSxDQUFDLHlCQUF5QiwwQkFBMEIsQ0FBQyxrQkFBa0IsQ0FBQyx3SEFBd0gsQ0FBQyw0QkFBNEIsYUFBYSxDQ0V2LzVFO0VBQ0ksV0FBQTtBQUFKLENBR0E7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSx3Q0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQUosQ0FDSTtFQUNJLHlCQUFBO0FBQ1IsQ0FJQTtFQUNJLFNBQUE7RUFDQSxRQUFBO0FBREosQ0FJQTtFQUNJLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FBREosQ0FLQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUZKLENBS0E7RUFDSSxVQUFBO0VBQ0EsWUFBQTtBQUZKIiwiZmlsZSI6ImhvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfS5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZTo5cHh9Lm1hdC1iYWRnZS1sYXJnZSAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjI0cHh9Lm1hdC1oMSwubWF0LWhlYWRsaW5lLC5tYXQtdHlwb2dyYXBoeSAubWF0LWgxLC5tYXQtdHlwb2dyYXBoeSAubWF0LWhlYWRsaW5lLC5tYXQtdHlwb2dyYXBoeSBoMXtmb250OjQwMCAyNHB4LzMycHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO21hcmdpbjowIDAgMTZweH0ubWF0LWgyLC5tYXQtdGl0bGUsLm1hdC10eXBvZ3JhcGh5IC5tYXQtaDIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtdGl0bGUsLm1hdC10eXBvZ3JhcGh5IGgye2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtsZXR0ZXItc3BhY2luZzpub3JtYWw7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDMsLm1hdC1zdWJoZWFkaW5nLTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtaDMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSAubWF0LWg0LC5tYXQtdHlwb2dyYXBoeSAubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbDttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgLm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgY2FsYygxNHB4ICogMC44MykvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgLm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgY2FsYygxNHB4ICogMC42NykvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1ib2R5LXN0cm9uZywubWF0LWJvZHktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1ib2R5LXN0cm9uZywubWF0LXR5cG9ncmFwaHkgLm1hdC1ib2R5LTJ7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbH0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtYm9keSwubWF0LXR5cG9ncmFwaHkgLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtsZXR0ZXItc3BhY2luZzpub3JtYWx9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgLm1hdC1ib2R5IHAsLm1hdC10eXBvZ3JhcGh5IC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtc21hbGwsLm1hdC1jYXB0aW9uLC5tYXQtdHlwb2dyYXBoeSAubWF0LXNtYWxsLC5tYXQtdHlwb2dyYXBoeSAubWF0LWNhcHRpb257Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbH0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7bGV0dGVyLXNwYWNpbmc6LTAuMDVlbTttYXJnaW46MCAwIDU2cHh9Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtsZXR0ZXItc3BhY2luZzotMC4wMmVtO21hcmdpbjowIDAgNjRweH0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOi0wLjAwNWVtO21hcmdpbjowIDAgNjRweH0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbDttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtsZXR0ZXItc3BhY2luZzpub3JtYWx9Lm1hdC1idXR0b24sLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtaWNvbi1idXR0b24sLm1hdC1zdHJva2VkLWJ1dHRvbiwubWF0LWZsYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtbWluaS1mYWJ7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtYnV0dG9uLXRvZ2dsZXtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LWNhcmR7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjBweH0ubWF0LWNhcmQtc3VidGl0bGUsLm1hdC1jYXJkLWNvbnRlbnR7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNoaXAgLm1hdC1jaGlwLXRyYWlsaW5nLWljb24ubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb257Zm9udC1zaXplOjE4cHh9Lm1hdC10YWJsZXtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbH0ubWF0LWZvcm0tZmllbGR7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbH0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSgwLjc1KTt3aWR0aDoxMzMuMzMzMzMzMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKDAuNzUpO3dpZHRoOjEzMy4zMzMzNDMzMzMzJX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LTAuODQzNzVlbTtwYWRkaW5nLXRvcDouODQzNzVlbX0ubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye2ZvbnQtc2l6ZTo3NSU7bWFyZ2luLXRvcDouNjY2NjY2NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY2NjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWigwLjAwMXB4KTt3aWR0aDoxMzMuMzMzMzMzMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWigwLjAwMTAxcHgpO3dpZHRoOjEzMy4zMzMzNDMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooMC4wMDEwMnB4KTt3aWR0aDoxMzMuMzMzMzUzMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4yODEyNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcnttYXJnaW4tdG9wOi41NDE2NjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjY2NjY2N2VtKX1AbWVkaWEgcHJpbnR7Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIyZW0pIHNjYWxlKDAuNzUpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjFlbSkgc2NhbGUoMC43NSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTJlbSkgc2NhbGUoMC43NSl9fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotMC41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTAuNTkzNzVlbSkgc2NhbGUoMC43NSk7d2lkdGg6MTMzLjMzMzMzMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTAuNTkzNzRlbSkgc2NhbGUoMC43NSk7d2lkdGg6MTMzLjMzMzM0MzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDAgMWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0wLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoMC43NSk7d2lkdGg6MTMzLjMzMzMzMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoMC43NSk7d2lkdGg6MTMzLjMzMzM0MzMzMzMlfS5tYXQtZ3JpZC10aWxlLWhlYWRlciwubWF0LWdyaWQtdGlsZS1mb290ZXJ7Zm9udC1zaXplOjE0cHh9Lm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZSwubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9aW5wdXQubWF0LWlucHV0LWVsZW1lbnR7bWFyZ2luLXRvcDotMC4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtcGFnaW5hdG9yLC5tYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZSAubWF0LXNlbGVjdC10cmlnZ2Vye2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfS5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItdmVydGljYWwsLm1hdC1zdGVwcGVyLWhvcml6b250YWx7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWZ9Lm1hdC1zdGVwLWxhYmVse2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXN0ZXAtc3ViLWxhYmVsLWVycm9ye2ZvbnQtd2VpZ2h0Om5vcm1hbH0ubWF0LXN0ZXAtbGFiZWwtZXJyb3J7Zm9udC1zaXplOjE0cHh9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LXRhYi1sYWJlbCwubWF0LXRhYi1saW5re2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOm5vcm1hbDttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo4cHg7cGFkZGluZy1ib3R0b206OHB4fS5tYXQtbGlzdC1pdGVte2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmfS5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWZ9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0LWJhc2UgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7bGV0dGVyLXNwYWNpbmc6bm9ybWFsfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZn0ubWF0LXRyZWUtbm9kZSwubWF0LW5lc3RlZC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZX0ubWF0LXJpcHBsZTpub3QoOmVtcHR5KXt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay1oaWdoLWNvbnRyYXN0LWFjdGl2ZSAubWF0LXJpcHBsZS1lbGVtZW50e2Rpc3BsYXk6bm9uZX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDt3aGl0ZS1zcGFjZTpub3dyYXA7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2xlZnQ6MH1bZGlyPXJ0bF0gLmNkay12aXN1YWxseS1oaWRkZW57bGVmdDphdXRvO3JpZ2h0OjB9LmNkay1vdmVybGF5LWNvbnRhaW5lciwuY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktcGFuZXtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czphdXRvO2JveC1zaXppbmc6Ym9yZGVyLWJveDt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uY2RrLW92ZXJsYXktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxMDAwO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246b3BhY2l0eSA0MDBtcyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfS5jZGstaGlnaC1jb250cmFzdC1hY3RpdmUgLmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn0uY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcHtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjMyKX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3B7dHJhbnNpdGlvbjp2aXNpYmlsaXR5IDFtcyBsaW5lYXIsb3BhY2l0eSAxbXMgbGluZWFyO3Zpc2liaWxpdHk6aGlkZGVuO29wYWNpdHk6MX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjA7dmlzaWJpbGl0eTp2aXNpYmxlfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemV7cmVzaXplOm5vbmV9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZ3twYWRkaW5nOjJweCAwICFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCAhaW1wb3J0YW50O2hlaWdodDphdXRvICFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuICFpbXBvcnRhbnR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZy1maXJlZm94e3BhZGRpbmc6MnB4IDAgIWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94ICFpbXBvcnRhbnQ7aGVpZ2h0OjAgIWltcG9ydGFudH1Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0ey8qISovfUBrZXlmcmFtZXMgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5key8qISovfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHthbmltYXRpb246Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQgMHMgMW1zfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXthbmltYXRpb246Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kIDBzIDFtc30ubWF0LWZvY3VzLWluZGljYXRvcntwb3NpdGlvbjpyZWxhdGl2ZX0ubWF0LW1kYy1mb2N1cy1pbmRpY2F0b3J7cG9zaXRpb246cmVsYXRpdmV9Lm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpfS5tYXQtb3B0aW9ue2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LW9wdGlvbjpob3Zlcjpub3QoLm1hdC1vcHRpb24tZGlzYWJsZWQpLC5tYXQtb3B0aW9uOmZvY3VzOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCl7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wNCl9Lm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1tdWx0aXBsZSk6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjA0KX0ubWF0LW9wdGlvbi5tYXQtYWN0aXZle2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDQpO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LW9wdGlvbi5tYXQtb3B0aW9uLWRpc2FibGVke2NvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LXByaW1hcnkgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCl7Y29sb3I6IzY3M2FiN30ubWF0LWFjY2VudCAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKXtjb2xvcjojZmZkNzQwfS5tYXQtd2FybiAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKXtjb2xvcjojZjQ0MzM2fS5tYXQtb3B0Z3JvdXAtbGFiZWx7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtb3B0Z3JvdXAtZGlzYWJsZWQgLm1hdC1vcHRncm91cC1sYWJlbHtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1wc2V1ZG8tY2hlY2tib3h7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtcHNldWRvLWNoZWNrYm94OjphZnRlcntjb2xvcjojZmFmYWZhfS5tYXQtcHNldWRvLWNoZWNrYm94LWRpc2FibGVke2NvbG9yOiNiMGIwYjB9Lm1hdC1wcmltYXJ5IC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsLm1hdC1wcmltYXJ5IC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGV7YmFja2dyb3VuZDojNjczYWI3fS5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSwubWF0LWFjY2VudCAubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkLC5tYXQtYWNjZW50IC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGV7YmFja2dyb3VuZDojZmZkNzQwfS5tYXQtd2FybiAubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkLC5tYXQtd2FybiAubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRle2JhY2tncm91bmQ6I2Y0NDMzNn0ubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkLm1hdC1wc2V1ZG8tY2hlY2tib3gtZGlzYWJsZWQsLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZS5tYXQtcHNldWRvLWNoZWNrYm94LWRpc2FibGVke2JhY2tncm91bmQ6I2IwYjBiMH0ubWF0LWFwcC1iYWNrZ3JvdW5ke2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYTtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1lbGV2YXRpb24tejB7Ym94LXNoYWRvdzowcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXoxe2JveC1zaGFkb3c6MHB4IDJweCAxcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDFweCAxcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjBweCAzcHggM3B4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAzcHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXo0e2JveC1zaGFkb3c6MHB4IDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDRweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDFweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MHB4IDNweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDVweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDFweCAxNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MHB4IDNweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDZweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggMThweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16N3tib3gtc2hhZG93OjBweCA0cHggNXB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCA3cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMnB4IDE2cHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1lbGV2YXRpb24tejh7Ym94LXNoYWRvdzowcHggNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXo5e2JveC1zaGFkb3c6MHB4IDVweCA2cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDlweCAxMnB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAzcHggMTZweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTB7Ym94LXNoYWRvdzowcHggNnB4IDZweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTBweCAxNHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA0cHggMThweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTF7Ym94LXNoYWRvdzowcHggNnB4IDdweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTFweCAxNXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA0cHggMjBweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTJ7Ym94LXNoYWRvdzowcHggN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTJweCAxN3B4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA1cHggMjJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTN7Ym94LXNoYWRvdzowcHggN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTNweCAxOXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA1cHggMjRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTR7Ym94LXNoYWRvdzowcHggN3B4IDlweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTRweCAyMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA1cHggMjZweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTV7Ym94LXNoYWRvdzowcHggOHB4IDlweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTVweCAyMnB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA2cHggMjhweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTZ7Ym94LXNoYWRvdzowcHggOHB4IDEwcHggLTVweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDE2cHggMjRweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggNnB4IDMwcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1lbGV2YXRpb24tejE3e2JveC1zaGFkb3c6MHB4IDhweCAxMXB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAxN3B4IDI2cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDZweCAzMnB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXoxOHtib3gtc2hhZG93OjBweCA5cHggMTFweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMThweCAyOHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA3cHggMzRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MTl7Ym94LXNoYWRvdzowcHggOXB4IDEycHggLTZweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDE5cHggMjlweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggN3B4IDM2cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1lbGV2YXRpb24tejIwe2JveC1zaGFkb3c6MHB4IDEwcHggMTNweCAtNnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMjBweCAzMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA4cHggMzhweCA3cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MjF7Ym94LXNoYWRvdzowcHggMTBweCAxM3B4IC02cHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAyMXB4IDMzcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDhweCA0MHB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtZWxldmF0aW9uLXoyMntib3gtc2hhZG93OjBweCAxMHB4IDE0cHggLTZweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDIycHggMzVweCAzcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggOHB4IDQycHggN3B4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1lbGV2YXRpb24tejIze2JveC1zaGFkb3c6MHB4IDExcHggMTRweCAtN3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMjNweCAzNnB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA5cHggNDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWVsZXZhdGlvbi16MjR7Ym94LXNoYWRvdzowcHggMTFweCAxNXB4IC03cHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAyNHB4IDM4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDlweCA0NnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtdGhlbWUtbG9hZGVkLW1hcmtlcntkaXNwbGF5Om5vbmV9Lm1hdC1hdXRvY29tcGxldGUtcGFuZWx7YmFja2dyb3VuZDojZmZmO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWF1dG9jb21wbGV0ZS1wYW5lbDpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKXtib3gtc2hhZG93OjBweCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWF1dG9jb21wbGV0ZS1wYW5lbCAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtYWN0aXZlKTpub3QoOmhvdmVyKXtiYWNrZ3JvdW5kOiNmZmZ9Lm1hdC1hdXRvY29tcGxldGUtcGFuZWwgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LWFjdGl2ZSk6bm90KDpob3Zlcik6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKXtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1iYWRnZXtwb3NpdGlvbjpyZWxhdGl2ZX0ubWF0LWJhZGdlLm1hdC1iYWRnZXtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtYmFkZ2UtaGlkZGVuIC5tYXQtYmFkZ2UtY29udGVudHtkaXNwbGF5Om5vbmV9Lm1hdC1iYWRnZS1jb250ZW50e3Bvc2l0aW9uOmFic29sdXRlO3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlci1yYWRpdXM6NTAlO3RyYW5zaXRpb246dHJhbnNmb3JtIDIwMG1zIGVhc2UtaW4tb3V0O3RyYW5zZm9ybTpzY2FsZSgwLjYpO292ZXJmbG93OmhpZGRlbjt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztwb2ludGVyLWV2ZW50czpub25lfS5uZy1hbmltYXRlLWRpc2FibGVkIC5tYXQtYmFkZ2UtY29udGVudCwubWF0LWJhZGdlLWNvbnRlbnQuX21hdC1hbmltYXRpb24tbm9vcGFibGV7dHJhbnNpdGlvbjpub25lfS5tYXQtYmFkZ2UtY29udGVudC5tYXQtYmFkZ2UtYWN0aXZle3RyYW5zZm9ybTpub25lfS5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50e3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7bGluZS1oZWlnaHQ6MTZweH0ubWF0LWJhZGdlLXNtYWxsLm1hdC1iYWRnZS1hYm92ZSAubWF0LWJhZGdlLWNvbnRlbnR7dG9wOi04cHh9Lm1hdC1iYWRnZS1zbWFsbC5tYXQtYmFkZ2UtYmVsb3cgLm1hdC1iYWRnZS1jb250ZW50e2JvdHRvbTotOHB4fS5tYXQtYmFkZ2Utc21hbGwubWF0LWJhZGdlLWJlZm9yZSAubWF0LWJhZGdlLWNvbnRlbnR7bGVmdDotMTZweH1bZGlyPXJ0bF0gLm1hdC1iYWRnZS1zbWFsbC5tYXQtYmFkZ2UtYmVmb3JlIC5tYXQtYmFkZ2UtY29udGVudHtsZWZ0OmF1dG87cmlnaHQ6LTE2cHh9Lm1hdC1iYWRnZS1zbWFsbC5tYXQtYmFkZ2UtYWZ0ZXIgLm1hdC1iYWRnZS1jb250ZW50e3JpZ2h0Oi0xNnB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLXNtYWxsLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6YXV0bztsZWZ0Oi0xNnB4fS5tYXQtYmFkZ2Utc21hbGwubWF0LWJhZGdlLW92ZXJsYXAubWF0LWJhZGdlLWJlZm9yZSAubWF0LWJhZGdlLWNvbnRlbnR7bGVmdDotOHB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLXNtYWxsLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1iZWZvcmUgLm1hdC1iYWRnZS1jb250ZW50e2xlZnQ6YXV0bztyaWdodDotOHB4fS5tYXQtYmFkZ2Utc21hbGwubWF0LWJhZGdlLW92ZXJsYXAubWF0LWJhZGdlLWFmdGVyIC5tYXQtYmFkZ2UtY29udGVudHtyaWdodDotOHB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLXNtYWxsLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6YXV0bztsZWZ0Oi04cHh9Lm1hdC1iYWRnZS1tZWRpdW0gLm1hdC1iYWRnZS1jb250ZW50e3dpZHRoOjIycHg7aGVpZ2h0OjIycHg7bGluZS1oZWlnaHQ6MjJweH0ubWF0LWJhZGdlLW1lZGl1bS5tYXQtYmFkZ2UtYWJvdmUgLm1hdC1iYWRnZS1jb250ZW50e3RvcDotMTFweH0ubWF0LWJhZGdlLW1lZGl1bS5tYXQtYmFkZ2UtYmVsb3cgLm1hdC1iYWRnZS1jb250ZW50e2JvdHRvbTotMTFweH0ubWF0LWJhZGdlLW1lZGl1bS5tYXQtYmFkZ2UtYmVmb3JlIC5tYXQtYmFkZ2UtY29udGVudHtsZWZ0Oi0yMnB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLW1lZGl1bS5tYXQtYmFkZ2UtYmVmb3JlIC5tYXQtYmFkZ2UtY29udGVudHtsZWZ0OmF1dG87cmlnaHQ6LTIycHh9Lm1hdC1iYWRnZS1tZWRpdW0ubWF0LWJhZGdlLWFmdGVyIC5tYXQtYmFkZ2UtY29udGVudHtyaWdodDotMjJweH1bZGlyPXJ0bF0gLm1hdC1iYWRnZS1tZWRpdW0ubWF0LWJhZGdlLWFmdGVyIC5tYXQtYmFkZ2UtY29udGVudHtyaWdodDphdXRvO2xlZnQ6LTIycHh9Lm1hdC1iYWRnZS1tZWRpdW0ubWF0LWJhZGdlLW92ZXJsYXAubWF0LWJhZGdlLWJlZm9yZSAubWF0LWJhZGdlLWNvbnRlbnR7bGVmdDotMTFweH1bZGlyPXJ0bF0gLm1hdC1iYWRnZS1tZWRpdW0ubWF0LWJhZGdlLW92ZXJsYXAubWF0LWJhZGdlLWJlZm9yZSAubWF0LWJhZGdlLWNvbnRlbnR7bGVmdDphdXRvO3JpZ2h0Oi0xMXB4fS5tYXQtYmFkZ2UtbWVkaXVtLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6LTExcHh9W2Rpcj1ydGxdIC5tYXQtYmFkZ2UtbWVkaXVtLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6YXV0bztsZWZ0Oi0xMXB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7bGluZS1oZWlnaHQ6MjhweH0ubWF0LWJhZGdlLWxhcmdlLm1hdC1iYWRnZS1hYm92ZSAubWF0LWJhZGdlLWNvbnRlbnR7dG9wOi0xNHB4fS5tYXQtYmFkZ2UtbGFyZ2UubWF0LWJhZGdlLWJlbG93IC5tYXQtYmFkZ2UtY29udGVudHtib3R0b206LTE0cHh9Lm1hdC1iYWRnZS1sYXJnZS5tYXQtYmFkZ2UtYmVmb3JlIC5tYXQtYmFkZ2UtY29udGVudHtsZWZ0Oi0yOHB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLWxhcmdlLm1hdC1iYWRnZS1iZWZvcmUgLm1hdC1iYWRnZS1jb250ZW50e2xlZnQ6YXV0bztyaWdodDotMjhweH0ubWF0LWJhZGdlLWxhcmdlLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6LTI4cHh9W2Rpcj1ydGxdIC5tYXQtYmFkZ2UtbGFyZ2UubWF0LWJhZGdlLWFmdGVyIC5tYXQtYmFkZ2UtY29udGVudHtyaWdodDphdXRvO2xlZnQ6LTI4cHh9Lm1hdC1iYWRnZS1sYXJnZS5tYXQtYmFkZ2Utb3ZlcmxhcC5tYXQtYmFkZ2UtYmVmb3JlIC5tYXQtYmFkZ2UtY29udGVudHtsZWZ0Oi0xNHB4fVtkaXI9cnRsXSAubWF0LWJhZGdlLWxhcmdlLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1iZWZvcmUgLm1hdC1iYWRnZS1jb250ZW50e2xlZnQ6YXV0bztyaWdodDotMTRweH0ubWF0LWJhZGdlLWxhcmdlLm1hdC1iYWRnZS1vdmVybGFwLm1hdC1iYWRnZS1hZnRlciAubWF0LWJhZGdlLWNvbnRlbnR7cmlnaHQ6LTE0cHh9W2Rpcj1ydGxdIC5tYXQtYmFkZ2UtbGFyZ2UubWF0LWJhZGdlLW92ZXJsYXAubWF0LWJhZGdlLWFmdGVyIC5tYXQtYmFkZ2UtY29udGVudHtyaWdodDphdXRvO2xlZnQ6LTE0cHh9Lm1hdC1iYWRnZS1jb250ZW50e2NvbG9yOiNmZmY7YmFja2dyb3VuZDojNjczYWI3fS5jZGstaGlnaC1jb250cmFzdC1hY3RpdmUgLm1hdC1iYWRnZS1jb250ZW50e291dGxpbmU6c29saWQgMXB4O2JvcmRlci1yYWRpdXM6MH0ubWF0LWJhZGdlLWFjY2VudCAubWF0LWJhZGdlLWNvbnRlbnR7YmFja2dyb3VuZDojZmZkNzQwO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWJhZGdlLXdhcm4gLm1hdC1iYWRnZS1jb250ZW50e2NvbG9yOiNmZmY7YmFja2dyb3VuZDojZjQ0MzM2fS5tYXQtYmFkZ2UtZGlzYWJsZWQgLm1hdC1iYWRnZS1jb250ZW50e2JhY2tncm91bmQ6I2I5YjliOTtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2JveC1zaGFkb3c6MHB4IDhweCAxMHB4IC01cHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAxNnB4IDI0cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDZweCAzMHB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTIpO2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2NvbG9yOmluaGVyaXQ7YmFja2dyb3VuZDp0cmFuc3BhcmVudH0ubWF0LWJ1dHRvbi5tYXQtcHJpbWFyeSwubWF0LWljb24tYnV0dG9uLm1hdC1wcmltYXJ5LC5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LXByaW1hcnl7Y29sb3I6IzY3M2FiN30ubWF0LWJ1dHRvbi5tYXQtYWNjZW50LC5tYXQtaWNvbi1idXR0b24ubWF0LWFjY2VudCwubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC1hY2NlbnR7Y29sb3I6I2ZmZDc0MH0ubWF0LWJ1dHRvbi5tYXQtd2FybiwubWF0LWljb24tYnV0dG9uLm1hdC13YXJuLC5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LXdhcm57Y29sb3I6I2Y0NDMzNn0ubWF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtYnV0dG9uLm1hdC1hY2NlbnQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWJ1dHRvbi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWljb24tYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1pY29uLWJ1dHRvbi5tYXQtYWNjZW50Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1pY29uLWJ1dHRvbi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtaWNvbi1idXR0b24ubWF0LWJ1dHRvbi1kaXNhYmxlZC5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LXByaW1hcnkubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC1hY2NlbnQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC13YXJuLm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1zdHJva2VkLWJ1dHRvbi5tYXQtYnV0dG9uLWRpc2FibGVkLm1hdC1idXR0b24tZGlzYWJsZWR7Y29sb3I6cmdiYSgwLDAsMCwuMjYpfS5tYXQtYnV0dG9uLm1hdC1wcmltYXJ5IC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXksLm1hdC1pY29uLWJ1dHRvbi5tYXQtcHJpbWFyeSAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LC5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LXByaW1hcnkgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheXtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1idXR0b24ubWF0LWFjY2VudCAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LC5tYXQtaWNvbi1idXR0b24ubWF0LWFjY2VudCAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LC5tYXQtc3Ryb2tlZC1idXR0b24ubWF0LWFjY2VudCAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5e2JhY2tncm91bmQtY29sb3I6I2ZmZDc0MH0ubWF0LWJ1dHRvbi5tYXQtd2FybiAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LC5tYXQtaWNvbi1idXR0b24ubWF0LXdhcm4gLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSwubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC13YXJuIC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXl7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2fS5tYXQtYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSwubWF0LWljb24tYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSwubWF0LXN0cm9rZWQtYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5tYXQtYnV0dG9uIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC1pY29uLWJ1dHRvbiAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtc3Ryb2tlZC1idXR0b24gLm1hdC1yaXBwbGUtZWxlbWVudHtvcGFjaXR5Oi4xO2JhY2tncm91bmQtY29sb3I6Y3VycmVudENvbG9yfS5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXl7YmFja2dyb3VuZDojMDAwfS5tYXQtc3Ryb2tlZC1idXR0b246bm90KC5tYXQtYnV0dG9uLWRpc2FibGVkKXtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtZmxhdC1idXR0b24sLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtbWluaS1mYWJ7Y29sb3I6cmdiYSgwLDAsMCwuODcpO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtcHJpbWFyeSwubWF0LWZhYi5tYXQtcHJpbWFyeSwubWF0LW1pbmktZmFiLm1hdC1wcmltYXJ5e2NvbG9yOiNmZmZ9Lm1hdC1mbGF0LWJ1dHRvbi5tYXQtYWNjZW50LC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYWNjZW50LC5tYXQtZmFiLm1hdC1hY2NlbnQsLm1hdC1taW5pLWZhYi5tYXQtYWNjZW50e2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWZsYXQtYnV0dG9uLm1hdC13YXJuLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtd2FybiwubWF0LWZhYi5tYXQtd2FybiwubWF0LW1pbmktZmFiLm1hdC13YXJue2NvbG9yOiNmZmZ9Lm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtZmxhdC1idXR0b24ubWF0LWFjY2VudC5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtZmxhdC1idXR0b24ubWF0LXdhcm4ubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWZsYXQtYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LXJhaXNlZC1idXR0b24ubWF0LXByaW1hcnkubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LXJhaXNlZC1idXR0b24ubWF0LWFjY2VudC5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYnV0dG9uLWRpc2FibGVkLm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1mYWIubWF0LXByaW1hcnkubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWZhYi5tYXQtYWNjZW50Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1mYWIubWF0LXdhcm4ubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWZhYi5tYXQtYnV0dG9uLWRpc2FibGVkLm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1taW5pLWZhYi5tYXQtcHJpbWFyeS5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtbWluaS1mYWIubWF0LWFjY2VudC5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtbWluaS1mYWIubWF0LXdhcm4ubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LW1pbmktZmFiLm1hdC1idXR0b24tZGlzYWJsZWQubWF0LWJ1dHRvbi1kaXNhYmxlZHtjb2xvcjpyZ2JhKDAsMCwwLC4yNil9Lm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeSwubWF0LXJhaXNlZC1idXR0b24ubWF0LXByaW1hcnksLm1hdC1mYWIubWF0LXByaW1hcnksLm1hdC1taW5pLWZhYi5tYXQtcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1mbGF0LWJ1dHRvbi5tYXQtYWNjZW50LC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYWNjZW50LC5tYXQtZmFiLm1hdC1hY2NlbnQsLm1hdC1taW5pLWZhYi5tYXQtYWNjZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZDc0MH0ubWF0LWZsYXQtYnV0dG9uLm1hdC13YXJuLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtd2FybiwubWF0LWZhYi5tYXQtd2FybiwubWF0LW1pbmktZmFiLm1hdC13YXJue2JhY2tncm91bmQtY29sb3I6I2Y0NDMzNn0ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1mbGF0LWJ1dHRvbi5tYXQtYWNjZW50Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1mbGF0LWJ1dHRvbi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtZmxhdC1idXR0b24ubWF0LWJ1dHRvbi1kaXNhYmxlZC5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYWNjZW50Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1yYWlzZWQtYnV0dG9uLm1hdC13YXJuLm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1yYWlzZWQtYnV0dG9uLm1hdC1idXR0b24tZGlzYWJsZWQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWZhYi5tYXQtcHJpbWFyeS5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtZmFiLm1hdC1hY2NlbnQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LWZhYi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtZmFiLm1hdC1idXR0b24tZGlzYWJsZWQubWF0LWJ1dHRvbi1kaXNhYmxlZCwubWF0LW1pbmktZmFiLm1hdC1wcmltYXJ5Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1taW5pLWZhYi5tYXQtYWNjZW50Lm1hdC1idXR0b24tZGlzYWJsZWQsLm1hdC1taW5pLWZhYi5tYXQtd2Fybi5tYXQtYnV0dG9uLWRpc2FibGVkLC5tYXQtbWluaS1mYWIubWF0LWJ1dHRvbi1kaXNhYmxlZC5tYXQtYnV0dG9uLWRpc2FibGVke2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LXJhaXNlZC1idXR0b24ubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LWZhYi5tYXQtcHJpbWFyeSAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtbWluaS1mYWIubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjEpfS5tYXQtZmxhdC1idXR0b24ubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYWNjZW50IC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC1mYWIubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtbWluaS1mYWIubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSl9Lm1hdC1mbGF0LWJ1dHRvbi5tYXQtd2FybiAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtd2FybiAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtZmFiLm1hdC13YXJuIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC1taW5pLWZhYi5tYXQtd2FybiAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMSl9Lm1hdC1zdHJva2VkLWJ1dHRvbjpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKSwubWF0LWZsYXQtYnV0dG9uOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pe2JveC1zaGFkb3c6MHB4IDBweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LXJhaXNlZC1idXR0b246bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LXJhaXNlZC1idXR0b246bm90KC5tYXQtYnV0dG9uLWRpc2FibGVkKTphY3RpdmU6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggOHB4IDEwcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtcmFpc2VkLWJ1dHRvbi5tYXQtYnV0dG9uLWRpc2FibGVkOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pe2JveC1zaGFkb3c6MHB4IDBweCAwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWZhYjpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKSwubWF0LW1pbmktZmFiOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pe2JveC1zaGFkb3c6MHB4IDNweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDZweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggMThweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWZhYjpub3QoLm1hdC1idXR0b24tZGlzYWJsZWQpOmFjdGl2ZTpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKSwubWF0LW1pbmktZmFiOm5vdCgubWF0LWJ1dHRvbi1kaXNhYmxlZCk6YWN0aXZlOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pe2JveC1zaGFkb3c6MHB4IDdweCA4cHggLTRweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDEycHggMTdweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggNXB4IDIycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1mYWIubWF0LWJ1dHRvbi1kaXNhYmxlZDpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKSwubWF0LW1pbmktZmFiLm1hdC1idXR0b24tZGlzYWJsZWQ6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pLC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cDpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKXtib3gtc2hhZG93OjBweCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAycHggMnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQ6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSksLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmQ6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzpub25lfS5tYXQtYnV0dG9uLXRvZ2dsZXtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1idXR0b24tdG9nZ2xlIC5tYXQtYnV0dG9uLXRvZ2dsZS1mb2N1cy1vdmVybGF5e2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJke2NvbG9yOnJnYmEoMCwwLDAsLjg3KTtiYWNrZ3JvdW5kOiNmZmZ9Lm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQgLm1hdC1idXR0b24tdG9nZ2xlLWZvY3VzLW92ZXJsYXl7YmFja2dyb3VuZC1jb2xvcjojMDAwfS5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSsubWF0LWJ1dHRvbi10b2dnbGV7Ym9yZGVyLWxlZnQ6c29saWQgMXB4ICNlMGUwZTB9W2Rpcj1ydGxdIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSsubWF0LWJ1dHRvbi10b2dnbGV7Ym9yZGVyLWxlZnQ6bm9uZTtib3JkZXItcmlnaHQ6c29saWQgMXB4ICNlMGUwZTB9Lm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmQubWF0LWJ1dHRvbi10b2dnbGUtdmVydGljYWwgLm1hdC1idXR0b24tdG9nZ2xlKy5tYXQtYnV0dG9uLXRvZ2dsZXtib3JkZXItbGVmdDpub25lO2JvcmRlci1yaWdodDpub25lO2JvcmRlci10b3A6c29saWQgMXB4ICNlMGUwZTB9Lm1hdC1idXR0b24tdG9nZ2xlLWNoZWNrZWR7YmFja2dyb3VuZC1jb2xvcjojZTBlMGUwO2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZC5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJke2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWJ1dHRvbi10b2dnbGUtZGlzYWJsZWR7Y29sb3I6cmdiYSgwLDAsMCwuMjYpO2JhY2tncm91bmQtY29sb3I6I2VlZX0ubWF0LWJ1dHRvbi10b2dnbGUtZGlzYWJsZWQubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZHtiYWNrZ3JvdW5kOiNmZmZ9Lm1hdC1idXR0b24tdG9nZ2xlLWRpc2FibGVkLm1hdC1idXR0b24tdG9nZ2xlLWNoZWNrZWR7YmFja2dyb3VuZC1jb2xvcjojYmRiZGJkfS5tYXQtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQsLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmR7Ym9yZGVyOnNvbGlkIDFweCAjZTBlMGUwfS5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZS1sYWJlbC1jb250ZW50e2xpbmUtaGVpZ2h0OjQ4cHh9Lm1hdC1jYXJke2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1jYXJkOm5vdChbY2xhc3MqPW1hdC1lbGV2YXRpb24tel0pe2JveC1zaGFkb3c6MHB4IDJweCAxcHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDFweCAxcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1jYXJkLm1hdC1jYXJkLWZsYXQ6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggMHB4IDBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAwcHggMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtY2FyZC1zdWJ0aXRsZXtjb2xvcjpyZ2JhKDAsMCwwLC41NCl9Lm1hdC1jaGVja2JveC1mcmFtZXtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtY2hlY2tib3gtY2hlY2ttYXJre2ZpbGw6I2ZhZmFmYX0ubWF0LWNoZWNrYm94LWNoZWNrbWFyay1wYXRoe3N0cm9rZTojZmFmYWZhICFpbXBvcnRhbnR9Lm1hdC1jaGVja2JveC1taXhlZG1hcmt7YmFja2dyb3VuZC1jb2xvcjojZmFmYWZhfS5tYXQtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZS5tYXQtcHJpbWFyeSAubWF0LWNoZWNrYm94LWJhY2tncm91bmQsLm1hdC1jaGVja2JveC1jaGVja2VkLm1hdC1wcmltYXJ5IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1jaGVja2JveC1pbmRldGVybWluYXRlLm1hdC1hY2NlbnQgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kLC5tYXQtY2hlY2tib3gtY2hlY2tlZC5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmQ3NDB9Lm1hdC1jaGVja2JveC1pbmRldGVybWluYXRlLm1hdC13YXJuIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCwubWF0LWNoZWNrYm94LWNoZWNrZWQubWF0LXdhcm4gLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5ke2JhY2tncm91bmQtY29sb3I6I2Y0NDMzNn0ubWF0LWNoZWNrYm94LWRpc2FibGVkLm1hdC1jaGVja2JveC1jaGVja2VkIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCwubWF0LWNoZWNrYm94LWRpc2FibGVkLm1hdC1jaGVja2JveC1pbmRldGVybWluYXRlIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOiNiMGIwYjB9Lm1hdC1jaGVja2JveC1kaXNhYmxlZDpub3QoLm1hdC1jaGVja2JveC1jaGVja2VkKSAubWF0LWNoZWNrYm94LWZyYW1le2JvcmRlci1jb2xvcjojYjBiMGIwfS5tYXQtY2hlY2tib3gtZGlzYWJsZWQgLm1hdC1jaGVja2JveC1sYWJlbHtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1jaGVja2JveCAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6IzAwMH0ubWF0LWNoZWNrYm94LWNoZWNrZWQ6bm90KC5tYXQtY2hlY2tib3gtZGlzYWJsZWQpLm1hdC1wcmltYXJ5IC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC1jaGVja2JveDphY3RpdmU6bm90KC5tYXQtY2hlY2tib3gtZGlzYWJsZWQpLm1hdC1wcmltYXJ5IC5tYXQtcmlwcGxlLWVsZW1lbnR7YmFja2dyb3VuZDojNjczYWI3fS5tYXQtY2hlY2tib3gtY2hlY2tlZDpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtY2hlY2tib3g6YWN0aXZlOm5vdCgubWF0LWNoZWNrYm94LWRpc2FibGVkKS5tYXQtYWNjZW50IC5tYXQtcmlwcGxlLWVsZW1lbnR7YmFja2dyb3VuZDojZmZkNzQwfS5tYXQtY2hlY2tib3gtY2hlY2tlZDpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkubWF0LXdhcm4gLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LWNoZWNrYm94OmFjdGl2ZTpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkubWF0LXdhcm4gLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kOiNmNDQzMzZ9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwe2JhY2tncm91bmQtY29sb3I6I2UwZTBlMDtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwIC5tYXQtY2hpcC1yZW1vdmV7Y29sb3I6cmdiYSgwLDAsMCwuODcpO29wYWNpdHk6LjR9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwOm5vdCgubWF0LWNoaXAtZGlzYWJsZWQpOmFjdGl2ZXtib3gtc2hhZG93OjBweCAzcHggM3B4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAzcHggNHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpfS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcDpub3QoLm1hdC1jaGlwLWRpc2FibGVkKSAubWF0LWNoaXAtcmVtb3ZlOmhvdmVye29wYWNpdHk6LjU0fS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1kaXNhYmxlZHtvcGFjaXR5Oi40fS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcDo6YWZ0ZXJ7YmFja2dyb3VuZDojMDAwfS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1zZWxlY3RlZC5tYXQtcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjc7Y29sb3I6I2ZmZn0ubWF0LWNoaXAubWF0LXN0YW5kYXJkLWNoaXAubWF0LWNoaXAtc2VsZWN0ZWQubWF0LXByaW1hcnkgLm1hdC1jaGlwLXJlbW92ZXtjb2xvcjojZmZmO29wYWNpdHk6LjR9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwLm1hdC1jaGlwLXNlbGVjdGVkLm1hdC1wcmltYXJ5IC5tYXQtcmlwcGxlLWVsZW1lbnR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC4xKX0ubWF0LWNoaXAubWF0LXN0YW5kYXJkLWNoaXAubWF0LWNoaXAtc2VsZWN0ZWQubWF0LXdhcm57YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2O2NvbG9yOiNmZmZ9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwLm1hdC1jaGlwLXNlbGVjdGVkLm1hdC13YXJuIC5tYXQtY2hpcC1yZW1vdmV7Y29sb3I6I2ZmZjtvcGFjaXR5Oi40fS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1zZWxlY3RlZC5tYXQtd2FybiAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMSl9Lm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwLm1hdC1jaGlwLXNlbGVjdGVkLm1hdC1hY2NlbnR7YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWNoaXAubWF0LXN0YW5kYXJkLWNoaXAubWF0LWNoaXAtc2VsZWN0ZWQubWF0LWFjY2VudCAubWF0LWNoaXAtcmVtb3Zle2NvbG9yOnJnYmEoMCwwLDAsLjg3KTtvcGFjaXR5Oi40fS5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1zZWxlY3RlZC5tYXQtYWNjZW50IC5tYXQtcmlwcGxlLWVsZW1lbnR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0ubWF0LXRhYmxle2JhY2tncm91bmQ6I2ZmZn0ubWF0LXRhYmxlIHRoZWFkLC5tYXQtdGFibGUgdGJvZHksLm1hdC10YWJsZSB0Zm9vdCxtYXQtaGVhZGVyLXJvdyxtYXQtcm93LG1hdC1mb290ZXItcm93LFttYXQtaGVhZGVyLXJvd10sW21hdC1yb3ddLFttYXQtZm9vdGVyLXJvd10sLm1hdC10YWJsZS1zdGlja3l7YmFja2dyb3VuZDppbmhlcml0fW1hdC1yb3csbWF0LWhlYWRlci1yb3csbWF0LWZvb3Rlci1yb3csdGgubWF0LWhlYWRlci1jZWxsLHRkLm1hdC1jZWxsLHRkLm1hdC1mb290ZXItY2VsbHtib3JkZXItYm90dG9tLWNvbG9yOnJnYmEoMCwwLDAsLjEyKX0ubWF0LWhlYWRlci1jZWxse2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1jYWxlbmRhci1hcnJvd3tmaWxsOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWRhdGVwaWNrZXItdG9nZ2xlLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IC5tYXQtY2FsZW5kYXItbmV4dC1idXR0b24sLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQgLm1hdC1jYWxlbmRhci1wcmV2aW91cy1idXR0b257Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyLWRpdmlkZXI6OmFmdGVye2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTIpfS5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyLC5tYXQtY2FsZW5kYXItYm9keS1sYWJlbHtjb2xvcjpyZ2JhKDAsMCwwLC41NCl9Lm1hdC1jYWxlbmRhci1ib2R5LWNlbGwtY29udGVudCwubWF0LWRhdGUtcmFuZ2UtaW5wdXQtc2VwYXJhdG9ye2NvbG9yOnJnYmEoMCwwLDAsLjg3KTtib3JkZXItY29sb3I6dHJhbnNwYXJlbnR9Lm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkPi5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCl7Y29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWRhdGUtcmFuZ2UtaW5wdXQtc2VwYXJhdG9ye2NvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LWNhbGVuZGFyLWJvZHktaW4tcHJldmlld3tjb2xvcjpyZ2JhKDAsMCwwLC4yNCl9Lm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwpe2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkPi5tYXQtY2FsZW5kYXItYm9keS10b2RheTpub3QoLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkKTpub3QoLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsKXtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMTgpfS5tYXQtY2FsZW5kYXItYm9keS1pbi1yYW5nZTo6YmVmb3Jle2JhY2tncm91bmQ6cmdiYSgxMDMsNTgsMTgzLC4yKX0ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwsLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2U6OmJlZm9yZXtiYWNrZ3JvdW5kOnJnYmEoMjQ5LDE3MSwwLC4yKX0ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2Utc3RhcnQ6OmJlZm9yZSxbZGlyPXJ0bF0gLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLWVuZDo6YmVmb3Jle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDEwMywgNTgsIDE4MywgMC4yKSA1MCUsIHJnYmEoMjQ5LCAxNzEsIDAsIDAuMikgNTAlKX0ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2UtZW5kOjpiZWZvcmUsW2Rpcj1ydGxdIC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1zdGFydDo6YmVmb3Jle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIHJnYmEoMTAzLCA1OCwgMTgzLCAwLjIpIDUwJSwgcmdiYSgyNDksIDE3MSwgMCwgMC4yKSA1MCUpfS5tYXQtY2FsZW5kYXItYm9keS1pbi1yYW5nZT4ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwsLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2UubWF0LWNhbGVuZGFyLWJvZHktaW4tcmFuZ2U6OmFmdGVye2JhY2tncm91bmQ6I2E4ZGFiNX0ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQsLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2U+Lm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVke2JhY2tncm91bmQ6IzQ2YTM1ZX0ubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojNjczYWI3O2NvbG9yOiNmZmZ9Lm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkPi5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTAzLDU4LDE4MywuNCl9Lm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5Lm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVke2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4ICNmZmZ9LmNkay1rZXlib2FyZC1mb2N1c2VkIC5tYXQtY2FsZW5kYXItYm9keS1hY3RpdmU+Lm1hdC1jYWxlbmRhci1ib2R5LWNlbGwtY29udGVudDpub3QoLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkKTpub3QoLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsKSwuY2RrLXByb2dyYW0tZm9jdXNlZCAubWF0LWNhbGVuZGFyLWJvZHktYWN0aXZlPi5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEwMyw1OCwxODMsLjMpfUBtZWRpYShob3ZlcjogaG92ZXIpey5tYXQtY2FsZW5kYXItYm9keS1jZWxsOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQpOmhvdmVyPi5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEwMyw1OCwxODMsLjMpfX0ubWF0LWRhdGVwaWNrZXItY29udGVudHtib3gtc2hhZG93OjBweCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LWluLXJhbmdlOjpiZWZvcmV7YmFja2dyb3VuZDpyZ2JhKDI1NSwyMTUsNjQsLjIpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2U6OmJlZm9yZXtiYWNrZ3JvdW5kOnJnYmEoMjQ5LDE3MSwwLC4yKX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtYWNjZW50IC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1zdGFydDo6YmVmb3JlLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgW2Rpcj1ydGxdIC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1lbmQ6OmJlZm9yZXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgyNTUsIDIxNSwgNjQsIDAuMikgNTAlLCByZ2JhKDI0OSwgMTcxLCAwLCAwLjIpIDUwJSl9Lm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LWFjY2VudCAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2UtZW5kOjpiZWZvcmUsLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LWFjY2VudCBbZGlyPXJ0bF0gLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLXN0YXJ0OjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gbGVmdCwgcmdiYSgyNTUsIDIxNSwgNjQsIDAuMikgNTAlLCByZ2JhKDI0OSwgMTcxLCAwLCAwLjIpIDUwJSl9Lm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LWFjY2VudCAubWF0LWNhbGVuZGFyLWJvZHktaW4tcmFuZ2U+Lm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2UubWF0LWNhbGVuZGFyLWJvZHktaW4tcmFuZ2U6OmFmdGVye2JhY2tncm91bmQ6I2E4ZGFiNX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtYWNjZW50IC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCwubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtYWNjZW50IC5tYXQtY2FsZW5kYXItYm9keS1pbi1jb21wYXJpc29uLXJhbmdlPi5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZHtiYWNrZ3JvdW5kOiM0NmEzNWV9Lm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LWFjY2VudCAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtYWNjZW50IC5tYXQtY2FsZW5kYXItYm9keS1kaXNhYmxlZD4ubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyMTUsNjQsLjQpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5Lm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVke2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjg3KX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtYWNjZW50IC5jZGsta2V5Ym9hcmQtZm9jdXNlZCAubWF0LWNhbGVuZGFyLWJvZHktYWN0aXZlPi5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCksLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LWFjY2VudCAuY2RrLXByb2dyYW0tZm9jdXNlZCAubWF0LWNhbGVuZGFyLWJvZHktYWN0aXZlPi5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyMTUsNjQsLjMpfUBtZWRpYShob3ZlcjogaG92ZXIpey5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC1hY2NlbnQgLm1hdC1jYWxlbmRhci1ib2R5LWNlbGw6bm90KC5tYXQtY2FsZW5kYXItYm9keS1kaXNhYmxlZCk6aG92ZXI+Lm1hdC1jYWxlbmRhci1ib2R5LWNlbGwtY29udGVudDpub3QoLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkKTpub3QoLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDIxNSw2NCwuMyl9fS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIC5tYXQtY2FsZW5kYXItYm9keS1pbi1yYW5nZTo6YmVmb3Jle2JhY2tncm91bmQ6cmdiYSgyNDQsNjcsNTQsLjIpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCwubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAubWF0LWNhbGVuZGFyLWJvZHktaW4tY29tcGFyaXNvbi1yYW5nZTo6YmVmb3Jle2JhY2tncm91bmQ6cmdiYSgyNDksMTcxLDAsLjIpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1zdGFydDo6YmVmb3JlLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIFtkaXI9cnRsXSAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2UtZW5kOjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMjQ0LCA2NywgNTQsIDAuMikgNTAlLCByZ2JhKDI0OSwgMTcxLCAwLCAwLjIpIDUwJSl9Lm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LXdhcm4gLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLWVuZDo6YmVmb3JlLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIFtkaXI9cnRsXSAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2Utc3RhcnQ6OmJlZm9yZXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCByZ2JhKDI0NCwgNjcsIDU0LCAwLjIpIDUwJSwgcmdiYSgyNDksIDE3MSwgMCwgMC4yKSA1MCUpfS5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIC5tYXQtY2FsZW5kYXItYm9keS1pbi1yYW5nZT4ubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwsLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LXdhcm4gLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2UubWF0LWNhbGVuZGFyLWJvZHktaW4tcmFuZ2U6OmFmdGVye2JhY2tncm91bmQ6I2E4ZGFiNX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQsLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LXdhcm4gLm1hdC1jYWxlbmRhci1ib2R5LWluLWNvbXBhcmlzb24tcmFuZ2U+Lm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVke2JhY2tncm91bmQ6IzQ2YTM1ZX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2O2NvbG9yOiNmZmZ9Lm1hdC1kYXRlcGlja2VyLWNvbnRlbnQubWF0LXdhcm4gLm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkPi5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjQ0LDY3LDU0LC40KX0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAubWF0LWNhbGVuZGFyLWJvZHktdG9kYXkubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWR7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggI2ZmZn0ubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAuY2RrLWtleWJvYXJkLWZvY3VzZWQgLm1hdC1jYWxlbmRhci1ib2R5LWFjdGl2ZT4ubWF0LWNhbGVuZGFyLWJvZHktY2VsbC1jb250ZW50Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwpLC5tYXQtZGF0ZXBpY2tlci1jb250ZW50Lm1hdC13YXJuIC5jZGstcHJvZ3JhbS1mb2N1c2VkIC5tYXQtY2FsZW5kYXItYm9keS1hY3RpdmU+Lm1hdC1jYWxlbmRhci1ib2R5LWNlbGwtY29udGVudDpub3QoLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkKTpub3QoLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24taWRlbnRpY2FsKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjQ0LDY3LDU0LC4zKX1AbWVkaWEoaG92ZXI6IGhvdmVyKXsubWF0LWRhdGVwaWNrZXItY29udGVudC5tYXQtd2FybiAubWF0LWNhbGVuZGFyLWJvZHktY2VsbDpub3QoLm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkKTpob3Zlcj4ubWF0LWNhbGVuZGFyLWJvZHktY2VsbC1jb250ZW50Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwpe2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDQsNjcsNTQsLjMpfX0ubWF0LWRhdGVwaWNrZXItY29udGVudC10b3VjaHtib3gtc2hhZG93OjBweCAxMXB4IDE1cHggLTdweCByZ2JhKDAsIDAsIDAsIDAuMiksMHB4IDI0cHggMzhweCAzcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggOXB4IDQ2cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1kYXRlcGlja2VyLXRvZ2dsZS1hY3RpdmV7Y29sb3I6IzY3M2FiN30ubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZS5tYXQtYWNjZW50e2NvbG9yOiNmZmQ3NDB9Lm1hdC1kYXRlcGlja2VyLXRvZ2dsZS1hY3RpdmUubWF0LXdhcm57Y29sb3I6I2Y0NDMzNn0ubWF0LWRhdGUtcmFuZ2UtaW5wdXQtaW5uZXJbZGlzYWJsZWRde2NvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LWRpYWxvZy1jb250YWluZXJ7Ym94LXNoYWRvdzowcHggMTFweCAxNXB4IC03cHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCAyNHB4IDM4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xNCksMHB4IDlweCA0NnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMTIpO2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1kaXZpZGVye2JvcmRlci10b3AtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtZGl2aWRlci12ZXJ0aWNhbHtib3JkZXItcmlnaHQtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtZXhwYW5zaW9uLXBhbmVse2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1leHBhbnNpb24tcGFuZWw6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMnB4IDJweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWFjdGlvbi1yb3d7Ym9yZGVyLXRvcC1jb2xvcjpyZ2JhKDAsMCwwLC4xMil9Lm1hdC1leHBhbnNpb24tcGFuZWwgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdChbYXJpYS1kaXNhYmxlZD10cnVlXSksLm1hdC1leHBhbnNpb24tcGFuZWwgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KFthcmlhLWRpc2FibGVkPXRydWVdKSwubWF0LWV4cGFuc2lvbi1wYW5lbDpub3QoLm1hdC1leHBhbmRlZCkgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyOmhvdmVyOm5vdChbYXJpYS1kaXNhYmxlZD10cnVlXSl7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wNCl9QG1lZGlhKGhvdmVyOiBub25lKXsubWF0LWV4cGFuc2lvbi1wYW5lbDpub3QoLm1hdC1leHBhbmRlZCk6bm90KFthcmlhLWRpc2FibGVkPXRydWVdKSAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI6aG92ZXJ7YmFja2dyb3VuZDojZmZmfX0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItdGl0bGV7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbiwubWF0LWV4cGFuc2lvbi1pbmRpY2F0b3I6OmFmdGVye2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJbYXJpYS1kaXNhYmxlZD10cnVlXXtjb2xvcjpyZ2JhKDAsMCwwLC4yNil9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyW2FyaWEtZGlzYWJsZWQ9dHJ1ZV0gLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlLC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlclthcmlhLWRpc2FibGVkPXRydWVdIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbntjb2xvcjppbmhlcml0fS5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntoZWlnaHQ6NDhweH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXIubWF0LWV4cGFuZGVke2hlaWdodDo2NHB4fS5tYXQtZm9ybS1maWVsZC1sYWJlbHtjb2xvcjpyZ2JhKDAsMCwwLC42KX0ubWF0LWhpbnR7Y29sb3I6cmdiYSgwLDAsMCwuNil9Lm1hdC1mb3JtLWZpZWxkLm1hdC1mb2N1c2VkIC5tYXQtZm9ybS1maWVsZC1sYWJlbHtjb2xvcjojNjczYWI3fS5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtbGFiZWwubWF0LWFjY2VudHtjb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtbGFiZWwubWF0LXdhcm57Y29sb3I6I2Y0NDMzNn0ubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlcntjb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC1yaXBwbGV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1mb3JtLWZpZWxkLm1hdC1mb2N1c2VkIC5tYXQtZm9ybS1maWVsZC1yaXBwbGV7YmFja2dyb3VuZC1jb2xvcjojNjczYWI3fS5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtcmlwcGxlLm1hdC1hY2NlbnR7YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtcmlwcGxlLm1hdC13YXJue2JhY2tncm91bmQtY29sb3I6I2Y0NDMzNn0ubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9jdXNlZDpub3QoLm1hdC1mb3JtLWZpZWxkLWludmFsaWQpIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXJ7Y29sb3I6IzY3M2FiN30ubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9jdXNlZDpub3QoLm1hdC1mb3JtLWZpZWxkLWludmFsaWQpLm1hdC1hY2NlbnQgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlcntjb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC10eXBlLW1hdC1uYXRpdmUtc2VsZWN0Lm1hdC1mb2N1c2VkOm5vdCgubWF0LWZvcm0tZmllbGQtaW52YWxpZCkubWF0LXdhcm4gLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlcntjb2xvcjojZjQ0MzM2fS5tYXQtZm9ybS1maWVsZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIC5tYXQtZm9ybS1maWVsZC1sYWJlbHtjb2xvcjojZjQ0MzM2fS5tYXQtZm9ybS1maWVsZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIC5tYXQtZm9ybS1maWVsZC1sYWJlbC5tYXQtYWNjZW50LC5tYXQtZm9ybS1maWVsZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIC5tYXQtZm9ybS1maWVsZC1sYWJlbCAubWF0LWZvcm0tZmllbGQtcmVxdWlyZWQtbWFya2Vye2NvbG9yOiNmNDQzMzZ9Lm1hdC1mb3JtLWZpZWxkLm1hdC1mb3JtLWZpZWxkLWludmFsaWQgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSwubWF0LWZvcm0tZmllbGQubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWZvcm0tZmllbGQtcmlwcGxlLm1hdC1hY2NlbnR7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2fS5tYXQtZXJyb3J7Y29sb3I6I2Y0NDMzNn0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1oaW50e2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjQyKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtZGlzYWJsZWQgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgwLCAwLCAwLCAwLjQyKSAwJSwgcmdiYSgwLCAwLCAwLCAwLjQyKSAzMyUsIHRyYW5zcGFyZW50IDAlKTtiYWNrZ3JvdW5kLXNpemU6NHB4IDEwMCU7YmFja2dyb3VuZC1yZXBlYXQ6cmVwZWF0LXh9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utc3RhbmRhcmQgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjQyKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1zdGFuZGFyZC5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDAsIDAsIDAsIDAuNDIpIDAlLCByZ2JhKDAsIDAsIDAsIDAuNDIpIDMzJSwgdHJhbnNwYXJlbnQgMCUpO2JhY2tncm91bmQtc2l6ZTo0cHggMTAwJTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1mbGV4e2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMDQpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtZGlzYWJsZWQgLm1hdC1mb3JtLWZpZWxkLWZsZXh7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4wMil9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lOjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC40Mil9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtbGFiZWx7Y29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtZGlzYWJsZWQgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZTo6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtjb2xvcjpyZ2JhKDAsMCwwLC4xMil9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGlja3tjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGlja3tjb2xvcjojNjczYWI3fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvY3VzZWQubWF0LWFjY2VudCAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGlja3tjb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvY3VzZWQubWF0LXdhcm4gLm1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdGhpY2t7Y29sb3I6I2Y0NDMzNn0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWludmFsaWQubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGlja3tjb2xvcjojZjQ0MzM2fS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtZGlzYWJsZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVse2NvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2NvbG9yOnJnYmEoMCwwLDAsLjA2KX0ubWF0LWljb24ubWF0LXByaW1hcnl7Y29sb3I6IzY3M2FiN30ubWF0LWljb24ubWF0LWFjY2VudHtjb2xvcjojZmZkNzQwfS5tYXQtaWNvbi5tYXQtd2Fybntjb2xvcjojZjQ0MzM2fS5tYXQtZm9ybS1maWVsZC10eXBlLW1hdC1uYXRpdmUtc2VsZWN0IC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXJ7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtaW5wdXQtZWxlbWVudDpkaXNhYmxlZCwubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVye2NvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LWlucHV0LWVsZW1lbnR7Y2FyZXQtY29sb3I6IzY3M2FiN30ubWF0LWlucHV0LWVsZW1lbnQ6OnBsYWNlaG9sZGVye2NvbG9yOnJnYmEoMCwwLDAsLjQyKX0ubWF0LWlucHV0LWVsZW1lbnQ6Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSgwLDAsMCwuNDIpfS5tYXQtaW5wdXQtZWxlbWVudDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDAsMCwwLC40Mil9Lm1hdC1pbnB1dC1lbGVtZW50Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDAsMCwwLC40Mil9Lm1hdC1mb3JtLWZpZWxkLm1hdC1hY2NlbnQgLm1hdC1pbnB1dC1lbGVtZW50e2NhcmV0LWNvbG9yOiNmZmQ3NDB9Lm1hdC1mb3JtLWZpZWxkLm1hdC13YXJuIC5tYXQtaW5wdXQtZWxlbWVudCwubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWlucHV0LWVsZW1lbnR7Y2FyZXQtY29sb3I6I2Y0NDMzNn0ubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXJ7Y29sb3I6I2Y0NDMzNn0ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbXtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbntjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1saXN0LWJhc2UgLm1hdC1zdWJoZWFkZXJ7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtLWRpc2FibGVke2JhY2tncm91bmQtY29sb3I6I2VlZTtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1saXN0LW9wdGlvbjpob3ZlciwubWF0LWxpc3Qtb3B0aW9uOmZvY3VzLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW06aG92ZXIsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbTpmb2N1cywubWF0LWFjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtOmhvdmVyLC5tYXQtYWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW06Zm9jdXN7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wNCl9Lm1hdC1saXN0LXNpbmdsZS1zZWxlY3RlZC1vcHRpb24sLm1hdC1saXN0LXNpbmdsZS1zZWxlY3RlZC1vcHRpb246aG92ZXIsLm1hdC1saXN0LXNpbmdsZS1zZWxlY3RlZC1vcHRpb246Zm9jdXN7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xMil9Lm1hdC1tZW51LXBhbmVse2JhY2tncm91bmQ6I2ZmZn0ubWF0LW1lbnUtcGFuZWw6bm90KFtjbGFzcyo9bWF0LWVsZXZhdGlvbi16XSl7Ym94LXNoYWRvdzowcHggMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggNHB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1tZW51LWl0ZW17YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1tZW51LWl0ZW1bZGlzYWJsZWRdLC5tYXQtbWVudS1pdGVtW2Rpc2FibGVkXSAubWF0LW1lbnUtc3VibWVudS1pY29uLC5tYXQtbWVudS1pdGVtW2Rpc2FibGVkXSAubWF0LWljb24tbm8tY29sb3J7Y29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtbWVudS1pdGVtIC5tYXQtaWNvbi1uby1jb2xvciwubWF0LW1lbnUtc3VibWVudS1pY29ue2NvbG9yOnJnYmEoMCwwLDAsLjU0KX0ubWF0LW1lbnUtaXRlbTpob3Zlcjpub3QoW2Rpc2FibGVkXSksLm1hdC1tZW51LWl0ZW0uY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoW2Rpc2FibGVkXSksLm1hdC1tZW51LWl0ZW0uY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pLC5tYXQtbWVudS1pdGVtLWhpZ2hsaWdodGVkOm5vdChbZGlzYWJsZWRdKXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjA0KX0ubWF0LXBhZ2luYXRvcntiYWNrZ3JvdW5kOiNmZmZ9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCwubWF0LXBhZ2luYXRvci1pbmNyZW1lbnR7Ym9yZGVyLXRvcDoycHggc29saWQgcmdiYSgwLDAsMCwuNTQpO2JvcmRlci1yaWdodDoycHggc29saWQgcmdiYSgwLDAsMCwuNTQpfS5tYXQtcGFnaW5hdG9yLWZpcnN0LC5tYXQtcGFnaW5hdG9yLWxhc3R7Ym9yZGVyLXRvcDoycHggc29saWQgcmdiYSgwLDAsMCwuNTQpfS5tYXQtaWNvbi1idXR0b25bZGlzYWJsZWRdIC5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCwubWF0LWljb24tYnV0dG9uW2Rpc2FibGVkXSAubWF0LXBhZ2luYXRvci1pbmNyZW1lbnQsLm1hdC1pY29uLWJ1dHRvbltkaXNhYmxlZF0gLm1hdC1wYWdpbmF0b3ItZmlyc3QsLm1hdC1pY29uLWJ1dHRvbltkaXNhYmxlZF0gLm1hdC1wYWdpbmF0b3ItbGFzdHtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtcGFnaW5hdG9yLWNvbnRhaW5lcnttaW4taGVpZ2h0OjU2cHh9Lm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZHtmaWxsOiNkNWNhZTl9Lm1hdC1wcm9ncmVzcy1iYXItYnVmZmVye2JhY2tncm91bmQtY29sb3I6I2Q1Y2FlOX0ubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1wcm9ncmVzcy1iYXIubWF0LWFjY2VudCAubWF0LXByb2dyZXNzLWJhci1iYWNrZ3JvdW5ke2ZpbGw6I2ZiZjFjY30ubWF0LXByb2dyZXNzLWJhci5tYXQtYWNjZW50IC5tYXQtcHJvZ3Jlc3MtYmFyLWJ1ZmZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmYmYxY2N9Lm1hdC1wcm9ncmVzcy1iYXIubWF0LWFjY2VudCAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmQ3NDB9Lm1hdC1wcm9ncmVzcy1iYXIubWF0LXdhcm4gLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZHtmaWxsOiNmOWNjYzl9Lm1hdC1wcm9ncmVzcy1iYXIubWF0LXdhcm4gLm1hdC1wcm9ncmVzcy1iYXItYnVmZmVye2JhY2tncm91bmQtY29sb3I6I2Y5Y2NjOX0ubWF0LXByb2dyZXNzLWJhci5tYXQtd2FybiAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOiNmNDQzMzZ9Lm1hdC1wcm9ncmVzcy1zcGlubmVyIGNpcmNsZSwubWF0LXNwaW5uZXIgY2lyY2xle3N0cm9rZTojNjczYWI3fS5tYXQtcHJvZ3Jlc3Mtc3Bpbm5lci5tYXQtYWNjZW50IGNpcmNsZSwubWF0LXNwaW5uZXIubWF0LWFjY2VudCBjaXJjbGV7c3Ryb2tlOiNmZmQ3NDB9Lm1hdC1wcm9ncmVzcy1zcGlubmVyLm1hdC13YXJuIGNpcmNsZSwubWF0LXNwaW5uZXIubWF0LXdhcm4gY2lyY2xle3N0cm9rZTojZjQ0MzM2fS5tYXQtcmFkaW8tb3V0ZXItY2lyY2xle2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC41NCl9Lm1hdC1yYWRpby1idXR0b24ubWF0LXByaW1hcnkubWF0LXJhZGlvLWNoZWNrZWQgLm1hdC1yYWRpby1vdXRlci1jaXJjbGV7Ym9yZGVyLWNvbG9yOiM2NzNhYjd9Lm1hdC1yYWRpby1idXR0b24ubWF0LXByaW1hcnkgLm1hdC1yYWRpby1pbm5lci1jaXJjbGUsLm1hdC1yYWRpby1idXR0b24ubWF0LXByaW1hcnkgLm1hdC1yYWRpby1yaXBwbGUgLm1hdC1yaXBwbGUtZWxlbWVudDpub3QoLm1hdC1yYWRpby1wZXJzaXN0ZW50LXJpcHBsZSksLm1hdC1yYWRpby1idXR0b24ubWF0LXByaW1hcnkubWF0LXJhZGlvLWNoZWNrZWQgLm1hdC1yYWRpby1wZXJzaXN0ZW50LXJpcHBsZSwubWF0LXJhZGlvLWJ1dHRvbi5tYXQtcHJpbWFyeTphY3RpdmUgLm1hdC1yYWRpby1wZXJzaXN0ZW50LXJpcHBsZXtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1yYWRpby1idXR0b24ubWF0LWFjY2VudC5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZXtib3JkZXItY29sb3I6I2ZmZDc0MH0ubWF0LXJhZGlvLWJ1dHRvbi5tYXQtYWNjZW50IC5tYXQtcmFkaW8taW5uZXItY2lyY2xlLC5tYXQtcmFkaW8tYnV0dG9uLm1hdC1hY2NlbnQgLm1hdC1yYWRpby1yaXBwbGUgLm1hdC1yaXBwbGUtZWxlbWVudDpub3QoLm1hdC1yYWRpby1wZXJzaXN0ZW50LXJpcHBsZSksLm1hdC1yYWRpby1idXR0b24ubWF0LWFjY2VudC5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLXBlcnNpc3RlbnQtcmlwcGxlLC5tYXQtcmFkaW8tYnV0dG9uLm1hdC1hY2NlbnQ6YWN0aXZlIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGV7YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwfS5tYXQtcmFkaW8tYnV0dG9uLm1hdC13YXJuLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tb3V0ZXItY2lyY2xle2JvcmRlci1jb2xvcjojZjQ0MzM2fS5tYXQtcmFkaW8tYnV0dG9uLm1hdC13YXJuIC5tYXQtcmFkaW8taW5uZXItY2lyY2xlLC5tYXQtcmFkaW8tYnV0dG9uLm1hdC13YXJuIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQ6bm90KC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUpLC5tYXQtcmFkaW8tYnV0dG9uLm1hdC13YXJuLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUsLm1hdC1yYWRpby1idXR0b24ubWF0LXdhcm46YWN0aXZlIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGV7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2fS5tYXQtcmFkaW8tYnV0dG9uLm1hdC1yYWRpby1kaXNhYmxlZC5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSwubWF0LXJhZGlvLWJ1dHRvbi5tYXQtcmFkaW8tZGlzYWJsZWQgLm1hdC1yYWRpby1vdXRlci1jaXJjbGV7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LXJhZGlvLWJ1dHRvbi5tYXQtcmFkaW8tZGlzYWJsZWQgLm1hdC1yYWRpby1yaXBwbGUgLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LXJhZGlvLWJ1dHRvbi5tYXQtcmFkaW8tZGlzYWJsZWQgLm1hdC1yYWRpby1pbm5lci1jaXJjbGV7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1yYWRpby1idXR0b24ubWF0LXJhZGlvLWRpc2FibGVkIC5tYXQtcmFkaW8tbGFiZWwtY29udGVudHtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1yYWRpby1idXR0b24gLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9Lm1hdC1zZWxlY3QtdmFsdWV7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtc2VsZWN0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoMCwwLDAsLjQyKX0ubWF0LXNlbGVjdC1kaXNhYmxlZCAubWF0LXNlbGVjdC12YWx1ZXtjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1zZWxlY3QtYXJyb3d7Y29sb3I6cmdiYSgwLDAsMCwuNTQpfS5tYXQtc2VsZWN0LXBhbmVse2JhY2tncm91bmQ6I2ZmZn0ubWF0LXNlbGVjdC1wYW5lbDpub3QoW2NsYXNzKj1tYXQtZWxldmF0aW9uLXpdKXtib3gtc2hhZG93OjBweCAycHggNHB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCAxcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LXNlbGVjdC1wYW5lbCAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtb3B0aW9uLW11bHRpcGxlKXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEyKX0ubWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQubWF0LXByaW1hcnkgLm1hdC1zZWxlY3QtYXJyb3d7Y29sb3I6IzY3M2FiN30ubWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQubWF0LWFjY2VudCAubWF0LXNlbGVjdC1hcnJvd3tjb2xvcjojZmZkNzQwfS5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZC5tYXQtd2FybiAubWF0LXNlbGVjdC1hcnJvd3tjb2xvcjojZjQ0MzM2fS5tYXQtZm9ybS1maWVsZCAubWF0LXNlbGVjdC5tYXQtc2VsZWN0LWludmFsaWQgLm1hdC1zZWxlY3QtYXJyb3d7Y29sb3I6I2Y0NDMzNn0ubWF0LWZvcm0tZmllbGQgLm1hdC1zZWxlY3QubWF0LXNlbGVjdC1kaXNhYmxlZCAubWF0LXNlbGVjdC1hcnJvd3tjb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1kcmF3ZXItY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYTtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1kcmF3ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LWRyYXdlci5tYXQtZHJhd2VyLXB1c2h7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tYXQtZHJhd2VyOm5vdCgubWF0LWRyYXdlci1zaWRlKXtib3gtc2hhZG93OjBweCA4cHggMTBweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMTZweCAyNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLDBweCA2cHggMzBweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyKX0ubWF0LWRyYXdlci1zaWRle2JvcmRlci1yaWdodDpzb2xpZCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZHJhd2VyLXNpZGUubWF0LWRyYXdlci1lbmR7Ym9yZGVyLWxlZnQ6c29saWQgMXB4IHJnYmEoMCwwLDAsLjEyKTtib3JkZXItcmlnaHQ6bm9uZX1bZGlyPXJ0bF0gLm1hdC1kcmF3ZXItc2lkZXtib3JkZXItbGVmdDpzb2xpZCAxcHggcmdiYSgwLDAsMCwuMTIpO2JvcmRlci1yaWdodDpub25lfVtkaXI9cnRsXSAubWF0LWRyYXdlci1zaWRlLm1hdC1kcmF3ZXItZW5ke2JvcmRlci1sZWZ0Om5vbmU7Ym9yZGVyLXJpZ2h0OnNvbGlkIDFweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1kcmF3ZXItYmFja2Ryb3AubWF0LWRyYXdlci1zaG93bntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjYpfS5tYXQtc2xpZGUtdG9nZ2xlLm1hdC1jaGVja2VkIC5tYXQtc2xpZGUtdG9nZ2xlLXRodW1ie2JhY2tncm91bmQtY29sb3I6I2ZmZDc0MH0ubWF0LXNsaWRlLXRvZ2dsZS5tYXQtY2hlY2tlZCAubWF0LXNsaWRlLXRvZ2dsZS1iYXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyMTUsNjQsLjU0KX0ubWF0LXNsaWRlLXRvZ2dsZS5tYXQtY2hlY2tlZCAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZDc0MH0ubWF0LXNsaWRlLXRvZ2dsZS5tYXQtcHJpbWFyeS5tYXQtY2hlY2tlZCAubWF0LXNsaWRlLXRvZ2dsZS10aHVtYntiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1zbGlkZS10b2dnbGUubWF0LXByaW1hcnkubWF0LWNoZWNrZWQgLm1hdC1zbGlkZS10b2dnbGUtYmFye2JhY2tncm91bmQtY29sb3I6cmdiYSgxMDMsNTgsMTgzLC41NCl9Lm1hdC1zbGlkZS10b2dnbGUubWF0LXByaW1hcnkubWF0LWNoZWNrZWQgLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1zbGlkZS10b2dnbGUubWF0LXdhcm4ubWF0LWNoZWNrZWQgLm1hdC1zbGlkZS10b2dnbGUtdGh1bWJ7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2fS5tYXQtc2xpZGUtdG9nZ2xlLm1hdC13YXJuLm1hdC1jaGVja2VkIC5tYXQtc2xpZGUtdG9nZ2xlLWJhcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjQ0LDY3LDU0LC41NCl9Lm1hdC1zbGlkZS10b2dnbGUubWF0LXdhcm4ubWF0LWNoZWNrZWQgLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiNmNDQzMzZ9Lm1hdC1zbGlkZS10b2dnbGU6bm90KC5tYXQtY2hlY2tlZCkgLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9Lm1hdC1zbGlkZS10b2dnbGUtdGh1bWJ7Ym94LXNoYWRvdzowcHggMnB4IDFweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwwcHggMXB4IDFweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtiYWNrZ3JvdW5kLWNvbG9yOiNmYWZhZmF9Lm1hdC1zbGlkZS10b2dnbGUtYmFye2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4yNil9Lm1hdC1zbGlkZXIubWF0LXByaW1hcnkgLm1hdC1zbGlkZXItdHJhY2stZmlsbCwubWF0LXNsaWRlci5tYXQtcHJpbWFyeSAubWF0LXNsaWRlci10aHVtYiwubWF0LXNsaWRlci5tYXQtcHJpbWFyeSAubWF0LXNsaWRlci10aHVtYi1sYWJlbHtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjd9Lm1hdC1zbGlkZXIubWF0LXByaW1hcnkgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dHtjb2xvcjojZmZmfS5tYXQtc2xpZGVyLm1hdC1wcmltYXJ5IC5tYXQtc2xpZGVyLWZvY3VzLXJpbmd7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEwMyw1OCwxODMsLjIpfS5tYXQtc2xpZGVyLm1hdC1hY2NlbnQgLm1hdC1zbGlkZXItdHJhY2stZmlsbCwubWF0LXNsaWRlci5tYXQtYWNjZW50IC5tYXQtc2xpZGVyLXRodW1iLC5tYXQtc2xpZGVyLm1hdC1hY2NlbnQgLm1hdC1zbGlkZXItdGh1bWItbGFiZWx7YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwfS5tYXQtc2xpZGVyLm1hdC1hY2NlbnQgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dHtjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1zbGlkZXIubWF0LWFjY2VudCAubWF0LXNsaWRlci1mb2N1cy1yaW5ne2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjE1LDY0LC4yKX0ubWF0LXNsaWRlci5tYXQtd2FybiAubWF0LXNsaWRlci10cmFjay1maWxsLC5tYXQtc2xpZGVyLm1hdC13YXJuIC5tYXQtc2xpZGVyLXRodW1iLC5tYXQtc2xpZGVyLm1hdC13YXJuIC5tYXQtc2xpZGVyLXRodW1iLWxhYmVse2JhY2tncm91bmQtY29sb3I6I2Y0NDMzNn0ubWF0LXNsaWRlci5tYXQtd2FybiAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2NvbG9yOiNmZmZ9Lm1hdC1zbGlkZXIubWF0LXdhcm4gLm1hdC1zbGlkZXItZm9jdXMtcmluZ3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjQ0LDY3LDU0LC4yKX0ubWF0LXNsaWRlcjpob3ZlciAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kLC5tYXQtc2xpZGVyLmNkay1mb2N1c2VkIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC1zbGlkZXIubWF0LXNsaWRlci1kaXNhYmxlZCAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kLC5tYXQtc2xpZGVyLm1hdC1zbGlkZXItZGlzYWJsZWQgLm1hdC1zbGlkZXItdHJhY2stZmlsbCwubWF0LXNsaWRlci5tYXQtc2xpZGVyLWRpc2FibGVkIC5tYXQtc2xpZGVyLXRodW1ie2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMjYpfS5tYXQtc2xpZGVyLm1hdC1zbGlkZXItZGlzYWJsZWQ6aG92ZXIgLm1hdC1zbGlkZXItdHJhY2stYmFja2dyb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjI2KX0ubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZSAubWF0LXNsaWRlci1mb2N1cy1yaW5ne2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtc2xpZGVyLm1hdC1zbGlkZXItbWluLXZhbHVlLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZyAubWF0LXNsaWRlci10aHVtYiwubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmcgLm1hdC1zbGlkZXItdGh1bWItbGFiZWx7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC1zbGlkZXIubWF0LXNsaWRlci1taW4tdmFsdWUubWF0LXNsaWRlci10aHVtYi1sYWJlbC1zaG93aW5nLmNkay1mb2N1c2VkIC5tYXQtc2xpZGVyLXRodW1iLC5tYXQtc2xpZGVyLm1hdC1zbGlkZXItbWluLXZhbHVlLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZy5jZGstZm9jdXNlZCAubWF0LXNsaWRlci10aHVtYi1sYWJlbHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjI2KX0ubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZTpub3QoLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZykgLm1hdC1zbGlkZXItdGh1bWJ7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjI2KTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5tYXQtc2xpZGVyLm1hdC1zbGlkZXItbWluLXZhbHVlOm5vdCgubWF0LXNsaWRlci10aHVtYi1sYWJlbC1zaG93aW5nKTpob3ZlciAubWF0LXNsaWRlci10aHVtYiwubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZTpub3QoLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZykuY2RrLWZvY3VzZWQgLm1hdC1zbGlkZXItdGh1bWJ7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjM4KX0ubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZTpub3QoLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZyk6aG92ZXIubWF0LXNsaWRlci1kaXNhYmxlZCAubWF0LXNsaWRlci10aHVtYiwubWF0LXNsaWRlci5tYXQtc2xpZGVyLW1pbi12YWx1ZTpub3QoLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZykuY2RrLWZvY3VzZWQubWF0LXNsaWRlci1kaXNhYmxlZCAubWF0LXNsaWRlci10aHVtYntib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMjYpfS5tYXQtc2xpZGVyLWhhcy10aWNrcyAubWF0LXNsaWRlci13cmFwcGVyOjphZnRlcntib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuNyl9Lm1hdC1zbGlkZXItaG9yaXpvbnRhbCAubWF0LXNsaWRlci10aWNrc3tiYWNrZ3JvdW5kLWltYWdlOnJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMCwgMCwgMCwgMC43KSwgcmdiYSgwLCAwLCAwLCAwLjcpIDJweCwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1yZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDAuMDAwMWRlZywgcmdiYSgwLCAwLCAwLCAwLjcpLCByZ2JhKDAsIDAsIDAsIDAuNykgMnB4LCB0cmFuc3BhcmVudCAwLCB0cmFuc3BhcmVudCl9Lm1hdC1zbGlkZXItdmVydGljYWwgLm1hdC1zbGlkZXItdGlja3N7YmFja2dyb3VuZC1pbWFnZTpyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAwLjcpLCByZ2JhKDAsIDAsIDAsIDAuNykgMnB4LCB0cmFuc3BhcmVudCAwLCB0cmFuc3BhcmVudCl9Lm1hdC1zdGVwLWhlYWRlci5jZGsta2V5Ym9hcmQtZm9jdXNlZCwubWF0LXN0ZXAtaGVhZGVyLmNkay1wcm9ncmFtLWZvY3VzZWQsLm1hdC1zdGVwLWhlYWRlcjpob3Zlcjpub3QoW2FyaWEtZGlzYWJsZWRdKSwubWF0LXN0ZXAtaGVhZGVyOmhvdmVyW2FyaWEtZGlzYWJsZWQ9ZmFsc2Vde2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMDQpfS5tYXQtc3RlcC1oZWFkZXI6aG92ZXJbYXJpYS1kaXNhYmxlZD10cnVlXXtjdXJzb3I6ZGVmYXVsdH1AbWVkaWEoaG92ZXI6IG5vbmUpey5tYXQtc3RlcC1oZWFkZXI6aG92ZXJ7YmFja2dyb3VuZDpub25lfX0ubWF0LXN0ZXAtaGVhZGVyIC5tYXQtc3RlcC1sYWJlbCwubWF0LXN0ZXAtaGVhZGVyIC5tYXQtc3RlcC1vcHRpb25hbHtjb2xvcjpyZ2JhKDAsMCwwLC41NCl9Lm1hdC1zdGVwLWhlYWRlciAubWF0LXN0ZXAtaWNvbntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjU0KTtjb2xvcjojZmZmfS5tYXQtc3RlcC1oZWFkZXIgLm1hdC1zdGVwLWljb24tc2VsZWN0ZWQsLm1hdC1zdGVwLWhlYWRlciAubWF0LXN0ZXAtaWNvbi1zdGF0ZS1kb25lLC5tYXQtc3RlcC1oZWFkZXIgLm1hdC1zdGVwLWljb24tc3RhdGUtZWRpdHtiYWNrZ3JvdW5kLWNvbG9yOiM2NzNhYjc7Y29sb3I6I2ZmZn0ubWF0LXN0ZXAtaGVhZGVyLm1hdC1hY2NlbnQgLm1hdC1zdGVwLWljb257Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtc3RlcC1oZWFkZXIubWF0LWFjY2VudCAubWF0LXN0ZXAtaWNvbi1zZWxlY3RlZCwubWF0LXN0ZXAtaGVhZGVyLm1hdC1hY2NlbnQgLm1hdC1zdGVwLWljb24tc3RhdGUtZG9uZSwubWF0LXN0ZXAtaGVhZGVyLm1hdC1hY2NlbnQgLm1hdC1zdGVwLWljb24tc3RhdGUtZWRpdHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmQ3NDA7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtc3RlcC1oZWFkZXIubWF0LXdhcm4gLm1hdC1zdGVwLWljb257Y29sb3I6I2ZmZn0ubWF0LXN0ZXAtaGVhZGVyLm1hdC13YXJuIC5tYXQtc3RlcC1pY29uLXNlbGVjdGVkLC5tYXQtc3RlcC1oZWFkZXIubWF0LXdhcm4gLm1hdC1zdGVwLWljb24tc3RhdGUtZG9uZSwubWF0LXN0ZXAtaGVhZGVyLm1hdC13YXJuIC5tYXQtc3RlcC1pY29uLXN0YXRlLWVkaXR7YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2O2NvbG9yOiNmZmZ9Lm1hdC1zdGVwLWhlYWRlciAubWF0LXN0ZXAtaWNvbi1zdGF0ZS1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOiNmNDQzMzZ9Lm1hdC1zdGVwLWhlYWRlciAubWF0LXN0ZXAtbGFiZWwubWF0LXN0ZXAtbGFiZWwtYWN0aXZle2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LXN0ZXAtaGVhZGVyIC5tYXQtc3RlcC1sYWJlbC5tYXQtc3RlcC1sYWJlbC1lcnJvcntjb2xvcjojZjQ0MzM2fS5tYXQtc3RlcHBlci1ob3Jpem9udGFsLC5tYXQtc3RlcHBlci12ZXJ0aWNhbHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lm1hdC1zdGVwcGVyLXZlcnRpY2FsLWxpbmU6OmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjpyZ2JhKDAsMCwwLC4xMil9Lm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyOjpiZWZvcmUsLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyOjphZnRlciwubWF0LXN0ZXBwZXItaG9yaXpvbnRhbC1saW5le2JvcmRlci10b3AtY29sb3I6cmdiYSgwLDAsMCwuMTIpfS5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlcntoZWlnaHQ6NzJweH0ubWF0LXN0ZXBwZXItbGFiZWwtcG9zaXRpb24tYm90dG9tIC5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlciwubWF0LXZlcnRpY2FsLXN0ZXBwZXItaGVhZGVye3BhZGRpbmc6MjRweCAyNHB4fS5tYXQtc3RlcHBlci12ZXJ0aWNhbC1saW5lOjpiZWZvcmV7dG9wOi0xNnB4O2JvdHRvbTotMTZweH0ubWF0LXN0ZXBwZXItbGFiZWwtcG9zaXRpb24tYm90dG9tIC5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlcjo6YWZ0ZXIsLm1hdC1zdGVwcGVyLWxhYmVsLXBvc2l0aW9uLWJvdHRvbSAubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXI6OmJlZm9yZXt0b3A6MzZweH0ubWF0LXN0ZXBwZXItbGFiZWwtcG9zaXRpb24tYm90dG9tIC5tYXQtc3RlcHBlci1ob3Jpem9udGFsLWxpbmV7dG9wOjM2cHh9Lm1hdC1zb3J0LWhlYWRlci1hcnJvd3tjb2xvcjojNzU3NTc1fS5tYXQtdGFiLW5hdi1iYXIsLm1hdC10YWItaGVhZGVye2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKX0ubWF0LXRhYi1ncm91cC1pbnZlcnRlZC1oZWFkZXIgLm1hdC10YWItbmF2LWJhciwubWF0LXRhYi1ncm91cC1pbnZlcnRlZC1oZWFkZXIgLm1hdC10YWItaGVhZGVye2JvcmRlci10b3A6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKTtib3JkZXItYm90dG9tOm5vbmV9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9Lm1hdC10YWItbGFiZWwubWF0LXRhYi1kaXNhYmxlZCwubWF0LXRhYi1saW5rLm1hdC10YWItZGlzYWJsZWR7Y29sb3I6cmdiYSgwLDAsMCwuMzgpfS5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb257Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZCAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9ue2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC4zOCl9Lm1hdC10YWItZ3JvdXBbY2xhc3MqPW1hdC1iYWNrZ3JvdW5kLV0+Lm1hdC10YWItaGVhZGVyLC5tYXQtdGFiLW5hdi1iYXJbY2xhc3MqPW1hdC1iYWNrZ3JvdW5kLV17Ym9yZGVyLWJvdHRvbTpub25lO2JvcmRlci10b3A6bm9uZX0ubWF0LXRhYi1ncm91cC5tYXQtcHJpbWFyeSAubWF0LXRhYi1sYWJlbC5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC1wcmltYXJ5IC5tYXQtdGFiLWxhYmVsLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtcHJpbWFyeSAubWF0LXRhYi1saW5rLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LXByaW1hcnkgLm1hdC10YWItbGluay5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtcHJpbWFyeSAubWF0LXRhYi1sYWJlbC5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LXByaW1hcnkgLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LXByaW1hcnkgLm1hdC10YWItbGluay5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LXByaW1hcnkgLm1hdC10YWItbGluay5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIwOSwxOTYsMjMzLC4zKX0ubWF0LXRhYi1ncm91cC5tYXQtcHJpbWFyeSAubWF0LWluay1iYXIsLm1hdC10YWItbmF2LWJhci5tYXQtcHJpbWFyeSAubWF0LWluay1iYXJ7YmFja2dyb3VuZC1jb2xvcjojNjczYWI3fS5tYXQtdGFiLWdyb3VwLm1hdC1wcmltYXJ5Lm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyIC5tYXQtaW5rLWJhciwubWF0LXRhYi1ncm91cC5tYXQtcHJpbWFyeS5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtaW5rLWJhciwubWF0LXRhYi1uYXYtYmFyLm1hdC1wcmltYXJ5Lm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyIC5tYXQtaW5rLWJhciwubWF0LXRhYi1uYXYtYmFyLm1hdC1wcmltYXJ5Lm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1pbmstYmFye2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubWF0LXRhYi1ncm91cC5tYXQtYWNjZW50IC5tYXQtdGFiLWxhYmVsLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LWFjY2VudCAubWF0LXRhYi1sYWJlbC5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LWFjY2VudCAubWF0LXRhYi1saW5rLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LWFjY2VudCAubWF0LXRhYi1saW5rLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC1hY2NlbnQgLm1hdC10YWItbGFiZWwuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC1hY2NlbnQgLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWFjY2VudCAubWF0LXRhYi1saW5rLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtYWNjZW50IC5tYXQtdGFiLWxpbmsuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpe2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjI5LDEyNywuMyl9Lm1hdC10YWItZ3JvdXAubWF0LWFjY2VudCAubWF0LWluay1iYXIsLm1hdC10YWItbmF2LWJhci5tYXQtYWNjZW50IC5tYXQtaW5rLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmQ3NDB9Lm1hdC10YWItZ3JvdXAubWF0LWFjY2VudC5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyIC5tYXQtaW5rLWJhciwubWF0LXRhYi1ncm91cC5tYXQtYWNjZW50Lm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LWluay1iYXIsLm1hdC10YWItbmF2LWJhci5tYXQtYWNjZW50Lm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC1pbmstYmFyLC5tYXQtdGFiLW5hdi1iYXIubWF0LWFjY2VudC5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1pbmstYmFye2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtdGFiLWdyb3VwLm1hdC13YXJuIC5tYXQtdGFiLWxhYmVsLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LXdhcm4gLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC13YXJuIC5tYXQtdGFiLWxpbmsuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtd2FybiAubWF0LXRhYi1saW5rLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC13YXJuIC5tYXQtdGFiLWxhYmVsLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtd2FybiAubWF0LXRhYi1sYWJlbC5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtd2FybiAubWF0LXRhYi1saW5rLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtd2FybiAubWF0LXRhYi1saW5rLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDIwNSwyMTAsLjMpfS5tYXQtdGFiLWdyb3VwLm1hdC13YXJuIC5tYXQtaW5rLWJhciwubWF0LXRhYi1uYXYtYmFyLm1hdC13YXJuIC5tYXQtaW5rLWJhcntiYWNrZ3JvdW5kLWNvbG9yOiNmNDQzMzZ9Lm1hdC10YWItZ3JvdXAubWF0LXdhcm4ubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXIgLm1hdC1pbmstYmFyLC5tYXQtdGFiLWdyb3VwLm1hdC13YXJuLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1pbmstYmFyLC5tYXQtdGFiLW5hdi1iYXIubWF0LXdhcm4ubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXIgLm1hdC1pbmstYmFyLC5tYXQtdGFiLW5hdi1iYXIubWF0LXdhcm4ubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LWluay1iYXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnkgLm1hdC10YWItbGFiZWwuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5IC5tYXQtdGFiLWxhYmVsLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5IC5tYXQtdGFiLWxpbmsuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5IC5tYXQtdGFiLWxpbmsuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeSAubWF0LXRhYi1sYWJlbC5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeSAubWF0LXRhYi1sYWJlbC5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5IC5tYXQtdGFiLWxpbmsuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnkgLm1hdC10YWItbGluay5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCl7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDIwOSwxOTYsMjMzLC4zKX0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24sLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItbGluay1jb250YWluZXIsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9ue2JhY2tncm91bmQtY29sb3I6IzY3M2FiN30ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1sYWJlbCwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmssLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1sYWJlbCwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC10YWItbGlua3tjb2xvcjojZmZmfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLm1hdC10YWItZGlzYWJsZWQsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXRhYi1saW5rLm1hdC10YWItZGlzYWJsZWQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1sYWJlbC5tYXQtdGFiLWRpc2FibGVkLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXRhYi1saW5rLm1hdC10YWItZGlzYWJsZWR7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNCl9Lm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyIC5tYXQtZm9jdXMtaW5kaWNhdG9yOjpiZWZvcmUsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1oZWFkZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZXtib3JkZXItY29sb3I6I2ZmZn0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZCAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb257Ym9yZGVyLWNvbG9yOiNmZmY7b3BhY2l0eTouNH0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXByaW1hcnk+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1wcmltYXJ5Pi5tYXQtdGFiLWhlYWRlciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtcHJpbWFyeT4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiAubWF0LXJpcHBsZS1lbGVtZW50e2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5Oi4xMn0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1hY2NlbnQgLm1hdC10YWItbGFiZWwuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1hY2NlbnQgLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudCAubWF0LXRhYi1saW5rLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50IC5tYXQtdGFiLWxpbmsuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50IC5tYXQtdGFiLWxhYmVsLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQgLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50IC5tYXQtdGFiLWxpbmsuY2RrLWtleWJvYXJkLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLWFjY2VudCAubWF0LXRhYi1saW5rLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDIyOSwxMjcsLjMpfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItbGluay1jb250YWluZXIsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb257YmFja2dyb3VuZC1jb2xvcjojZmZkNzQwfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItbGFiZWwsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmssLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmt7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItbGFiZWwubWF0LXRhYi1kaXNhYmxlZCwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC10YWItbGluay5tYXQtdGFiLWRpc2FibGVkLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1sYWJlbC5tYXQtdGFiLWRpc2FibGVkLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmsubWF0LXRhYi1kaXNhYmxlZHtjb2xvcjpyZ2JhKDAsMCwwLC40KX0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtZm9jdXMtaW5kaWNhdG9yOjpiZWZvcmUsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlciAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZXtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZCAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9ue2JvcmRlci1jb2xvcjojMDAwO29wYWNpdHk6LjR9Lm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLWFjY2VudD4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWhlYWRlciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtYWNjZW50Pi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC1hY2NlbnQ+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24gLm1hdC1yaXBwbGUtZWxlbWVudHtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7b3BhY2l0eTouMTJ9Lm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2FybiAubWF0LXRhYi1sYWJlbC5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4gLm1hdC10YWItbGFiZWwuY2RrLXByb2dyYW0tZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4gLm1hdC10YWItbGluay5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4gLm1hdC10YWItbGluay5jZGstcHJvZ3JhbS1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuIC5tYXQtdGFiLWxhYmVsLmNkay1rZXlib2FyZC1mb2N1c2VkOm5vdCgubWF0LXRhYi1kaXNhYmxlZCksLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuIC5tYXQtdGFiLWxhYmVsLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKSwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4gLm1hdC10YWItbGluay5jZGsta2V5Ym9hcmQtZm9jdXNlZDpub3QoLm1hdC10YWItZGlzYWJsZWQpLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtd2FybiAubWF0LXRhYi1saW5rLmNkay1wcm9ncmFtLWZvY3VzZWQ6bm90KC5tYXQtdGFiLWRpc2FibGVkKXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDIwNSwyMTAsLjMpfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItbGluay1jb250YWluZXIsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb257YmFja2dyb3VuZC1jb2xvcjojZjQ0MzM2fS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC10YWItbGluaywubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXRhYi1saW5re2NvbG9yOiNmZmZ9Lm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItbGFiZWwubWF0LXRhYi1kaXNhYmxlZCwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmsubWF0LXRhYi1kaXNhYmxlZCwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLm1hdC10YWItZGlzYWJsZWQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmsubWF0LXRhYi1kaXNhYmxlZHtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC40KX0ubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24gLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1ncm91cC5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtZm9jdXMtaW5kaWNhdG9yOjpiZWZvcmUsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtZm9jdXMtaW5kaWNhdG9yOjpiZWZvcmUsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWhlYWRlciAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3Jle2JvcmRlci1jb2xvcjojZmZmfS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZCAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLC5tYXQtdGFiLW5hdi1iYXIubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbntib3JkZXItY29sb3I6I2ZmZjtvcGFjaXR5Oi40fS5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC10YWItZ3JvdXAubWF0LWJhY2tncm91bmQtd2Fybj4ubWF0LXRhYi1saW5rLWNvbnRhaW5lciAubWF0LXJpcHBsZS1lbGVtZW50LC5tYXQtdGFiLWdyb3VwLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24gLm1hdC1yaXBwbGUtZWxlbWVudCwubWF0LXRhYi1uYXYtYmFyLm1hdC1iYWNrZ3JvdW5kLXdhcm4+Lm1hdC10YWItaGVhZGVyIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtcmlwcGxlLWVsZW1lbnQsLm1hdC10YWItbmF2LWJhci5tYXQtYmFja2dyb3VuZC13YXJuPi5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtcmlwcGxlLWVsZW1lbnR7YmFja2dyb3VuZC1jb2xvcjojZmZmO29wYWNpdHk6LjEyfS5tYXQtdG9vbGJhcntiYWNrZ3JvdW5kOiNmNWY1ZjU7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtdG9vbGJhci5tYXQtcHJpbWFyeXtiYWNrZ3JvdW5kOiM2NzNhYjc7Y29sb3I6I2ZmZn0ubWF0LXRvb2xiYXIubWF0LWFjY2VudHtiYWNrZ3JvdW5kOiNmZmQ3NDA7Y29sb3I6cmdiYSgwLDAsMCwuODcpfS5tYXQtdG9vbGJhci5tYXQtd2FybntiYWNrZ3JvdW5kOiNmNDQzMzY7Y29sb3I6I2ZmZn0ubWF0LXRvb2xiYXIgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSwubWF0LXRvb2xiYXIgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSwubWF0LXRvb2xiYXIgLm1hdC1mb2N1c2VkIC5tYXQtZm9ybS1maWVsZC1yaXBwbGV7YmFja2dyb3VuZC1jb2xvcjpjdXJyZW50Q29sb3J9Lm1hdC10b29sYmFyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LXRvb2xiYXIgLm1hdC1mb2N1c2VkIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LXRvb2xiYXIgLm1hdC1zZWxlY3QtdmFsdWUsLm1hdC10b29sYmFyIC5tYXQtc2VsZWN0LWFycm93LC5tYXQtdG9vbGJhciAubWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQgLm1hdC1zZWxlY3QtYXJyb3d7Y29sb3I6aW5oZXJpdH0ubWF0LXRvb2xiYXIgLm1hdC1pbnB1dC1lbGVtZW50e2NhcmV0LWNvbG9yOmN1cnJlbnRDb2xvcn0ubWF0LXRvb2xiYXItbXVsdGlwbGUtcm93c3ttaW4taGVpZ2h0OjY0cHh9Lm1hdC10b29sYmFyLXJvdywubWF0LXRvb2xiYXItc2luZ2xlLXJvd3toZWlnaHQ6NjRweH1AbWVkaWEobWF4LXdpZHRoOiA1OTlweCl7Lm1hdC10b29sYmFyLW11bHRpcGxlLXJvd3N7bWluLWhlaWdodDo1NnB4fS5tYXQtdG9vbGJhci1yb3csLm1hdC10b29sYmFyLXNpbmdsZS1yb3d7aGVpZ2h0OjU2cHh9fS5tYXQtdG9vbHRpcHtiYWNrZ3JvdW5kOnJnYmEoOTcsOTcsOTcsLjkpfS5tYXQtdHJlZXtiYWNrZ3JvdW5kOiNmZmZ9Lm1hdC10cmVlLW5vZGUsLm1hdC1uZXN0ZWQtdHJlZS1ub2Rle2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0ubWF0LXRyZWUtbm9kZXttaW4taGVpZ2h0OjQ4cHh9Lm1hdC1zbmFjay1iYXItY29udGFpbmVye2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjcpO2JhY2tncm91bmQ6IzMyMzIzMjtib3gtc2hhZG93OjBweCAzcHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjIpLDBweCA2cHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwwcHggMXB4IDE4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMil9Lm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9ue2NvbG9yOiNmZmQ3NDB9XG4iLCJAaW1wb3J0ICd+QGFuZ3VsYXIvbWF0ZXJpYWwvcHJlYnVpbHQtdGhlbWVzL2RlZXBwdXJwbGUtYW1iZXIuY3NzJztcclxuXHJcbi5maWxlLWlucHV0IHtcclxuICAgIG1hcmdpbjogNXB4O1xyXG59XHJcblxyXG4uaG9tZS1idXR0b24ge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIiwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjY2ZjZmNmO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIxLCAxMDIsIDIxKTtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkY29sb3I6IHJnYigyMSwgMTAyLCAyMSksICRhbW91bnQ6IDEwKTtcclxuICAgICAgICAvLyBmb250LXdlaWdodDogMzAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4uaG9tZS1maWxlLWlucHV0IHtcclxuICAgIGhlaWdodDogMDtcclxuICAgIHdpZHRoOiAwO1xyXG59XHJcblxyXG4jaG9tZS1ib3gge1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiKDE1NiwgMTU2LCAxNTYpO1xyXG4gICAgbWF4LXdpZHRoOiA1MDBweDtcclxuICAgIC8vIHdpZHRoOiA4MCU7XHJcbn1cclxuXHJcbiNidXR0b24tc3RhY2sge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG59XHJcblxyXG4jaG9tZS1iYWNrZ3JvdW5kIHtcclxuICAgIHdpZHRoOiA3MCU7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbn0iXX0= */"] });


/***/ }),

/***/ 3006:
/*!****************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/card/card.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardComponent": () => (/* binding */ CardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class CardComponent {
    constructor() { }
    ngOnInit() {
    }
}
CardComponent.ɵfac = function CardComponent_Factory(t) { return new (t || CardComponent)(); };
CardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CardComponent, selectors: [["small-card"]], decls: 1, vars: 0, consts: [[1, "card-segment"]], template: function CardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } }, styles: [".card-segment[_ngcontent-%COMP%] {\n  background-color: #222222;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBQTtBQUNKIiwiZmlsZSI6ImNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZC1zZWdtZW50IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjIyMjI7XHJcbn1cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 8053:
/*!*****************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/cards-view.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardsViewComponent": () => (/* binding */ CardsViewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pokedex.service */ 4044);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/menu */ 2796);
/* harmony import */ var _individual_summary_individual_summary_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./individual-summary/individual-summary.component */ 9122);
/* harmony import */ var _world_view_world_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./world-view/world-view.component */ 474);
/* harmony import */ var _team_builder_team_builder_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./team-builder/team-builder.component */ 2301);
/* harmony import */ var _vs_summary_vs_summary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vs-summary/vs-summary.component */ 53);








const _c0 = ["downloadButton"];
function CardsViewComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "a", 13, 14)(2, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_a_14_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r10.save(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} }
function CardsViewComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_button_15_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r12.spoil(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r2.dex.isFullyRevealed ? "Unspoil" : "Spoil");
} }
function CardsViewComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 17)(1, "i", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " arrow_drop_down ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matMenuTriggerFor", _r4);
} }
function CardsViewComponent_div_29_individual_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "individual-card");
} }
function CardsViewComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CardsViewComponent_div_29_individual_card_1_Template, 1, 0, "individual-card", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.dex.validDexUploaded);
} }
function CardsViewComponent_div_30_world_view_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "world-view");
} }
function CardsViewComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CardsViewComponent_div_30_world_view_1_Template, 1, 0, "world-view", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r6.dex.validDexUploaded);
} }
function CardsViewComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "team-builder");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function CardsViewComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "vs-summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
class CardsViewComponent {
    constructor(dex) {
        this.showA = false;
        this.showB = true;
        this.showC = false;
        this.selectedTab = 'summaryTab';
        this.dex = dex;
    }
    onFileSelected(e) {
        const target = e.target;
        const files = target === null || target === void 0 ? void 0 : target.files;
        const file = files && files[0];
        if (file) {
            this.dex.readSelectedFile(file);
        }
    }
    //Kinda cheeky, but the anchor element's click event will occur after the button's so the download begins immediately after we set the href
    // Is this a race? beats me :)
    save() {
        let dexString = JSON.stringify({
            pokedex: this.dex.pokedex,
            abilities: this.dex.allAbilitiesRevealed,
            bsts: this.dex.allBSTRevealed,
            types: this.dex.allTypesRevealed,
            full: this.dex.isFullyRevealed,
            moves: this.dex.allMovesRevealed,
            tms: this.dex.revealedTMs,
            tmIds: this.dex.tmIds,
            hmIds: this.dex.hmIds,
            tmMoves: this.dex.tmMoves,
            hmMoves: this.dex.hmMoves,
            evolutions: this.dex.allEvolutionsRevealed,
            starters: this.dex.starters,
        });
        this.downloadRef.nativeElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dexString);
    }
    spoil() {
        if (this.dex.isFullyRevealed) {
            this.dex.hideAll();
        }
        else {
            this.dex.revealAll();
        }
    }
    spoilBSTs() {
        if (this.dex.allBSTRevealed) {
            this.dex.hideBSTs();
        }
        else {
            this.dex.revealBSTs();
        }
    }
    spoilTypes() {
        if (this.dex.allTypesRevealed) {
            this.dex.hideTypes();
        }
        else {
            this.dex.revealTypes();
        }
    }
    spoilAbilities() {
        if (this.dex.allAbilitiesRevealed) {
            this.dex.hideAbilities();
        }
        else {
            this.dex.revealAbilities();
        }
    }
    //TODO: spoilEvolutions
    spoilEvolutions() {
        if (this.dex.allEvolutionsRevealed) {
            this.dex.hideEvolutions();
        }
        else {
            this.dex.revealEvolutions();
        }
    }
    spoilMoves() {
        if (this.dex.allMovesRevealed)
            this.dex.hideMoves();
        else
            this.dex.revealMoves();
    }
    ngOnInit() {
    }
}
CardsViewComponent.ɵfac = function CardsViewComponent_Factory(t) { return new (t || CardsViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_0__.PokedexService)); };
CardsViewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CardsViewComponent, selectors: [["app-cards-view"]], viewQuery: function CardsViewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.downloadRef = _t.first);
    } }, decls: 33, vars: 16, consts: [[1, "tabs"], [1, "tab", 3, "click"], [1, "material-icons"], ["type", "file", "id", "dex-file-input", "accept", ".log,.pkdx", 1, "tab-file-input", 3, "change"], ["fileUpload", ""], ["for", "dex-file-input", "tabindex", "0", 1, "tab-button"], ["download", "mons.pkdx", 4, "ngIf"], ["class", "tab-button", "id", "spoil-button", 3, "click", 4, "ngIf"], ["mat-button", "", "class", "tab-button", "id", "power-options", 3, "matMenuTriggerFor", 4, "ngIf"], ["backdropClass", "spoil-option", "xPosition", "before"], ["powerSpoilMenu", "matMenu"], ["mat-menu-item", "", 3, "click"], [4, "ngIf"], ["download", "mons.pkdx"], ["downloadButton", ""], ["id", "saveButton", "title", "Save notes and revealed status of Pokemon", 1, "tab-button", 3, "click"], ["id", "spoil-button", 1, "tab-button", 3, "click"], ["mat-button", "", "id", "power-options", 1, "tab-button", 3, "matMenuTriggerFor"]], template: function CardsViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_a_click_1_listener() { return ctx.selectedTab = "summaryTab"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "wysiwyg");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Pokemon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_a_click_5_listener() { return ctx.selectedTab = "worldTab"; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "public");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "World");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function CardsViewComponent_Template_input_change_10_listener($event) { return ctx.onFileSelected($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, CardsViewComponent_a_14_Template, 4, 0, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, CardsViewComponent_button_15_Template, 2, 1, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, CardsViewComponent_button_16_Template, 3, 1, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "mat-menu", 9, 10)(19, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_button_click_19_listener() { return ctx.spoilTypes(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_button_click_21_listener() { return ctx.spoilBSTs(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_button_click_23_listener() { return ctx.spoilAbilities(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_button_click_25_listener() { return ctx.spoilEvolutions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CardsViewComponent_Template_button_click_27_listener() { return ctx.spoilMoves(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, CardsViewComponent_div_29_Template, 2, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](30, CardsViewComponent_div_30_Template, 2, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, CardsViewComponent_div_31_Template, 2, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, CardsViewComponent_div_32_Template, 2, 0, "div", 12);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx.selectedTab === "summaryTab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx.selectedTab === "worldTab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.dex.validDexUploaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.dex.validDexUploaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.dex.validDexUploaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.dex.allTypesRevealed ? "Unspoil Types" : "Spoil Types");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.dex.allBSTRevealed ? "Unspoil BSTs" : "Spoil BSTs");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.dex.allAbilitiesRevealed ? "Unspoil Abilities" : "Spoil Abilities");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.dex.allEvolutionsRevealed ? "Unspoil Evolutions" : "Spoil Evolutions");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.dex.allMovesRevealed ? "Unspoil Moves" : "Spoil Moves");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTab === "summaryTab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTab === "worldTab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTab === "teamTab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedTab === "vsTab");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__.MatMenuItem, _individual_summary_individual_summary_component__WEBPACK_IMPORTED_MODULE_1__.IndividualSummaryComponent, _world_view_world_view_component__WEBPACK_IMPORTED_MODULE_2__.WorldViewComponent, _team_builder_team_builder_component__WEBPACK_IMPORTED_MODULE_3__.TeamBuilderComponent, _vs_summary_vs_summary_component__WEBPACK_IMPORTED_MODULE_4__.VsSummaryComponent], styles: [".tabs[_ngcontent-%COMP%] {\n  border-bottom: 5px #9c9c9c solid;\n  color: #2c2c2c;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n.tabs[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  margin-bottom: 0px;\n}\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%] {\n  background-color: #e7e7e7;\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 16px;\n  font-size: 14px;\n  cursor: pointer;\n  color: #2c2c2c;\n  border: none;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%]   i.material-icons[_ngcontent-%COMP%] {\n  color: #2c2c2c;\n}\n.tabs[_ngcontent-%COMP%]   a.tab[_ngcontent-%COMP%]:hover {\n  background-color: #cecece;\n  font-weight: 300;\n}\n.tabs[_ngcontent-%COMP%]   a.tab.selected[_ngcontent-%COMP%] {\n  background-color: #9c9c9c;\n}\n.tabs[_ngcontent-%COMP%]   a.tab.selected[_ngcontent-%COMP%]:hover {\n  background-color: dimgray;\n}\n.tabs[_ngcontent-%COMP%]   a.tab.disabled[_ngcontent-%COMP%] {\n  pointer-events: none;\n  cursor: default;\n}\n.tabs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n.tabs[_ngcontent-%COMP%]   .tab-file-input[_ngcontent-%COMP%] {\n  height: 0;\n  width: 0;\n  display: none;\n}\n.tabs[_ngcontent-%COMP%]   #spoil-button[_ngcontent-%COMP%] {\n  border-radius: 10px 0px 0px 10px;\n}\n.tabs[_ngcontent-%COMP%]   #power-options[_ngcontent-%COMP%] {\n  border-radius: 0px 10px 10px 0px;\n  border-left: solid 1px green;\n  width: 25px;\n  height: 30px;\n  padding: 0px;\n  margin-left: 0px;\n}\n.tabs[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%] {\n  font-family: \"Roboto\", Arial, sans-serif;\n  color: #cfcfcf;\n  background-color: #156615;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  padding: 8px 16px;\n  font-size: 12px;\n  font-weight: bold;\n  margin-left: 5px;\n}\n.tabs[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]:hover {\n  background-color: #0c3c0c;\n}\n.tabs[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%] {\n  margin-top: 6px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDSSxnQ0FBQTtFQUlBLGNBUlc7RUFTWCxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQVBKO0FBQ0k7RUFDSSxrQkFBQTtBQUNSO0FBS0k7RUFDSSx5QkFBQTtFQUVBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUVBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsY0FyQk87RUFzQlAsWUFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7QUFMUjtBQU1RO0VBQ0ksY0ExQkc7QUFzQmY7QUFNUTtFQUNJLHlCQUFBO0VBQ0EsZ0JBQUE7QUFKWjtBQU1RO0VBQ0kseUJBbkNRO0FBK0JwQjtBQUtZO0VBQ0kseUJBQUE7QUFIaEI7QUFNUTtFQUNJLG9CQUFBO0VBQ0EsZUFBQTtBQUpaO0FBT0k7RUFDSSxnQkFBQTtBQUxSO0FBUUk7RUFDSSxTQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7QUFOUjtBQVNJO0VBQ0ksZ0NBQUE7QUFQUjtBQVVJO0VBQ0ksZ0NBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBUlI7QUFlSTtFQUNJLHdDQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQXhFTztFQXlFUCxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBYlI7QUFjUTtFQUNJLHlCQUFBO0FBWlo7QUFpQkk7RUFDSSxlQUFBO0FBZlIiLCJmaWxlIjoiY2FyZHMtdmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRzZWxlY3RlZFRhYkNvbG9yIDogcmdiKDE1NiwgMTU2LCAxNTYpO1xyXG4kdGFiQ29sb3IgOiByZ2IoMjMxLCAyMzEsIDIzMSk7XHJcbiR0YWJGb250Q29sb3I6IHJnYig0NCwgNDQsIDQ0KTtcclxuJGJ1dHRvbkNvbG9yIDogcmdiKDIxLCAxMDIsIDIxKTtcclxuXHJcbi50YWJzIHtcclxuICAgIGJvcmRlci1ib3R0b206IDVweCAkc2VsZWN0ZWRUYWJDb2xvciBzb2xpZDtcclxuICAgICoge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcclxuICAgIH1cclxuICAgIGNvbG9yOiAkdGFiRm9udENvbG9yO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOnJvdztcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBhLnRhYiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzMSwgMjMxLCAyMzEpO1xyXG4gICAgXHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgICAgICAvLyBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICBjb2xvcjogJHRhYkZvbnRDb2xvcjtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcclxuICAgICAgICBpLm1hdGVyaWFsLWljb25zIHtcclxuICAgICAgICAgICAgY29sb3I6ICR0YWJGb250Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZW4oJGNvbG9yOiAkdGFiQ29sb3IsICRhbW91bnQ6IDEwKTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJi5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRzZWxlY3RlZFRhYkNvbG9yO1xyXG4gICAgICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkY29sb3I6ICRzZWxlY3RlZFRhYkNvbG9yLCAkYW1vdW50OiAyMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJi5kaXNhYmxlZCB7XHJcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3BhbiB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGFiLWZpbGUtaW5wdXQge1xyXG4gICAgICAgIGhlaWdodDogMDtcclxuICAgICAgICB3aWR0aDogMDtcclxuICAgICAgICBkaXNwbGF5OiBub25lICAgICAgICAgICA7XHJcbiAgICB9XHJcblxyXG4gICAgI3Nwb2lsLWJ1dHRvbiB7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweCAwcHggMHB4IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgI3Bvd2VyLW9wdGlvbnMge1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDBweCAxMHB4IDEwcHggMHB4O1xyXG4gICAgICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggZ3JlZW47XHJcbiAgICAgICAgd2lkdGg6IDI1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDBweDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMHB4O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAudGFiLWJ1dHRvbiB7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgIGNvbG9yOiAjY2ZjZmNmO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRidXR0b25Db2xvcjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkY29sb3I6ICRidXR0b25Db2xvciwgJGFtb3VudDogMTApO1xyXG4gICAgICAgICAgICAvLyBmb250LXdlaWdodDogMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAudGFiIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 9122:
/*!********************************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/individual-summary/individual-summary.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndividualSummaryComponent": () => (/* binding */ IndividualSummaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 5722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ 177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pokedex.service */ 4044);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 4770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 3365);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ 3188);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 8133);












const _c0 = ["statChart"];
const _c1 = ["mm"];
const _c2 = ["searchInput"];
function IndividualSummaryComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.current_mon ? ctx_r1.current_mon.name : "N/A", " ");
} }
function IndividualSummaryComponent_div_0_img_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "img", 34);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "assets/images/sprites/", ctx_r2.current_mon.sanitizedName(), ".png", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function IndividualSummaryComponent_div_0_div_9_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "img", 36);
} if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://serebii.net/pokedex-bw/type/", ctx_r18.current_mon.get_type2(), ".gif", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function IndividualSummaryComponent_div_0_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_9_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r19.toggleTypeRevealButton(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, IndividualSummaryComponent_div_0_div_9_img_2_Template, 1, 1, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "https://serebii.net/pokedex-bw/type/", ctx_r3.current_mon.get_type1(), ".gif", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.current_mon.get_type2() != "none");
} }
function IndividualSummaryComponent_div_0_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function IndividualSummaryComponent_div_0_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_16_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r21.toggleAbilityRevealButton(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r5.current_mon.getAbilitiesIfRevealed().join(" | "));
} }
function IndividualSummaryComponent_div_0_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "--");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function IndividualSummaryComponent_div_0_mat_option_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const poke_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", poke_r23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", poke_r23, " ");
} }
function IndividualSummaryComponent_div_0_div_31_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42)(1, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_31_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r24.toggleStatRevealButton(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r11.dex.isFullyRevealed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r11.current_mon.stats_revealed ? "Hide Stats" : "Show Stats");
} }
function IndividualSummaryComponent_div_0_div_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42)(1, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Show Stats");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
function IndividualSummaryComponent_div_0_div_34_img_4_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "img", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_34_img_4_Template_img_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const evo_r27 = restoredCtx.$implicit; const i_r28 = restoredCtx.index; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3); return ctx_r29.evoClicked(evo_r27, "prev", i_r28); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const evo_r27 = ctx.$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "assets/images/sprites/", ctx_r26.sanitizePokemonName(evo_r27), ".png", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function IndividualSummaryComponent_div_0_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Evolves From ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, IndividualSummaryComponent_div_0_div_34_img_4_Template, 1, 1, "img", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r13.current_mon.get_evos_to());
} }
function IndividualSummaryComponent_div_0_div_35_img_4_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "img", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_35_img_4_Template_img_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r35); const evo_r32 = restoredCtx.$implicit; const i_r33 = restoredCtx.index; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3); return ctx_r34.evoClicked(evo_r32, "next", i_r33); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const evo_r32 = ctx.$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "assets/images/sprites/", ctx_r31.sanitizePokemonName(evo_r32), ".png", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function IndividualSummaryComponent_div_0_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Evolves To ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, IndividualSummaryComponent_div_0_div_35_img_4_Template, 1, 1, "img", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r14.current_mon.get_evos_from());
} }
function IndividualSummaryComponent_div_0_div_36_img_4_Template(rf, ctx) { if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "img", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_36_img_4_Template_img_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r40); const form_r37 = restoredCtx.$implicit; const i_r38 = restoredCtx.index; const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3); return ctx_r39.evoClicked(form_r37, "form", i_r38); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const form_r37 = ctx.$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("src", "assets/images/sprites/", ctx_r36.sanitizePokemonName(form_r37), ".png", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
function IndividualSummaryComponent_div_0_div_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Alt Forms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, IndividualSummaryComponent_div_0_div_36_img_4_Template, 1, 1, "img", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r15.getFilteredForms(ctx_r15.current_mon));
} }
function IndividualSummaryComponent_div_0_div_38_textarea_3_Template(rf, ctx) { if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "textarea", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function IndividualSummaryComponent_div_0_div_38_textarea_3_Template_textarea_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r43); const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3); return ctx_r42.current_mon.notes = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r41.current_mon.notes);
} }
function IndividualSummaryComponent_div_0_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 49)(1, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Notes:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, IndividualSummaryComponent_div_0_div_38_textarea_3_Template, 1, 1, "textarea", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r16.mon_selected);
} }
function IndividualSummaryComponent_div_0_div_40_table_9_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_40_table_9_tr_1_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51); const i_r49 = restoredCtx.index; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4); return ctx_r50.revealMovesToIndex(i_r49); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const level_r48 = ctx.$implicit;
    const i_r49 = ctx.index;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](level_r48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r47.current_mon.get_revealed_learned_move_pairs()[i_r49].move);
} }
function IndividualSummaryComponent_div_0_div_40_table_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "table", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, IndividualSummaryComponent_div_0_div_40_table_9_tr_1_Template, 5, 2, "tr", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r44.current_mon.learn_levels);
} }
function IndividualSummaryComponent_div_0_div_40_table_10_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_40_table_10_tr_1_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r56); const i_r54 = restoredCtx.index; const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4); return ctx_r55.revealTMAtIndex(i_r54); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tm_r53 = ctx.$implicit;
    const i_r54 = ctx.index;
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](tm_r53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r52.dex.revealedTMs.includes(tm_r53) || ctx_r52.dex.isFullyRevealed ? ctx_r52.current_mon.tm_moves[i_r54] : "???");
} }
function IndividualSummaryComponent_div_0_div_40_table_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "table", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, IndividualSummaryComponent_div_0_div_40_table_10_tr_1_Template, 5, 2, "tr", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r45.current_mon.tms);
} }
function IndividualSummaryComponent_div_0_div_40_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " TM Data Not Found ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function IndividualSummaryComponent_div_0_div_40_Template(rf, ctx) { if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Moves ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "hr", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 55)(4, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_40_Template_div_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r58); const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r57.tms_shown && ctx_r57.toggleTMs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Level Up");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function IndividualSummaryComponent_div_0_div_40_Template_div_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r58); const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return !ctx_r59.tms_shown && ctx_r59.toggleTMs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "TMs");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, IndividualSummaryComponent_div_0_div_40_table_9_Template, 2, 1, "table", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, IndividualSummaryComponent_div_0_div_40_table_10_Template, 2, 1, "table", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, IndividualSummaryComponent_div_0_div_40_div_11_Template, 2, 0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("tabSelected", !ctx_r17.tms_shown)("tabUnselected", ctx_r17.tms_shown);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("tabSelected", ctx_r17.tms_shown)("tabUnselected", !ctx_r17.tms_shown);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r17.tms_shown);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r17.tms_shown);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r17.current_mon.tms.length == 0);
} }
function IndividualSummaryComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, IndividualSummaryComponent_div_0_div_3_Template, 2, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 5)(5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, IndividualSummaryComponent_div_0_img_6_Template, 1, 1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 8)(8, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, IndividualSummaryComponent_div_0_div_9_Template, 3, 2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, IndividualSummaryComponent_div_0_div_10_Template, 2, 0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 12)(12, "div", 13)(13, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Abilities");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, IndividualSummaryComponent_div_0_div_16_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, IndividualSummaryComponent_div_0_div_17_Template, 2, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 16)(19, "form")(20, "mat-form-field", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "mat-autocomplete", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, IndividualSummaryComponent_div_0_mat_option_25_Template, 2, 2, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](26, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 23)(28, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](29, "canvas", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](31, IndividualSummaryComponent_div_0_div_31_Template, 3, 2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, IndividualSummaryComponent_div_0_div_32_Template, 3, 0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, IndividualSummaryComponent_div_0_div_34_Template, 5, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](35, IndividualSummaryComponent_div_0_div_35_Template, 5, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](36, IndividualSummaryComponent_div_0_div_36_Template, 5, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](38, IndividualSummaryComponent_div_0_div_38_Template, 4, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, IndividualSummaryComponent_div_0_div_40_Template, 12, 11, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](24);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControl", ctx_r0.ctrl)("matAutocomplete", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](26, 16, ctx_r0.pokes_filtered_by_text));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected && ctx_r0.current_mon.prev_evos.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected && ctx_r0.current_mon.next_evos.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected && ctx_r0.current_mon.forms.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.mon_selected);
} }
chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(...chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables);
chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.color = "#cfcfcf";
class IndividualSummaryComponent {
    constructor(dex, cdr) {
        this.cdr = cdr;
        this.ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl();
        this.mon_selected = false;
        this.tms_shown = false;
        this.dex = dex;
        this.pokes_filtered_by_text = this.ctrl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(''), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(search_text => this.searchMons(search_text)));
    }
    searchMons(search_text) {
        return this.dex.pokedex.map(mon => mon.name).filter(name => name.toLowerCase().indexOf(search_text.toLowerCase()) !== -1);
    }
    toggleTypeRevealButton() {
        if (this.current_mon) {
            this.current_mon.type_revealed = !this.current_mon.type_revealed;
            this.dex.individualChanges.next(this.current_mon);
        }
    }
    toggleStatRevealButton() {
        if (this.current_mon) {
            this.current_mon.stats_revealed = !this.current_mon.stats_revealed;
            this.dex.individualChanges.next(this.current_mon);
            // this.chart.data.datasets[0].data = this.current_mon.getStatsIfRevealed();
            // this.chart.options.plugins!.title!.text = "BST : " + (this.current_mon && this.current_mon.stats_revealed? this.current_mon.bst(): "???");
            // this.chart.update();
        }
    }
    toggleAbilityRevealButton() {
        if (this.current_mon) {
            this.current_mon.abilities_revealed = !this.current_mon.abilities_revealed;
            this.dex.individualChanges.next(this.current_mon);
        }
    }
    revealMovesToIndex(i) {
        if (this.current_mon)
            this.current_mon.learned_moves_revealed_idx = i + 1;
    }
    revealTMAtIndex(i) {
        if (this.current_mon) {
            let tm = this.current_mon.tms[i];
            if (!this.dex.revealedTMs.includes(tm)) {
                // this.dex.revealedTMs.push(this.current_mon.tms[i])
                this.dex.revealTMForAll(tm);
            }
            else {
                // this.dex
                this.dex.hideTMForAll(tm);
            }
        }
    }
    toggleTMs() {
        this.tms_shown = !this.tms_shown;
    }
    sanitizePokemonName(name) {
        return name.replace(':', '').replace('\u2640', 'f').replace('\u2642', 'm').toLowerCase();
    }
    getFilteredForms(mon) {
        return mon.forms.filter((_, i) => i != mon.form_num);
    }
    ngOnInit() {
    }
    // "https://www.serebii.net/swordshield/pokemon/289.png"
    // "https://www.serebii.net/games/type/poison.gif"
    ngAfterViewInit() {
        this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(this.chartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
                datasets: [{
                        data: this.current_mon ? this.current_mon.getStatsIfRevealed() : [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(255, 205, 86, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(75, 192, 92, 0.8)',
                            // '#ffbde0'
                            'rgba(153, 102, 255, 0.8)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1,
                        maxBarThickness: 20,
                    }]
            },
            options: {
                color: '#cfcfcf',
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        min: 0,
                        max: 255,
                        grid: {
                            borderColor: '#cfcfcf',
                            color: '#cfcfcf',
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        font: {
                            size: 20
                        },
                        display: true,
                        text: "BST : " + (this.current_mon && this.current_mon.stats_revealed ? this.current_mon.bst() : "???")
                    }
                }
            },
        });
        this.maut.optionSelected
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(ev => {
            let selected = ev.option.value;
            return this.stringToPokemon(selected);
        }))
            .subscribe(mon => this.updateCurrentMon(mon));
        this.dex.individualChanges.subscribe(mon => {
            // console.log("ichange");
            if (this.current_mon && this.current_mon.name.toLowerCase() == mon.name.toLowerCase()) {
                this.refreshChart();
            }
        });
        this.dex.dexChanges.subscribe(() => {
            // console.log("wechange");
            this.ctrl.setValue('');
            if (this.current_mon) {
                this.refreshChart();
            }
        });
        this.dex.monSelection.subscribe(n => {
            this.selectPokemonFromName(n);
            this.cdr.detectChanges();
        });
        // if(this.dex.validDexUploaded && this.dex.pokedex.length > 0)
        //   this.dex.selectPokemon(this.dex.pokedex[0].name)
        // setTimeout(() => {
        // })
    }
    evoClicked(evo, direction, index) {
        if (this.current_mon) {
            if (evo == "unknown") {
                if (direction == 'next') {
                    this.current_mon.next_evos_revealed.push(index);
                    let next_mon = this.stringToPokemon(this.current_mon.next_evos[index]);
                    if (next_mon) {
                        let back_index = next_mon.prev_evos.indexOf(this.current_mon.name);
                        next_mon.prev_evos_revealed.push(back_index);
                    }
                }
                else if (direction == 'prev') {
                    this.current_mon.prev_evos_revealed.push(index);
                    let next_mon = this.stringToPokemon(this.current_mon.prev_evos[index]);
                    if (next_mon) {
                        let back_index = next_mon.next_evos.indexOf(this.current_mon.name);
                        next_mon.next_evos_revealed.push(back_index);
                    }
                }
                this.refreshChart();
            }
            else
                this.selectPokemonFromName(evo);
        }
    }
    selectPokemonFromName(selected) {
        let mon = this.stringToPokemon(selected);
        this.updateCurrentMon(mon);
    }
    stringToPokemon(selected) {
        return this.dex.pokedex.find(mon => mon.name.toLowerCase() == selected.toLowerCase());
    }
    updateCurrentMon(mon) {
        if (mon) {
            this.mon_selected = true;
            this.current_mon = mon;
            // Also maybe split this into a method as well
            this.refreshChart();
            //
            this.search_box.value = '';
            this.ctrl.setValue('');
        }
    }
    refreshChart() {
        if (this.current_mon) {
            this.chart.data.datasets[0].data = this.current_mon.getStatsIfRevealed();
            this.chart.data.labels = this.current_mon.special
                ? ["HP", "Attack", "Defense", "Special", "Speed"]
                : ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
            this.chart.options.plugins.title.text = "BST : " + (this.current_mon && (this.current_mon.bst_revealed || this.current_mon.stats_revealed || this.current_mon.fully_revealed) ? this.current_mon.bst() : "???");
            this.chart.update();
        }
    }
}
IndividualSummaryComponent.ɵfac = function IndividualSummaryComponent_Factory(t) { return new (t || IndividualSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_1__.PokedexService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef)); };
IndividualSummaryComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: IndividualSummaryComponent, selectors: [["individual-card"]], viewQuery: function IndividualSummaryComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c2, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.chartRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.maut = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.search_box = _t.first);
    } }, decls: 1, vars: 1, consts: [["id", "main-card", "class", "wireframe", 4, "ngIf"], ["id", "main-card", 1, "wireframe"], ["id", "profile-col", 1, "wireframe"], ["id", "name-slot", 1, "wireframe"], ["class", "element-container", 4, "ngIf"], ["id", "sprite-slot", 1, "wireframe"], [1, "sprite-background"], ["style", "height: 100%;", 3, "src", 4, "ngIf"], ["id", "type-slot", 1, "wireframe"], [1, "element-container"], ["id", "type-container", "style", "cursor: pointer;", 3, "click", 4, "ngIf"], ["id", "type-container", 4, "ngIf"], ["id", "ability-slot", 1, "wireframe"], ["id", "ability-container", 1, "element-container"], ["style", "cursor: pointer;", 3, "click", 4, "ngIf"], [4, "ngIf"], ["id", "search2-slot", 1, "wireframe"], [1, "search-box"], ["type", "text", "placeholder", "Search For Pokemon", "aria-label", "Number", "matInput", "", 3, "formControl", "matAutocomplete"], ["searchInput", ""], ["autoActiveFirstOption", ""], ["mm", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], ["id", "stat-col", 1, "wireframe"], ["id", "chart-slot", 1, "wireframe"], ["id", "stat-chart", "width", "200px", "height", "100px"], ["statChart", ""], ["class", "reveal-button", 4, "ngIf"], ["id", "evolutions-slot", 1, "wireframe"], ["class", "evolution-chart", 4, "ngIf"], ["id", "notes-slot", 1, "wireframe"], ["id", "notes-parent", "class", "element-container", 4, "ngIf"], ["id", "moves-col", 1, "wireframe"], ["id", "move-table", "class", "element-container", 4, "ngIf"], [2, "height", "100%", 3, "src"], ["id", "type-container", 2, "cursor", "pointer", 3, "click"], [1, "type-box", 3, "src"], ["class", "type-box", 3, "src", 4, "ngIf"], ["id", "type-container"], ["src", "https://serebii.net/pokedex-bw/type/curse.gif", "alt", "", 1, "type-box"], [2, "cursor", "pointer", 3, "click"], [3, "value"], [1, "reveal-button"], ["id", "stat-reveal", 3, "disabled", "click"], ["id", "stat-reveal", "disabled", ""], [1, "evolution-chart"], [1, "evo-list"], ["style", "height: 100%; cursor: pointer;", 3, "src", "click", 4, "ngFor", "ngForOf"], [2, "height", "100%", "cursor", "pointer", 3, "src", "click"], ["id", "notes-parent", 1, "element-container"], [2, "color", "gray"], ["rows", "6", "class", "notes-section", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["rows", "6", 1, "notes-section", 3, "ngModel", "ngModelChange"], ["id", "move-table", 1, "element-container"], [2, "flex-grow", "1", "width", "100%"], ["id", "LvlTMSelector"], [2, "margin-right", "10px", 3, "click"], [3, "click"], [1, "move-list"], ["style", "border-collapse: collapse;", 4, "ngIf"], ["class", "default-tm-message", 4, "ngIf"], [2, "border-collapse", "collapse"], [3, "click", 4, "ngFor", "ngForOf"], [1, "left-table"], [1, "right-table"], [1, "default-tm-message"]], template: function IndividualSummaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, IndividualSummaryComponent_div_0_Template, 41, 18, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.dex.validDexUploaded);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgForm, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__.MatAutocompleteTrigger, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__.MatAutocomplete, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe], styles: ["#main-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  min-height: 600px;\n  max-height: 600px;\n  min-width: 1100px;\n  max-width: 1300px;\n  margin-top: 20px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n\n#search-col[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 220px;\n  display: flex;\n  flex-direction: column;\n}\n\n#search-col[_ngcontent-%COMP%]   #search-slot[_ngcontent-%COMP%] {\n  height: 50%;\n}\n\n#search-col[_ngcontent-%COMP%]   #dex-summary-slot[_ngcontent-%COMP%] {\n  height: 50%;\n}\n\n#profile-col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n#profile-col[_ngcontent-%COMP%]   #name-slot[_ngcontent-%COMP%] {\n  height: 10%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  padding: 6px;\n}\n\n#profile-col[_ngcontent-%COMP%]   #sprite-slot[_ngcontent-%COMP%] {\n  height: 40%;\n  display: flex;\n  padding: 6px;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n#profile-col[_ngcontent-%COMP%]   #ability-slot[_ngcontent-%COMP%] {\n  height: 20%;\n  display: flex;\n  padding: 6px;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n#profile-col[_ngcontent-%COMP%]   #ability-slot[_ngcontent-%COMP%]   #ability-container[_ngcontent-%COMP%] {\n  line-height: 1.1;\n  text-align: center;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n#profile-col[_ngcontent-%COMP%]   #type-slot[_ngcontent-%COMP%] {\n  height: 15%;\n  display: flex;\n  padding: 6px;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n#profile-col[_ngcontent-%COMP%]   #search2-slot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 15%;\n}\n\n#stat-col[_ngcontent-%COMP%] {\n  flex: 2;\n  max-width: 50%;\n  display: flex;\n  flex-direction: column;\n}\n\n#stat-col[_ngcontent-%COMP%]   #chart-slot[_ngcontent-%COMP%] {\n  height: 60%;\n}\n\n#stat-col[_ngcontent-%COMP%]   #evolutions-slot[_ngcontent-%COMP%] {\n  height: 20%;\n  padding: 0px;\n  width: 100%;\n  max-width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n#stat-col[_ngcontent-%COMP%]   #evolutions-slot[_ngcontent-%COMP%]   .evolution-chart[_ngcontent-%COMP%] {\n  height: 95%;\n  max-height: 95%;\n  width: -moz-fit-content;\n  width: fit-content;\n  max-width: 646px;\n  background-color: #19181a;\n  border-radius: 10px;\n  padding: 10px;\n  margin-left: 5px;\n  margin-right: 5px;\n  margin-bottom: 5px;\n  text-align: center;\n  line-height: 1.1;\n  box-sizing: border-box;\n}\n\n#stat-col[_ngcontent-%COMP%]   #evolutions-slot[_ngcontent-%COMP%]   .evolution-chart[_ngcontent-%COMP%]   .evo-list[_ngcontent-%COMP%] {\n  height: 65%;\n  width: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n#stat-col[_ngcontent-%COMP%]   #notes-slot[_ngcontent-%COMP%] {\n  height: 20%;\n}\n\n#moves-col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 6px;\n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%] {\n  max-height: 90%;\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   #LvlTMSelector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  margin-bottom: 5px;\n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  scrollbar-width: none;\n  width: 100%;\n  max-height: 100%;\n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]   .left-table[_ngcontent-%COMP%] {\n  border-right: 1px solid #a7a3a8;\n  padding-right: 5px;\n  padding-left: 25px;\n  text-align: right;\n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]   .right-table[_ngcontent-%COMP%] {\n  padding-left: 25px;\n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0px;\n  \n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]:hover {\n  scrollbar-width: thin;\n  \n}\n\n#moves-col[_ngcontent-%COMP%]   #move-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]:hover::-webkit-scrollbar {\n  width: 6px;\n  background-color: transparent;\n  \n}\n\n#background[_ngcontent-%COMP%] {\n  border-radius: 0px 0px 10px 10px;\n  width: 100%;\n  min-width: 600px;\n  overflow: auto;\n}\n\n.left[_ngcontent-%COMP%] {\n  width: 50%;\n  float: left;\n}\n\n.sprite[_ngcontent-%COMP%] {\n  width: 40%;\n  position: relative;\n  max-height: 450px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.right[_ngcontent-%COMP%] {\n  width: 50%;\n  float: right;\n}\n\n.stat-graph[_ngcontent-%COMP%] {\n  width: 60%;\n  height: 385px;\n}\n\n.sprite-background[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n  align-items: center;\n  justify-content: center;\n  aspect-ratio: 1/1;\n  border-radius: 30%;\n  background-color: #19181a;\n}\n\n#stat-chart[_ngcontent-%COMP%] {\n  background-color: #19181a;\n  border-radius: 10px;\n  margin: 5px;\n  max-height: 300px;\n  max-width: 600px;\n}\n\n.search-box[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  padding-left: 12px;\n  width: 100%;\n  background-color: #19181a;\n  display: block;\n}\n\n.type-box[_ngcontent-%COMP%] {\n  width: 64px;\n  height: auto;\n  max-height: 24px;\n  margin-left: 2px;\n  margin-right: 2px;\n  margin-top: 2px;\n}\n\n#type-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.reveal-button[_ngcontent-%COMP%] {\n  width: -moz-fit-content;\n  width: fit-content;\n  margin-top: 15px;\n}\n\n#notes-parent[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: auto;\n  height: 100%;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n}\n\n.column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n.notes-section[_ngcontent-%COMP%] {\n  resize: none;\n  color: #dad2e2;\n  background-color: #19181a;\n  border: none;\n  width: 100%;\n}\n\n#ability-parent[_ngcontent-%COMP%] {\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.ability-collection[_ngcontent-%COMP%] {\n  padding: 10px;\n  display: flex;\n  justify-content: center;\n  height: -moz-fit-content;\n  height: fit-content;\n}\n\n.ability-panel[_ngcontent-%COMP%] {\n  background-color: #19181a;\n  border-radius: 10px;\n  padding: 15px;\n  margin-left: 10px;\n}\n\n.tabSelected[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  font-weight: bold;\n  pointer-events: none;\n}\n\n.tabUnselected[_ngcontent-%COMP%] {\n  text-decoration: none;\n  font-weight: normal;\n  pointer-events: auto;\n}\n\n.default-tm-message[_ngcontent-%COMP%] {\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGl2aWR1YWwtc3VtbWFyeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUVBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFGSjs7QUFPQTtFQUdJLE9BQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQU5KOztBQU9JO0VBQ0ksV0FBQTtBQUxSOztBQU9JO0VBQ0ksV0FBQTtBQUxSOztBQVNBO0VBR0ksT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQVJKOztBQVNJO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FBUFI7O0FBU0k7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7QUFQUjs7QUFTSTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7QUFQUjs7QUFRUTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtFQUFBLG1CQUFBO0FBTlo7O0FBU0k7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7QUFQUjs7QUFTSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtBQVBSOztBQVdBO0VBR0ksT0FBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFWSjs7QUFXSTtFQUNJLFdBQUE7QUFUUjs7QUFXSTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7QUFUUjs7QUFVUTtFQUNJLFdBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFBQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUFSWjs7QUFTWTtFQUNJLFdBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVBoQjs7QUFXSTtFQUNJLFdBQUE7QUFUUjs7QUFhQTtFQUdJLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFaSjs7QUFhSTtFQUNJLGVBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUE2QkEseUJBQUE7QUF2Q1I7O0FBV1E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBVFo7O0FBV1E7RUFDSSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBVFo7O0FBVVk7RUFDSSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQVJoQjs7QUFVWTtFQUNJLGtCQUFBO0FBUmhCOztBQVdRO0VBQ0ksVUFBQTtFQUFtQixrQkFBQTtBQVIvQjs7QUFVUTtFQUNJLHFCQUFBO0VBQW1DLFlBQUE7QUFQL0M7O0FBV1E7RUFDSSxVQUFBO0VBQ0EsNkJBQUE7RUFBbUMsc0JBQUE7QUFSL0M7O0FBY0E7RUFHSSxnQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFiSjs7QUFzQkE7RUFDSSxVQUFBO0VBQ0EsV0FBQTtBQW5CSjs7QUF3QkE7RUFDSSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBckJKOztBQXlCQTtFQUNJLFVBQUE7RUFDQSxZQUFBO0FBdEJKOztBQTRCQTtFQUNJLFVBQUE7RUFDQSxhQUFBO0FBekJKOztBQTZCQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFFQSxrQkFBQTtFQUNBLHlCQUFBO0FBM0JKOztBQWtDQTtFQUNJLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQS9CSjs7QUFrQ0E7RUFLSSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUVBLHlCQUFBO0VBRUEsY0FBQTtBQXJDSjs7QUF3Q0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFyQ0o7O0FBMENBO0VBVUksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFoREo7O0FBcURBO0VBQ0ksdUJBQUE7RUFBQSxrQkFBQTtFQUNBLGdCQUFBO0FBbERKOztBQXFEQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFsREo7O0FBc0RBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFuREo7O0FBc0RBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7QUFuREo7O0FBc0RBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FBbkRKOztBQXVEQTtFQUNJLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQXBESjs7QUF3REE7RUFDSSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esd0JBQUE7RUFBQSxtQkFBQTtBQXJESjs7QUF3REE7RUFDSSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0FBckRKOztBQXdEQTtFQUNJLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQXJESjs7QUF3REE7RUFDSSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7QUFyREo7O0FBd0RBO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQXJESiIsImZpbGUiOiJpbmRpdmlkdWFsLXN1bW1hcnkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gTmV3IExheW91dCBTZWN0aW9uXHJcbiNtYWluLWNhcmQge1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIC8vIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgbWluLWhlaWdodDogNjAwcHg7XHJcbiAgICBtYXgtaGVpZ2h0OiA2MDBweDtcclxuICAgIG1pbi13aWR0aDogMTEwMHB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMzAwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4vLyBMZXZlbCAxXHJcblxyXG4jc2VhcmNoLWNvbCB7XHJcbiAgICAvLyB3aWR0aDogMjAlO1xyXG4gICAgLy8gZmxleC1ncm93OiAxO1xyXG4gICAgZmxleDoxO1xyXG4gICAgbWF4LXdpZHRoOiAyMjBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgI3NlYXJjaC1zbG90IHtcclxuICAgICAgICBoZWlnaHQ6IDUwJTtcclxuICAgIH1cclxuICAgICNkZXgtc3VtbWFyeS1zbG90IHtcclxuICAgICAgICBoZWlnaHQ6IDUwJTtcclxuICAgIH1cclxufVxyXG5cclxuI3Byb2ZpbGUtY29sIHtcclxuICAgIC8vIHdpZHRoOiAyMCU7XHJcbiAgICAvLyBmbGV4LWdyb3c6IDE7XHJcbiAgICBmbGV4OjE7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICNuYW1lLXNsb3Qge1xyXG4gICAgICAgIGhlaWdodDogMTAlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIHBhZGRpbmc6IDZweDtcclxuICAgIH1cclxuICAgICNzcHJpdGUtc2xvdCB7XHJcbiAgICAgICAgaGVpZ2h0OiA0MCU7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBwYWRkaW5nOiA2cHg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgIFxyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICB9XHJcbiAgICAjYWJpbGl0eS1zbG90e1xyXG4gICAgICAgIGhlaWdodDogMjAlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcGFkZGluZzogNnB4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAgIFxyXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgI2FiaWxpdHktY29udGFpbmVyIHtcclxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICN0eXBlLXNsb3Qge1xyXG4gICAgICAgIGhlaWdodDogMTUlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgcGFkZGluZzogNnB4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7ICAgXHJcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgICNzZWFyY2gyLXNsb3Qge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgICBcclxuICAgICAgICBoZWlnaHQ6IDE1JTtcclxuICAgIH1cclxufVxyXG5cclxuI3N0YXQtY29sIHtcclxuICAgIC8vIHdpZHRoOiA0MCU7XHJcbiAgICAvLyBmbGV4LWdyb3c6IDI7XHJcbiAgICBmbGV4OjI7XHJcbiAgICBtYXgtd2lkdGg6IDUwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgI2NoYXJ0LXNsb3Qge1xyXG4gICAgICAgIGhlaWdodDogNjAlO1xyXG4gICAgfVxyXG4gICAgI2V2b2x1dGlvbnMtc2xvdCB7XHJcbiAgICAgICAgaGVpZ2h0OiAyMCU7XHJcbiAgICAgICAgcGFkZGluZzogMHB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIC5ldm9sdXRpb24tY2hhcnR7XHJcbiAgICAgICAgICAgIGhlaWdodDo5NSU7XHJcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDk1JTsgICAgXHJcbiAgICAgICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcclxuICAgICAgICAgICAgbWF4LXdpZHRoOiA2NDZweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyNCwgMjYpO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIC5ldm8tbGlzdHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNjUlO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGF1dG87XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICNub3Rlcy1zbG90IHtcclxuICAgICAgICBoZWlnaHQ6IDIwJTtcclxuICAgIH1cclxufVxyXG5cclxuI21vdmVzLWNvbCB7XHJcbiAgICAvLyB3aWR0aDogMjAlO1xyXG4gICAgLy8gZmxleC1ncm93OiAxO1xyXG4gICAgZmxleDoxO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogNnB4O1xyXG4gICAgI21vdmUtdGFibGUge1xyXG4gICAgICAgIG1heC1oZWlnaHQ6IDkwJTtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICNMdmxUTVNlbGVjdG9ye1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICAubW92ZS1saXN0e1xyXG4gICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgICAgICAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAubGVmdC10YWJsZXtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYigxNjcsIDE2MywgMTY4KTtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMjVweDtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5yaWdodC10YWJsZXtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMjVweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAubW92ZS1saXN0Ojotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAwcHg7ICAgICAgICAvKiBDaHJvbWUvU2FmYXJpICovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5tb3ZlLWxpc3Q6aG92ZXIge1xyXG4gICAgICAgICAgICBzY3JvbGxiYXItd2lkdGg6IHRoaW47ICAgICAgICAgICAgIC8qIEZpcmVmb3ggKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIENocm9tZS1saWtlIGJyb3dzZXJzICovXHJcbiAgICAgICAgLm1vdmUtbGlzdDpob3Zlcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgICAgICB3aWR0aDogNnB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgICAgIC8qIE1hdGNoZXMgY29udGFpbmVyICovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuI2JhY2tncm91bmQge1xyXG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTIsIDkyLCAyMDcpO1xyXG4gICAgLy8gYm9yZGVyOiBzb2xpZDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTBweCAxMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtaW4td2lkdGg6IDYwMHB4O1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICAvLyAqe1xyXG4gICAgLy8gICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgLy8gfVxyXG59IFxyXG4vLyAjYmFja2dvdW5kOmFmdGVyIHtcclxuLy8gICAgIGNsZWFyOiBib3RoO1xyXG4vLyB9XHJcblxyXG4ubGVmdCB7XHJcbiAgICB3aWR0aDogNTAlO1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCBncmVlbjtcclxuICAgIFxyXG59XHJcblxyXG4uc3ByaXRlIHtcclxuICAgIHdpZHRoOiA0MCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXgtaGVpZ2h0OiA0NTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIC8vIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuXHJcbn1cclxuXHJcbi5yaWdodCB7XHJcbiAgICB3aWR0aDo1MCU7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCByZWQ7XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbi5zdGF0LWdyYXBoe1xyXG4gICAgd2lkdGg6IDYwJTtcclxuICAgIGhlaWdodDogMzg1cHg7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCBncmVlblxyXG59XHJcblxyXG4uc3ByaXRlLWJhY2tncm91bmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhc3BlY3QtcmF0aW86IDEgLyAxO1xyXG4gICAgLy8gcGFkZGluZy10b3A6IDUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDI0LCAyNik7XHJcbiAgICAvLyBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAvLyBvdmVyZmxvdzpcclxufVxyXG5cclxuXHJcblxyXG4jc3RhdC1jaGFydCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDI0LCAyNik7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgbWFyZ2luOiA1cHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAzMDBweDtcclxuICAgIG1heC13aWR0aDogNjAwcHg7XHJcbn1cclxuXHJcbi5zZWFyY2gtYm94IHtcclxuICAgIC8vIG1hcmdpbi1sZWZ0OiAxNXB4O1xyXG4gICAgLy8gbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgLy8gbWFyZ2luLWJvdHRvbTogMnB4O1xyXG4gICAgLy8gbWF4LXdpZHRoOiAyMDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEycHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIC8vIGJvcmRlcjogMnB4IHNvbGlkIGRhcmt2aW9sZXQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDI0LCAyNik7XHJcbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiBnaG9zdHdoaXRlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi50eXBlLWJveCB7XHJcbiAgICB3aWR0aDogNjRweDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIG1heC1oZWlnaHQ6IDI0cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XHJcbiAgICBtYXJnaW4tdG9wOiAycHg7XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbiN0eXBlLWNvbnRhaW5lciB7XHJcbiAgICAvLyBtYXJnaW4tdG9wOiA1cHg7XHJcbiAgICAvLyB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUsIDI0LCAyNik7XHJcbiAgICAvLyAvLyBib3JkZXI6IDJweCBzb2xpZCByZ2IoMTY3LCAxNjMsIDE2OCk7XHJcbiAgICAvLyBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgLy8gcGFkZGluZzogMTVweDtcclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuXHJcblxyXG4ucmV2ZWFsLWJ1dHRvbiB7XHJcbiAgICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG59XHJcblxyXG4jbm90ZXMtcGFyZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIC8vIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuO1xyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbi5jb2x1bW4ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxufVxyXG5cclxuLm5vdGVzLXNlY3Rpb24ge1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgY29sb3I6cmdiKDIxOCwgMjEwLCAyMjYpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyNCwgMjYpO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAvLyBtYXJnaW46IDVweDtcclxufVxyXG5cclxuI2FiaWxpdHktcGFyZW50IHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCBncmVlbjtcclxufVxyXG5cclxuLmFiaWxpdHktY29sbGVjdGlvbiB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcclxufVxyXG5cclxuLmFiaWxpdHktcGFuZWwge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1LCAyNCwgMjYpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG5cclxuLnRhYlNlbGVjdGVkIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG5cclxuLnRhYlVuc2VsZWN0ZWR7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XHJcbn1cclxuXHJcbi5kZWZhdWx0LXRtLW1lc3NhZ2Uge1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufSJdfQ== */"] });


/***/ }),

/***/ 2301:
/*!********************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/team-builder/team-builder.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TeamBuilderComponent": () => (/* binding */ TeamBuilderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class TeamBuilderComponent {
    constructor() { }
    ngOnInit() {
    }
}
TeamBuilderComponent.ɵfac = function TeamBuilderComponent_Factory(t) { return new (t || TeamBuilderComponent)(); };
TeamBuilderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeamBuilderComponent, selectors: [["team-builder"]], decls: 5, vars: 0, consts: [["id", "tb-container"], ["id", "team-table"], ["id", "team-summary"]], template: function TeamBuilderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Table goes here ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Summary goes here ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } }, styles: ["#tb-container[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 600px;\n}\n\n#team-table[_ngcontent-%COMP%] {\n  height: 60%;\n}\n\n#team-summary[_ngcontent-%COMP%] {\n  height: 40%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYW0tYnVpbGRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtBQUNKIiwiZmlsZSI6InRlYW0tYnVpbGRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiN0Yi1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgbWluLWhlaWdodDogNjAwcHg7XHJcbn1cclxuXHJcbiN0ZWFtLXRhYmxlIHtcclxuICAgIGhlaWdodDogNjAlO1xyXG59XHJcblxyXG4jdGVhbS1zdW1tYXJ5IHtcclxuICAgIGhlaWdodDogNDAlO1xyXG59Il19 */"] });


/***/ }),

/***/ 53:
/*!****************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/vs-summary/vs-summary.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VsSummaryComponent": () => (/* binding */ VsSummaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class VsSummaryComponent {
    constructor() { }
    ngOnInit() {
    }
}
VsSummaryComponent.ɵfac = function VsSummaryComponent_Factory(t) { return new (t || VsSummaryComponent)(); };
VsSummaryComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VsSummaryComponent, selectors: [["vs-summary"]], decls: 2, vars: 0, template: function VsSummaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "vs-summary works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2cy1zdW1tYXJ5LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 8705:
/*!******************************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/world-view/chart-configs/bst-histogram.config.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binBSTs": () => (/* binding */ binBSTs),
/* harmony export */   "bstHistogramConfig": () => (/* binding */ bstHistogramConfig)
/* harmony export */ });
const BIN_MIN = 200;
const BIN_SIZE = 20;
const BIN_MAX = 900;
const BIN_COUNT = Math.ceil((BIN_MAX - BIN_MIN) / BIN_SIZE) + 1;
const bstHistogramConfig = {
    type: 'bar',
    data: {
        labels: Array.from({ length: BIN_COUNT }, (_, i) => {
            const min = BIN_MIN + i * BIN_SIZE;
            const max = min + BIN_SIZE - 1;
            return i === BIN_COUNT - 1
                ? `≥${min}`
                : `${min}–${max}`;
        }),
        datasets: [{
                label: 'Count of Pokémon by BST',
                data: [],
                backgroundColor: '#82B1FF',
                borderColor: '#448AFF',
                borderWidth: 1
            }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
            x: { duration: 0 },
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Distribution of Base Stat Totals',
                font: { size: 18 },
                color: '#cfcfcf',
            }
        },
        scales: {
            x: { title: { display: true, text: 'BST Range' } },
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Number of Pokémon' },
                ticks: { color: '#cfcfcf' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    }
};
function binBSTs(pokemonList) {
    return pokemonList.reduce((bins, { stat_total }) => {
        if (stat_total >= BIN_MIN && stat_total < BIN_MAX) {
            const index = Math.floor((stat_total - BIN_MIN) / BIN_SIZE);
            bins[index]++;
        }
        else if (stat_total >= BIN_MAX) {
            bins[bins.length - 1]++;
        }
        return bins;
    }, Array(BIN_COUNT).fill(0));
}


/***/ }),

/***/ 4613:
/*!*******************************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/world-view/chart-configs/stat-histogram.config.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binStatValues": () => (/* binding */ binStatValues),
/* harmony export */   "getStatValue": () => (/* binding */ getStatValue),
/* harmony export */   "statValueHistogramConfig": () => (/* binding */ statValueHistogramConfig)
/* harmony export */ });
// Private binning constants
const BIN_WIDTH = 10; // each bin spans 10 stat points
const BIN_MIN = 0; // lower bound for histogram range
const BIN_MAX = 250; // upper bound for histogram range
const BIN_COUNT = Math.ceil((BIN_MAX - BIN_MIN) / BIN_WIDTH) + 1;
// Generate bin labels like "50–59", "60–69", ..., "140–149"
function generateStatLabels() {
    return Array.from({ length: BIN_COUNT }, (_, i) => {
        const lower = BIN_MIN + i * BIN_WIDTH;
        const upper = lower + BIN_WIDTH - 1;
        return i === BIN_COUNT - 1
            ? `≥${lower}`
            : `${lower}–${upper}`;
    });
}
// 📈 Chart.js configuration template
const statValueHistogramConfig = {
    type: 'bar',
    data: {
        labels: generateStatLabels(),
        datasets: [{
                label: 'Stat Value Distribution',
                data: new Array(generateStatLabels().length).fill(0),
                backgroundColor: '#81D4FA',
                borderColor: '#0288D1',
                borderWidth: 1
            }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animations: {
            x: { duration: 0 },
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Histogram of Specific Stat Values',
                font: { size: 18 },
                color: '#cfcfcf'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Stat Value Range',
                    color: '#cfcfcf'
                },
                ticks: { color: '#cfcfcf' },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Pokémon',
                    color: '#cfcfcf'
                },
                ticks: { color: '#cfcfcf' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    }
};
// Extract stat value from Pokémon by stat key
function getStatValue(p, stat) {
    switch (stat) {
        case "hp":
            return p.hp;
        case "attack":
            return p.attack;
        case "defense":
            return p.defense;
        case "sp_attack":
            return p.sp_attack ? p.sp_attack : 0;
        case "sp_defense":
            return p.sp_defense ? p.sp_defense : 0;
        case "special":
            return p.special ? p.special : 0;
        case "speed":
            return p.speed;
        case "stat_total":
            return p.bst();
        default:
            return 0;
    }
}
// Bin Pokémon by a given stat key (e.g. 'attack', 'defense', 'speed')
function binStatValues(pokemonList, stat) {
    return pokemonList.reduce((bins, p) => {
        const value = getStatValue(p, stat);
        if (value >= BIN_MIN && value < BIN_MAX) {
            const index = Math.floor((value - BIN_MIN) / BIN_WIDTH);
            bins[index]++;
        }
        else if (value >= BIN_MAX) {
            bins[bins.length - 1]++;
        }
        return bins;
    }, Array(BIN_COUNT).fill(0));
}


/***/ }),

/***/ 7419:
/*!*************************************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/world-view/chart-configs/stat-ratio-histogram.config.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binStatRatios": () => (/* binding */ binStatRatios),
/* harmony export */   "calculateStatRatio": () => (/* binding */ calculateStatRatio),
/* harmony export */   "statRatioHistogramConfig": () => (/* binding */ statRatioHistogramConfig)
/* harmony export */ });
// 🔐 Private constants
const BIN_SIZE = 0.25; // bucket width for ratio range
const BIN_COUNT = 30; // e.g. 1–2, 2–3, ..., 8+
const BIN_MIN = 1.0; // lowest ratio tracked
// 🔢 Generate labels like "1.00–1.24", "1.25–1.49", ..., "≥3.75"
function generateRatioLabels() {
    return Array.from({ length: BIN_COUNT }, (_, i) => {
        const lower = BIN_MIN + i * BIN_SIZE;
        const upper = lower + BIN_SIZE - 0.01;
        return i === BIN_COUNT - 1
            ? `≥${lower.toFixed(2)}`
            : `${lower.toFixed(2)}–${upper.toFixed(2)}`;
    });
}
// 📈 Chart.js configuration template
const statRatioHistogramConfig = {
    type: 'bar',
    data: {
        labels: generateRatioLabels(),
        datasets: [{
                label: 'Ratio of Highest to Lowest Stat',
                data: [],
                backgroundColor: '#FFAB91',
                borderColor: '#FF7043',
                borderWidth: 1
            }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Histogram of Stat Ratio (Max / Min)',
                font: { size: 18 },
                color: '#cfcfcf'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ratio Range',
                    color: '#cfcfcf'
                },
                ticks: { color: '#cfcfcf' },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                    display: false,
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Pokémon',
                    color: '#cfcfcf'
                },
                ticks: { color: '#cfcfcf' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    }
};
// Compute ratio of highest stat to lowest stat
function calculateStatRatio(p) {
    const stats = p.special
        ? [p.hp, p.attack, p.defense, p.special, p.speed]
        : [p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed];
    const max = Math.max(...stats);
    const min = Math.min(...stats);
    return max / min;
}
// Reduce Pokémon list into ratio bins
function binStatRatios(pokemonList) {
    return pokemonList.reduce((bins, p) => {
        const ratio = calculateStatRatio(p);
        const cappedRatio = Math.min(ratio, BIN_MIN + BIN_SIZE * BIN_COUNT - 0.01);
        const index = Math.floor((cappedRatio - BIN_MIN) / BIN_SIZE);
        bins[index]++;
        return bins;
    }, Array(BIN_COUNT).fill(0));
}


/***/ }),

/***/ 474:
/*!****************************************************************************!*\
  !*** ./src/app/pokedex-page/cards-view/world-view/world-view.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldViewComponent": () => (/* binding */ WorldViewComponent)
/* harmony export */ });
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ 177);
/* harmony import */ var _chart_configs_bst_histogram_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-configs/bst-histogram.config */ 8705);
/* harmony import */ var _chart_configs_stat_ratio_histogram_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chart-configs/stat-ratio-histogram.config */ 7419);
/* harmony import */ var _chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chart-configs/stat-histogram.config */ 4613);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/pokedex.service */ 4044);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 587);








const _c0 = ["BSTChart"];
const _c1 = ["StatRatioChart"];
const _c2 = ["StatChart"];
function WorldViewComponent_option_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "titlecase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const stat_r8 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", stat_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 2, ctx_r3.friendlyStatName(stat_r8)));
} }
function WorldViewComponent_tr_30_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WorldViewComponent_tr_30_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12); const i_r10 = restoredCtx.index; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r11.revealTMByIndex(i_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tm_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tm_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r4.pokedex.revealedTMs.includes(tm_r9) || ctx_r4.pokedex.isFullyRevealed ? ctx_r4.pokedex.tmMoves[i_r10] : "???");
} }
function WorldViewComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " TM Data Unchanged ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function WorldViewComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const starter_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](starter_r13);
} }
function WorldViewComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Starters Unchanged");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(...chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables);
chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.color = "#cfcfcf";
class WorldViewComponent {
    constructor(dex, cdr) {
        this.stats = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
        this.selectedStat = 'hp';
        this.currentChart = 'BST';
        this.pokedex = dex;
        this.count = dex.pokedex.length;
        this.cdr = cdr;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.bstChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(this.bstChartRef.nativeElement, _chart_configs_bst_histogram_config__WEBPACK_IMPORTED_MODULE_1__.bstHistogramConfig);
        this.pokedex.filterChanges.subscribe(filteredList => {
            this.stats = this.pokedex.pokedex[0].special
                ? ['hp', 'attack', 'defense', 'special', 'speed']
                : ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
            this.refreshCharts(filteredList);
            this.cdr.detectChanges();
        });
    }
    switchChartDisplay(chartName) {
        this.currentChart = chartName;
        this.cdr.detectChanges();
        switch (chartName) {
            case 'BST':
                if (!this.bstChart) {
                    this.bstChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(this.bstChartRef.nativeElement, _chart_configs_bst_histogram_config__WEBPACK_IMPORTED_MODULE_1__.bstHistogramConfig);
                }
                break;
            case 'Stat':
                if (!this.statChart) {
                    this.statChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(this.statChartRef.nativeElement, _chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__.statValueHistogramConfig);
                    this.workingList && (this.statChart.data.datasets[0].data = (0,_chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__.binStatValues)(this.workingList, this.selectedStat));
                    this.statChart.update();
                }
                break;
            case 'Ratio':
                if (!this.statRatioChart) {
                    this.statRatioChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(this.statRatioChartRef.nativeElement, _chart_configs_stat_ratio_histogram_config__WEBPACK_IMPORTED_MODULE_2__.statRatioHistogramConfig);
                    this.workingList && (this.statRatioChart.data.datasets[0].data = (0,_chart_configs_stat_ratio_histogram_config__WEBPACK_IMPORTED_MODULE_2__.binStatRatios)(this.workingList));
                    this.statRatioChart.update();
                }
                break;
        }
        // if(this.workingList) {
        //   this.refreshCharts(this.workingList);
        // }
    }
    refreshCharts(pokemonList) {
        if (this.workingList === pokemonList) {
            // console.log("Skipping Work")
            return;
        }
        this.workingList = pokemonList;
        if (this.bstChart) {
            this.bstChart.data.datasets[0].data = (0,_chart_configs_bst_histogram_config__WEBPACK_IMPORTED_MODULE_1__.binBSTs)(pokemonList);
            this.bstChart.update();
        }
        if (this.statChart) {
            if (pokemonList.length > 0 && (0,_chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__.getStatValue)(pokemonList[0], this.selectedStat) === 0) {
                this.selectedStat = 'hp';
            }
            this.statChart.data.datasets[0].data = (0,_chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__.binStatValues)(pokemonList, this.selectedStat);
            this.statChart.update();
        }
        if (this.statRatioChart) {
            this.statRatioChart.data.datasets[0].data = (0,_chart_configs_stat_ratio_histogram_config__WEBPACK_IMPORTED_MODULE_2__.binStatRatios)(pokemonList);
            this.statRatioChart.update();
        }
    }
    friendlyStatName(statAbb) {
        switch (statAbb) {
            case 'sp_attack':
                return 'special attack';
            case 'sp_defense':
                return 'special defense';
            default:
                return statAbb;
        }
    }
    onStatSelect(target) {
        if (target && target.value) {
            let stat = target.value;
            if (stat) {
                this.selectedStat = stat;
                if (this.statChart && this.workingList) {
                    this.statChart.data.datasets[0].data = (0,_chart_configs_stat_histogram_config__WEBPACK_IMPORTED_MODULE_3__.binStatValues)(this.workingList, this.selectedStat);
                    this.statChart.update();
                }
            }
        }
    }
    revealTMByIndex(idx) {
        let tm = this.pokedex.tmIds[idx];
        if (!this.pokedex.revealedTMs.includes(tm)) {
            this.pokedex.revealTMForAll(tm);
        }
        else {
            this.pokedex.hideTMForAll(tm);
        }
    }
}
WorldViewComponent.ɵfac = function WorldViewComponent_Factory(t) { return new (t || WorldViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_pokedex_service__WEBPACK_IMPORTED_MODULE_4__.PokedexService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef)); };
WorldViewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: WorldViewComponent, selectors: [["world-view"]], viewQuery: function WorldViewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c2, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.bstChartRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.statRatioChartRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.statChartRef = _t.first);
    } }, decls: 37, vars: 19, consts: [[1, "world-view-container"], [1, "chart-column"], [1, "chart-slot"], [1, "element-container"], [1, "chart-selector"], [1, "selectable", 3, "click"], [1, "world-chart"], ["BSTChart", ""], ["StatChart", ""], ["StatRatioChart", ""], [2, "flex-direction", "column", "align-items", "center"], [1, "stat-selector", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], [1, "tm-column"], [1, "tm-table", "element-container"], [2, "flex-grow", "1", "width", "100%"], [1, "move-list"], [2, "border-collapse", "collapse"], [3, "click", 4, "ngFor", "ngForOf"], ["class", "default-tm-message", 4, "ngIf"], [1, "starter-list", "element-container"], [4, "ngFor", "ngForOf"], ["class", "default-starter-message", 4, "ngIf"], [3, "value"], [3, "click"], [1, "left-table"], [1, "right-table"], [1, "default-tm-message"], [1, "default-starter-message"]], template: function WorldViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WorldViewComponent_Template_div_click_5_listener() { return ctx.switchChartDisplay("BST"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, " BSTs ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WorldViewComponent_Template_div_click_7_listener() { return ctx.switchChartDisplay("Stat"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " Stats ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WorldViewComponent_Template_div_click_9_listener() { return ctx.switchChartDisplay("Ratio"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " Ratios ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "canvas", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "canvas", 6, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "canvas", 6, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, " Select Stat: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function WorldViewComponent_Template_select_change_22_listener($event) { return ctx.onStatSelect($event.target); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, WorldViewComponent_option_23_Template, 3, 4, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 13)(25, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, " TMS ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "hr", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 16)(29, "table", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](30, WorldViewComponent_tr_30_Template, 5, 2, "tr", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, WorldViewComponent_div_31_Template, 2, 0, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, " Starters ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "hr", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, WorldViewComponent_div_35_Template, 2, 1, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](36, WorldViewComponent_div_36_Template, 2, 0, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx.currentChart === "BST");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx.currentChart === "Stat");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx.currentChart === "Ratio");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("display", ctx.currentChart !== "BST" ? "none" : "block");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("display", ctx.currentChart !== "Stat" ? "none" : "block");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("display", ctx.currentChart !== "Ratio" ? "none" : "block");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("display", ctx.currentChart !== "Stat" ? "none" : "flex");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.stats);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.pokedex.tmIds);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.pokedex.tmIds.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.pokedex.starters);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.pokedex.starters.length == 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.TitleCasePipe], styles: [".world-view-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  margin-top: 20px;\n  height: 600px;\n  min-width: 1100px;\n  max-width: 1300px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%] {\n  width: 75%;\n  max-height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%] {\n  max-height: 100%;\n  width: 100%;\n  padding-left: 20px;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%]   .element-container[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%]   .element-container[_ngcontent-%COMP%]   .world-chart[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  width: 100%;\n  height: 100%;\n  display: block;\n  max-height: 100%;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%]   .chart-selector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  gap: 20px;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%]   .chart-selector[_ngcontent-%COMP%]   .selectable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.world-view-container[_ngcontent-%COMP%]   .chart-column[_ngcontent-%COMP%]   .chart-slot[_ngcontent-%COMP%]   .chart-selector[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  font-weight: bold;\n  pointer-events: none;\n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%] {\n  width: 25%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%] {\n  max-height: 70%;\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  scrollbar-width: none;\n  width: 100%;\n  max-height: 100%;\n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]   .left-table[_ngcontent-%COMP%] {\n  border-right: 1px solid #a7a3a8;\n  padding-right: 5px;\n  padding-left: 25px;\n  text-align: right;\n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]   .right-table[_ngcontent-%COMP%] {\n  padding-left: 25px;\n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0px;\n  \n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]:hover {\n  scrollbar-width: thin;\n  \n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .tm-table[_ngcontent-%COMP%]   .move-list[_ngcontent-%COMP%]:hover::-webkit-scrollbar {\n  width: 6px;\n  background-color: transparent;\n  \n}\n.world-view-container[_ngcontent-%COMP%]   .tm-column[_ngcontent-%COMP%]   .starter-list[_ngcontent-%COMP%] {\n  max-height: 30%;\n  width: 80%;\n  margin-top: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.chart-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}\n.stat-selector[_ngcontent-%COMP%] {\n  background-color: #19181a;\n}\n.default-tm-message[_ngcontent-%COMP%] {\n  height: 300px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.default-starter-message[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmxkLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQUk7RUFDSSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFFUjtBQURRO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFHWjtBQUZZO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFFQSxzQkFBQTtBQUdoQjtBQUZnQjtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQUlwQjtBQURZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0FBR2hCO0FBRmdCO0VBQ0ksZUFBQTtBQUlwQjtBQUZnQjtFQUNJLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQUlwQjtBQUNJO0VBQ0ksVUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBQ1I7QUFBUTtFQUNJLGVBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUF1QkEseUJBQUE7QUFwQlo7QUFGWTtFQUNJLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFJaEI7QUFIZ0I7RUFDSSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQUtwQjtBQUhnQjtFQUNJLGtCQUFBO0FBS3BCO0FBRlk7RUFDSSxVQUFBO0VBQW1CLGtCQUFBO0FBS25DO0FBSFk7RUFDSSxxQkFBQTtFQUFtQyxZQUFBO0FBTW5EO0FBRlk7RUFDSSxVQUFBO0VBQ0EsNkJBQUE7RUFBbUMsc0JBQUE7QUFLbkQ7QUFGUTtFQUNJLGVBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUlaO0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQUNGO0FBRUE7RUFDSSx5QkFBQTtBQUNKO0FBS0E7RUFDSSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBRko7QUFLQTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7QUFGSiIsImZpbGUiOiJ3b3JsZC12aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndvcmxkLXZpZXctY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgIGhlaWdodDogNjAwcHg7XHJcbiAgICBtaW4td2lkdGg6IDExMDBweDtcclxuICAgIG1heC13aWR0aDogMTMwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICAuY2hhcnQtY29sdW1uIHtcclxuICAgICAgICB3aWR0aDogNzUlO1xyXG4gICAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIC5jaGFydC1zbG90IHtcclxuICAgICAgICAgICAgbWF4LWhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMjBweDtcclxuICAgICAgICAgICAgLmVsZW1lbnQtY29udGFpbmVyIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgICAgICAgICAvLyBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLy8gZW5zdXJlcyBwYWRkaW5nIGRvZXNuJ3QgYWZmZWN0IGxheW91dCBtYXRoXHJcbiAgICAgICAgICAgICAgICAud29ybGQtY2hhcnQge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMSBhdXRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5jaGFydC1zZWxlY3RvciB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZ2FwOiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgLnNlbGVjdGFibGUge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAudG0tY29sdW1uIHtcclxuICAgICAgICB3aWR0aDogMjUlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIC50bS10YWJsZSB7XHJcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDcwJTtcclxuICAgICAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgLm1vdmUtbGlzdHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgICAgIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICAubGVmdC10YWJsZXtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2IoMTY3LCAxNjMsIDE2OCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMjVweDtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5yaWdodC10YWJsZXtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDI1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLm1vdmUtbGlzdDo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDBweDsgICAgICAgIC8qIENocm9tZS9TYWZhcmkgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAubW92ZS1saXN0OmhvdmVyIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbGJhci13aWR0aDogdGhpbjsgICAgICAgICAgICAgLyogRmlyZWZveCAqL1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiBDaHJvbWUtbGlrZSBicm93c2VycyAqL1xyXG4gICAgICAgICAgICAubW92ZS1saXN0OmhvdmVyOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNnB4O1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7ICAgICAvKiBNYXRjaGVzIGNvbnRhaW5lciAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5zdGFydGVyLWxpc3Qge1xyXG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAzMCU7XHJcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLmNoYXJ0LWNvbnRlbnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uc3RhdC1zZWxlY3RvciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTkxODFhO1xyXG4gICAgLy8gb3B0aW9uIHtcclxuICAgIC8vICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbi5kZWZhdWx0LXRtLW1lc3NhZ2Uge1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmRlZmF1bHQtc3RhcnRlci1tZXNzYWdlIHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59Il19 */"] });


/***/ }),

/***/ 1644:
/*!********************************************************!*\
  !*** ./src/app/pokedex-page/pokedex-page.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PokedexPageComponent": () => (/* binding */ PokedexPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _pokedex_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pokedex.service */ 4044);
/* harmony import */ var _cards_view_cards_view_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards-view/cards-view.component */ 8053);
/* harmony import */ var _table_view_table_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-view/table-view.component */ 4130);




class PokedexPageComponent {
    constructor(dex) {
        this.dex = dex;
    }
    ngOnInit() {
        if (!this.dex.validDexUploaded) {
            this.dex.loadDefaultData();
        }
    }
    ngAfterViewInit() {
    }
}
PokedexPageComponent.ɵfac = function PokedexPageComponent_Factory(t) { return new (t || PokedexPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_pokedex_service__WEBPACK_IMPORTED_MODULE_0__.PokedexService)); };
PokedexPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: PokedexPageComponent, selectors: [["app-pokedex-page"]], decls: 4, vars: 0, template: function PokedexPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-cards-view")(2, "hr")(3, "app-table-view");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } }, directives: [_cards_view_cards_view_component__WEBPACK_IMPORTED_MODULE_1__.CardsViewComponent, _table_view_table_view_component__WEBPACK_IMPORTED_MODULE_2__.TableViewComponent], styles: [".split[_ngcontent-%COMP%] {\n  height: 100%;\n  z-index: 1;\n  top: 0;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBva2VkZXgtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLFlBQUE7RUFHQSxVQUFBO0VBQ0EsTUFBQTtFQUNBLGtCQUFBO0FBSEoiLCJmaWxlIjoicG9rZWRleC1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4uc3BsaXQge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgLy8gd2lkdGg6IDUwJTtcclxuICAgIC8vIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICAvLyBwYWRkaW5nLXRvcDogMjBweDtcclxuXHJcbi8vICAgICAmLmxlZnQge1xyXG4vLyAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4vLyAgICAgICAgIHdpZHRoOiA1MCU7XHJcbi8vIC8vICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTMsIDU0LCA2MCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgJi5yaWdodCB7XHJcbi8vICAgICAgICAgd2lkdGg6IDUwJTtcclxuLy8gICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbi8vIC8vICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODcsIDg3LCA4Nyk7XHJcbi8vICAgICB9XHJcblxyXG4gIH1cclxuXHJcbi8vICAgLmNlbnRlcmVkIHtcclxuLy8gICAgIC8vIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuLy8gICAgIC8vIGZsb2F0OiBub25lO1xyXG4vLyAgICAgdG9wOiA1MCU7XHJcbi8vICAgICBsZWZ0OiA1MCU7XHJcbi8vICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuLy8gICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuLy8gICB9Il19 */"] });


/***/ }),

/***/ 7792:
/*!**************************************************************************************************!*\
  !*** ./src/app/pokedex-page/table-view/filter-dialog-content/filter-dialog-content.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterDialogContentComponent": () => (/* binding */ FilterDialogContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var angular2_query_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular2-query-builder */ 1054);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 587);





class FilterDialogContentComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.config = {
            fields: {
                hp: { name: 'HP', type: 'number' },
                attack: { name: 'Attack', type: 'number' },
                sp_attack: { name: 'Special Attack', type: 'number' },
                defense: { name: 'Defense', type: 'number' },
                sp_defense: { name: 'Special Defense', type: 'number' },
                speed: { name: 'Speed', type: 'number' },
                stat_total: { name: 'Total Stats', type: 'number' },
                type: {
                    name: 'Type',
                    type: 'category',
                    options: [
                        { name: 'Normal', value: 'normal' },
                        { name: 'Fire', value: 'fire' },
                        { name: 'Fighting', value: 'fighting' },
                        { name: 'Water', value: 'water' },
                        { name: 'Flying', value: 'flying' },
                        { name: 'Grass', value: 'grass' },
                        { name: 'Poison', value: 'poison' },
                        { name: 'Electric', value: 'electric' },
                        { name: 'Ground', value: 'ground' },
                        { name: 'Psychic', value: 'psychic' },
                        { name: 'Rock', value: 'rock' },
                        { name: 'Ice', value: 'ice' },
                        { name: 'Bug', value: 'bug' },
                        { name: 'Dragon', value: 'dragon' },
                        { name: 'Ghost', value: 'ghost' },
                        { name: 'Dark', value: 'dark' },
                        { name: 'Steel', value: 'steel' },
                        { name: 'Fairy', value: 'fairy' }
                    ]
                },
                ability: {
                    name: 'Ability',
                    type: 'string',
                    operators: ['=', '!=']
                },
                move: {
                    name: 'Move',
                    type: 'string',
                    operators: ['has']
                },
                evolution: {
                    name: 'Evolution Status',
                    type: 'category',
                    operators: ['is', 'is not'],
                    options: [
                        { name: 'Fully Evolved', value: 'fullyevolved' },
                        { name: 'Base Evolution', value: 'baseevo' },
                        { name: 'Mega Evolution', value: 'megaevo' },
                        { name: 'Mega Evolvable', value: 'megaable' },
                    ]
                }
            }
        };
        // console.log("dialog data", this.data);
    }
    ngOnInit() {
    }
    onNoClick() {
        // console.log(this.data);
        this.dialogRef.close();
    }
}
FilterDialogContentComponent.ɵfac = function FilterDialogContentComponent_Factory(t) { return new (t || FilterDialogContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA)); };
FilterDialogContentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FilterDialogContentComponent, selectors: [["app-filter-dialog-content"]], decls: 7, vars: 3, consts: [["mat-dialog-content", ""], [3, "ngModel", "config", "ngModelChange"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", "tabindex", "0", 3, "mat-dialog-close"]], template: function FilterDialogContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "query-builder", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FilterDialogContentComponent_Template_query_builder_ngModelChange_1_listener($event) { return ctx.data = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FilterDialogContentComponent_Template_button_click_3_listener() { return ctx.onNoClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Ok");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.data)("config", ctx.config);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("mat-dialog-close", ctx.data);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, angular2_query_builder__WEBPACK_IMPORTED_MODULE_0__.QueryBuilderComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogClose], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmaWx0ZXItZGlhbG9nLWNvbnRlbnQuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6944:
/*!*********************************************************!*\
  !*** ./src/app/pokedex-page/table-view/queryUtility.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryOperators": () => (/* binding */ CategoryOperators),
/* harmony export */   "ContainsOperators": () => (/* binding */ ContainsOperators),
/* harmony export */   "EqualityOperators": () => (/* binding */ EqualityOperators),
/* harmony export */   "NumberOperators": () => (/* binding */ NumberOperators),
/* harmony export */   "filterDataByQueryTree": () => (/* binding */ filterDataByQueryTree)
/* harmony export */ });
var NumberOperators;
(function (NumberOperators) {
    NumberOperators["eq"] = "=";
    NumberOperators["neq"] = "!=";
    NumberOperators["geq"] = ">=";
    NumberOperators["gt"] = ">";
    NumberOperators["leq"] = "<=";
    NumberOperators["lt"] = "<";
})(NumberOperators || (NumberOperators = {}));
var CategoryOperators;
(function (CategoryOperators) {
    CategoryOperators["in"] = "in";
    CategoryOperators["notin"] = "not in";
    CategoryOperators["is_yes"] = "is";
    CategoryOperators["is_not"] = "is not";
})(CategoryOperators || (CategoryOperators = {}));
var EqualityOperators;
(function (EqualityOperators) {
    EqualityOperators["eq"] = "=";
    EqualityOperators["neq"] = "!=";
})(EqualityOperators || (EqualityOperators = {}));
var ContainsOperators;
(function (ContainsOperators) {
    ContainsOperators["has"] = "has";
    ContainsOperators["nhas"] = "!has";
})(ContainsOperators || (ContainsOperators = {}));
function filterDataByQueryTree(data, querytree) {
    return data.filter(p => recursiveRuleCheck(p, querytree));
}
function recursiveRuleCheck(pokemon, querytree) {
    if (querytree.field && querytree.operator) {
        return ruleCheck(pokemon, querytree);
    }
    else if (querytree.condition == 'and') {
        return querytree.rules.every((subquery => recursiveRuleCheck(pokemon, subquery)));
    }
    else if (querytree.condition == 'or') {
        return querytree.rules.some((subquery => recursiveRuleCheck(pokemon, subquery)));
    }
    return true;
}
function ruleCheck(pokemon, rule) {
    // const value_from_pokemon = getValueFromPokemon(rule.field, pokemon);
    //Start from 'scratch' zone
    if (['hp', 'attack', 'sp_attack', 'defense', 'sp_defense', 'speed', 'stat_total'].includes(rule.field)) {
        const stat_from_mon = pokemon.get_stat(rule.field);
        if (!stat_from_mon) {
            return false;
        }
        const stat_from_rule = Number.parseFloat(rule.value);
        switch (rule.operator) {
            case NumberOperators.eq:
                {
                    return stat_from_mon == stat_from_rule;
                }
                break;
            case NumberOperators.neq:
                {
                    return stat_from_mon != stat_from_rule;
                }
                break;
            case NumberOperators.geq:
                {
                    return stat_from_mon >= stat_from_rule;
                }
                break;
            case NumberOperators.leq:
                {
                    return stat_from_mon <= stat_from_rule;
                }
                break;
            case NumberOperators.gt:
                {
                    return stat_from_mon > stat_from_rule;
                }
                break;
            case NumberOperators.lt:
                {
                    return stat_from_mon < stat_from_rule;
                }
                break;
            default:
                break;
        }
    }
    else if (rule.field == 'type') {
        if (!pokemon.checkTypeRevealed()) {
            return false;
        }
        switch (rule.operator) {
            case EqualityOperators.eq:
                {
                    return [pokemon.get_type1(), pokemon.get_type2()].includes(rule.value);
                }
                break;
            case EqualityOperators.neq:
                {
                    return !([pokemon.get_type1(), pokemon.get_type2()].includes(rule.value));
                }
                break;
            case CategoryOperators.in:
                {
                    return rule.value.includes(pokemon.get_type1()) ||
                        rule.value.includes(pokemon.get_type2());
                }
                break;
            case CategoryOperators.notin:
                {
                    return !(rule.value.includes(pokemon.get_type1()) ||
                        rule.value.includes(pokemon.get_type2()));
                }
                break;
            default:
                break;
        }
    }
    else if (rule.field == 'ability') {
        if (!pokemon.checkAbilityRevealed()) {
            return false;
        }
        switch (rule.operator) {
            case EqualityOperators.eq:
                {
                    return pokemon.getAbilitiesIfRevealed().some(ab => ab.toLowerCase() === rule.value.toLowerCase());
                    // return pokemon.getAbilitiesIfRevealed().map(a => a.toLowerCase()).includes(rule.value.toLowerCase())
                }
                break;
            case EqualityOperators.neq:
                {
                    return !(pokemon.getAbilitiesIfRevealed().map(a => a.toLowerCase()).includes(rule.value.toLowerCase()));
                }
                break;
            default:
                break;
        }
    }
    else if (rule.field == 'move') {
        switch (rule.operator) {
            case ContainsOperators.has:
                {
                    return (pokemon.getMovesIfRevealed().some(mv => mv.toLowerCase() === rule.value.toLowerCase()));
                }
                break;
            case ContainsOperators.nhas:
                {
                    return !(pokemon.getMovesIfRevealed().some(mv => mv.toLowerCase() === rule.value.toLowerCase()));
                }
                break;
            default:
                break;
        }
    }
    else if (rule.field == 'evolution') {
        switch (rule.operator) {
            case CategoryOperators.is_yes:
                {
                    if (rule.value == 'fullyevolved')
                        return pokemon.next_evos.length == 0;
                    else if (rule.value == 'baseevo')
                        return pokemon.prev_evos.length == 0;
                    else if (rule.value == 'megaevo')
                        return pokemon.name.includes('-Mega');
                    else if (rule.value == 'megaable')
                        return pokemon.forms.length > 0 && !pokemon.name.includes('-Mega') && pokemon.forms.some(name => name.includes('-Mega'));
                }
                break;
            case CategoryOperators.is_not:
                {
                    if (rule.value == 'fullyevolved')
                        return pokemon.next_evos.length !== 0;
                    else if (rule.value == 'baseevo')
                        return pokemon.prev_evos.length !== 0;
                    else if (rule.value == 'megaevo')
                        return !pokemon.name.includes('-Mega');
                    else if (rule.value == 'megaable')
                        return pokemon.forms.length == 0 || pokemon.name.includes('-Mega') || !pokemon.forms.some(name => name.includes('-Mega'));
                }
                break;
            default:
                break;
        }
    }
    else {
        return true;
    }
    return true;
    //
    // switch (rule.operator) {
    //     case CategoryOperators.in: {
    //         return (value_from_pokemon as string[]).some((t) => (rule.value as string[]).includes(t))
    //     } break;
    //     case CategoryOperators.notin: {
    //         return (value_from_pokemon as string[]).every((t) => !(rule.value as string[]).includes(t))
    //     } break;
    //     case NumberOperators.eq: {
    //         if (typeof value_from_pokemon == 'number') {
    //             return Number.parseFloat(rule.value) == value_from_pokemon
    //         } else if(rule.field == 'type') {
    //             return (value_from_pokemon as string[]).includes(rule.value)
    //         } else {
    //             return rule.value == value_from_pokemon
    //         }
    //     } break;
    //     case NumberOperators.neq: {
    //         if (typeof value_from_pokemon == 'number') {
    //             return Number.parseFloat(rule.value) != value_from_pokemon
    //         }  else if(rule.field == 'type') {
    //             return !(value_from_pokemon as string[]).includes(rule.value)
    //         } else {
    //             return rule.value != value_from_pokemon
    //         }
    //     } break;
    //     case NumberOperators.geq: {
    //         return value_from_pokemon >= Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.gt: {
    //         return value_from_pokemon > Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.lt: {
    //         return value_from_pokemon < Number.parseFloat(rule.value)
    //     } break;
    //     case NumberOperators.leq: {
    //         return value_from_pokemon <= Number.parseFloat(rule.value)
    //     } break;
    //     default:
    //         return true;
    //         break;
    // }
}


/***/ }),

/***/ 4130:
/*!*****************************************************************!*\
  !*** ./src/app/pokedex-page/table-view/table-view.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableViewComponent": () => (/* binding */ TableViewComponent)
/* harmony export */ });
/* harmony import */ var _filter_dialog_content_filter_dialog_content_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-dialog-content/filter-dialog-content.component */ 7792);
/* harmony import */ var ngx_easy_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-easy-table */ 1994);
/* harmony import */ var _queryUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queryUtility */ 6944);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _pokedex_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pokedex.service */ 4044);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6362);









const _c0 = ["tableTemplate"];
const _c1 = ["filterButton"];
const _c2 = function (a0) { return [a0]; };
function TableViewComponent_div_0_ng_template_10_td_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_td_15_Template_td_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const row_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r8.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 11)(4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const stat_r7 = ctx.$implicit;
    const row_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](5, _c2, stat_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", row_r4.get_stat(stat_r7) / 2.55 + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", row_r4.get_stat(stat_r7) ? row_r4.get_stat(stat_r7) : "???", " ");
} }
const _c3 = function () { return ["hp", "attack", "defense", "special", "speed"]; };
const _c4 = function () { return ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed"]; };
function TableViewComponent_div_0_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_Template_td_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const row_r4 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r12.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_Template_td_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const row_r4 = restoredCtx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r14.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_Template_td_click_6_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const row_r4 = restoredCtx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r15.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_Template_td_click_9_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const row_r4 = restoredCtx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r16.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_ng_template_10_Template_td_click_12_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const row_r4 = restoredCtx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r17.rowClick(row_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, TableViewComponent_div_0_ng_template_10_td_15_Template, 6, 7, "td", 8);
} if (rf & 2) {
    const row_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r4.uid);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r4.checkTypeRevealed() ? row_r4.type1 : "???");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r4.checkTypeRevealed() ? row_r4.type2 : "???");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Total: ", row_r4.checkBSTRevealed() ? row_r4.bst() : "???", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r4.special ? _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](6, _c3) : _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](7, _c4));
} }
function TableViewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 1)(2, "button", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TableViewComponent_div_0_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r18.openFilterTreeDialog(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "i", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "filter_alt");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Filter List");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "ngx-table", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("event", function TableViewComponent_div_0_Template_ngx_table_event_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r19); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r20.eventEmitted($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, TableViewComponent_div_0_ng_template_10_Template, 16, 8, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Total: ", ctx_r0.filteredData.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("configuration", ctx_r0.configuration)("data", ctx_r0.filteredData)("columns", ctx_r0.columns);
} }
// import { stringify } from 'querystring';
var SortableColumn;
(function (SortableColumn) {
    SortableColumn["hp"] = "hp";
    SortableColumn["attack"] = "attack";
    SortableColumn["defense"] = "defense";
    SortableColumn["sp_attack"] = "sp_attack";
    SortableColumn["sp_defense"] = "sp_defense";
    SortableColumn["speed"] = "speed";
    SortableColumn["stat_total"] = "stat_total";
    SortableColumn["name"] = "name";
    SortableColumn["uid"] = "uid";
    SortableColumn["type1"] = "type1";
    SortableColumn["type2"] = "type2";
    SortableColumn["none"] = "none";
})(SortableColumn || (SortableColumn = {}));
class TableViewComponent {
    constructor(pokedexService, dialog, cdr) {
        this.pokedexService = pokedexService;
        this.dialog = dialog;
        this.cdr = cdr;
        this.dialogOpen = false;
        this.filteredData = [];
        this.lastSortedKey = '';
        this.lastSortedOrder = '';
        this._query = {
            condition: 'and',
            rules: [
            // { field: 'hp', operator: NumberOperators.leq, value: '32' },
            // {
            //   condition: 'or',
            //   rules: [
            //     {field: 'type', operator: NumberOperators.eq, value: PokeType.Fire},
            //     {field: 'type', operator: CategoryOperators.in, value: [PokeType.Grass, PokeType.Bug]},
            //   ]
            // }
            ]
        };
        this.configuration = Object.assign({}, ngx_easy_table__WEBPACK_IMPORTED_MODULE_4__.DefaultConfig);
        // this.configuration.threeWaySort = true;
        this.configuration.orderEventOnly = true;
        this.configuration.orderEnabled = true;
        // this.configuration.searchEnabled = true;
        // this.hpTemplate 
        // ... etc.
        this.columns = [
            { key: 'name', title: 'Name' },
            { key: 'uid', title: 'Id' },
            { key: 'type1', title: 'Type 1' },
            { key: 'type2', title: 'Type 2' },
            { key: 'stat_total', title: 'Total' },
            { key: 'hp', title: 'HP' },
            { key: 'attack', title: 'Attack' },
            { key: 'defense', title: 'Defense' },
            { key: 'sp_attack', title: 'Special Attack' },
            { key: 'sp_defense', title: 'Special Defense' },
            { key: 'speed', title: 'Speed' },
        ];
        this._pokedexService = pokedexService;
        this.filteredData = this._pokedexService.pokedex;
        this.sortedColumn = SortableColumn.none;
    }
    ngOnInit() {
        this.refreshTable();
    }
    openFilterTreeDialog() {
        this.filterButton.nativeElement.blur();
        if (!this.dialogOpen) {
            this.dialogOpen = true;
            let dialogRef = this.dialog.open(_filter_dialog_content_filter_dialog_content_component__WEBPACK_IMPORTED_MODULE_0__.FilterDialogContentComponent, {
                width: '550px',
                data: this.query,
                disableClose: false,
                hasBackdrop: true,
                autoFocus: false,
            });
            dialogRef.afterClosed().subscribe(result => {
                this.dialogOpen = false;
                this.query = result;
                // console.log("after close", this.query);
            });
        }
    }
    set query(result) {
        // TODO any protection or adjustments needed?
        if (result) {
            this._query = result;
            this.refreshTable();
            // this.filteredData = filterDataByQueryTree(this._pokedexService.pokedex, this.query);
        }
    }
    get query() {
        return this._query;
    }
    ngAfterViewInit() {
        //TODO: Subscribe to the dex service (specifically dex changed subject)
        this.pokedexService.dexChanges.subscribe(() => {
            if (this.pokedexService.pokedex.length > 0 && this.pokedexService.pokedex[0].special) {
                this.columns = [
                    { key: 'name', title: 'Name' },
                    { key: 'uid', title: 'Id' },
                    { key: 'type1', title: 'Type 1' },
                    { key: 'type2', title: 'Type 2' },
                    { key: 'stat_total', title: 'Total' },
                    { key: 'hp', title: 'HP' },
                    { key: 'attack', title: 'Attack' },
                    { key: 'defense', title: 'Defense' },
                    { key: 'special', title: 'Special' },
                    { key: 'speed', title: 'Speed' },
                ];
            }
            else {
                this.columns = [
                    { key: 'name', title: 'Name' },
                    { key: 'uid', title: 'Id' },
                    { key: 'type1', title: 'Type 1' },
                    { key: 'type2', title: 'Type 2' },
                    { key: 'stat_total', title: 'Total' },
                    { key: 'hp', title: 'HP' },
                    { key: 'attack', title: 'Attack' },
                    { key: 'defense', title: 'Defense' },
                    { key: 'sp_attack', title: 'Special Attack' },
                    { key: 'sp_defense', title: 'Special Defense' },
                    { key: 'speed', title: 'Speed' },
                ];
            }
            this.refreshTable();
        });
        //TODO: Subscribe to individual revelation
        this.pokedexService.individualChanges.subscribe(() => {
            this.refreshTable();
        });
        // if(this.pokedexService.validDexUploaded)
        //   this.pokedexService.dexChanges.next();
    }
    refreshTable() {
        // console.log('---------REFRESHED-------------')
        let initialdata = this.filterDataInitialPass();
        this.filteredData = (0,_queryUtility__WEBPACK_IMPORTED_MODULE_1__.filterDataByQueryTree)(initialdata, this.query);
        this.pokedexService.filterChanges.next(this.filteredData);
        this.sortTable();
    }
    filterDataInitialPass() {
        // If a Pokemon is revealed at all, show them in the table
        let res = this.pokedexService.pokedex.filter(mon => {
            return true;
            // return  mon.fully_revealed
            // ||      mon.abilities_revealed
            // ||      mon.stats_revealed 
            // ||      mon.type_revealed
            // ||      mon.bst_revealed;
        });
        return res;
    }
    rowClick(name) {
        if (name) {
            this._pokedexService.selectPokemon(name);
        }
    }
    eventEmitted($event) {
        if ($event.event === ngx_easy_table__WEBPACK_IMPORTED_MODULE_4__.Event.onOrder) {
            // console.log($event)
            const { key, order } = $event.value;
            this.lastSortedKey = key;
            this.lastSortedOrder = order;
            this.sortTable();
        }
    }
    sortTable() {
        if (!this.lastSortedKey)
            this.lastSortedKey = 'uid';
        if (!this.lastSortedOrder)
            this.lastSortedOrder = 'asc';
        this.filteredData = [...this.filteredData.sort((a, b) => {
                const getValue = (row) => {
                    var _a, _b, _c;
                    if (this.lastSortedKey === 'stat_total') {
                        return row.checkBSTRevealed() ? row.bst() : null;
                    }
                    if (['type1', 'type2'].includes(this.lastSortedKey)) {
                        return row.checkTypeRevealed() ? row[this.lastSortedKey] : null;
                    }
                    if (['name', 'uid'].includes(this.lastSortedKey)) {
                        return (_a = row[this.lastSortedKey]) !== null && _a !== void 0 ? _a : null;
                    }
                    if (row.get_stat) {
                        return (_b = row.get_stat(this.lastSortedKey)) !== null && _b !== void 0 ? _b : null;
                    }
                    return (_c = row[this.lastSortedKey]) !== null && _c !== void 0 ? _c : null;
                };
                const valA = getValue(a);
                const valB = getValue(b);
                const isHiddenA = valA === null || valA === '???' || valA === 0;
                const isHiddenB = valB === null || valB === '???' || valB === 0;
                // Push hidden values to bottom
                if (isHiddenA && !isHiddenB)
                    return 1;
                if (!isHiddenA && isHiddenB)
                    return -1;
                if (isHiddenA && isHiddenB)
                    return a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);
                // Normal sort
                if (typeof valA === 'string') {
                    return this.lastSortedOrder === 'asc'
                        ? valA.localeCompare(valB) || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name)
                        : valB.localeCompare(valA) || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);
                }
                return this.lastSortedOrder === 'asc'
                    ? valA - valB || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name)
                    : valB - valA || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);
            })];
    }
}
TableViewComponent.ɵfac = function TableViewComponent_Factory(t) { return new (t || TableViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_pokedex_service__WEBPACK_IMPORTED_MODULE_2__.PokedexService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef)); };
TableViewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: TableViewComponent, selectors: [["app-table-view"]], viewQuery: function TableViewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.tableTemplate = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.filterButton = _t.first);
    } }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "table-header"], [1, "filterButton", "openDialogButton", 3, "click"], ["filterButton", ""], [1, "material-icons"], [3, "configuration", "data", "columns", "event"], ["tableTemplate", ""], [3, "click"], [3, "click", 4, "ngFor", "ngForOf"], [1, "statsBar"], ["aria-valuenow", "row.get_stat(stat)", "aria-valuemin", "0", "aria-valuemax", "255", 1, "statsBarFill", "total"], [1, "overlayLabel"]], template: function TableViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, TableViewComponent_div_0_Template, 11, 4, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.pokedexService.validDexUploaded);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, ngx_easy_table__WEBPACK_IMPORTED_MODULE_4__.BaseComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf], styles: [".table-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 15px;\n  padding-left: 10px;\n  align-items: center;\n}\n.table-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: #e7e7e7;\n  color: #2c2c2c;\n}\n.table-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #cecece;\n  font-weight: 300;\n}\n.table-header[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  background-color: #9c9c9c;\n}\n.table-header[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%]:hover {\n  background-color: dimgray;\n}\n.table-header[_ngcontent-%COMP%]   button.disabled[_ngcontent-%COMP%] {\n  pointer-events: none;\n  cursor: default;\n}\n.table-header[_ngcontent-%COMP%]   i.material-icons[_ngcontent-%COMP%] {\n  color: #2c2c2c;\n}\n.statsBar[_ngcontent-%COMP%] {\n  box-sizing: content-box;\n  height: 30px;\n  position: relative;\n  background: #2e2e2e;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: inset 0 -1px 1px rgba(20, 9, 9, 0.3);\n}\n.statsBar[_ngcontent-%COMP%]   div.overlayLabel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  text-align: center;\n  width: 100%;\n  height: 30px;\n  display: table;\n}\n.statsBar[_ngcontent-%COMP%]   div.overlayLabel[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: table-cell;\n  mix-blend-mode: difference;\n  vertical-align: middle;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  border-top-right-radius: 1px;\n  border-bottom-right-radius: 1px;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  background-color: #2bc253;\n  background-image: linear-gradient(center bottom, #2bc253 37%, #54f054 69%);\n  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);\n  position: relative;\n  overflow: hidden;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.hp[_ngcontent-%COMP%] {\n  background-color: #a12828;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.attack[_ngcontent-%COMP%] {\n  background-color: #d8800c;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.defense[_ngcontent-%COMP%] {\n  background-color: #dfdb18;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.sp_attack[_ngcontent-%COMP%] {\n  background-color: #2b53c2;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.sp_defense[_ngcontent-%COMP%] {\n  background-color: #1faa1a;\n}\n.statsBar[_ngcontent-%COMP%]   .statsBarFill.speed[_ngcontent-%COMP%] {\n  background-color: #7d10a8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxlLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUpGO0FBS0U7RUFDRSx5QkFBQTtFQUNBLGNBVlc7QUFPZjtBQUlJO0VBQ0kseUJBQUE7RUFDQSxnQkFBQTtBQUZSO0FBSUk7RUFDSSx5QkFsQlk7QUFnQnBCO0FBR1E7RUFDSSx5QkFBQTtBQURaO0FBSUk7RUFDSSxvQkFBQTtFQUNBLGVBQUE7QUFGUjtBQU1FO0VBQ0ksY0E1QlM7QUF3QmY7QUFRQTtFQUNFLHVCQUFBO0VBQ0EsWUFyQ1k7RUFzQ1osa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnREFBQTtBQUxGO0FBTUU7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFqRFU7RUFrRFYsY0FBQTtBQUpKO0FBS0k7RUFDRSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0Esc0JBQUE7QUFITjtBQU1FO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSw0QkFBQTtFQUNBLCtCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsMEVBQUE7RUFDQSx5RkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFKSjtBQU1JO0VBQ0UseUJBQUE7QUFKTjtBQU1JO0VBQ0UseUJBQUE7QUFKTjtBQU1JO0VBQ0UseUJBQUE7QUFKTjtBQU1JO0VBQ0UseUJBQUE7QUFKTjtBQU1JO0VBQ0UseUJBQUE7QUFKTjtBQU1JO0VBQ0UseUJBQUE7QUFKTiIsImZpbGUiOiJ0YWJsZS12aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHN0YXRzSGVpZ2h0OiAzMHB4O1xyXG4kc2VsZWN0ZWRUYWJDb2xvciA6IHJnYigxNTYsIDE1NiwgMTU2KTtcclxuJHRhYkNvbG9yIDogcmdiKDIzMSwgMjMxLCAyMzEpO1xyXG4kdGFiRm9udENvbG9yOiByZ2IoNDQsIDQ0LCA0NCk7XHJcblxyXG4udGFibGUtaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgZ2FwOiAxNXB4O1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJ1dHRvbnsgXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjMxLCAyMzEsIDIzMSk7XHJcbiAgICBjb2xvcjogJHRhYkZvbnRDb2xvcjtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigkY29sb3I6ICR0YWJDb2xvciwgJGFtb3VudDogMTApO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgICB9XHJcbiAgICAmLnNlbGVjdGVkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2VsZWN0ZWRUYWJDb2xvcjtcclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2VuKCRjb2xvcjogJHNlbGVjdGVkVGFiQ29sb3IsICRhbW91bnQ6IDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAmLmRpc2FibGVkIHtcclxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGkubWF0ZXJpYWwtaWNvbnMge1xyXG4gICAgICBjb2xvcjogJHRhYkZvbnRDb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbi5zdGF0c0JhciB7XHJcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgaGVpZ2h0OiAkc3RhdHNIZWlnaHQ7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJhY2tncm91bmQ6IHJnYig0NiwgNDYsIDQ2KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDFweCByZ2JhKDIwLCA5LCA5LCAwLjMpO1xyXG4gIGRpdi5vdmVybGF5TGFiZWwge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAkc3RhdHNIZWlnaHQ7XHJcbiAgICBkaXNwbGF5OiB0YWJsZTtcclxuICAgIHNwYW4ge1xyXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xyXG4gICAgICBtaXgtYmxlbmQtbW9kZTogZGlmZmVyZW5jZTtcclxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIH1cclxuICB9XHJcbiAgLnN0YXRzQmFyRmlsbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMXB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNDMsIDE5NCwgODMpO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KGNlbnRlciBib3R0b20sIHJnYig0MywgMTk0LCA4MykgMzclLCByZ2IoODQsIDI0MCwgODQpIDY5JSk7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA5cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpLCBpbnNldCAwIC0ycHggNnB4IHJnYmEoMCwgMCwgMCwgMC40KTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gICAgJi5ocCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNjEsIDQwLCA0MCk7XHJcbiAgICB9XHJcbiAgICAmLmF0dGFjayB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTYsIDEyOCwgMTIpO1xyXG4gICAgfVxyXG4gICAgJi5kZWZlbnNlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMywgMjE5LCAyNCk7XHJcbiAgICB9XHJcbiAgICAmLnNwX2F0dGFjayB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig0MywgODMsIDE5NCk7XHJcbiAgICB9XHJcbiAgICAmLnNwX2RlZmVuc2Uge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEsIDE3MCwgMjYpO1xyXG4gICAgfVxyXG4gICAgJi5zcGVlZCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjUsIDE2LCAxNjgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 4044:
/*!************************************!*\
  !*** ./src/app/pokedex.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PokedexService": () => (/* binding */ PokedexService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1555);
/* harmony import */ var _Pokemon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pokemon */ 5328);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);

// import { readFile, readFileSync } from 'fs';

// import SampleJson from '../assets/data/main_collection.json';


// import * as gen7data from '../assets/data/gen7vantest.json';
// import * as gen6data from '../assets/data/gen6vantest.json';
// import * as gen5data from '../assets/data/gen5vantest.json';
// import * as gen4data from '../assets/data/gen4vantest.json';
// import * as gen3data from '../assets/data/gen3vantest.json';
// import * as gen2data from '../assets/data/gen2vantest.json';
// import * as gen1data from '../assets/data/gen1vantest.json';
class PokedexService {
    constructor() {
        this.pokedex = [];
        this.pokedexByName = new Map();
        this.validDexUploaded = false;
        this.isLoaded = false;
        this.dexChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.individualChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.monSelection = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.filterChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.v = 3;
        this.loadedFile = '';
        this.isFullyRevealed = false;
        this.allBSTRevealed = false;
        this.allTypesRevealed = false;
        this.allAbilitiesRevealed = false;
        this.allEvolutionsRevealed = false;
        this.allMovesRevealed = false;
        this.revealedTMs = [];
        this.tmIds = [];
        this.hmIds = [];
        this.tmMoves = [];
        this.hmMoves = [];
        this.starters = [];
        this.defaultPkdxName = './assets/data/Default.pkdx';
        this.sampleRandomPkdxName = './assets/data/Random.pkdx';
        //TODO: THIS MUST BE COMMENTED OUT BEFORE PRODUCTION
        window.dex = this;
    }
    readSelectedFile(inputFile) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let reader = new FileReader();
            this.v = 4;
            reader.onload = (e) => {
                this.parseFile(reader.result ? reader.result.toString() : '');
                this.loadedFile = inputFile.name;
            };
            reader.onerror = (e) => {
                alert('There was a problem reading the file you selected. You may need to refresh the page.');
                console.log(reader.error);
            };
            reader.readAsText(inputFile);
        });
    }
    parseFile(fileString) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (fileString.length) {
                try {
                    if (fileString.startsWith('Randomizer Version:')) {
                        yield this.parseLogFile(fileString);
                    }
                    else {
                        this.parseSaveFile(fileString);
                    }
                }
                catch (err) {
                    alert("There was a problem reading the file you uploaded:" + err);
                }
            }
            else {
                this.validDexUploaded = false;
                alert("The file didn't load properly");
            }
        });
    }
    /**
     * Parse a log file from the Universal Pokemon Randomizer.
     * TODO: add location/move information and create a factory method in the
     * Pokemon list
     * @param log
     * @returns
     */
    parseLogFile(log) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const blocks = log.split('\r\n\r\n');
            let pokeStrings = [];
            let evoStrings = [];
            let tmStrings = [];
            let moveStrings = [];
            let tmCompStrings = [];
            let starterStrings = [];
            let defaultData;
            for (const block of blocks) {
                const lines = block.trim().split('\r\n');
                const firstLine = lines[0];
                const label = firstLine.startsWith('-') ? firstLine.split('--')[1] : firstLine.split(':')[0];
                switch (label) {
                    case 'Randomized Evolutions':
                        evoStrings = lines.slice(1);
                        break;
                    case 'Pokemon Base Stats & Types':
                        pokeStrings = lines.slice(1);
                        break;
                    case 'TM Moves':
                        tmStrings = lines.slice(1);
                        break;
                    case 'Pokemon Movesets': // Only the first Pokemon Moveset Block meets this description (Bulbasaur)
                        if (block.indexOf('\r\n') >= 0)
                            moveStrings.push(block.slice(block.indexOf('\r\n') + 2));
                        break;
                    case 'TM Compatibility':
                        tmCompStrings = lines.slice(1);
                        break;
                    case 'Random Starters':
                        starterStrings = lines.slice(1);
                        break;
                    default: //All other Pokemon Movesets appear as their own independent blocks.
                        if (firstLine.match(/\d{3} .* ->/) && !firstLine.startsWith('Set')) {
                            moveStrings.push(block);
                        }
                        break;
                }
            }
            if (pokeStrings.length == 0 || evoStrings.length == 0 || moveStrings.length == 0 || tmCompStrings.length == 0) {
                defaultData = yield this.getDefaultGenData(blocks);
            }
            //TODO: all of these things may need to occur after a quick file read.
            this.buildDex(pokeStrings, evoStrings, tmCompStrings, moveStrings, tmStrings, starterStrings, defaultData);
            this.resetSpoils();
            this.validDexUploaded = true;
            this.dexChanges.next();
            if (this.pokedex.length > 0) {
                this.selectPokemon(this.pokedex[0].name);
            }
            return;
        });
    }
    resetSpoils() {
        this.allAbilitiesRevealed = false;
        this.allBSTRevealed = false;
        this.allTypesRevealed = false;
        this.isFullyRevealed = false;
        this.allMovesRevealed = false;
        this.revealedTMs = [];
        this.allEvolutionsRevealed = false;
    }
    // TODO: Potentially move to Pokemon.ts as a static method
    buildDex(pokeStrings, evoStrings, tmCompStrings, moveStrings, tmStrings, starterStrings, defaultData) {
        var _a;
        let res = [];
        let labels = '';
        if (pokeStrings) {
            labels = pokeStrings[0];
        }
        //Create List and add Base Stats
        for (const pokeString of pokeStrings.slice(1)) {
            let new_mon = new _Pokemon__WEBPACK_IMPORTED_MODULE_0__.Pokemon();
            new_mon.setBasicStats(pokeString, labels);
            //If this is an alt form, set UID to original mon
            if (new_mon.name.indexOf('-') !== -1
                && res.find(mon => new_mon.name.indexOf(mon.name) !== -1)
                && !new_mon.name.toLowerCase().includes('porygon')) {
                let base_forme = res.find(mon => new_mon.name.indexOf(mon.name) !== -1);
                new_mon.uid = base_forme.uid;
                !(base_forme.forms.includes(base_forme.name)) && base_forme.forms.push(base_forme.name);
                base_forme.forms.push(new_mon.name);
                new_mon.forms = base_forme.forms;
                new_mon.form_num = new_mon.forms.length - 1;
            }
            res.push(new_mon);
        }
        if (pokeStrings.length == 0 && defaultData) {
            //TODO: add an entry to res for every pokemon in the default list
            for (let [n, mon] of defaultData.entries()) {
                let new_mon = new _Pokemon__WEBPACK_IMPORTED_MODULE_0__.Pokemon();
                new_mon.setBasicStatsFromObject(mon);
                res.push(new_mon);
            }
        }
        //Add to Dictionary for access by name
        this.pokedex = res;
        for (let mon of res) {
            this.pokedexByName.set(mon.name, mon);
        }
        //Evolutions
        for (let evString of evoStrings) {
            const names = evString.split(/->|,| and /).map(s => s.trim());
            for (let name of names) {
                (_a = this.pokedexByName.get(name)) === null || _a === void 0 ? void 0 : _a.addEvolution(evString);
            }
        }
        if (evoStrings.length == 0 && defaultData) {
            for (let mon of this.pokedex) {
                mon.setEvolutionsFromObject(defaultData.get(mon.name), this.pokedexByName);
            }
        }
        //Level Up Moves
        for (let moveString of moveStrings) {
            let mon_name = moveString.substring(4, moveString.indexOf('->') - 1);
            let mon = this.pokedexByName.get(mon_name);
            if (mon) {
                for (let level_line of moveString.split('\r\n')) {
                    if (level_line.match(/Level[ \da-zA-Z:]*/)) {
                        let level = level_line.split(/[ :]/)[1].trim();
                        let move_name = level_line.split(':')[1].trim();
                        let move = { level: +level, move: move_name };
                        mon.learn_levels.push(move.level);
                        mon.learned_moves.push(move.move);
                    }
                }
            }
        }
        if (moveStrings.length == 0 && defaultData) {
            for (let mon of this.pokedex) {
                mon.setMovesFromObject(defaultData.get(mon.name));
            }
        }
        let parseMoveMachineString = (token) => {
            let match = token.match(/\d+/);
            let machineId = parseInt(match ? match[0] : '0');
            let move = token.slice(token.indexOf(' ')).trim();
            return [machineId, move];
        };
        //TMS and Compatibility
        let dexHmTokens = [];
        for (let tmCompString of tmCompStrings) {
            let mon_name = tmCompString.slice(0, tmCompString.indexOf('|')).trim();
            mon_name = mon_name.slice(mon_name.indexOf(' ')).trim();
            let mon = this.pokedexByName.get(mon_name);
            let tmHmTokens = tmCompString.split('|').map(s => s.trim()).filter(s => s.startsWith('TM') || s.startsWith('HM'));
            let tmTokens = tmHmTokens.filter(s => s.startsWith('TM'));
            let hmTokens = tmHmTokens.filter(s => s.startsWith('HM'));
            if (mon) {
                for (let tmString of tmTokens) {
                    let [tm, move] = parseMoveMachineString(tmString);
                    mon.tms.push(tm);
                    mon.tm_moves.push(move);
                }
                for (let hmString of hmTokens) {
                    let [hm, move] = parseMoveMachineString(hmString);
                    mon.hms.push(hm);
                    mon.hm_moves.push(move);
                    !(dexHmTokens.includes(hmString)) && dexHmTokens.push(hmString);
                }
            }
        }
        if (tmCompStrings.length == 0 && defaultData) {
            if (tmStrings.length > 0) {
                let tm_moves = [''];
                tm_moves = tm_moves.concat(tmStrings.map(line => line.match(/TM\d+ (.*)/) ? line.match(/TM\d+ (.*)/)[1] : ''));
                for (let mon of this.pokedex) {
                    mon.setTMMovesFromObject(defaultData.get(mon.name), tm_moves);
                }
            }
            else {
                for (let mon of this.pokedex) {
                    mon.setTMMovesFromObject(defaultData.get(mon.name));
                }
            }
        }
        //Add TMs and HMs to the world dex
        this.tmIds = [];
        this.tmMoves = [];
        this.hmIds = [];
        this.hmMoves = [];
        for (let tmString of tmStrings) {
            let [tm, move] = parseMoveMachineString(tmString);
            this.tmIds.push(tm);
            this.tmMoves.push(move);
        }
        dexHmTokens.sort();
        for (let hmString of dexHmTokens) {
            let [hm, move] = parseMoveMachineString(hmString);
            this.hmIds.push(hm);
            this.hmMoves.push(move);
        }
        //Grab Starters (if present) and add to the world dex
        this.starters = [];
        for (let starterString of starterStrings) {
            let starter = starterString.trim().split(' ').pop();
            if (starter)
                this.starters.push(starter);
        }
    }
    parseSaveFile(save_data) {
        var _a, _b, _c, _d, _e;
        try {
            const save_obj = JSON.parse(save_data);
            this.pokedex = save_obj.pokedex.map((mon_data) => _Pokemon__WEBPACK_IMPORTED_MODULE_0__.Pokemon.loadFromJson(mon_data));
            this.isFullyRevealed = save_obj.full;
            this.allBSTRevealed = save_obj.bsts;
            this.allTypesRevealed = save_obj.types;
            this.allAbilitiesRevealed = save_obj.full;
            this.allEvolutionsRevealed = save_obj.evolutions;
            this.revealedTMs = save_obj.tms;
            this.tmIds = (_a = save_obj.tmIds) !== null && _a !== void 0 ? _a : [];
            this.hmIds = (_b = save_obj.hmIds) !== null && _b !== void 0 ? _b : [];
            this.tmMoves = (_c = save_obj.tmMoves) !== null && _c !== void 0 ? _c : [];
            this.hmMoves = (_d = save_obj.hmMoves) !== null && _d !== void 0 ? _d : [];
            this.starters = (_e = save_obj.starters) !== null && _e !== void 0 ? _e : [];
            this.allMovesRevealed = save_obj.moves;
            this.validDexUploaded = true;
            this.dexChanges.next();
            if (this.pokedex.length > 0) {
                this.selectPokemon(this.pokedex[0].name);
            }
        }
        catch (_f) {
            alert("Bad File Uploaded (have you checked your .pkdx?)");
        }
    }
    loadDefaultData() {
        // console.log("Loading Default")
        return fetch(this.defaultPkdxName)
            .then(res => res.text())
            .then(text => {
            this.parseFile(text);
            this.loadedFile = this.defaultPkdxName;
        });
    }
    loadSampleRandomData() {
        return fetch(this.sampleRandomPkdxName)
            .then(res => res.text())
            .then(text => {
            this.parseFile(text);
            this.loadedFile = this.sampleRandomPkdxName;
        });
    }
    getDefaultGenData(logBlocks) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            //TODO: Get gen from logBlocks[-2]
            let gen = this.getGenerationFromLog(logBlocks);
            try {
                const saveObj = yield fetch(`./assets/data/gen${gen}vantest.json`)
                    .then(res => {
                    if (!res.ok)
                        throw new Error(`Failed to load: ${res.status}`);
                    return res.json();
                });
                let defaultDexList = saveObj.pokedex;
                let res = new Map();
                for (let mon of defaultDexList) {
                    res.set(mon.name, mon);
                }
                return res;
            }
            catch (err) {
                console.error('Error loading JSON:', err);
                return new Map();
            }
        });
    }
    getGenerationFromLog(logBlocks) {
        let completion = logBlocks.find(s => s.trim().startsWith('----------------'));
        if (completion) {
            let match = completion.match(/of (.*?) completed/);
            if (match) {
                let title = match[1].toLowerCase();
                if ((title.includes('red') && !title.includes('fire'))
                    || (title.includes('green') && !title.includes('leaf'))
                    || (title.includes('blue'))
                    || (title.includes('yellow'))) {
                    return '1';
                }
                else if ((title.includes('gold') && !title.includes('heart'))
                    || (title.includes('silver') && !title.includes('soul'))
                    || (title.includes('crystal'))) {
                    return '2';
                }
                else if ((title.includes('ruby') && !title.includes('omega'))
                    || (title.includes('sapphire') && !title.includes('alpha'))
                    || (title.includes('emerald'))
                    || (title.includes('red'))
                    || (title.includes('green'))) {
                    return '3';
                }
                else if ((title.includes('diamond') && !title.includes('brilliant'))
                    || (title.includes('pearl') && !title.includes('shining'))
                    || (title.includes('platinum'))
                    || (title.includes('silver'))
                    || (title.includes('gold'))) {
                    return '4';
                }
                else if ((title.includes('black'))
                    || (title.includes('white'))) {
                    return '5';
                }
                else if ((title.includes('pokemon x'))
                    || (title.includes('pokemon y'))
                    || (title.includes('ruby'))
                    || (title.includes('sapphire'))) {
                    return '6';
                }
                else if ((title.includes('sun'))
                    || (title.includes('moon'))) {
                    return '7';
                }
                else {
                    return '7';
                }
            }
        }
        return '7';
    }
    // This may be useful when integrating all the views w/ this service
    updatePokemonList(newList) {
        if (newList.length) {
            this.pokedex = newList;
            //Inform our subscribers that the dex has changed
            this.dexChanges.next();
        }
    }
    revealAll() {
        for (let mon of this.pokedex) {
            mon.fully_revealed = true;
        }
        this.isFullyRevealed = true;
        this.dexChanges.next();
    }
    hideAll() {
        for (let mon of this.pokedex) {
            mon.fully_revealed = false;
        }
        this.isFullyRevealed = false;
        this.dexChanges.next();
    }
    revealAbilities() {
        for (let mon of this.pokedex) {
            mon.abilities_revealed = true;
        }
        this.allAbilitiesRevealed = true;
        this.dexChanges.next();
    }
    hideAbilities() {
        for (let mon of this.pokedex) {
            mon.abilities_revealed = false;
        }
        this.allAbilitiesRevealed = false;
        this.dexChanges.next();
    }
    revealTypes() {
        for (let mon of this.pokedex) {
            mon.type_revealed = true;
        }
        this.allTypesRevealed = true;
        this.dexChanges.next();
    }
    hideTypes() {
        for (let mon of this.pokedex) {
            mon.type_revealed = false;
        }
        this.allTypesRevealed = false;
        this.dexChanges.next();
    }
    revealBSTs() {
        for (let mon of this.pokedex) {
            mon.bst_revealed = true;
        }
        this.allBSTRevealed = true;
        this.dexChanges.next();
    }
    hideBSTs() {
        for (let mon of this.pokedex) {
            mon.bst_revealed = false;
        }
        this.allBSTRevealed = false;
        this.dexChanges.next();
    }
    hideEvolutions() {
        for (let mon of this.pokedex) {
            mon.next_evos_revealed = [];
            mon.prev_evos_revealed = [];
        }
        this.allEvolutionsRevealed = false;
        this.dexChanges.next();
    }
    revealEvolutions() {
        for (let mon of this.pokedex) {
            mon.next_evos.forEach((e, i) => mon.next_evos_revealed.push(i));
            mon.prev_evos.forEach((e, i) => mon.prev_evos_revealed.push(i));
        }
        this.allEvolutionsRevealed = true;
        this.dexChanges.next();
    }
    revealMoves() {
        for (let mon of this.pokedex) {
            mon.learned_moves_revealed_idx = 100;
            mon.tms.forEach((tm, i) => {
                if (!this.revealedTMs.includes(tm))
                    this.revealedTMs.push(tm);
                if (!mon.tm_indexes_learned.includes(i))
                    mon.tm_indexes_learned.push(i);
            });
        }
        this.allMovesRevealed = true;
        this.dexChanges.next();
    }
    hideMoves() {
        for (let mon of this.pokedex) {
            mon.learned_moves_revealed_idx = 0;
            mon.tm_indexes_learned = [];
        }
        this.revealedTMs = [];
        this.allMovesRevealed = false;
        this.dexChanges.next();
    }
    hideTMForAll(tm) {
        for (let mon of this.pokedex) {
            mon.hideTM(tm);
        }
        if (this.revealedTMs.includes(tm)) {
            this.revealedTMs.splice(this.revealedTMs.indexOf(tm), 1);
        }
        this.dexChanges.next();
    }
    revealTMForAll(tm) {
        for (let mon of this.pokedex) {
            mon.revealTM(tm);
        }
        if (!this.revealedTMs.includes(tm)) {
            this.revealedTMs.push(tm);
        }
        this.dexChanges.next();
    }
    updatePokemon(mon) {
        this.individualChanges.next(mon);
    }
    selectPokemon(name) {
        this.monSelection.next(name);
    }
}
PokedexService.ɵfac = function PokedexService_Factory(t) { return new (t || PokedexService)(); };
PokedexService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: PokedexService, factory: PokedexService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map