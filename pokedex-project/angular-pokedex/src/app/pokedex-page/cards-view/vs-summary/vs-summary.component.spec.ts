import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsSummaryComponent } from './vs-summary.component';

describe('VsSummaryComponent', () => {
  let component: VsSummaryComponent;
  let fixture: ComponentFixture<VsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
