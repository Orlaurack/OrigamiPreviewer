import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpColorSelectionComponent } from './op-color-selection.component';

describe('OpColorSelectionComponent', () => {
  let component: OpColorSelectionComponent;
  let fixture: ComponentFixture<OpColorSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpColorSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpColorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
