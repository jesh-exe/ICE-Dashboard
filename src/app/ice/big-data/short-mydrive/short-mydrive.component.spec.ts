import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortMydriveComponent } from './short-mydrive.component';

describe('ShortMydriveComponent', () => {
  let component: ShortMydriveComponent;
  let fixture: ComponentFixture<ShortMydriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortMydriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortMydriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
