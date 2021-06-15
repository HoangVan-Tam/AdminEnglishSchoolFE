import { TestBed } from '@angular/core/testing';

import { ManageClassService } from './manage-course.service';

describe('ManageClassService', () => {
  let service: ManageClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
