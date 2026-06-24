import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
import { PokedexService } from 'src/app/pokedex.service';
import { PokeType } from 'src/app/Pokemon';
import { DEFAULT_SETTINGS } from 'src/app/Settings';
import { TrainerPokemon } from 'src/app/Trainer';

@Component({
  selector: 'tp-panel',
  templateUrl: './tp-panel.component.html',
  styleUrls: ['./tp-panel.component.scss']
})
export class TpPanelComponent implements OnInit, OnChanges, OnDestroy {

  @Input() trainer_pokemon!: TrainerPokemon;
  @Input() alt_forms: TrainerPokemon[] = [];
  dex: PokedexService;
  selected_form: TrainerPokemon | undefined;
  stat_blocks: [string, number][] = [];
  destroy$ = new Subject<void>();

  constructor(dex: PokedexService) {
    this.dex = dex;
  }

  ngOnInit(): void {
    this.dex.dexChanges.pipe(
      skip(1), //dexChanges is a Replay, and we don't actually care about reacting on subscription
      takeUntil(this.destroy$)
    ).subscribe((_) => {
      this.refreshSelection(this.selected_form ? this.selected_form : this.trainer_pokemon);
    })
    this.refreshSelection(this.trainer_pokemon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['trainer_pokemon']) {
      this.refreshSelection(this.trainer_pokemon);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Call this in subscriptions to the changes
  refreshSelection(tp: TrainerPokemon): void {
      this.selected_form = tp;
      this.stat_blocks = this.getStatBlocks();
  }

  navigateToIndividualView(t_pokemon: TrainerPokemon | undefined) {
    if(!t_pokemon) {
      return;
    }
    let mon = this.dex.pokedexByName.get(t_pokemon.name);
    if(mon) {
      this.dex.navigation.iv_misc_selection = 'trainers';
      this.dex.selectPokemon(t_pokemon.name);
      this.dex.trainerPokemonSelection.next(t_pokemon);
      this.dex.updateCardNavigationSelection('summaryTab');
    }
  }

  formButtonClicked(tp: TrainerPokemon) {
    if(tp === this.selected_form) {
      this.refreshSelection(this.trainer_pokemon);
    } else {
      this.refreshSelection(tp);
    }
  }

  getFormButtonText(tp: TrainerPokemon): string {
    if(tp === this.selected_form) {
      return "Base"
    } else {
      return this.getFormSuffix(tp);
    }
  }

  getFormSuffix(tp: TrainerPokemon): string {
    return tp.name.slice(this.trainer_pokemon.name.length+1);
  }

  getFormName() : string {
    return this.selected_form ? this.selected_form.name : this.trainer_pokemon.name;
  }

  getFormSprite() : string {
    let address_string = "assets/images/sprites/"
    let name = this.getFormName();
    let mon = this.dex.pokedexByName.get(name);
    if(mon) {
      return address_string + mon.sanitizedName() + ".png";
    }
    return address_string + "unknown.png";
  }

  getTypeSprite(): string[] {
    //https://serebii.net/pokedex-bw/type/{{current_mon!.get_type1()}}.gif"
    if(!this.selected_form) {
      return ["https://serebii.net/pokedex-bw/type/curse.gif"]
    }
    let mon = this.dex.pokedexByName.get(this.selected_form.name)
    if(!mon) {
      return ["https://serebii.net/pokedex-bw/type/curse.gif"]
    }

    let res = [
      `https://serebii.net/pokedex-bw/type/${mon.get_type1()}.gif`
    ]
    
    if(mon.get_type2() !== PokeType.None) {
      res.push(
      `https://serebii.net/pokedex-bw/type/${mon.get_type2()}.gif`
      )
    }

    return res
  }

  getStatBlocks(): [string, number][] {
    if(!this.selected_form) {
      return []
    }

    let mon = this.dex.pokedexByName.get(this.selected_form.name);
    if(!mon) {
      return []
    }

    let needToCheckRevealedStatus = (!this.selected_form.isDefeated);
    let stats = mon.calculateFoeStatsAtLevel(this.selected_form.level, this.selected_form.ivs, this.dex.dexLoader.lastLoadedLogGeneration < 3, needToCheckRevealedStatus);
    let tags = (stats.length === 5) ? ['HP', 'ATK', 'DEF', 'SPEC', 'SPEED'] : ['HP', 'ATK', 'DEF', 'SP ATK', 'SP DEF', 'SPEED']
    return tags.map((tag, i) => [tag, stats[i]]);
  }

  toggleSpoil() {
    this.trainer_pokemon.isRevealed = !this.trainer_pokemon.isRevealed;
    for(let form of this.alt_forms) {
      form.isRevealed = this.trainer_pokemon.isRevealed
    }
    this.dex.dexChanges.next();
  }
  
  toggleDefeat() {
    let pokemon_species = this.dex.pokedexByName.get(this.trainer_pokemon.name)
    let alt_species = this.alt_forms.map(f => this.dex.pokedexByName.get(f.name));
    if(!pokemon_species) {
      console.log("Couldn't find species: " + this.trainer_pokemon.name);
      return;
    }

    if(this.trainer_pokemon.isDefeated) {
      pokemon_species.undefeatTrainerPokemon(this.trainer_pokemon, DEFAULT_SETTINGS);
      for(let alt of alt_species) {
        if(alt) {
          alt.undefeatTrainerPokemon(this.trainer_pokemon, DEFAULT_SETTINGS)
        }
      }
      this.trainer_pokemon.isRevealed = false;
    } else {
      pokemon_species.defeatTrainerPokemon(this.trainer_pokemon, DEFAULT_SETTINGS);
      for(let alt of alt_species) {
        if(alt) {
          alt.defeatTrainerPokemon(this.trainer_pokemon, DEFAULT_SETTINGS)
        }
      }
      this.trainer_pokemon.isRevealed = true;
    }

    //Toggle defeat status 
    this.trainer_pokemon.isDefeated =
      !this.trainer_pokemon.isDefeated;

    // update all forms to match
    for(let form of this.alt_forms) {
      form.isRevealed = this.trainer_pokemon.isRevealed
      form.isDefeated = this.trainer_pokemon.isDefeated
    }

    this.updateTrainerEncounterOrder();

    this.dex.dexChanges.next();
  }

  updateTrainerEncounterOrder() {
    let trainer = this.dex.trainers.find(t => t.Pokes.includes(this.trainer_pokemon))
      if(trainer) {
        this.dex.bumpTrainerEncounterOrder(trainer);
      }
  }
  
}
