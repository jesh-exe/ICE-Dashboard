import { TestBed } from '@angular/core/testing';

import { VcfService } from './vcf.service';

describe('VcfService', () => {
  let service: VcfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
