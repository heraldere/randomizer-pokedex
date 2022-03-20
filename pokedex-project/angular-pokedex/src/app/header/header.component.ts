import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private dexService: PokedexService;

  constructor(dexService: PokedexService) {
    this.dexService = dexService;
  }

  ngOnInit(): void {
  }

}
