import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgsSequenceFormComponent } from './ngs-sequence-form.component';

describe('NgsSequenceFormComponent', () => {
  let component: NgsSequenceFormComponent;
  let fixture: ComponentFixture<NgsSequenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgsSequenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgsSequenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
