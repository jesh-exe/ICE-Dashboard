import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchSequencesComponent } from './view-search-sequences.component';

describe('ViewSearchSequencesComponent', () => {
  let component: ViewSearchSequencesComponent;
  let fixture: ComponentFixture<ViewSearchSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchSequencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
