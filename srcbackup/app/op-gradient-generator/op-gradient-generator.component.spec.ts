import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpGradientGeneratorComponent } from './op-gradient-generator.component';

describe('OpGradientGeneratorComponent', () => {
  let component: OpGradientGeneratorComponent;
  let fixture: ComponentFixture<OpGradientGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpGradientGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpGradientGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
