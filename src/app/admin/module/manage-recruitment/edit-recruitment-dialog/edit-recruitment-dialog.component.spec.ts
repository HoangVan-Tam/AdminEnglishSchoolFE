import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecruitmentDialogComponent } from './edit-recruitment-dialog.component';

describe('EditRecruitmentDialogComponent', () => {
  let component: EditRecruitmentDialogComponent;
  let fixture: ComponentFixture<EditRecruitmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecruitmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecruitmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
