import { TestBed } from '@angular/core/testing';

import { OpUrlManagerService } from './op-url-manager.service';

describe('OpUrlManagerService', () => {
  let service: OpUrlManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpUrlManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
