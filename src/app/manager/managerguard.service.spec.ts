import { TestBed } from '@angular/core/testing';

import { ManagerguardService } from './managerguard.service';

describe('ManagerguardService', () => {
  let service: ManagerguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
