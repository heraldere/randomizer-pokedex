import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSummaryComponent } from './individual-summary.component';

describe('IndividualSummaryComponent', () => {
  let component: IndividualSummaryComponent;
  let fixture: ComponentFixture<IndividualSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
