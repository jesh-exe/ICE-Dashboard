import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNiotFormDataComponent } from './manager-niot-form-data.component';

describe('ManagerNiotFormDataComponent', () => {
  let component: ManagerNiotFormDataComponent;
  let fixture: ComponentFixture<ManagerNiotFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerNiotFormDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerNiotFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
