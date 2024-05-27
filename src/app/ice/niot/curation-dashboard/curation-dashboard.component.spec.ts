import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationDashboardComponent } from './curation-dashboard.component';

describe('CurationDashboardComponent', () => {
  let component: CurationDashboardComponent;
  let fixture: ComponentFixture<CurationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
