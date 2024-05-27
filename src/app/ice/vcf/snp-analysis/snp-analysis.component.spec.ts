import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnpAnalysis } from "./snp-analysis.component";

describe("SnpAnalysis", () => {
  let component: SnpAnalysis;
  let fixture: ComponentFixture<SnpAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnpAnalysis],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpAnalysis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
