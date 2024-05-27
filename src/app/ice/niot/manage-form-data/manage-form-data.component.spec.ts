import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFormDataComponent } from './manage-form-data.component';

describe('ManageFormDataComponent', () => {
  let component: ManageFormDataComponent;
  let fixture: ComponentFixture<ManageFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFormDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
