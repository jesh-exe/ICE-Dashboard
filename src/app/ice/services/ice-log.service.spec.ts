import { TestBed } from '@angular/core/testing';

import { IceLogService } from './ice-log.service';

describe('IceLogService', () => {
  let service: IceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
