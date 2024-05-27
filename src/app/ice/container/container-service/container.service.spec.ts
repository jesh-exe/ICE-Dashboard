import { TestBed } from "@angular/core/testing";

import { containerService } from "./container.service";

describe("containerService", () => {
  let service: containerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(containerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
