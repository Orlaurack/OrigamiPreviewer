import { TestBed } from '@angular/core/testing';

import { OpIcosaedreService } from './op-icosaedre.service';

describe('OpIcosaedreService', () => {
  let service: OpIcosaedreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpIcosaedreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
