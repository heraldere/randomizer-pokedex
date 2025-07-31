import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokedexService } from 'src/app/pokedex.service';
import { Pokemon } from 'src/app/Pokemon';
import {Chart, ChartConfiguration, registerables} from 'chart.js'
import { bstHistogramConfig } from './chart-configs/bst-histogram.config';
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
    this.statChart = new Chart(this.statChartRef.nativeElement, statValueHistogramConfig)
    this.statRatioChart = new Chart(this.statRatioChartRef.nativeElement, statRatioHistogramConfig)
    this.pokedex.filterChanges.subscribe(filteredList => {
      this.stats = this.pokedex.pokedex[0].special 
        ? ['hp', 'attack', 'defense', 'special', 'speed'] 
        : ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
      this.refreshCharts(filteredList);
      this.cdr.detectChanges();
    })
  }

  refreshCharts(pokemonList: Pokemon[]) {
    this.workingList = pokemonList;
    if(this.bstChart) {
      let binSize = 20;
      let binMin = 200;
      let binMax = 900;
      let binCount = Math.ceil((binMax - binMin)/binSize);
      this.bstChart.data.datasets[0].data = pokemonList.reduce((bins, {stat_total}) => {
        const cappedBST = Math.min(stat_total, binMin + binSize * binCount - 1);
        const index = Math.floor((cappedBST - binMin) / binSize);
        bins[index]++;
        return bins;
      }, Array(binCount).fill(0))
      this.bstChart.data.labels = Array.from({ length: binCount }, (_, i) => {
        const min = binMin + i * binSize;
        const max = min + binSize - 1;
        return `${min}-${max}`;
      });

      this.bstChart.update();
    }
    if(this.statChart) {
      if(pokemonList.length > 0 && getStatValue(pokemonList[0], this.selectedStat) === 0) {
        this.selectedStat = 'hp'
        console.log("--In the Block--")
      }
      this.statChart.data.datasets[0].data=binStatValues(pokemonList, this.selectedStat)
      this.statChart.update();
    }
    if(this.statRatioChart) {
      this.statRatioChart.data.datasets[0].data=binStatRatios(pokemonList);
      this.statRatioChart.update();
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

  binBST(bst: number): number {
    return 0;
  }

}
