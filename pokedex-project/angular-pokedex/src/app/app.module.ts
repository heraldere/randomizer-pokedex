import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PokedexPageComponent } from './pokedex-page/pokedex-page.component';
import { TableViewComponent } from './pokedex-page/table-view/table-view.component';
import { CardsViewComponent } from './pokedex-page/cards-view/cards-view.component';

import { TableModule } from 'ngx-easy-table';
import { FilterDialogContentComponent } from './pokedex-page/table-view/filter-dialog-content/filter-dialog-content.component';
import { QueryBuilderModule } from "angular2-query-builder";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IndividualSummaryComponent } from './pokedex-page/cards-view/individual-summary/individual-summary.component';
import { TeamBuilderComponent } from './pokedex-page/cards-view/team-builder/team-builder.component';
import { VsSummaryComponent } from './pokedex-page/cards-view/vs-summary/vs-summary.component';
import { CardComponent } from './pokedex-page/cards-view/card/card.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { WorldViewComponent } from './pokedex-page/cards-view/world-view/world-view.component';

@NgModule({
    exports: [
        QueryBuilderModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        PokedexPageComponent,
        TableViewComponent,
        CardsViewComponent,
        FilterDialogContentComponent,
        IndividualSummaryComponent,
        TeamBuilderComponent,
        VsSummaryComponent,
        CardComponent,
        AboutPageComponent,
        WorldViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        MatDialogModule,
        MatTabsModule,
        BrowserAnimationsModule,
        QueryBuilderModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
