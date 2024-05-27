import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { WorkflowService } from "../../services/workflow.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";
@Component({
  selector: "app-runs",
  templateUrl: "./runs.component.html",
  styleUrls: ["./runs.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RunsComponent implements OnInit {
  @ViewChild("tableRowDetails") tableRowDetails: any;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public exportCSVData = [];
  public tempData;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public selected = [];

  constructor(
    private service: WorkflowService,
    private logService: IceLogService,
    private toast: HotToastService,
    private router: Router
  ) {}

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.containerName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.kitchenSinkRows = temp;
  }
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }
  onActivate(event) {
    // console.log("Activate Event", event);
    if (event.type == "click") {
      this.router.navigate(["/workflow/activity/", event.row.containerName]);
    }
  }
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  ngOnInit() {
    this.service
      .getListOfRuns()
      .pipe(
        this.toast.observe({
          loading: "Loading List of pods...",
          success: "Loaded Success",
          error: "There is an issue to loading instance.",
        })
      )
      .subscribe((value: any) => {
        this.logService.debug("Received all data");
        this.logService.debug(JSON.stringify(value));
        this.kitchenSinkRows = value.list;
        this.tempData = this.kitchenSinkRows;
        this.logService.debug("Tempdata copied");
        this.logService.debug(JSON.stringify(this.kitchenSinkRows));
        this.exportCSVData = value.list;
      });
  }
}
