import { TestBed } from '@angular/core/testing';

import { BigDataService } from './big-data.service';

describe('BigDataService', () => {
  let service: BigDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
