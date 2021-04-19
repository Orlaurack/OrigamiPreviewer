import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpBackgroundComponent } from './op-background.component';

describe('OpBackgroundComponent', () => {
  let component: OpBackgroundComponent;
  let fixture: ComponentFixture<OpBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
