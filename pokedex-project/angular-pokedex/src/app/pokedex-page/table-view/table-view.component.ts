import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FilterDialogContentComponent } from './filter-dialog-content/filter-dialog-content.component';
import { PokedexService, Pokemon, PokeType } from '../../pokedex.service';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { API, APIDefinition } from 'ngx-easy-table';
import { CategoryOperators, filterDataByQueryTree, IPokeQuery, NumberOperators } from './queryUtility';



@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @ViewChild('tableTemplate', { static: true }) tableTemplate: APIDefinition | undefined;

  public configuration: Config;
  public columns: Columns[];
  public dialogOpen = false;

  public filteredData: Pokemon[] = [];
  private _pokedexService: PokedexService;
  
  public _query: IPokeQuery = {
    condition: 'and',
    rules: [
      { field: 'hp', operator: NumberOperators.leq, value: '32' },
      {
        condition: 'or',
        rules: [
          {field: 'type', operator: NumberOperators.eq, value: PokeType.Fire},
          {field: 'type', operator: CategoryOperators.in, value: [PokeType.Grass, PokeType.Bug]},
        ]
      }
    ]
  };

  constructor(public pokedexService: PokedexService, public dialog : MatDialog) { 
    this.configuration = { ...DefaultConfig };
    // this.configuration.searchEnabled = true;
    // this.hpTemplate 
    // ... etc.
    let statWidth = '10%';
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'long_id', title: 'Id' },
      { key: 'type1', title: 'Type 1' },
      { key: 'type2', title: 'Type 2'},
      { key: 'stat_total', title: 'Total' },
      { key: 'hp', title: 'HP', width: statWidth},
      { key: 'attack', title: 'Attack', width: statWidth},
      { key: 'defense', title: 'Defense', width: statWidth},
      { key: 'sp_attack', title: 'Special Attack', width: statWidth},
      { key: 'sp_defense', title: 'Special Defense', width: statWidth},
      { key: 'speed', title: 'Speed', width: statWidth},
    ];
    this._pokedexService = pokedexService;
    this.filteredData = this._pokedexService.pokedex;
  }

  ngOnInit(): void {

  }

  public openFilterTreeDialog(): void {
    if (!this.dialogOpen) { 
      this.dialogOpen = true;
      let dialogRef = this.dialog.open(FilterDialogContentComponent, {
        width: '550px',
        data: this.query,
        disableClose: false,
        hasBackdrop: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
        this.query = result;
        console.log("after close", this.query);
      });
    }

  }

  private set query(result: IPokeQuery) {
    // TODO any protection or adjustments needed?
    if (result) {
      this._query = result;
      this.filteredData = filterDataByQueryTree(this._pokedexService.pokedex, this.query);
    }
    
  }

  private get query(): IPokeQuery {
    return this._query;
  }

  

}
