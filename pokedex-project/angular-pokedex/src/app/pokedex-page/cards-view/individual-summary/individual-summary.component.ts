import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscriber } from 'rxjs';
import { PokedexService } from 'src/app/pokedex.service';
import { Pokemon } from 'src/app/Pokemon';
import { startWith, takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { Chart, registerables } from 'chart.js';
import { statChartConfig } from './stat-summary.config';
import { MatInput } from '@angular/material/input';
Chart.register(...registerables);
Chart.defaults.color = '#cfcfcf';

@Component({
  selector: 'individual-card',
  templateUrl: './individual-summary.component.html',
  styleUrls: ['./individual-summary.component.scss'],
})
export class IndividualSummaryComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('statChart')
  chartRef!: ElementRef;
  dex: PokedexService;
  ctrl: FormControl = new FormControl();
  pokes_filtered_by_text: Observable<string[]>;
  current_mon: Pokemon | undefined;
  mon_selected = false;
  chart!: Chart;
  @ViewChild('mm')
  maut!: MatAutocomplete;
  @ViewChild('searchInput')
  search_box!: MatInput;
  tms_shown = false;
  noteSelector: 'notes' | 'trainers' | 'locations' = 'notes';
  fishingControl: FormControl = new FormControl(false);
  miscLocationsControl: FormControl = new FormControl(false);

  private destroy$ = new Subject<void>();

  constructor(dex: PokedexService, private cdr: ChangeDetectorRef) {
    this.dex = dex;
    this.pokes_filtered_by_text = this.ctrl.valueChanges.pipe(
      startWith(''),
      map((search_text) => this.searchMons(search_text))
    );
  }

  searchMons(search_text: string): string[] {
    return this.dex.pokedex
      .map((mon) => mon.name)
      .filter(
        (name) => name.toLowerCase().indexOf(search_text.toLowerCase()) !== -1
      );
  }

  toggleTypeRevealButton() {
    if (this.current_mon) {
      this.current_mon.type_revealed = !this.current_mon.type_revealed;
      this.dex.individualChanges.next(this.current_mon);
    }
  }

  chartClicked(event: MouseEvent) {
    const rect = this.chartRef.nativeElement.getBoundingClientRect();
    const y = event.clientY - rect.top; // y position within the element.
    if(y>0 && y < 40) {
      this.toggleRevealBST();
    } else if (y > 40 && y < rect.height) {
      this.toggleStatRevealButton();
    }
  }

  toggleStatRevealButton() {
    if (this.current_mon && !this.current_mon.fully_revealed) {
      this.current_mon.stats_revealed = !this.current_mon.stats_revealed;
      this.dex.individualChanges.next(this.current_mon);
    }
  }

  toggleRevealBST() {
    if(this.current_mon && !this.current_mon.fully_revealed) {
      this.current_mon.bst_revealed = !this.current_mon.bst_revealed;
      this.dex.individualChanges.next(this.current_mon);
    }
  }

  toggleAbilityRevealButton() {
    if (this.current_mon) {
      this.current_mon.abilities_revealed =
        !this.current_mon.abilities_revealed;
      this.dex.individualChanges.next(this.current_mon);
    }
  }

  revealMovesToIndex(i: number) {
    if (this.current_mon) this.current_mon.learned_moves_revealed_idx = i + 1;
  }

  revealTMAtIndex(i: number) {
    if (this.current_mon) {
      let tm = this.current_mon.tms[i];
      if (!this.dex.revealedTMs.includes(tm)) {
        // this.dex.revealedTMs.push(this.current_mon.tms[i])
        this.dex.revealTMForAll(tm);
      } else {
        // this.dex
        this.dex.hideTMForAll(tm);
      }
    }
  }

  toggleTMs() {
    this.tms_shown = !this.tms_shown;
  }

  toggleNotes(selection: 'notes' | 'trainers' | 'locations') {
    this.noteSelector = selection;
  }

  filterLocations(): string[] {
    if (this.current_mon) {
      return this.current_mon.locations.filter(
        (loc, i) =>  {
          const lowerLoc = loc.toLowerCase();
          const isFishing = lowerLoc.includes('fishing') || lowerLoc.includes(' rod');
          const isMisc = (lowerLoc.includes('swarm') ||
                          lowerLoc.includes('headbutt') ||
                          lowerLoc.includes('radio') ||
                          lowerLoc.includes('sos'));
          return (!isFishing || this.fishingControl.value) &&
              (!isMisc || this.miscLocationsControl.value)
        }
      );
    }
    return [];
  }

  sanitizePokemonName(name: String): String {
    return name
      .replace(':', '')
      .replace('\u2640', 'f')
      .replace('\u2642', 'm')
      .toLowerCase();
  }

  getFilteredForms(mon: Pokemon): string[] {
    return mon.forms.filter((_, i) => i != mon.form_num);
  }

  ngOnInit(): void {}
  // "https://www.serebii.net/swordshield/pokemon/289.png"
  // "https://www.serebii.net/games/type/poison.gif"

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, statChartConfig);
    this.maut.optionSelected
      .pipe(
        map((ev) => {
          let selected = ev.option.value as string;
          return selected;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (name) => this.dex.monSelection.next(name)
      );

    this.dex.individualChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((mon) => {
        if (
          this.current_mon &&
          this.current_mon.name.toLowerCase() == mon.name.toLowerCase()
        ) {
          this.refreshChart();
        }
      });

    this.dex.dexChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.ctrl.setValue('');
      if (this.current_mon) {
        this.refreshChart();
      }
    });

    this.dex.monSelection.pipe(takeUntil(this.destroy$)).subscribe((n) => {
      this.selectPokemonFromName(n);
      this.cdr.detectChanges();
    });
  }

  evoClicked(evo: string, direction: string, index: number) {
    if (this.current_mon) {
      if (evo == 'unknown') {
        if (direction == 'next') {
          this.current_mon.next_evos_revealed.push(index);
          let next_mon = this.stringToPokemon(
            this.current_mon.next_evos[index]
          );
          if (next_mon) {
            let back_index = next_mon.prev_evos.indexOf(this.current_mon.name);
            next_mon.prev_evos_revealed.push(back_index);
          }
        } else if (direction == 'prev') {
          this.current_mon.prev_evos_revealed.push(index);
          let next_mon = this.stringToPokemon(
            this.current_mon.prev_evos[index]
          );
          if (next_mon) {
            let back_index = next_mon.next_evos.indexOf(this.current_mon.name);
            next_mon.next_evos_revealed.push(back_index);
          }
        }
        this.dex.individualChanges.next(this.current_mon);
      } else this.dex.monSelection.next(evo);
    }
  }

  locationsClicked() {
    if(this.current_mon) {
      this.current_mon.locations_revealed = !this.current_mon.locations_revealed;
      this.dex.individualChanges.next(this.current_mon);
    }
  }

  selectPokemonFromName(selected: string) {
    let mon = this.stringToPokemon(selected);
    this.updateCurrentMon(mon);
  }

  private stringToPokemon(selected: string): Pokemon | undefined {
    return this.dex.pokedex.find(
      (mon) => mon.name.toLowerCase() == selected.toLowerCase()
    );
  }

  private updateCurrentMon(mon: Pokemon | undefined) {
    if (mon) {
      this.mon_selected = true;
      this.current_mon = mon;
      // Also maybe split this into a method as well
      this.refreshChart();
      //
      this.search_box.value = '';
      this.ctrl.setValue('');
    }
  }

  private refreshChart() {
    if (this.current_mon) {
      this.chart.data.datasets[0].data = this.current_mon.getStatsIfRevealed();
      this.chart.data.labels = this.current_mon.special
        ? ['HP', 'Attack', 'Defense', 'Special', 'Speed']
        : ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
      this.chart.options.plugins!.title!.text =
        'BST : ' +
        (this.current_mon &&
        (this.current_mon.bst_revealed ||
          this.current_mon.stats_revealed ||
          this.current_mon.fully_revealed)
          ? this.current_mon.bst()
          : '???');
      this.chart.update();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
