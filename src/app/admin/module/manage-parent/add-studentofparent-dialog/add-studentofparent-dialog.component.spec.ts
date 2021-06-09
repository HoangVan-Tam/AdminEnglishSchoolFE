import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentOfParentDialogComponent } from './add-studentofparent-dialog.component';

describe('AddStudentDialogComponent', () => {
  let component: AddStudentOfParentDialogComponent;
  let fixture: ComponentFixture<AddStudentOfParentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentOfParentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentOfParentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
