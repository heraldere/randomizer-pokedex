import { JsonPipe } from '@angular/common';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
// import { readFile, readFileSync } from 'fs';
import { Observable, Subject } from 'rxjs';
// import SampleJson from '../assets/data/main_collection.json';
import { Pokemon, learned_move, tm_move, PokeType } from './Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {


  public pokedex: Pokemon[] = [];
  public pokedexByName = new Map<string, Pokemon>();
  public validDexUploaded = false;
  public dexChanges = new Subject<any>();
  public individualChanges = new Subject<Pokemon>();
  private v = 3;
  loadedFile: string = '';
  isFullyRevealed = false;
  allBSTRevealed = false;
  allTypesRevealed = false;
  allAbilitiesRevealed = false;

  constructor() {
    // this.getPokemonList();

    //TODO: THIS MUST BE COMMENTED OUT BEFORE PRODUCTION
    // (window as any).dex_service = this;
  }

  /**
   * Gets the default pokemon list loaded into the service.
   * TODO: Deprecate this and either start with a) no list or b) a list of
   * actual pokemon objects
   */
  // private getPokemonList() {
  //   this.pokedex = Object.values(SampleJson).map((pokeJson) => {
  //     return {
  //       name: pokeJson.name,
  //       pokedex_num: Number.parseInt(pokeJson.long_id),
  //       uid: pokeJson.long_id,

  //       stat_total: Number.parseInt(pokeJson.stat_total),
  //       hp: Number.parseInt(pokeJson.hp),
  //       attack: Number.parseInt(pokeJson.attack),
  //       defense: Number.parseInt(pokeJson.defense),
  //       sp_attack: Number.parseInt(pokeJson.sp_attack),
  //       sp_defense: Number.parseInt(pokeJson.sp_defense),
  //       speed: Number.parseInt(pokeJson.speed),

  //       type1: pokeJson.type1 as PokeType,
  //       type2: pokeJson.type2 as PokeType,

  //       // ev_from: [pokeJson.ev_from],
  //       // ev_to: JSON.parse(pokeJson.ev_to.replace(/'/g, '"')) as string[],
  //       is_base: pokeJson.is_base == "1",
  //       is_final: pokeJson.is_full_ev == "1",
  //       // evo_family: JSON.parse(pokeJson.evo_family.replace(/'/g, '"')) as string[]
  //     } as Pokemon
  //     // This does not actually produce a pokemon object
  //   });
  //   this.pokedex.sort((a, b) => a.pokedex_num - b.pokedex_num);
  // }

  public readSelectedFile(inputFile: File) {
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

  private parseFile(fileString: string) {
    if (fileString.length) {
      try {
        if (fileString.startsWith('Randomizer Version:')) {
          this.parseLogFile(fileString)
        } else {
          this.parseSaveFile(fileString)
        }
        this.validDexUploaded = true;
        this.dexChanges.next();
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
  private parseLogFile(log: string) {
    const blocks = log.split('\r\n\r\n');

    let pokeStrings: string[] = [];
    let evoStrings: string[] = [];
    let tmStrings: string[] = [];
    let moveStrings: string[] = [];
    let tmCompStrings: string[] = [];

    for (const block of blocks) {
      const lines = block.split('\r\n');
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
        case 'Pokemon Movesets':
          moveStrings.push(block.slice(block.indexOf('\r\n')));
          break;
        case 'TM Compatibility':
          tmCompStrings = lines.slice(1);
          break;
        default:
          if (firstLine.match(/\d{3}/) && !firstLine.startsWith('Set')) {
            moveStrings.push(block)
          }
          break;
      }
    }

    // Potentially let this become the factory method (returns a list
    // of Pokemon objects fully formed from the component string arrays)
    this.buildDex(pokeStrings, evoStrings, tmStrings, moveStrings);

    this.resetSpoils();
    return;
  }

  private resetSpoils() {
    this.allAbilitiesRevealed = false;
    this.allBSTRevealed = false;
    this.allTypesRevealed = false;
    this.isFullyRevealed = false;
  }

  // TODO: Potentially move to Pokemon.ts as a static method
  buildDex(pokeStrings: string[], evoStrings: string[], tmStrings: string[], moveStrings: string[]) {
    let res: Pokemon[] = [];
    const labels = pokeStrings[0];
    for (const pokeString of pokeStrings.slice(1)) {
      let new_mon = new Pokemon();
      new_mon.setBasicStats(pokeString, labels);
      //If this is an alt form, set UID to original mon
      if (new_mon.name.indexOf('-') !== -1
        && res.find(mon => new_mon.name.indexOf(mon.name) !== -1)
        && !new_mon.name.toLowerCase().includes('porygon')) {
        new_mon.uid = res.find(mon => new_mon.name.indexOf(mon.name) !== -1)!.uid
      }
      res.push(new_mon)
    }
    this.pokedex = res;
    for (let mon of res) {
      this.pokedexByName.set(mon.name, mon);
    }

    for (let evString of evoStrings) {
      const names = evString.split(/(->|,|and)/).map(s => s.trim());
      for (let name of names) {
        this.pokedexByName.get(name)?.addEvolution(evString);
      }
    }

    for (let moveString of moveStrings) {
      let mon_name = moveString.split(' ')[1];
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
        mon.notes = "Learns Moves at: \r\n" + mon.learn_levels.filter(v => v > 1).toString();
      }
    }

    // console.log(this.pokedex)
    // console.log(moveStrings.map(s => s.trim()));
    // console.log(tmStrings);
  }

  private parseSaveFile(save_data: string) {
    try {
      const save_obj = JSON.parse(save_data);
      this.pokedex = save_obj.pokedex.map(
        (mon_data: any) => Pokemon.loadFromJson(mon_data)
      )
    } catch {
      alert("Bad File Uploaded (have you checked your .pkdx?)")
    }
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

  public updatePokemon(mon: Pokemon) {
    this.individualChanges.next(mon);
  }
}