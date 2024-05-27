import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuctionalAnnotationComponent } from './fuctional-annotation.component';

describe('FuctionalAnnotationComponent', () => {
  let component: FuctionalAnnotationComponent;
  let fixture: ComponentFixture<FuctionalAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuctionalAnnotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuctionalAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
