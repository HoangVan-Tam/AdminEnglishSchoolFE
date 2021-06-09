import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeparmentDialogComponent } from './edit-department-dialog.component';

describe('EditDepartmentDialogComponent', () => {
  let component: EditDeparmentDialogComponent;
  let fixture: ComponentFixture<EditDeparmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeparmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeparmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
