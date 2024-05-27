import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAnalysisOnPopulationComponent } from './set-analysis-on-population.component';

describe('SetAnalysisOnPopulationComponent', () => {
  let component: SetAnalysisOnPopulationComponent;
  let fixture: ComponentFixture<SetAnalysisOnPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAnalysisOnPopulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAnalysisOnPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
