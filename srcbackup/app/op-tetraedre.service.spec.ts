import { TestBed } from '@angular/core/testing';

import { OpTetraedreService } from './op-tetraedre.service';

describe('OpTetraedreService', () => {
  let service: OpTetraedreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpTetraedreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
