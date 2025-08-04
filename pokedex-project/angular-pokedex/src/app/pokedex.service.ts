import { JsonPipe } from '@angular/common';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
// import { readFile, readFileSync } from 'fs';
import { Observable, Subject, ReplaySubject } from 'rxjs';
// import SampleJson from '../assets/data/main_collection.json';
import { Pokemon, learned_move, tm_move, PokeType } from './Pokemon';
// import * as gen7data from '../assets/data/gen7vantest.json';
// import * as gen6data from '../assets/data/gen6vantest.json';
// import * as gen5data from '../assets/data/gen5vantest.json';
// import * as gen4data from '../assets/data/gen4vantest.json';
// import * as gen3data from '../assets/data/gen3vantest.json';
// import * as gen2data from '../assets/data/gen2vantest.json';
// import * as gen1data from '../assets/data/gen1vantest.json';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public pokedex: Pokemon[] = [];
  public pokedexByName = new Map<string, Pokemon>();
  public validDexUploaded = false;
  public isLoaded = false;
  public dexChanges = new Subject<any>();
  public individualChanges = new Subject<Pokemon>();
  public monSelection = new ReplaySubject<string>(1);
  public filterChanges = new ReplaySubject<Pokemon[]>(1);
  private v = 3;
  loadedFile: string = '';
  isFullyRevealed = false;
  allBSTRevealed = false;
  allTypesRevealed = false;
  allAbilitiesRevealed = false;
  allEvolutionsRevealed = false;
  allMovesRevealed: boolean = false;
  revealedTMs: number[] = [];
  tmIds: number[] = [];
  hmIds: number[] = [];
  tmMoves: string[] = [];
  hmMoves: string[] = [];
  starters: string[] = [];
  defaultPkdxName = '/assets/data/Default.pkdx';
  sampleRandomPkdxName = '/assets/data/Random.pkdx';

  constructor() {

    //TODO: THIS MUST BE COMMENTED OUT BEFORE PRODUCTION
    // (window as any).dex = this;
  }

  public async readSelectedFile(inputFile: File) {
    let reader = new FileReader();
    this.v = 4;
    reader.onload = (e) => {
      this.parseFile(reader.result ? reader.result.toString() : '')
      this.loadedFile = inputFile.name;
    }
    reader.onerror = (e) => {
      alert('There was a problem reading the file you selected. You may need to refresh the page.')
      console.log(reader.error)
    }
    reader.readAsText(inputFile)
  }

  private async parseFile(fileString: string) {
    if (fileString.length) {
      try {
        if (fileString.startsWith('Randomizer Version:')) {
          await this.parseLogFile(fileString)
        } else {
          this.parseSaveFile(fileString)
        }
      } catch (err) {
        alert("There was a problem reading the file you uploaded:" + err);
      }
    } else {
      this.validDexUploaded = false;
      alert("The file didn't load properly")
    }
  }

  /**
   * Parse a log file from the Universal Pokemon Randomizer.
   * TODO: add location/move information and create a factory method in the 
   * Pokemon list
   * @param log 
   * @returns 
   */
  private async parseLogFile(log: string) {
    const blocks = log.split('\r\n\r\n');

    let pokeStrings: string[] = [];
    let evoStrings: string[] = [];
    let tmStrings: string[] = [];
    let moveStrings: string[] = [];
    let tmCompStrings: string[] = [];
    let starterStrings: string[] = [];
    let defaultData: Map<string, any>|undefined;

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
          if(block.indexOf('\r\n')>=0)
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
            moveStrings.push(block)
          }
          break;
      }
    }

    if(pokeStrings.length == 0 || evoStrings.length == 0 || moveStrings.length == 0 || tmCompStrings.length == 0) { 
      defaultData = await this.getDefaultGenData(blocks)
    }


    //TODO: all of these things may need to occur after a quick file read.
    this.buildDex(pokeStrings, evoStrings, tmCompStrings, moveStrings, tmStrings, starterStrings, defaultData);
    this.resetSpoils();
    this.validDexUploaded=true;
    this.dexChanges.next();    
    if(this.pokedex.length>0) {
      this.selectPokemon(this.pokedex[0].name)
    }
    return;
  }

  private resetSpoils() {
    this.allAbilitiesRevealed = false;
    this.allBSTRevealed = false;
    this.allTypesRevealed = false;
    this.isFullyRevealed = false;
    this.allMovesRevealed = false;
    this.revealedTMs = [];
    this.allEvolutionsRevealed = false;
  }

  // TODO: Potentially move to Pokemon.ts as a static method
  buildDex(pokeStrings: string[], evoStrings: string[], tmCompStrings: string[], moveStrings: string[], tmStrings: string[], starterStrings: string[], defaultData: Map<string, any> | undefined) {
    let res: Pokemon[] = [];
    let labels = '';
    if(pokeStrings) {
      labels = pokeStrings[0];
    } 

    //Create List and add Base Stats
    for (const pokeString of pokeStrings.slice(1)) {
      let new_mon = new Pokemon();
      new_mon.setBasicStats(pokeString, labels);
      //If this is an alt form, set UID to original mon
      if (new_mon.name.indexOf('-') !== -1
        && res.find(mon => new_mon.name.indexOf(mon.name) !== -1)
        && !new_mon.name.toLowerCase().includes('porygon')) {
        let base_forme = res.find(mon => new_mon.name.indexOf(mon.name) !== -1);
        new_mon.uid = base_forme!.uid;
        !(base_forme!.forms.includes(base_forme!.name)) && base_forme!.forms.push(base_forme!.name)
        base_forme!.forms.push(new_mon.name);
        new_mon.forms = base_forme!.forms;
        new_mon.form_num = new_mon.forms.length - 1;
      }
      res.push(new_mon)
    }
    if (pokeStrings.length == 0 && defaultData) {
      //TODO: add an entry to res for every pokemon in the default list
      for(let [n, mon] of defaultData.entries()) {
        let new_mon = new Pokemon();
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
        this.pokedexByName.get(name)?.addEvolution(evString);
      }
    }
    if(evoStrings.length == 0 && defaultData) {
      for(let mon of this.pokedex) {
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
            let move = { level: +level, move: move_name } as learned_move;
            mon.learn_levels.push(move.level);
            mon.learned_moves.push(move.move);
          }
        }
      }
    }
    if(moveStrings.length==0 && defaultData) {
      for(let mon of this.pokedex) {
        mon.setMovesFromObject(defaultData.get(mon.name));
      }
    }

    let parseMoveMachineString = (token: string): [number, string] => {
      let match = token.match(/\d+/);
      let machineId = parseInt(match?match[0]:'0');
      let move = token.slice(token.indexOf(' ')).trim();
      return [machineId, move];
    }

    //TMS and Compatibility
    let dexHmTokens: string[] = [];
    for (let tmCompString of tmCompStrings) {
      let mon_name = tmCompString.slice(0,tmCompString.indexOf('|')).trim()
      mon_name=mon_name.slice(mon_name.indexOf(' ')).trim();
      let mon = this.pokedexByName.get(mon_name)
      let tmHmTokens = tmCompString.split('|').map(s => s.trim()).filter(s=>s.startsWith('TM') || s.startsWith('HM'));
      let tmTokens = tmHmTokens.filter(s=>s.startsWith('TM'));
      let hmTokens = tmHmTokens.filter(s=>s.startsWith('HM'));
      if(mon) {
        for(let tmString of tmTokens) {
          let [tm, move] = parseMoveMachineString(tmString);
          mon.tms.push(tm)
          mon.tm_moves.push(move)
        }
        for(let hmString of hmTokens) {
          let [hm, move] = parseMoveMachineString(hmString);
          mon.hms.push(hm)
          mon.hm_moves.push(move)
          !(dexHmTokens.includes(hmString)) && dexHmTokens.push(hmString)
        }
      }
    }
    if(tmCompStrings.length == 0 && defaultData) {
      if(tmStrings.length > 0) {
        let tm_moves = ['']
        tm_moves = tm_moves.concat(tmStrings.map(line => line.match(/TM\d+ (.*)/) ? line.match(/TM\d+ (.*)/)![1]: ''))
        for(let mon of this.pokedex) {
          mon.setTMMovesFromObject(defaultData.get(mon.name), tm_moves);
        }
      }
    }

    //Add TMs and HMs to the world dex
    this.tmIds = [];
    this.tmMoves = [];
    this.hmIds = [];
    this.hmMoves = [];
    for(let tmString of tmStrings) {
      let [tm, move] = parseMoveMachineString(tmString);
      this.tmIds.push(tm);
      this.tmMoves.push(move);
    }
    dexHmTokens.sort()
    for(let hmString of dexHmTokens) {
      let [hm, move] = parseMoveMachineString(hmString);
      this.hmIds.push(hm);
      this.hmMoves.push(move);
    }

    //Grab Starters (if present) and add to the world dex
    this.starters = [];
    for(let starterString of starterStrings) {
      let starter = starterString.trim().split(' ').pop()
      if(starter)
        this.starters.push(starter);
    }
  }

  private parseSaveFile(save_data: string) {
    try {
      const save_obj = JSON.parse(save_data);
      this.pokedex = save_obj.pokedex.map(
        (mon_data: any) => Pokemon.loadFromJson(mon_data)
      )
      this.isFullyRevealed = save_obj.full;
      this.allBSTRevealed = save_obj.bsts;
      this.allTypesRevealed = save_obj.types;
      this.allAbilitiesRevealed = save_obj.full;
      this.allEvolutionsRevealed = save_obj.evolutions;
      this.revealedTMs = save_obj.tms;
      this.tmIds = save_obj.tmIds ?? [];
      this.hmIds = save_obj.hmIds ?? [];
      this.tmMoves = save_obj.tmMoves ?? [];
      this.hmMoves = save_obj.hmMoves ?? [];
      this.starters = save_obj.starters ?? [];
      this.allMovesRevealed = save_obj.moves;    
      this.validDexUploaded=true;
      this.dexChanges.next();
      if(this.pokedex.length>0) {
        this.selectPokemon(this.pokedex[0].name)
      }
    } catch {
      alert("Bad File Uploaded (have you checked your .pkdx?)")
    }
  }

  public loadDefaultData(): Promise<any> {
    // console.log("Loading Default")
    return fetch(this.defaultPkdxName)
      .then(res => res.text())
      .then(text => {
        this.parseFile(text);
        this.loadedFile = this.defaultPkdxName;
      });
  }

  public loadSampleRandomData(): Promise<any> {
    return fetch(this.sampleRandomPkdxName)
      .then(res => res.text())
      .then(text => {
        this.parseFile(text);
        this.loadedFile = this.sampleRandomPkdxName;
      })
  }

  private async getDefaultGenData(logBlocks: string[]): Promise<Map<string, any>> {
    //TODO: Get gen from logBlocks[-2]
    let gen = this.getGenerationFromLog(logBlocks);
    try {
      const saveObj = await fetch(`/assets/data/gen${gen}vantest.json`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
          return res.json();
        });
      let defaultDexList: any[] = saveObj.pokedex;
      let res = new Map<string, any>();
      for (let mon of defaultDexList) {
        res.set(mon.name, mon);
      }
      return res;
    } catch (err) {
      console.error('Error loading JSON:', err);
      return new Map<string, any>();
    }
  }

  private getGenerationFromLog(logBlocks: string[]): string {
    let completion = logBlocks.find(s=>s.trim().startsWith('----------------'))
    if(completion) {
      let match = completion.match(/of (.*?) completed/);
      if(match) {
        let title = match[1].toLowerCase();
        if(    (title.includes('red') && !title.includes('fire'))
            || (title.includes('green') && !title.includes('leaf'))
            || (title.includes('blue'))
            || (title.includes('yellow'))
          ) {
          return '1';
        } else if(    
               (title.includes('gold') && !title.includes('heart'))
            || (title.includes('silver') && !title.includes('soul'))
            || (title.includes('crystal'))
          ) {
          return '2';
        } else if(    
               (title.includes('ruby') && !title.includes('omega'))
            || (title.includes('sapphire') && !title.includes('alpha'))
            || (title.includes('emerald'))
            || (title.includes('red'))
            || (title.includes('green'))
          ) {
          return '3';
        } else if(    
               (title.includes('diamond') && !title.includes('brilliant'))
            || (title.includes('pearl') && !title.includes('shining'))
            || (title.includes('platinum'))
            || (title.includes('silver'))
            || (title.includes('gold'))
          ) {
          return '4';
        } else if(    
               (title.includes('black'))
            || (title.includes('white'))
          ) {
          return '5';
        } else if(    
               (title.includes('pokemon x'))
            || (title.includes('pokemon y'))
            || (title.includes('ruby'))
            || (title.includes('sapphire'))
          ) {
          return '6';
        } else if(    
               (title.includes('sun'))
            || (title.includes('moon'))
          ) {
          return '7';
        } else {
          return '7';
        }
      }
    }
    return '7';
  }

  // This may be useful when integrating all the views w/ this service
  private updatePokemonList(newList: Pokemon[]) {
    if (newList.length) {
      this.pokedex = newList;
      //Inform our subscribers that the dex has changed
      this.dexChanges.next();
    }
  }

  public revealAll() {
    for (let mon of this.pokedex) {
      mon.fully_revealed = true;
    }
    this.isFullyRevealed = true;
    this.dexChanges.next();
  }

  public hideAll() {
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
        if(!this.revealedTMs.includes(tm))
          this.revealedTMs.push(tm);
        if(!mon.tm_indexes_learned.includes(i))
          mon.tm_indexes_learned.push(i);
      })
    }
    this.allMovesRevealed=true;
    this.dexChanges.next();
  }

  hideMoves() {
    for(let mon of this.pokedex) {
      mon.learned_moves_revealed_idx = 0;
      mon.tm_indexes_learned = [];
    }
    this.revealedTMs = []
    this.allMovesRevealed=false;
    this.dexChanges.next();
  }
  
  hideTMForAll(tm: number) {
    for(let mon of this.pokedex) {
      mon.hideTM(tm);
    }
    if(this.revealedTMs.includes(tm)) {
      this.revealedTMs.splice(this.revealedTMs.indexOf(tm), 1);
    }
    this.dexChanges.next();
  }

  revealTMForAll(tm: number) {
    for(let mon of this.pokedex) {
      mon.revealTM(tm);
    }
    if(!this.revealedTMs.includes(tm)) {
      this.revealedTMs.push(tm);
    }
    this.dexChanges.next();
  }

  public updatePokemon(mon: Pokemon) {
    this.individualChanges.next(mon);
  }

  public selectPokemon(name: string) {
    this.monSelection.next(name);
  }

}