import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpColorPickerComponent } from './op-color-picker.component';

describe('OpColorPickerComponent', () => {
  let component: OpColorPickerComponent;
  let fixture: ComponentFixture<OpColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
