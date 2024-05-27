import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiotSequenceFormComponent } from './niot-sequence-form.component';

describe('NiotSequenceFormComponent', () => {
  let component: NiotSequenceFormComponent;
  let fixture: ComponentFixture<NiotSequenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiotSequenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiotSequenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
