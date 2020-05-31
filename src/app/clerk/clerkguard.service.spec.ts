import { TestBed } from '@angular/core/testing';

import { ClerkguardService } from './clerkguard.service';

describe('ClerkguardService', () => {
  let service: ClerkguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerkguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
