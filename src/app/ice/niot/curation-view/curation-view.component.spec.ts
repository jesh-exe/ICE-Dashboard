import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationViewComponent } from './curation-view.component';

describe('CurationViewComponent', () => {
  let component: CurationViewComponent;
  let fixture: ComponentFixture<CurationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
