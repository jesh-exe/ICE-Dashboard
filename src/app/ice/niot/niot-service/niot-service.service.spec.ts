import { TestBed } from '@angular/core/testing';

import { NiotServiceService } from './niot-service.service';

describe('NiotServiceService', () => {
  let service: NiotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
