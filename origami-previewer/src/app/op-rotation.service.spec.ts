import { TestBed } from '@angular/core/testing';

import { RotationService } from './op-rotation.service';

describe('RotationService', () => {
  let service: RotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
