import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokedexService } from 'src/app/pokedex.service';

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
  @ViewChild('downloadButton')
  downloadRef!: ElementRef;
  dex: PokedexService;

  constructor(dex : PokedexService) { 
    this.dex = dex;
  }

  onFileSelected(e: Event) {
    const target= e.target as HTMLInputElement;
    const files = target?.files;
    const file:File|null = files && files[0];

    if (file) {
      this.dex.readSelectedFile(file);
    }

  }

  //Kinda cheeky, but the anchor element's click event will occur after the button's so the download begins immediately after we set the href
  // Is this a race? beats me :)
  save() {
    let dexString = JSON.stringify(
      {
        pokedex: this.dex.pokedex
      });
    this.downloadRef.nativeElement.href='data:text/plain;charset=utf-8,' + encodeURIComponent(dexString);
  }

  spoil() {
    if(this.dex.isFullyRevealed) {
      this.dex.hideAll();
    } else {
      this.dex.revealAll();
    }
  }

  spoilBSTs() {
    if(this.dex.allBSTRevealed) {
      this.dex.hideBSTs();
    } else {
      this.dex.revealBSTs();
    }
  }

  spoilTypes() {
    if(this.dex.allTypesRevealed) {
      this.dex.hideTypes();
    } else {
      this.dex.revealTypes();
    }
  }

  spoilAbilities() {
    if(this.dex.allAbilitiesRevealed) {
      this.dex.hideAbilities();
    } else {
      this.dex.revealAbilities();
    }
  }

  ngOnInit(): void {
  }

}
