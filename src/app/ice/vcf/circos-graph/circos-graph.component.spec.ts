import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircosGraphComponent } from './circos-graph.component';

describe('CircosGraphComponent', () => {
  let component: CircosGraphComponent;
  let fixture: ComponentFixture<CircosGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircosGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircosGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
