import { TestBed } from '@angular/core/testing';

import { AntiAuthGuard } from './anti-auth.guard';

describe('AntiAuthGuard', () => {
  let guard: AntiAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AntiAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
