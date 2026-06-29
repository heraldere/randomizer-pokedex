import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpPanelComponent } from './tp-panel.component';

describe('TpPanelComponent', () => {
  let component: TpPanelComponent;
  let fixture: ComponentFixture<TpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
