import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { PokedexService } from '../pokedex.service';
import { Observable } from 'rxjs';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dex: PokedexService;
  
  // TODO: This should be owned by the pokedex service
  validFileUploaded = false;
  @ViewChild('downloadButton')
  downloadRef!: ElementRef;
  router: Router;

  constructor(dex: PokedexService, router: Router) { 
    this.dex = dex;
    this.router = router;
  }

  ngOnInit(): void {
  }

  onFileSelected(e: Event) {
    const target= e.target as HTMLInputElement;
    const files = target?.files;
    const file:File|null = files && files[0];

    if (file) {
      this.validFileUploaded=false;
      this.dex.readSelectedFile(file);
      this.validFileUploaded=true;
      this.router.navigate(['/', 'pokedex']);
    }
  }

  detailButtonClicked() {
    this.router.navigate(['/', 'about'])
  }

  save() {
    let dexString = JSON.stringify(this.dex.pokedex);
    this.downloadRef.nativeElement.href='data:text/plain;charset=utf-8,' + encodeURIComponent(dexString);
  }

  // TODO: Add spoiler button! (May need to add subscription type thing to get it to work)
  spoilButtonClicked() {
    console.log("Nothing yet")
  }
  

}
