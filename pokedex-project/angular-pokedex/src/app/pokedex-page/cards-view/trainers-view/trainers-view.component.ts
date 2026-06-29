import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { PokedexService } from 'src/app/pokedex.service';
import { Trainer } from 'src/app/Trainer';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil, ignoreElements, filter } from 'rxjs/operators';
import { DEFAULT_SETTINGS } from 'src/app/Settings';

@Component({
  selector: 'trainers-view',
  templateUrl: './trainers-view.component.html',
  styleUrls: ['./trainers-view.component.scss']
})
export class TrainersViewComponent implements OnInit, OnDestroy{


  ctrl: FormControl = new FormControl();
  trainers_filtered_by_text: Observable<Trainer[]>;
  dex: PokedexService;
  @ViewChild('mm')
  maut!: MatAutocomplete;
  current_trainer: Trainer | undefined;
  @ViewChild('searchInput')
  search_box!: MatInput;
  destroy$ = new Subject<void>();
  trainer_selected = false;

  constructor(dex: PokedexService, private cdr: ChangeDetectorRef) {
    this.dex = dex;
    this.trainers_filtered_by_text = this.ctrl.valueChanges.pipe(
      startWith(''),
      filter(text => typeof text === 'string'),
      map((search_text) => this.searchTrainers(search_text))
    );
  }


  searchTrainers(search_text: string): Trainer[] {
    return this.dex.trainers
      .filter((trainer) =>
        trainer.name.toLowerCase().includes(search_text.toLowerCase())
      );
  }

  ngAfterViewInit(): void {
    this.maut.optionSelected.pipe(
      map((ev) => {
        let trainer = ev.option.value as Trainer;
        return trainer;
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (trainer) =>  {
        if(trainer) {
          this.dex.trainerSelection.next(trainer);
        }
      }
    );

    this.dex.trainerSelection.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (trainer) => {
        this.selectTrainer(trainer);
        this.cdr.detectChanges();
      }
    );

    this.dex.dexChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        if(this.current_trainer && !this.dex.trainers.includes(this.current_trainer)) {
          this.trainer_selected = false;
          this.current_trainer = undefined;
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {

  }

  selectTrainer(trainer: Trainer) {
    if(trainer) {
      this.trainer_selected = true;
      this.current_trainer = trainer;
      this.search_box.value = '';
      this.ctrl.setValue('');
    }
  }

  toggleTeamSpoil() {
    if(this.current_trainer) {
      let status = this.current_trainer.Pokes.every(p => p.isRevealed);
      for(let poke of this.current_trainer.Pokes) {
        poke.isRevealed = !status;
      }
    }
  }

  toggleTeamDefeat() {
    if(this.current_trainer) {
      let isFullTeamDefeated = this.current_trainer.Pokes.every(p => p.isDefeated);
      for(let poke of this.current_trainer.Pokes) {
        let mon = this.dex.pokedexByName.get(poke.name)
        if(mon) {
          if(isFullTeamDefeated) {
            if(poke.isDefeated) { // This check should be unnecessary
              mon.undefeatTrainerPokemon(poke, DEFAULT_SETTINGS);
              poke.isDefeated = false;
              poke.isRevealed = false;
            }
          } else {
            if(!poke.isDefeated) {
              mon.defeatTrainerPokemon(poke, DEFAULT_SETTINGS);
              poke.isDefeated = true;
              poke.isRevealed = true;
            }
          }
        }
      }

      this.dex.bumpTrainerEncounterOrder(this.current_trainer)
      this.dex.dexChanges.next();

    }

  }

  getTrainerPowerLevel(trainer: Trainer): number {
    return trainer.Pokes
	  .filter(tp => !tp.canMegaEvolve())
      .map(tp =>
        this.dex.pokedexByName
          .get(tp.name)! //Will throw Type mismatch if this cannot be found
          .calculateFoeStatsAtLevel(tp.level, 0, false)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0)
  }
}
