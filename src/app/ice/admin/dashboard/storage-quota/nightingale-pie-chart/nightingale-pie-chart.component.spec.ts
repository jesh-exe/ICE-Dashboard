/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NightingalePieChartComponent } from './nightingale-pie-chart.component';

describe('NightingalePieChartComponent', () => {
  let component: NightingalePieChartComponent;
  let fixture: ComponentFixture<NightingalePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightingalePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightingalePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
