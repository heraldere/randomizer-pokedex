import { Pokemon } from './Pokemon';
import { Trainer } from './Trainer';

export class PokedexContext {
  static readonly SCHEMA_VERSION = 2;
  pokedex: Pokemon[] = [];

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
  
  trainers: Trainer[] = [];
  version: number = 1;

  static fromJSON(dex_string: string): PokedexContext {
    //TODO: Parse each Pokemon/Trainer/etc. from the string
    let dex_obj = JSON.parse(dex_string)
    return new PokedexContext();
  }
}
