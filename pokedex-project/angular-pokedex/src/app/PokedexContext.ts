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

    //TODO: Parse each Pokemon/Trainer/etc. from the dex_obj
    let parsedPokedex = dex_obj.pokedex.map((ob: any) => Pokemon.loadFromJson(ob))
    let parsedTrainers = dex_obj.trainers.map((ob: any) => Trainer.loadFromJson(ob))
    return {
      pokedex: parsedPokedex,
      isFullyRevealed: dex_obj.isFullyRevealed,
      allBSTRevealed: dex_obj.allBSTRevealed,
      allTypesRevealed: dex_obj.allTypesRevealed,
      allAbilitiesRevealed: dex_obj.allAbilitiesRevealed,
      allEvolutionsRevealed: dex_obj.allEvolutionsRevealed,
      allMovesRevealed: dex_obj.allMovesRevealed,
      revealedTMs: dex_obj.revealedTMs,
      tmIds: dex_obj.tmIds,
      hmIds: dex_obj.hmIds,
      tmMoves: dex_obj.tmMoves,
      hmMoves: dex_obj.hmMoves,
      starters: dex_obj.starters,
      trainers: parsedTrainers,
      version: dex_obj.version,
    };
  }

  // private parseSaveFile(save_data: string) {
  //   try {
  //     const save_obj = JSON.parse(save_data);
  //     this.pokedex = save_obj.pokedex.map((mon_data: any) =>
  //       Pokemon.loadFromJson(mon_data)
  //     );
  //     this.isFullyRevealed = save_obj.full;
  //     this.allBSTRevealed = save_obj.bsts;
  //     this.allTypesRevealed = save_obj.types;
  //     this.allAbilitiesRevealed = save_obj.full;
  //     this.allEvolutionsRevealed = save_obj.evolutions;
  //     this.revealedTMs = save_obj.tms;
  //     this.tmIds = save_obj.tmIds ?? [];
  //     this.hmIds = save_obj.hmIds ?? [];
  //     this.tmMoves = save_obj.tmMoves ?? [];
  //     this.hmMoves = save_obj.hmMoves ?? [];
  //     this.starters = save_obj.starters ?? [];
  //     this.allMovesRevealed = save_obj.moves;
  //     this.validDexUploaded = true;
  //     this.dexChanges.next();
  //     if (this.pokedex.length > 0) {
  //       this.selectPokemon(this.pokedex[0].name);
  //     }
  //   } catch {
  //     alert('Bad File Uploaded (have you checked your .pkdx?)');
  //   }
  // }
}
