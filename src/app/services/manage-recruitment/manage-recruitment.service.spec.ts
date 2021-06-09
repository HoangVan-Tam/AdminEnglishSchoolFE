import { TestBed } from '@angular/core/testing';

import { ManageRecruitmentService } from './manage-recruitment.service';

describe('ManageRecruitmentService', () => {
  let service: ManageRecruitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRecruitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
