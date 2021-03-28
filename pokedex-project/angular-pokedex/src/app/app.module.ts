import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PokedexPageComponent } from './pokedex-page/pokedex-page.component';
import { TableViewComponent } from './pokedex-page/table-view/table-view.component';
import { CardsViewComponent } from './pokedex-page/cards-view/cards-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PokedexPageComponent,
    TableViewComponent,
    CardsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
