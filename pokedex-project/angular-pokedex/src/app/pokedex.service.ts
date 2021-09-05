import { Injectable } from '@angular/core';
import SampleJson from '../assets/data/main_collection.json';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public pokedex : any;

  constructor() { 
    this.getPokemon();
  }

  
  private getPokemon() {
    // Temp method until we get the full data
    console.log(SampleJson);
    this.pokedex = SampleJson;
  }
}

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
  Unknown = "unknown"
}

export interface Pokemon {
  name: string,
  pokedex_num: number,
  uid: string,

  stat_total: number,
  hp: number,
  attack: number,
  defense: number,
  sp_attack: number,
  sp_defense: number,
  speed: number,
  special?: number,

  type1: PokeType,
  type2: PokeType,

  ev_from: Pokemon[],
  ev_to: Pokemon[],
  is_base: boolean,
  is_final: boolean,
  evo_family: string[]

  forms: Pokemon[]

}
