import { Component, Input, OnInit } from '@angular/core';
import { TrainerPokemon } from 'src/app/Trainer';

@Component({
  selector: 'tp-panel',
  templateUrl: './tp-panel.component.html',
  styleUrls: ['./tp-panel.component.scss']
})
export class TpPanelComponent implements OnInit {

  @Input() trainer_pokemon!: TrainerPokemon;
  @Input() alt_forms: TrainerPokemon[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
