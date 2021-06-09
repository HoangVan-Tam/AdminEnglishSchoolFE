import { TestBed } from '@angular/core/testing';

import { ManageDepartmentService } from './manage-department.service';

describe('ManageDepartmentService', () => {
  let service: ManageDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
