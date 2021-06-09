import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvisoryComponent } from './manage-advisory.component';

describe('ManageAdvisoryComponent', () => {
  let component: ManageAdvisoryComponent;
  let fixture: ComponentFixture<ManageAdvisoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvisoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
