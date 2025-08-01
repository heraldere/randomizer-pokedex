import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueryBuilderClassNames, QueryBuilderConfig } from 'angular2-query-builder';
import { IPokeQuery } from '../queryUtility';

@Component({
  selector: 'app-filter-dialog-content',
  templateUrl: './filter-dialog-content.component.html',
  styleUrls: ['./filter-dialog-content.component.scss']
})
export class FilterDialogContentComponent implements OnInit {

  public config: QueryBuilderConfig = {
    fields: {
      hp: {name: 'HP', type: 'number'},
      attack: {name: 'Attack', type: 'number'},
      sp_attack: {name: 'Special Attack', type: 'number'},
      defense: {name: 'Defense', type: 'number'},
      sp_defense: {name: 'Special Defense', type: 'number'},
      speed: {name: 'Speed', type: 'number'},
      stat_total: { name: 'Total Stats', type: 'number' },
      type: {
        name: 'Type',
        type: 'category',
        options: [
          {name: 'Normal', value: 'normal'},
          {name: 'Fire', value: 'fire'},
          {name: 'Fighting', value: 'fighting'},
          {name: 'Water', value: 'water'},
          {name: 'Flying', value: 'flying'},
          {name: 'Grass', value: 'grass'},
          {name: 'Poison', value: 'poison'},
          {name: 'Electric', value: 'electric'},
          {name: 'Ground', value: 'ground'},
          {name: 'Psychic', value: 'psychic'},
          {name: 'Rock', value: 'rock'},
          {name: 'Ice', value: 'ice'},
          {name: 'Bug', value: 'bug'},
          {name: 'Dragon', value: 'dragon'},
          {name: 'Ghost', value: 'ghost'},
          {name: 'Dark', value: 'dark'},
          {name: 'Steel', value: 'steel'},
          {name: 'Fairy', value: 'fairy'}
        ]
      },
      ability: {
        name: 'Ability',
        type: 'string',
        operators: ['=', '!=']
      },
      move: {
        name: 'Move',
        type: 'string',
        operators: ['has']
      },
      evolution: {
        name: 'Evolution Status',
        type: 'category',
        operators: ['is', 'is not'],
        options: [
          {name: 'Fully Evolved', value: 'fullyevolved'},
          {name: 'Base Evolution', value: 'baseevo'},
        ]
      }
    }
  }

  constructor(
    public dialogRef: MatDialogRef<FilterDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPokeQuery) { 
      // console.log("dialog data", this.data);
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    // console.log(this.data);
    this.dialogRef.close();
  }

}
