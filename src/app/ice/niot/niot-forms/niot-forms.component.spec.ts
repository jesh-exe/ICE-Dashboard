import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiotFormsComponent } from './niot-forms.component';

describe('NiotFormsComponent', () => {
  let component: NiotFormsComponent;
  let fixture: ComponentFixture<NiotFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiotFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiotFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
