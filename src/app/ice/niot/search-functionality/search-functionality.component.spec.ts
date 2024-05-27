import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFunctionalityComponent } from './search-functionality.component';

describe('SearchFunctionalityComponent', () => {
  let component: SearchFunctionalityComponent;
  let fixture: ComponentFixture<SearchFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFunctionalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
