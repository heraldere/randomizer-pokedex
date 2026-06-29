import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PokedexService } from 'src/app/pokedex.service';
import { Pokemon } from 'src/app/Pokemon';
import { DEFAULT_SETTINGS } from 'src/app/Settings';
import { Trainer, TrainerPokemon } from 'src/app/Trainer';

@Component({
  selector: 'app-trainer-pokemon-selector',
  templateUrl: './trainer-pokemon-selector.component.html',
  styleUrls: ['./trainer-pokemon-selector.component.scss'],
})
export class TrainerPokemonSelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() currentMon: Pokemon | undefined;
  trainerPokemonMap: Map<
    string,
    { trainer: Trainer; pokemon: TrainerPokemon }
  > = new Map<string, { trainer: Trainer; pokemon: TrainerPokemon }>();
  dex: PokedexService;
  cdr: ChangeDetectorRef;
  trainerPokemonSearchKeys: string[] = [];
  selectedTrainerKey: string = '';
  currentTrainer: Trainer | undefined;
  currentTrainerPokemon: TrainerPokemon | undefined;
  private destroy$ = new Subject<void>();

  constructor(dex: PokedexService, cdr: ChangeDetectorRef) {
    this.dex = dex;
    this.cdr = cdr;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.dex.monSelection.pipe(
      takeUntil(this.destroy$)
    ).subscribe((monName) => {
      this.populateTrainerPokemonMap(monName);
      this.maybeUpdateSelection(monName);
      if(this.currentTrainerPokemon) {
        this.dex.trainerPokemonSelection.next(this.currentTrainerPokemon);
      }
      this.cdr.detectChanges();
    });

    // this.dex.trainerSelection.subscribe((trainer) => {
    //   if (trainer && this.currentMon) {
    //     this.currentTrainer = trainer;
    //     const matchingMon = trainer.Pokes.find(
    //       (tp) => tp.name === this.currentMon?.name
    //     );
    //     if (matchingMon) {
    //       this.currentTrainerPokemon = matchingMon;
    //       this.selectedTrainerKey = this.buildTrainerKey(this.currentTrainer, this.currentTrainerPokemon);
    //     }
    //   }
    // });

    this.dex.trainerPokemonSelection.pipe(
      takeUntil(this.destroy$)
    ).subscribe((trainerPokemon) => {
      if(this.currentTrainerPokemon === trainerPokemon ) {
        return;
      }
      // Hacky way of remembering trainer selection when navigating between mons.
      this.currentTrainer = this.dex.trainersByPokemonName.get(trainerPokemon.name)?.find((t) => t.Pokes.includes(trainerPokemon));
      if(this.currentMon?.name === trainerPokemon.name) {
        this.populateTrainerPokemonMap(trainerPokemon.name);
        this.maybeUpdateSelection(trainerPokemon.name, trainerPokemon);
      }
      // this.cdr.detectChanges();
    });
       
  }

  private populateTrainerPokemonMap(monName: string) {
    if (!this.currentMon) {
      return;
    }
    this.trainerPokemonMap.clear();
    const trainers = this.dex.trainersByPokemonName.get(monName);
    if (!trainers) {
      return;
    }
    for (const trainer of trainers) {
      const tmons = trainer.Pokes.filter(
        (tp) => tp.name === this.currentMon?.name
      );
      for (const tmon of tmons) {
        let mapKey = `Lv${tmon.level} ${trainer.name}${
          trainer.oldName !== trainer.name ? ' (' + trainer.oldName + ')' : ''
        }`;
        if (!this.trainerPokemonMap.has(mapKey)) {
          this.trainerPokemonMap.set(mapKey, {
            trainer: trainer,
            pokemon: tmon,
          });
        } else {
          // handle duplicates by adding a suffix
          let suffix = 2;
          let newKey = `${mapKey} (${suffix})`;
          while (this.trainerPokemonMap.has(newKey)) {
            suffix++;
            newKey = `${mapKey} (${suffix})`;
          }
          this.trainerPokemonMap.set(newKey, {
            trainer: trainer,
            pokemon: tmon,
          });
        }
      }
    }
    this.trainerPokemonSearchKeys = Array.from(
      this.trainerPokemonMap.keys()
    ).sort((a, b) => {
      const levelA = parseInt(a.split(' ')[0].substring(2));
      const levelB = parseInt(b.split(' ')[0].substring(2));
      if (levelA !== levelB) {
        return levelA - levelB;
      }
      return a.localeCompare(b);
    });
    this.trainerPokemonSearchKeys.unshift(''); // for no selection
  }

  private maybeUpdateSelection(monName: string, trainerPokemon?: TrainerPokemon) {
    if (!this.currentMon) {
      this.selectedTrainerKey = '';
      this.currentTrainer = undefined;
      this.currentTrainerPokemon = undefined;
      return;
    }

    const trainers = this.dex.trainersByPokemonName.get(monName);
    const matchingTrainer = trainers?.find((t) => t === this.currentTrainer);
    if (matchingTrainer) {
      if(trainerPokemon) {
        this.currentTrainerPokemon = trainerPokemon;
        this.selectedTrainerKey = this.buildTrainerKey(matchingTrainer, this.currentTrainerPokemon);
        return;
      }
      const matchingMon = matchingTrainer.Pokes.find(
        (tp) => tp.name === this.currentMon?.name
      );
      if (matchingMon) {
        this.currentTrainerPokemon = matchingMon;
        this.selectedTrainerKey = this.buildTrainerKey(matchingTrainer, this.currentTrainerPokemon);
        return;
      }
    }
    this.selectedTrainerKey = '';
    // this.currentTrainer = undefined; // If we keep current trainer, we can still return to the same trainer after navigating away.
    this.currentTrainerPokemon = undefined;
    return;
  }

  private buildTrainerKey(matchingTrainer: Trainer, trainerPokemon: TrainerPokemon): string {
    let base_string = `Lv${trainerPokemon.level} ${matchingTrainer.name}${matchingTrainer.oldName !== matchingTrainer.name
        ? ' (' + matchingTrainer.oldName + ')'
        : ''}`;
    let index = 0;
    for(let t_mon of matchingTrainer.Pokes) {
      if(t_mon.name === trainerPokemon.name) {
        index++;
        if(t_mon === trainerPokemon) {
          break;
        }
      }
    }
    return base_string + (index > 1 ? ` (${index})` : '');
  }

  onDropdownChange(newKey: string) {
    const entry = this.trainerPokemonMap.get(newKey);
    if (entry) {
      this.currentTrainer = entry.trainer; // Only update currentTrainer when we actually select one.
      this.currentTrainerPokemon = entry.pokemon;
      this.dex.trainerSelection.next(entry.trainer);
      this.dex.trainerPokemonSelection.next(entry.pokemon);
    } else {
      this.currentTrainer = undefined;
      this.currentTrainerPokemon = undefined;
      this.dex.trainerSelection.next(undefined); // We want to remember our selections, even if they're empty
      this.dex.trainerPokemonSelection.next(undefined);
    }
  }

  toggleSpoil() {
    if (this.currentTrainerPokemon) {
      this.currentTrainerPokemon.isRevealed =
        !this.currentTrainerPokemon.isRevealed;
    }
  }

  toggleDefeat() {
    if (this.currentTrainerPokemon && this.currentMon && this.currentTrainer) {

      // First we need to see if we need to update any other pokemon in addition to this one
      let ctp_name = this.currentTrainerPokemon.name;
      let alt_forms: TrainerPokemon[] = []
      if( this.currentTrainerPokemon.canMegaEvolve() ) {
        alt_forms = this.currentTrainer.Pokes.filter(p => p.name.startsWith(ctp_name) && p.name.includes("-Mega")) 
      }
      else if( this.currentTrainerPokemon.isMegaEvolved()) { //Super hacky, but not sure how to grab otherwise.
        alt_forms = this.currentTrainer.Pokes.filter( p => p.canMegaEvolve() && p.name.slice(0, 5) === ctp_name.slice(0, 5))
      }
      let alt_species = alt_forms.map(f => this.dex.pokedexByName.get(f.name))

      // Then either defeat or undefeat them depending on button state
      if(this.currentTrainerPokemon.isDefeated) {
        this.currentMon.undefeatTrainerPokemon(this.currentTrainerPokemon, DEFAULT_SETTINGS);
        this.currentTrainerPokemon.isRevealed = false;
        for(let alt of alt_species) {
          if(alt) {
            alt.undefeatTrainerPokemon(this.currentTrainerPokemon, DEFAULT_SETTINGS)
          }
        }
      } else {
        this.currentMon.defeatTrainerPokemon(this.currentTrainerPokemon, DEFAULT_SETTINGS);
        this.currentTrainerPokemon.isRevealed = true;
        for(let alt of alt_species) {
          if(alt) {
            alt.defeatTrainerPokemon(this.currentTrainerPokemon, DEFAULT_SETTINGS)
          }
        }
      }

      // Update all information to match (alt forms should stay closely coupled with base)
      this.currentTrainerPokemon.isDefeated =
        !this.currentTrainerPokemon.isDefeated;

      for(let alt_tp of alt_forms) {
        alt_tp.isRevealed = this.currentTrainerPokemon.isRevealed;
        alt_tp.isDefeated = this.currentTrainerPokemon.isDefeated;
      }

      this.dex.bumpTrainerEncounterOrder(this.currentTrainer);
      this.dex.individualChanges.next(this.currentMon);
    } else {
      console.log("Couldn't toggle defeat, missing data");
    }
  }

  navigateToTrainerView(trainer: Trainer) {
    this.dex.trainerSelection.next(trainer);
    this.dex.cardNavigationSelection.next('trainersTab')
  }
}
