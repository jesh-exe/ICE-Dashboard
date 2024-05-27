import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcfmainpageComponent } from './vcfmainpage.component';

describe('VcfmainpageComponent', () => {
  let component: VcfmainpageComponent;
  let fixture: ComponentFixture<VcfmainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcfmainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcfmainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
