import { TestBed } from '@angular/core/testing';

import { ManageParentService } from './manage-parent.service';

describe('ManageEventService', () => {
  let service: ManageParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageParentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
