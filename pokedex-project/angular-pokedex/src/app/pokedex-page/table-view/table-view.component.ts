import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';

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
  @ViewChild('filterButton') filterButton!: ElementRef<HTMLButtonElement>;

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

  constructor(public pokedexService: PokedexService, public dialog : MatDialog, private cdr: ChangeDetectorRef) { 
    this.configuration = { ...DefaultConfig };
    // this.configuration.threeWaySort = true;
    this.configuration.orderEventOnly = true;
    this.configuration.orderEnabled = true;
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
    this.filterButton.nativeElement.blur();
    if (!this.dialogOpen) { 
      this.dialogOpen = true;
      let dialogRef = this.dialog.open(FilterDialogContentComponent, {
        width: '550px',
        data: this.query,
        disableClose: false,
        hasBackdrop: true,
        autoFocus: false,
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
        if(this.pokedexService.pokedex.length>0 && this.pokedexService.pokedex[0].special) {
          this.columns = [
            { key: 'name', title: 'Name' },
            { key: 'uid', title: 'Id'},
            { key: 'type1', title: 'Type 1' },
            { key: 'type2', title: 'Type 2'},
            { key: 'stat_total', title: 'Total' },
            { key: 'hp', title: 'HP'},
            { key: 'attack', title: 'Attack'},
            { key: 'defense', title: 'Defense'},
            { key: 'special', title: 'Special'},
            { key: 'speed', title: 'Speed'},
          ];
        } else {
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
        }
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
    // console.log('---------REFRESHED-------------')
    let initialdata = this.filterDataInitialPass();
    this.filteredData = filterDataByQueryTree(initialdata, this.query);
    this.sortTable();
  }

  filterDataInitialPass() {
    // If a Pokemon is revealed at all, show them in the table
    let res = this.pokedexService.pokedex.filter(
      mon => { return true;
        // return  mon.fully_revealed
        // ||      mon.abilities_revealed
        // ||      mon.stats_revealed 
        // ||      mon.type_revealed
        // ||      mon.bst_revealed;
      }
    );



    return res;
  }

  rowClick(name: string|undefined) {
    if(name){
      this._pokedexService.selectPokemon(name);
    }
  }

  eventEmitted($event: { event: string; value: any }) {
    if ($event.event === Event.onOrder) {
      // console.log($event)
      const { key, order } = $event.value;
      this.lastSortedKey = key;
      this.lastSortedOrder = order;

      this.sortTable();

    }
  }


  private sortTable() {
    if(!this.lastSortedKey)
      this.lastSortedKey = 'uid';
    if(!this.lastSortedOrder)
      this.lastSortedOrder = 'asc';
    this.filteredData = [...this.filteredData.sort((a, b) => {
      const getValue = (row: any) => {
        if (this.lastSortedKey === 'stat_total') {
          return row.checkBSTRevealed() ? row.bst() : null;
        }
        if (['type1', 'type2'].includes(this.lastSortedKey)) {
          return row.checkTypeRevealed() ? row[this.lastSortedKey] : null;
        }
        if (['name', 'uid'].includes(this.lastSortedKey)) {
          return row[this.lastSortedKey] ?? null;
        }
        if (row.get_stat) {
          return row.get_stat(this.lastSortedKey) ?? null;
        }
        return row[this.lastSortedKey] ?? null;
      };

      const valA = getValue(a);
      const valB = getValue(b);

      const isHiddenA = valA === null || valA === '???' || valA === 0;
      const isHiddenB = valB === null || valB === '???' || valB === 0;

      // Push hidden values to bottom
      if (isHiddenA && !isHiddenB) return 1;
      if (!isHiddenA && isHiddenB) return -1;
      if (isHiddenA && isHiddenB) return a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);

      // Normal sort
      if (typeof valA === 'string') {
        return this.lastSortedOrder === 'asc'
          ? valA.localeCompare(valB) || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name)
          : valB.localeCompare(valA) || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);
      }

      return this.lastSortedOrder === 'asc'
        ? valA - valB || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name)
        : valB - valA || a.uid.localeCompare(b.uid) || a.name.localeCompare(b.name);
    })];
  }
}
