import { JsonPipe } from '@angular/common';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
// import { readFile, readFileSync } from 'fs';
import {Observable, Subject} from 'rxjs';
import SampleJson from '../assets/data/main_collection.json';
import { Pokemon, learned_move, tm_move, PokeType } from './Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public pokedex: Pokemon[] = [];
  public pokedexByName = new Map<string, Pokemon>();
  private dexChanges = new Subject<any>();
  private selectedChanges = new Subject<any>();
  private v = 3;

  constructor() {
    this.getPokemonList();
  }


  private getPokemonList() {
    this.pokedex = Object.values(SampleJson).map((pokeJson) => {
      return {
        name: pokeJson.name,
        pokedex_num: Number.parseInt(pokeJson.long_id),
        uid: pokeJson.long_id,

        stat_total: Number.parseInt(pokeJson.stat_total),
        hp: Number.parseInt(pokeJson.hp),
        attack: Number.parseInt(pokeJson.attack),
        defense: Number.parseInt(pokeJson.defense),
        sp_attack: Number.parseInt(pokeJson.sp_attack),
        sp_defense: Number.parseInt(pokeJson.sp_defense),
        speed: Number.parseInt(pokeJson.speed),

        type1: pokeJson.type1 as PokeType,
        type2: pokeJson.type2 as PokeType,

        // ev_from: [pokeJson.ev_from],
        // ev_to: JSON.parse(pokeJson.ev_to.replace(/'/g, '"')) as string[],
        is_base: pokeJson.is_base == "1",
        is_final: pokeJson.is_full_ev == "1",
        // evo_family: JSON.parse(pokeJson.evo_family.replace(/'/g, '"')) as string[]
      } as Pokemon
    });
    this.pokedex.sort((a, b) => a.pokedex_num - b.pokedex_num);
    console.log(this.pokedex);
  }

  public readSelectedFile(inputFile: File) {
    let reader = new FileReader();
    this.v=4;
    reader.onload = (e) => {
      this.parseFile(reader.result ? reader.result.toString() : '')
    }
    reader.onerror = (e) => {
      console.log(reader.error)
    }
    reader.readAsText(inputFile)

    
    //this.parseFile;

    // if (output.startsWith("Randomizer Version")) {
    //   res = this.parseLogFile(output)
    // } else{
    //   res = this.parseSaveFile(output)
    // }
    // this.updatePokemonList(res);
  }

  private parseFile(fileString: string) {
    console.log("yes2, ", this.v);
    // let s = (event.target) && event.target.result;
    if(fileString.startsWith('Randomizer Version:')) {
      this.parseLogFile(fileString)
    } else {
      this.parseSaveFile(fileString)
    }
  }

  private parseLogFile(log: string){
    console.log(log);
    const blocks = log.split('\r\n\r\n');
    // console.log(blocks);

    let pokeStrings: string[] = [];
    let evoStrings: string[] = [];
    let tmStrings: string[] = [];
    let moveStrings: string[] = [];
    let tmCompStrings: string[] = [];
    // let locationStrings: string[];
    // let trainerStrings: string[];

    for(const block of blocks) {
      const lines = block.split('\r\n');
      const firstLine = lines[0];
      const label = firstLine.startsWith('-')?firstLine.split('--')[1]:firstLine.split(':')[0];
      console.log(label)
      switch(label) {
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
          if(firstLine.match(/\d{3}/)) {
            moveStrings.push(block)
          }
          break;
      }
    }

    console.log(pokeStrings[20]);

    this.buildDex(pokeStrings, evoStrings, tmStrings, moveStrings)
    console.log(this.pokedex)
    return;
  }

  buildDex(pokeStrings: string[], evoStrings: string[], tmStrings: string[], moveStrings: string[]){
    let res: Pokemon[] = [];
    const labels = pokeStrings[0];
    for(const pokeString of pokeStrings.slice(1)) {
      let new_mon = new Pokemon();
      new_mon.setBasicStats(pokeString, labels);
      //If this is an alt form, set UID to original mon
      if( new_mon.name.indexOf('-') !== -1 
          && res.find(mon => new_mon.name.indexOf(mon.name) !== -1)
          && !new_mon.name.toLowerCase().includes('porygon')) {
            new_mon.uid = res.find(mon => new_mon.name.indexOf(mon.name) !== -1)!.uid
          }
      res.push(new_mon)
    }
    this.pokedex = res;
    for(let mon of res) {
      this.pokedexByName.set(mon.name, mon);
    }

    for(let evString of evoStrings) {
      const names = evString.split(/(->|,|and)/).map(s => s.trim());
      for(let name of names) {
        this.pokedexByName.get(name)?.addEvolution(evString);
      }
    }
  }

  private parseSaveFile(save_data: string){
    try {
      this.pokedex = JSON.parse(save_data).map(
        (mon_data: any) => Pokemon.loadFromJson(mon_data)
      )
    } catch {
      alert("Bad File Uploaded (have you checked your pkdx?)")
    }
  }

  private updatePokemonList(newList: Pokemon[]) {
    if(newList.length) {
      this.pokedex = newList;
      //Inform our subscribers that the dex has changed
      this.dexChanges.next();
    }
  }

  

}

export const TypeColors = {
    "fire" : ["#ff6966","#9b1414"],
    "water" : ["#6765ff","#3b3e9b"],
    "grass" : ["#84d472","#359b21"],
    "bug" : ["#83ff78","#4fb525"],
    "ground" : ["#ffae35","#9b772f"],
    "rock" : ["#ff6f40","#9b6145"],
    "steel" : ["#c0b4b6","#726a6a"],
    "fairy" : ["#ffadc7","#9b1e44"],
    "dark" : ["#686766","#3e3b39"],
    "psychic" : ["#ffbde0","#9b4e90"],
    "ghost" : ["#e486ff","#8d689b"],
    "poison" : ["#bf68bb","#755671"],
    "dragon" : ["#9782ff","#71669b"],
    "ice" : ["#bafff6","#647c9b"],
    "flying" : ["#aaa5ff","#668d9b"],
    "normal" : ["#f2ffb8","#9b996d"],
    "fighting" : ["#ff9a78","#9b532f"],
    "electric" : ["#ffffa3","#c8c24a"],
    "missing" : ["#505050", "#0c0c0c"]
};


