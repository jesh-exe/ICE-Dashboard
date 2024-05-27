import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastSearchComponent } from './blast-search.component';

describe('BlastSearchComponent', () => {
  let component: BlastSearchComponent;
  let fixture: ComponentFixture<BlastSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlastSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
