import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { FilterDialogContentComponent } from './filter-dialog-content/filter-dialog-content.component';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  private dialogResult: any;
  public dialogOpen = false;

  public data = [{
    phone: '+1 (934) 551-2224',
    age: 20,
    address: { street: 'North street', number: 12 },
    company: 'ZILLANET',
    name: 'Valentine Webb',
    isActive: false,
  }, {
    phone: '+1 (948) 460-3627',
    age: 31,
    address: { street: 'South street', number: 12 },
    company: 'KNOWLYSIS',
    name: 'Heidi Duncan',
    isActive: true,
    }];
  
    
  
  constructor(public dialog : MatDialog) { 
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }

  ngOnInit(): void {

  }

  public openFilterTreeDialog(): void {
    if (!this.dialogOpen) { 
      this.dialogOpen = true;
      let dialogRef = this.dialog.open(FilterDialogContentComponent, {
        width: '550px',
        data: { name: "name", animal: "cow" }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
        this.dialogResult = result;
        console.log(this.dialogResult);
      });
    }

  }

}
