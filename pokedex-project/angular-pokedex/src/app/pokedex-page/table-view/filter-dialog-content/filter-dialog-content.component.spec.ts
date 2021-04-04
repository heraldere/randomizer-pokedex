import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogContentComponent } from './filter-dialog-content.component';

describe('FilterDialogContentComponent', () => {
  let component: FilterDialogContentComponent;
  let fixture: ComponentFixture<FilterDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
