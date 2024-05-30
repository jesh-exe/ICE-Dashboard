/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorageQuotaComponent } from './storage-quota.component';

describe('StorageQuotaComponent', () => {
  let component: StorageQuotaComponent;
  let fixture: ComponentFixture<StorageQuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageQuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
