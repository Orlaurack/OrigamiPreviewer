import { TestBed } from '@angular/core/testing';

import { SolidStarService } from './op-solid-star.service';

describe('SolidService', () => {
  let service: SolidStarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidStarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
