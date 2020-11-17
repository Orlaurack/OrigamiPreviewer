import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpCanvasScreenComponent } from './op-canvas-screen.component';

describe('OpCanvasScreenComponent', () => {
  let component: OpCanvasScreenComponent;
  let fixture: ComponentFixture<OpCanvasScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpCanvasScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpCanvasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
