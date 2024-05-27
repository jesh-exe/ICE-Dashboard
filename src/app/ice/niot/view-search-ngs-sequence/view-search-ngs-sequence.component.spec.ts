import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchNgsSequenceComponent } from './view-search-ngs-sequence.component';

describe('ViewSearchNgsSequenceComponent', () => {
  let component: ViewSearchNgsSequenceComponent;
  let fixture: ComponentFixture<ViewSearchNgsSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchNgsSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchNgsSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
