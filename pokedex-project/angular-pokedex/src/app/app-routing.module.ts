import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokedexPageComponent } from './pokedex-page/pokedex-page.component';
import { AboutPageComponent } from './about-page/about-page.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pokedex', component: PokedexPageComponent},
  { path: 'about', component: AboutPageComponent},
  { path: '', redirectTo:'/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
