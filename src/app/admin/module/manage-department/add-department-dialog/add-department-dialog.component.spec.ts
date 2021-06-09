import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeparmentDialogComponent } from './add-department-dialog.component';

describe('AddDepartmentDialogComponent', () => {
  let component: AddDeparmentDialogComponent;
  let fixture: ComponentFixture<AddDeparmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeparmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeparmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
