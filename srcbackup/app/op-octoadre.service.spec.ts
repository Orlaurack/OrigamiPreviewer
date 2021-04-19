import { TestBed } from '@angular/core/testing';

import { OpOctaedreService } from './op-octoadre.service';

describe('OpOctaedreService', () => {
  let service: OpOctaedreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpOctaedreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
