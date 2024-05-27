import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SNPAnalysisInfo } from "./snp-analysis-info.component";

describe("SNPAnalysisInfo", () => {
  let component: SNPAnalysisInfo;
  let fixture: ComponentFixture<SNPAnalysisInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SNPAnalysisInfo],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SNPAnalysisInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
