import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegisterCourseDialogComponent } from './add-registercourse-dialog.component';

describe('AddRegisterCourseDialogComponent', () => {
  let component: AddRegisterCourseDialogComponent;
  let fixture: ComponentFixture<AddRegisterCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegisterCourseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegisterCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
