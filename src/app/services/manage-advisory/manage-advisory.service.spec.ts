import { TestBed } from '@angular/core/testing';

import { ManageAdvisoryService } from './manage-advisory.service';

describe('ManageAdvisoryService', () => {
  let service: ManageAdvisoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAdvisoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
