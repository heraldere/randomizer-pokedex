import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.scss']
})
export class CardsViewComponent implements OnInit {

  public showA: boolean = false;
  public showB: boolean = true;
  public showC: boolean = false;
  public selectedTab: string = 'summaryTab';

  constructor() { }

  ngOnInit(): void {
  }

}
