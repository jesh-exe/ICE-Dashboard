import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgsSequenceListComponent } from './ngs-sequence-list.component';

describe('NgsSequenceListComponent', () => {
  let component: NgsSequenceListComponent;
  let fixture: ComponentFixture<NgsSequenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgsSequenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgsSequenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
