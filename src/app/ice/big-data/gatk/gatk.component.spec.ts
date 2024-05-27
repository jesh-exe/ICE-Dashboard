import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatkComponent } from './gatk.component';

describe('GatkComponent', () => {
  let component: GatkComponent;
  let fixture: ComponentFixture<GatkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
