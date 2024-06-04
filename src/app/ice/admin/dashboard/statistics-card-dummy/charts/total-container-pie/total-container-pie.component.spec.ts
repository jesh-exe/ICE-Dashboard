/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalContainerPieComponent } from './total-container-pie.component';

describe('TotalContainerPieComponent', () => {
  let component: TotalContainerPieComponent;
  let fixture: ComponentFixture<TotalContainerPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalContainerPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalContainerPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
