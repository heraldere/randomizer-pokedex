import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueryBuilderClassNames, QueryBuilderConfig } from 'angular2-query-builder';

@Component({
  selector: 'app-filter-dialog-content',
  templateUrl: './filter-dialog-content.component.html',
  styleUrls: ['./filter-dialog-content.component.scss']
})
export class FilterDialogContentComponent implements OnInit {
  public query = {
    condition: 'and',
    rules: [
      { field: 'hp', operator: '>=', value: '32' },
      {
        condition: 'or',
        rules: [
          {field: 'type', operator: '=', value: 'fire'},
          {field: 'type', operator: '=', value: 'grass'},
        ]
      }
    ]
  };

  public config: QueryBuilderConfig = {
    fields: {
      hp: {name: 'HP', type: 'number'},
      attack: {name: 'Attack', type: 'number'},
      sp_attack: {name: 'Special Attack', type: 'number'},
      defense: {name: 'Defense', type: 'number'},
      sp_defense: {name: 'Special Defense', type: 'number'},
      total: { name: 'Total Stats', type: 'number' },
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
      }
    }
  }

  constructor(
    public dialogRef: MatDialogRef<FilterDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    
    console.log(this.data);
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

}
