import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgvviewerComponent } from './igvviewer.component';

describe('IgvviewerComponent', () => {
  let component: IgvviewerComponent;
  let fixture: ComponentFixture<IgvviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgvviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgvviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
