import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpPatternComponent } from './op-pattern.component';

describe('OpPatternComponent', () => {
  let component: OpPatternComponent;
  let fixture: ComponentFixture<OpPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
