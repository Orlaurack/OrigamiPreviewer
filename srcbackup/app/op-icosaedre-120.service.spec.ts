import { TestBed } from '@angular/core/testing';

import { OpIcosaedre120Service } from './op-icosaedre-120.service';

describe('OpIcosaedre120Service', () => {
  let service: OpIcosaedre120Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpIcosaedre120Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
