import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentOfStudentDialogComponent } from './edit-studentofparent-dialog.component';

describe('EditStudentOfStudentDialogComponent', () => {
  let component: EditStudentOfStudentDialogComponent;
  let fixture: ComponentFixture<EditStudentOfStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentOfStudentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentOfStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
