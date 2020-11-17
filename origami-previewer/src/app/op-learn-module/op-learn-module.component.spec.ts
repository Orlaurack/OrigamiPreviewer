import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpLearnModuleComponent } from './op-learn-module.component';

describe('OpLearnModuleComponent', () => {
  let component: OpLearnModuleComponent;
  let fixture: ComponentFixture<OpLearnModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpLearnModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpLearnModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
