import { TestBed } from '@angular/core/testing';

import { ListFullService } from './list-full.service';

describe('ListFullService', () => {
  let service: ListFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
