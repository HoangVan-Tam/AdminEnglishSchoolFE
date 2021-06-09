import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScoreDialogComponent } from './edit-score-dialog.component';

describe('EditScoreDialogComponent', () => {
  let component: EditScoreDialogComponent;
  let fixture: ComponentFixture<EditScoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScoreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
