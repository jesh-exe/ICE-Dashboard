/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorageStatCardComponent } from './storage-stat-card.component';

describe('StorageStatCardComponent', () => {
  let component: StorageStatCardComponent;
  let fixture: ComponentFixture<StorageStatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageStatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
