import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentDialogComponent } from './add-parent-dialog.component';

describe('AddParentDialogComponent', () => {
  let component: AddParentDialogComponent;
  let fixture: ComponentFixture<AddParentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
