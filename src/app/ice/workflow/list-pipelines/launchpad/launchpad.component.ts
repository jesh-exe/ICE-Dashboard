import { Component, OnInit } from "@angular/core";
import { WorkflowService } from "../../services/workflow.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: "app-launchpad",
  templateUrl: "./launchpad.component.html",
  styleUrls: ["./launchpad.component.scss"],
})
export class LaunchpadComponent implements OnInit {
  public grid = false;
  public page = 1;
  public pageSize = 6;
  public searchText = "";
  public listOfPipeline = [];

  constructor(
    private service: WorkflowService,
    private logService: IceLogService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.service
      .getPipelines()
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Loaded Success",
          error: "There is an issue to loading instance.",
        })
      )
      .subscribe((value: any) => {
        this.logService.debug("Received all data");
        this.logService.debug(JSON.stringify(value.repolList));
        this.listOfPipeline = value.repolList;
      });
  }
}
