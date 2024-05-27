import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ContainerCreationComponent } from "./container-creation.component";

describe("ContainerCreationComponent", () => {
  let component: ContainerCreationComponent;
  let fixture: ComponentFixture<ContainerCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerCreationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
