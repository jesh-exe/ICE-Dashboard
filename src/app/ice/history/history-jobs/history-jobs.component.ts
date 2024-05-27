import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { ITerminalOptions, Terminal } from "xterm";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { HistoryService } from "../history-service/history.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { HotToastService } from "@ngneat/hot-toast";
import { listOfPods } from "../history-model/listOfPods";

@Component({
  selector: "app-history-jobs",
  templateUrl: "./history-jobs.component.html",
  styleUrls: ["./history-jobs.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryJobsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  public contentHeader: object;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = "";
  private _unsubscribeAll: Subject<any>;
  private tempData: listOfPods[] = [];
  public rows: listOfPods[] = [];

  constructor(
    private service: HistoryService,
    private router: Router,
    private logService: IceLogService,
    private toast: HotToastService
  ) {
    this.logService.debug("jobs constr");
    this._unsubscribeAll = new Subject();
  }
  openActivity(containerName) {
    this.router.navigate(["/workflow/activity/", containerName]);
  }
  refresh() {
    this.getList();
  }
  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: listOfPods) {
      if (d == null) {
        return;
      }
      return (
        d.type.toLowerCase().indexOf(val) !== -1 ||
        d.imageName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
  }
  getList() {
    this.service.onJobOpenChange.next(false); //Activity content change on new pipeline select
    this.service
      .getListOfPods()
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
        this.rows = value.list;
        this.tempData = this.rows;
        this.logService.debug("Tempdata copied");
        this.logService.debug(JSON.stringify(this.rows));
      });
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "History",
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
            name: "History",
            isLink: false,
          },
        ],
      },
    };
    this.getList();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
