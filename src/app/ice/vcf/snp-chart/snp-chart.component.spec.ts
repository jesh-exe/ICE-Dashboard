import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnpChartComponent } from "./snp-chart.component";

describe("SnpChartComponent", () => {
  let component: SnpChartComponent;
  let fixture: ComponentFixture<SnpChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnpChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
