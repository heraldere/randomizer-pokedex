import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/pokedex.service';
import { TrainerPokemon } from 'src/app/Trainer';

@Component({
  selector: 'tp-panel',
  templateUrl: './tp-panel.component.html',
  styleUrls: ['./tp-panel.component.scss']
})
export class TpPanelComponent implements OnInit {

  @Input() trainer_pokemon!: TrainerPokemon;
  @Input() alt_forms: TrainerPokemon[] = [];
  dex: PokedexService;

  constructor(dex: PokedexService) {
    this.dex = dex;
  }

  ngOnInit(): void {
  }

  navigateToIndividualView(t_pokemon: TrainerPokemon) {
    let mon = this.dex.pokedexByName.get(t_pokemon.name);
    if(mon) {
      console.log("Starting nav");
      this.dex.navigation.iv_misc_selection = 'trainers';
      this.dex.selectPokemon(t_pokemon.name);
      this.dex.trainerPokemonSelection.next(t_pokemon);
      this.dex.updateCardNavigationSelection('summaryTab');
    }
  }

}
