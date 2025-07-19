import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { PokedexService } from 'src/app/pokedex.service';
import { Pokemon } from "src/app/Pokemon";
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent , MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {Chart, registerables} from 'chart.js'
import { MatInput } from '@angular/material/input';
Chart.register(...registerables);
Chart.defaults.color = "#cfcfcf";

@Component({
  selector: 'individual-card',
  templateUrl: './individual-summary.component.html',
  styleUrls: ['./individual-summary.component.scss']
})
export class IndividualSummaryComponent implements OnInit, AfterViewInit{

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
  


  constructor(dex: PokedexService) {
    this.dex = dex;
    this.pokes_filtered_by_text = this.ctrl.valueChanges.pipe(
      startWith(''),
      map(search_text => this.searchMons(search_text))
    )
  }
   
  searchMons(search_text: string): string[] {
    return this.dex.pokedex.map(mon => mon.name).filter(name => name.toLowerCase().indexOf(search_text.toLowerCase()) !== -1)
  }

  toggleTypeRevealButton() {
    if(this.current_mon) {
      this.current_mon.type_revealed = !this.current_mon.type_revealed;
      this.dex.individualChanges.next(this.current_mon)
    }
  }

  toggleStatRevealButton() {
    if(this.current_mon) {
      this.current_mon.stats_revealed = !this.current_mon.stats_revealed;
      this.dex.individualChanges.next(this.current_mon);
      // this.chart.data.datasets[0].data = this.current_mon.getStatsIfRevealed();
      // this.chart.options.plugins!.title!.text = "BST : " + (this.current_mon && this.current_mon.stats_revealed? this.current_mon.bst(): "???");
      // this.chart.update();
    }
  }

  toggleAbilityRevealButton() {
    if(this.current_mon) {
      this.current_mon.abilities_revealed = !this.current_mon.abilities_revealed;
      this.dex.individualChanges.next(this.current_mon)
    }
  }


  revealMovesToIndex(i: number) {
    if(this.current_mon)
      this.current_mon.learned_moves_revealed_idx=i+1;
  }

  
  revealTMAtIndex(i: number) {
    if(this.current_mon) {
      let tm = this.current_mon.tms[i]
      if(!this.dex.revealedTMs.includes(tm)) {
        this.dex.revealedTMs.push(this.current_mon.tms[i])
        this.dex.revealTMForAll(tm);
      }
      else {
        this.dex.revealedTMs.splice(this.dex.revealedTMs.indexOf(tm), 1);
        this.dex.hideTMForAll(tm);
      }
    }
  }

  toggleTMs() {
    this.tms_shown = !this.tms_shown;
  }

  sanitizePokemonName(name: String): String {
    return name.replace(':','').replace('\u2640', 'f').replace('\u2642', 'm').toLowerCase();
  }


  ngOnInit(): void {
    
  }
  // "https://www.serebii.net/swordshield/pokemon/289.png"
  // "https://www.serebii.net/games/type/poison.gif"

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
        datasets: [{
          data: this.current_mon? this.current_mon.getStatsIfRevealed() :[0,0,0,0,0,0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 92, 0.8)',
            // '#ffbde0'
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1,
          maxBarThickness: 20,
          
        }]
        
      },
      options: {
        color: '#cfcfcf',
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            min: 0,
            max: 255,
            grid:{
              borderColor:'#cfcfcf',
              color: '#cfcfcf',
            },            
          },
          y: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            font: {
              size: 20
            },
            display: true,
            text: "BST : " + (this.current_mon && this.current_mon.stats_revealed? this.current_mon.bst(): "???")
          }
        }
      },
    });
    this.maut.optionSelected
      .pipe(
        map(
          ev => {
            let selected = ev.option.value as string;
            return this.stringToPokemon(selected);
          }
        )
      )
      .subscribe(
        mon=>this.updateCurrentMon(mon)
      );



    this.dex.individualChanges.subscribe(
      mon => {
        // console.log("ichange");
        if(this.current_mon && this.current_mon.name.toLowerCase() == mon.name.toLowerCase()) {
          this.refreshChart();
        }
      }
    );

    this.dex.dexChanges.subscribe(
      () => {
        // console.log("wechange");
        this.ctrl.setValue('');
        if(this.current_mon) {
          
          this.refreshChart();
        }
      }
    )

    this.dex.monSelection.subscribe(
      n => this.selectPokemonFromName(n)
    )
  }

  //TODO:
  evoClicked(evo: string, direction: string, index: number) {
    if(this.current_mon){
      if(evo=="unknown") {
        if(direction=='next'){
          this.current_mon.next_evos_revealed.push(index);
          let next_mon = this.stringToPokemon(this.current_mon.next_evos[index])
          if(next_mon) {
            let back_index = next_mon.prev_evos.indexOf(this.current_mon.name)
            next_mon.prev_evos_revealed.push(back_index)
          }
        } else {
          this.current_mon.prev_evos_revealed.push(index);
          let next_mon = this.stringToPokemon(this.current_mon.prev_evos[index])
          if(next_mon) {
            let back_index = next_mon.next_evos.indexOf(this.current_mon.name)
            next_mon.next_evos_revealed.push(back_index)
          }
        }
        this.refreshChart();
      }
      else
        this.selectPokemonFromName(evo)
    }
  }

  selectPokemonFromName(selected: string) {
    let mon = this.stringToPokemon(selected)
    this.updateCurrentMon(mon)
  }

  private stringToPokemon(selected: string): Pokemon | undefined {
    return this.dex.pokedex.find(mon => mon.name.toLowerCase() == selected.toLowerCase());
  }

  private updateCurrentMon(mon: Pokemon|undefined) {
    if(mon) {
          this.mon_selected = true;
          this.current_mon = mon;
          // Also maybe split this into a method as well
          this.refreshChart();
          //
          this.search_box.value='';
          this.ctrl.setValue('');
        }
  }

  private refreshChart() {
    if(this.current_mon) {
      this.chart.data.datasets[0].data = this.current_mon.getStatsIfRevealed();
      this.chart.options.plugins!.title!.text = "BST : " + (this.current_mon && (this.current_mon.bst_revealed || this.current_mon.stats_revealed || this.current_mon.fully_revealed)? this.current_mon.bst() : "???");
      this.chart.update();
    }
  }
}
