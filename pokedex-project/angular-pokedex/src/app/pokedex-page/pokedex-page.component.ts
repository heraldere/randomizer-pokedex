import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss']
})
export class PokedexPageComponent implements OnInit, AfterViewInit{

  dex: PokedexService

  constructor(dex: PokedexService) {
    this.dex = dex;
   }

  ngOnInit(): void {
    // if(!this.dex.validDexUploaded) {
    //   this.dex.loadDefaultData();
    // }
  }

  ngAfterViewInit(): void {
    

  }

}
