import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WgsCurationDashboardComponent } from './wgs-curation-dashboard.component';

describe('WgsCurationDashboardComponent', () => {
  let component: WgsCurationDashboardComponent;
  let fixture: ComponentFixture<WgsCurationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WgsCurationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WgsCurationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
