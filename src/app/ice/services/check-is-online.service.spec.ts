import { TestBed } from '@angular/core/testing';

import { CheckIsOnlineService } from './check-is-online.service';

describe('CheckIsOnlineService', () => {
  let service: CheckIsOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIsOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
