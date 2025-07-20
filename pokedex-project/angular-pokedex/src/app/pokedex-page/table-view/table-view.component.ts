import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FilterDialogContentComponent } from './filter-dialog-content/filter-dialog-content.component';
import { PokedexService,  } from '../../pokedex.service';
import { Pokemon, PokeType } from "../../Pokemon";

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { API, APIDefinition, Event} from 'ngx-easy-table';
import { CategoryOperators, filterDataByQueryTree, IPokeQuery, NumberOperators } from './queryUtility';
// import { stringify } from 'querystring';

enum SortableColumn {
  hp = 'hp',
  attack = 'attack',
  defense = 'defense',
  sp_attack = 'sp_attack',
  sp_defense = 'sp_defense',
  speed = 'speed',
  stat_total = 'stat_total',
  name = 'name',
  uid = 'uid',
  type1 = 'type1',
  type2 = 'type2',
  none = 'none'
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent implements OnInit, AfterViewInit{

  @ViewChild('tableTemplate', { static: true }) tableTemplate: APIDefinition | undefined;

  public configuration: Config;
  public columns: Columns[];
  public dialogOpen = false;

  public filteredData: Pokemon[] = [];
  private _pokedexService: PokedexService;
  private sortedColumn: SortableColumn;

  private lastSortedKey = '';
  private lastSortedOrder = '';
  
  public _query: IPokeQuery = {
    condition: 'and',
    rules: [
      // { field: 'hp', operator: NumberOperators.leq, value: '32' },
      // {
      //   condition: 'or',
      //   rules: [
      //     {field: 'type', operator: NumberOperators.eq, value: PokeType.Fire},
      //     {field: 'type', operator: CategoryOperators.in, value: [PokeType.Grass, PokeType.Bug]},
      //   ]
      // }
    ]
  };

  constructor(public pokedexService: PokedexService, public dialog : MatDialog) { 
    this.configuration = { ...DefaultConfig };
    // this.configuration.threeWaySort = true;
    // this.configuration.orderEventOnly = true;
    // this.configuration.orderEnabled = true;
    // this.configuration.searchEnabled = true;
    // this.hpTemplate 
    // ... etc.
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'uid', title: 'Id'},
      { key: 'type1', title: 'Type 1' },
      { key: 'type2', title: 'Type 2'},
      { key: 'stat_total', title: 'Total' },
      { key: 'hp', title: 'HP'},
      { key: 'attack', title: 'Attack'},
      { key: 'defense', title: 'Defense'},
      { key: 'sp_attack', title: 'Special Attack'},
      { key: 'sp_defense', title: 'Special Defense'},
      { key: 'speed', title: 'Speed'},
    ];
    this._pokedexService = pokedexService;
    this.filteredData = this._pokedexService.pokedex;
    this.sortedColumn = SortableColumn.none;
  }

  ngOnInit(): void {
    this.refreshTable();
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
        // console.log("after close", this.query);
      });
    }

  }

  private set query(result: IPokeQuery) {
    // TODO any protection or adjustments needed?
    if (result) {
      this._query = result;
      this.refreshTable();
      // this.filteredData = filterDataByQueryTree(this._pokedexService.pokedex, this.query);
    }
    
  }

  private get query(): IPokeQuery {
    return this._query;
  }

  
  ngAfterViewInit(): void {
    //TODO: Subscribe to the dex service (specifically dex changed subject)
    this.pokedexService.dexChanges.subscribe(
      () => {
        this.refreshTable();
      }
    )
    //TODO: Subscribe to individual revelation
    this.pokedexService.individualChanges.subscribe(
      () => {
        this.refreshTable();
      }
    )

    // if(this.pokedexService.validDexUploaded)
    //   this.pokedexService.dexChanges.next();
  }

  refreshTable() {
    let initialdata = this.filterDataInitialPass();
    this.filteredData = filterDataByQueryTree(initialdata, this.query);
  }

  filterDataInitialPass() {
    // If a Pokemon is revealed at all, show them in the table
    let res = this.pokedexService.pokedex.filter(mon => {
      return  mon.fully_revealed
      ||      mon.abilities_revealed
      ||      mon.stats_revealed 
      ||      mon.type_revealed
      ||      mon.bst_revealed;
    });



    return res;
  }

  rowClick(name: string|undefined) {
    if(name){
      this._pokedexService.selectPokemon(name);
    }
  }

  eventEmitted($event: { event: string; value: any }) {
    if ($event.event === Event.onOrder) {
      console.log($event)
      // console.log('aaa')
      // if($event.value.key as SortableColumn == SortableColumn.uid) {
      //   this.filteredData = [
      //     ...this.filteredData.sort((a, b) => a.uid.localeCompare(b.uid))
      //   ]
      // }

      // if(this.lastSortedKey == ($event.value.key as string) && this.lastSortedOrder == ($event.value.order as string) ) {
      //   return;
      // }
      // this.lastSortedKey = ($event.value.key as string)
      // this.lastSortedOrder = ($event.value.order as string)
      // this.sortedColumn = $event.value.key as SortableColumn
      // console.log("Key: ", $event.value.key, " Order: ", $event.value.order, " Model Value: ", this.sortedColumn == SortableColumn.uid)
      // // this.refreshTable()
    }
  }

}
