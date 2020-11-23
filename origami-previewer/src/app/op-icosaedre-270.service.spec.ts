import { TestBed } from '@angular/core/testing';

import { OpIcosaedre270Service } from './op-icosaedre-270.service';

describe('OpIcosaedre270Service', () => {
  let service: OpIcosaedre270Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpIcosaedre270Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
