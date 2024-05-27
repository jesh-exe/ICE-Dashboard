import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchProjectComponent } from './view-search-project.component';

describe('ViewSearchProjectComponent', () => {
  let component: ViewSearchProjectComponent;
  let fixture: ComponentFixture<ViewSearchProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
