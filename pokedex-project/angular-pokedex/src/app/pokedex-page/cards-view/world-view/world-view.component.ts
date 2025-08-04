import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokedexService } from 'src/app/pokedex.service';
import { Pokemon } from 'src/app/Pokemon';
import {Chart, ChartConfiguration, registerables} from 'chart.js'
import { bstHistogramConfig, binBSTs } from './chart-configs/bst-histogram.config';
import { statRatioHistogramConfig, binStatRatios } from './chart-configs/stat-ratio-histogram.config';
import { statValueHistogramConfig, binStatValues, getStatValue} from './chart-configs/stat-histogram.config';
Chart.register(...registerables);
Chart.defaults.color = "#cfcfcf";



@Component({
  selector: 'world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.scss']
})
export class WorldViewComponent implements OnInit, AfterViewInit {
    pokedex: PokedexService;
    workingList: Pokemon[] | undefined;
    stats: string[] = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
    count: number;
    cdr: ChangeDetectorRef;
    @ViewChild('BSTChart') bstChartRef !: ElementRef;
    @ViewChild('StatRatioChart') statRatioChartRef !: ElementRef;
    @ViewChild('StatChart') statChartRef !: ElementRef;
    bstChart: Chart | undefined;
    statChart: Chart | undefined;
    statRatioChart: Chart | undefined;
    selectedStat: string = 'hp';
    currentChart: string = 'BST';

  constructor(dex: PokedexService, cdr: ChangeDetectorRef) {
    this.pokedex = dex;
    this.count=dex.pokedex.length;
    this.cdr = cdr;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bstChart = new Chart(this.bstChartRef.nativeElement, bstHistogramConfig)
    this.pokedex.filterChanges.subscribe(filteredList => {
      this.stats = this.pokedex.pokedex[0].special 
        ? ['hp', 'attack', 'defense', 'special', 'speed'] 
        : ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
      this.refreshCharts(filteredList);
      this.cdr.detectChanges();
    })
  }

  switchChartDisplay(chartName: string) {
    this.currentChart = chartName
    this.cdr.detectChanges();
    switch (chartName) {
      case 'BST':
        if(!this.bstChart) {
          this.bstChart = new Chart(this.bstChartRef.nativeElement, bstHistogramConfig)
        }
        break;
      case 'Stat':
        if(!this.statChart) {
          this.statChart = new Chart(this.statChartRef.nativeElement, statValueHistogramConfig)
          this.workingList && (this.statChart.data.datasets[0].data=binStatValues(this.workingList, this.selectedStat))
          this.statChart.update();
        }
        break;
      case 'Ratio':
        if(!this.statRatioChart) {
          this.statRatioChart = new Chart(this.statRatioChartRef.nativeElement, statRatioHistogramConfig)
          this.workingList && (this.statRatioChart.data.datasets[0].data=binStatRatios(this.workingList))
          this.statRatioChart.update();
        }
        break;
    }
    // if(this.workingList) {
    //   this.refreshCharts(this.workingList);
    // }
  }

  refreshCharts(pokemonList: Pokemon[]) {
    if(this.workingList === pokemonList) {
      // console.log("Skipping Work")
      return
    }
    this.workingList = pokemonList;
    if(this.bstChart) {
      this.bstChart.data.datasets[0].data = binBSTs(pokemonList)
      this.bstChart.update();
    }
    if(this.statChart) {
      if(pokemonList.length > 0 && getStatValue(pokemonList[0], this.selectedStat) === 0) {
        this.selectedStat = 'hp'
      }
      this.statChart.data.datasets[0].data=binStatValues(pokemonList, this.selectedStat)
      this.statChart.update();
    }
    if(this.statRatioChart) {
      this.statRatioChart.data.datasets[0].data=binStatRatios(pokemonList);
      this.statRatioChart.update();
    }
  }

  friendlyStatName(statAbb: string): string {
    switch(statAbb) {
      case 'sp_attack':
        return 'special attack'
      case 'sp_defense':
        return 'special defense'
      default:
        return statAbb
    }
  }

  onStatSelect(target: EventTarget | null) {
    if(target && (target as HTMLSelectElement).value) {
      let stat=(target as HTMLSelectElement).value
      if(stat) {
        this.selectedStat=stat;
        if(this.statChart && this.workingList) {
          this.statChart.data.datasets[0].data=binStatValues(this.workingList, this.selectedStat)
          this.statChart.update();
        }
      }
    }
  }

  revealTMByIndex(idx: number) {
    let tm = this.pokedex.tmIds[idx];
    if(!this.pokedex.revealedTMs.includes(tm)) {
      this.pokedex.revealTMForAll(tm);
    }
    else {
      this.pokedex.hideTMForAll(tm);
    }
  }

}
