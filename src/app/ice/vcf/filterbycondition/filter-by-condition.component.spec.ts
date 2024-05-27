import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterByConditionComponent } from "./filter-by-condition.component";

describe("FilterByConditionComponent", () => {
  let component: FilterByConditionComponent;
  let fixture: ComponentFixture<FilterByConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByConditionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
