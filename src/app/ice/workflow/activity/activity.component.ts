import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WorkflowService } from "app/ice/workflow/services/workflow.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "chat-application" },
})
export class ActivityComponent implements OnInit {
  public contentHeader: object;
  public urlLastValue: string;
  public oneComputeUnit: any;
  public isReload = false;
  public params;
  public nameOfPipeline: string;

  constructor(
    private service: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      this.logService.debug("Parameter" + JSON.stringify(parameter));
      this.urlLastValue = parameter.containerName;
    });
  }
  asIsOrder(a, b) {
    return 1;
  }
  downloadJSONParams() {
    this.service.downloadParams(
      JSON.parse(this.oneComputeUnit.params),
      "params.json"
    );
  }
  getRecord() {
    this.service
      .getOneRunDetails(this.urlLastValue)
      .pipe(
        tap((value) => {
          this.oneComputeUnit = value;
          this.loadContent();
          this.nameOfPipeline = JSON.parse(
            this.oneComputeUnit.params
          ).ice_pipeline_name;
          this.params = JSON.stringify(
            JSON.parse(this.oneComputeUnit.params),
            null,
            4
          );
          console.log(this.params);
          this.isReload = false;
          console.log("doSomethingResponse", value);
        }),
        switchMap(() => this.service.getResults(this.oneComputeUnit.outputPath))
      )
      .subscribe((result) => {
        console.log("doAnotherthingResponse", result);
        this.service.loadResult(result);
      });
  }
  refresh($event) {
    if ($event === "reload") {
      // console.log($event, ": Start");
      this.isReload = true;
      this.getRecord();
    }
  }
  loadContent() {
    this.service.loadContent(this.oneComputeUnit);
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Workflow",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Pipelines",
            isLink: true,
            link: "/workflow/list",
          },
          {
            name: "Activity",
            isLink: false,
          },
        ],
      },
    };
    this.getRecord();
  }
}
