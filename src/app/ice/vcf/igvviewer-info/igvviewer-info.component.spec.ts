import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IgviewerInfoComponent } from "./igvviewer-info.component";

describe("IgviewerInfoComponent", () => {
  let component: IgviewerInfoComponent;
  let fixture: ComponentFixture<IgviewerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IgviewerInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgviewerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
