import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiotSampleFormComponent } from './niot-sample-form.component';

describe('NiotSampleFormComponent', () => {
  let component: NiotSampleFormComponent;
  let fixture: ComponentFixture<NiotSampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiotSampleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiotSampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
