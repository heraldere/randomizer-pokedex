import { Injectable } from '@angular/core';
import SampleJson from '../assets/data/main_collection.json';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  public pokedex: Pokemon[] = [];

  constructor() {
    this.getPokemon();
  }


  private getPokemon() {
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

        ev_from: [pokeJson.ev_from],
        ev_to: JSON.parse(pokeJson.ev_to.replace(/'/g, '"')) as string[],
        is_base: pokeJson.is_base == "1",
        is_final: pokeJson.is_full_ev == "1",
        evo_family: JSON.parse(pokeJson.evo_family.replace(/'/g, '"')) as string[]
      } as Pokemon
    });
    this.pokedex.sort((a, b) => a.pokedex_num - b.pokedex_num);
    console.log(this.pokedex);
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

  type1: PokeType,
  type2: PokeType,

  ev_from: string[],
  ev_to: string[],
  is_base: boolean,
  is_final: boolean,
  evo_family: string[]

}
