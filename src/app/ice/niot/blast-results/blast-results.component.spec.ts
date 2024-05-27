import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastResultsComponent } from './blast-results.component';

describe('BlastResultsComponent', () => {
  let component: BlastResultsComponent;
  let fixture: ComponentFixture<BlastResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlastResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlastResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
