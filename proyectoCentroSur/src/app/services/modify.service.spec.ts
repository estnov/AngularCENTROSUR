import { TestBed } from '@angular/core/testing';

import { ModifyService } from './modify.service';

describe('ModifyService', () => {
  let service: ModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
