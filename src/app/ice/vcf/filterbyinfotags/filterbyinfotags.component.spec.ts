import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbyinfotagsComponent } from './filterbyinfotags.component';

describe('FilterbyinfotagsComponent', () => {
  let component: FilterbyinfotagsComponent;
  let fixture: ComponentFixture<FilterbyinfotagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterbyinfotagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbyinfotagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
