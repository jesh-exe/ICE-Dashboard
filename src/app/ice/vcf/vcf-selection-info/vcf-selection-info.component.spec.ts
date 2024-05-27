import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcfSelectionInfoComponent } from './vcf-selection-info.component';

describe('VcfSelectionInfoComponent', () => {
  let component: VcfSelectionInfoComponent;
  let fixture: ComponentFixture<VcfSelectionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcfSelectionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcfSelectionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
