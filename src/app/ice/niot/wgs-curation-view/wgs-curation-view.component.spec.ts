import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WgsCurationViewComponent } from './wgs-curation-view.component';

describe('WgsCurationViewComponent', () => {
  let component: WgsCurationViewComponent;
  let fixture: ComponentFixture<WgsCurationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WgsCurationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WgsCurationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
