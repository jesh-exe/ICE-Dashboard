import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPopulationComponent } from './custom-population.component';

describe('CustomPopulationComponent', () => {
  let component: CustomPopulationComponent;
  let fixture: ComponentFixture<CustomPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPopulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
