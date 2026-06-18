import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
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
      if(this.currentTrainerPokemon === trainerPokemon) {
        return;
      }
      this.populateTrainerPokemonMap(trainerPokemon.name);
      this.currentTrainer = this.dex.trainersByPokemonName.get(trainerPokemon.name)?.find((t) => t.Pokes.includes(trainerPokemon));
      console.log(trainerPokemon, this.currentTrainer);
      this.maybeUpdateSelection(trainerPokemon.name, trainerPokemon);
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
    this.currentTrainer = undefined;
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
      this.currentTrainer = entry.trainer;
      this.currentTrainerPokemon = entry.pokemon;
      this.dex.trainerSelection.next(entry.trainer);
      this.dex.trainerPokemonSelection.next(entry.pokemon);
    } else {
      this.currentTrainer = undefined;
      this.currentTrainerPokemon = undefined;
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
      if(this.currentTrainerPokemon.isDefeated) {
        this.currentMon.undefeatTrainerPokemon(this.currentTrainerPokemon.level, DEFAULT_SETTINGS);
        this.currentTrainerPokemon.isRevealed = false;
      } else {
        this.currentMon.defeatTrainerPokemon(this.currentTrainerPokemon.level, DEFAULT_SETTINGS);
        this.currentTrainerPokemon.isRevealed = true;
      }
      this.currentTrainerPokemon.isDefeated =
        !this.currentTrainerPokemon.isDefeated;
      this.dex.individualChanges.next(this.currentMon);
    } else {
      console.log("Couldn't toggle defeat, missing data");
    }
  }
}
