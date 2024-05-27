import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnpChartAnalysisComponent } from "./snp-chart-analysis.component";

describe("SnpChartAnalysisComponent", () => {
  let component: SnpChartAnalysisComponent;
  let fixture: ComponentFixture<SnpChartAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnpChartAnalysisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpChartAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
