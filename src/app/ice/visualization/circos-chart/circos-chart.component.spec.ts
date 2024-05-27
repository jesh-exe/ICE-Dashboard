import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircosChartComponent } from './circos-chart.component';

describe('CircosChartComponent', () => {
  let component: CircosChartComponent;
  let fixture: ComponentFixture<CircosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircosChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
