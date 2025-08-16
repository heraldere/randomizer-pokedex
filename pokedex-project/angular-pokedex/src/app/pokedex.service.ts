import { JsonPipe } from '@angular/common';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
// import { readFile, readFileSync } from 'fs';
import { Observable, Subject, ReplaySubject } from 'rxjs';
// import SampleJson from '../assets/data/main_collection.json';
import { Pokemon, learned_move, tm_move, PokeType } from './Pokemon';
import { PokedexLoader } from './PokedexLoader';
import { PokedexContext } from './PokedexContext';
import { Trainer } from './Trainer';
import { timeout } from 'rxjs/operators';
// import * as gen7data from '../assets/data/gen7vantest.json';
// import * as gen6data from '../assets/data/gen6vantest.json';
// import * as gen5data from '../assets/data/gen5vantest.json';
// import * as gen4data from '../assets/data/gen4vantest.json';
// import * as gen3data from '../assets/data/gen3vantest.json';
// import * as gen2data from '../assets/data/gen2vantest.json';
// import * as gen1data from '../assets/data/gen1vantest.json';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  public pokedex: Pokemon[] = [];
  public pokedexByName = new Map<string, Pokemon>();
  public validDexUploaded = false;
  public isLoaded = false;
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
  dexLoader = new PokedexLoader();

  trainers: Trainer[] = [];
  trainersByPokemonName = new Map<string, Trainer[]>();

  public dexChanges = new Subject<any>();
  public individualChanges = new Subject<Pokemon>();
  public monSelection = new ReplaySubject<string>(1);
  public filterChanges = new ReplaySubject<Pokemon[]>(1);
  public loadingStatus = new ReplaySubject<boolean>();

  static readonly defaultPkdxName = './assets/data/Default.pkdx';
  static readonly sampleRandomPkdxName = './assets/data/Random.pkdx';

  constructor() {
    //TODO: THIS MUST BE COMMENTED OUT BEFORE PRODUCTION
    (window as any).dex = this;
  }

  public async loadDefaultData() {
    if (this.dexLoader.lastFileRead !== PokedexService.defaultPkdxName) {
      await this.loadNewDex(PokedexService.defaultPkdxName);
    }
  }

  public async loadSampleRandomData() {
    await this.loadNewDex(PokedexService.sampleRandomPkdxName);
  }

  public async loadNewDex(inputFile: File | string) {
    this.loadingStatus.next(true);

    try {
      let res = await this.dexLoader.parseDex(inputFile);
      this.restoreFromContext(res);
    } catch (e) {
      console.error('Problem Loading Dex:', e);
      alert('Problem Loading Dex');
    }

    this.loadingStatus.next(false);
  }

  getContext(): PokedexContext {
    let ctx = {
      pokedex: this.pokedex,
      isFullyRevealed: this.isFullyRevealed,
      allBSTRevealed: this.allBSTRevealed,
      allTypesRevealed: this.allTypesRevealed,
      allAbilitiesRevealed: this.allAbilitiesRevealed,
      allEvolutionsRevealed: this.allEvolutionsRevealed,
      allMovesRevealed: this.allMovesRevealed,
      revealedTMs: this.revealedTMs,
      tmIds: this.tmIds,
      hmIds: this.hmIds,
      tmMoves: this.tmMoves,
      hmMoves: this.hmMoves,
      starters: this.starters,
      trainers: this.trainers,
      version: PokedexContext.SCHEMA_VERSION,
    };

    return ctx;
  }

  private restoreFromContext(pkdx_ctx: PokedexContext) {
    //TODO: Deserialize from the context, and build out dictionaries
    // Maybe throw if not all the fields are present.
    this.pokedex = pkdx_ctx.pokedex;
    this.isFullyRevealed = pkdx_ctx.isFullyRevealed;
    this.allBSTRevealed = pkdx_ctx.allBSTRevealed;
    this.allTypesRevealed = pkdx_ctx.allTypesRevealed;
    this.allAbilitiesRevealed = pkdx_ctx.allAbilitiesRevealed;
    this.allEvolutionsRevealed = pkdx_ctx.allEvolutionsRevealed;
    this.allMovesRevealed = pkdx_ctx.allMovesRevealed;
    this.revealedTMs = pkdx_ctx.revealedTMs;
    this.tmIds = pkdx_ctx.tmIds;
    this.hmIds = pkdx_ctx.hmIds;
    this.tmMoves = pkdx_ctx.tmMoves;
    this.hmMoves = pkdx_ctx.hmMoves;
    this.starters = pkdx_ctx.starters;
    this.trainers = pkdx_ctx.trainers;

    for (let mon of pkdx_ctx.pokedex) {
      this.pokedexByName.set(mon.name, mon);
      this.trainersByPokemonName.set(
        mon.name,
        this.trainers.filter((t) => t.contains(mon.name))
      );
    }

    
    this.dexChanges.next();
    if (this.pokedex.length > 0) {
      this.selectPokemon(this.pokedex[0].name);
    }

    this.validDexUploaded = true;
  }

  async initializeData() {
    this.loadingStatus.next(true);
    // Simulate Loading Delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const cached = await this.dexLoader.attemptLoadCachedDex();
    if (cached && cached.pokedex.length > 0) {
      this.restoreFromContext(cached);
      this.loadingStatus.next(false);
      return;
    }
    try {
      await this.loadDefaultData();
    } catch (err) {
      console.error('Failed to load default dex:', err);
    }
    this.loadingStatus.next(false);
  }

  cacheDex() {
    console.log('Caching')
    let ctx = this.getContext();
    this.dexLoader.cacheDex(ctx);
    //TODO: Cache any Settings object that gets created
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
        if (!this.revealedTMs.includes(tm)) this.revealedTMs.push(tm);
        if (!mon.tm_indexes_learned.includes(i)) mon.tm_indexes_learned.push(i);
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

  hideTMForAll(tm: number) {
    for (let mon of this.pokedex) {
      mon.hideTM(tm);
    }
    if (this.revealedTMs.includes(tm)) {
      this.revealedTMs.splice(this.revealedTMs.indexOf(tm), 1);
    }
    this.dexChanges.next();
  }

  revealTMForAll(tm: number) {
    for (let mon of this.pokedex) {
      mon.revealTM(tm);
    }
    if (!this.revealedTMs.includes(tm)) {
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
