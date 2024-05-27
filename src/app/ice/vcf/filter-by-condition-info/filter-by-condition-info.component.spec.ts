import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterByConditionInfoComponent } from "./filter-by-condition-info.component";

describe("VcfInfoAnalysisInfoComponent", () => {
  let component: FilterByConditionInfoComponent;
  let fixture: ComponentFixture<FilterByConditionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByConditionInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByConditionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
