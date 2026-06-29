import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersViewComponent } from './trainers-view.component';

describe('TrainersViewComponent', () => {
  let component: TrainersViewComponent;
  let fixture: ComponentFixture<TrainersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
