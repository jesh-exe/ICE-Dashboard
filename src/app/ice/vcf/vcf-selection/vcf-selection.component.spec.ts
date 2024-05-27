import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcfSelectionComponent } from './vcf-selection.component';

describe('VcfSelectionComponent', () => {
  let component: VcfSelectionComponent;
  let fixture: ComponentFixture<VcfSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcfSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcfSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
