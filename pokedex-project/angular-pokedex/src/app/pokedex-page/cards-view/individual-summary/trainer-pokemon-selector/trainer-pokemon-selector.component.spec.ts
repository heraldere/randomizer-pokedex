import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPokemonSelectorComponent } from './trainer-pokemon-selector.component';

describe('TrainerPokemonSelectorComponent', () => {
  let component: TrainerPokemonSelectorComponent;
  let fixture: ComponentFixture<TrainerPokemonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerPokemonSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerPokemonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
