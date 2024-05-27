import { Component, Input, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { WorkflowService } from "app/ice/workflow/services/workflow.service";
import { listOfRuns } from "app/ice/workflow/workflow-models/listOfRuns";

@Component({
  selector: "app-activity-sidebars",
  templateUrl: "./activity-sidebars.component.html",
})
export class ActivitySidebarsComponent implements OnInit {
  public jobs: listOfRuns;
  public searchText: string;
  @Input() oneComputeUnit: any;
  constructor(
    private service: WorkflowService,
    private logService: IceLogService
  ) {}
  clear() {
    this.searchText = "";
  }
  openJob(subComputeUnit) {
    this.logService.debug(
      "Selected Activity in sidebar:" + JSON.stringify(subComputeUnit)
    );
    this.service.openJob(subComputeUnit);
  }

  ngOnChanges() {
    this.jobs = this.oneComputeUnit.computeUnitList;
  }

  ngOnInit(): void {
    this.jobs = this.oneComputeUnit.computeUnitList;
  }
}
