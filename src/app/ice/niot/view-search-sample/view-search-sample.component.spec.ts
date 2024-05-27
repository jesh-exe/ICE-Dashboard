import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchSampleComponent } from './view-search-sample.component';

describe('ViewSearchSampleComponent', () => {
  let component: ViewSearchSampleComponent;
  let fixture: ComponentFixture<ViewSearchSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSearchSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
