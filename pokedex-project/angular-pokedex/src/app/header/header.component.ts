import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private dexService: PokedexService;
  backgroundColorToggle = false;

  constructor(dexService: PokedexService) {
    this.dexService = dexService;
  }

  ngOnInit(): void {
  }

  toggleBackground() {
    if(this.backgroundColorToggle) {
      document.body.style.backgroundColor = "#222222"
      this.backgroundColorToggle = false;
    } else {
      document.body.style.backgroundColor = "#222245"
      this.backgroundColorToggle = true;
    }
  }

}
