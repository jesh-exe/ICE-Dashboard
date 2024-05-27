import { TestBed } from '@angular/core/testing';

import { SearchStateServiceService } from './search-state-service.service';

describe('SearchStateServiceService', () => {
  let service: SearchStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
