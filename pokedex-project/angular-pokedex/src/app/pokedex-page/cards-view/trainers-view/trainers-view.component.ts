import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { PokedexService } from 'src/app/pokedex.service';
import { Trainer } from 'src/app/Trainer';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil, ignoreElements, filter } from 'rxjs/operators';

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


}
