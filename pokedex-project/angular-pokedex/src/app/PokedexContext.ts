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
    let dex_obj = JSON.parse(dex_string);

    let parsedPokedex = dex_obj.pokedex.map((ob: any) =>
      Pokemon.loadFromJson(ob)
    );
    let parsedTrainers: Trainer[] = [];
    if(dex_obj.trainers) {
      parsedTrainers = dex_obj.trainers.map((ob: any) =>
        Trainer.loadFromJson(ob)
      );
    }
    if(!dex_obj.version) {
      alert("Old .pkdx file detected.\nSome spoiling features may not work correctly")
    }
    return {
      pokedex: parsedPokedex,
      isFullyRevealed: dex_obj.isFullyRevealed,
      allBSTRevealed: dex_obj.allBSTRevealed,
      allTypesRevealed: dex_obj.allTypesRevealed,
      allAbilitiesRevealed: dex_obj.allAbilitiesRevealed,
      allEvolutionsRevealed: dex_obj.allEvolutionsRevealed,
      allMovesRevealed: dex_obj.allMovesRevealed,
      revealedTMs: dex_obj.revealedTMs ? dex_obj.revealedTMs : dex_obj.tms,
      tmIds: dex_obj.tmIds,
      hmIds: dex_obj.hmIds,
      tmMoves: dex_obj.tmMoves,
      hmMoves: dex_obj.hmMoves,
      starters: dex_obj.starters,
      trainers: parsedTrainers,
      version: dex_obj.version ? dex_obj.version: 1,
    };
  }
}
