import { TestBed } from '@angular/core/testing';

import { SolidModuleService } from './op-solid-module.service';

describe('OpSolidModuleService', () => {
  let service: SolidModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
