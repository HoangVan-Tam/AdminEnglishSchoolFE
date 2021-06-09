import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruitmentDialogComponent } from './add-recruitment-dialog.component';

describe('AddRecruitmentDialogComponent', () => {
  let component: AddRecruitmentDialogComponent;
  let fixture: ComponentFixture<AddRecruitmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecruitmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecruitmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
