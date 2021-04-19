import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpSettingsComponent } from './op-settings.component';

describe('SettingsComponent', () => {
  let component: OpSettingsComponent;
  let fixture: ComponentFixture<OpSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
