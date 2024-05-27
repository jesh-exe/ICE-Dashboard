import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { IceLogService } from "app/ice/services/ice-log.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { CurationList } from "../niot-models/curationList";
import { CurationDto } from "../niot-models/CurationDto";
import { Status } from "../niot-models/status";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-curation-dashboard",
  templateUrl: "./curation-dashboard.component.html",
  styleUrls: ["./curation-dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CurationDashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: "All", value: "" },
    { name: "Pending", value: "PENDING" },
    { name: "Opened", value: "OPENED" },
    { name: "Rejected", value: "REJECTED" },
  ];
  public selectedStatus = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  public fullData;
  visibleIndex = -1;
  public remark: string;
  public openCuration: boolean = false;
  public userName: string;
  public tempData: any;
  public searchValue = "";
  public previousStatusFilter = "";
  public tempFilterData;

  constructor(
    private service: NiotServiceService,
    private logService: IceLogService,
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterByStatus(event) {
    const filter = event ? event.value : "";
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }
  filterRows(statusFilter): any[] {
    this.searchValue = "";
    this.logService.debug(statusFilter);
    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.status.indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }
  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: any) {
      if (d == null) {
        return;
      }
      return (
        d.sequenceId.toString().toLowerCase().indexOf(val) !== -1 ||
        d.tempAccessionNumber.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
  }

  async ngOnInit(): Promise<void> {
    var userInfo = await this.keycloakService
      .getKeycloakInstance()
      .loadUserInfo();
    this.userName = userInfo["preferred_username"];
    console.log("Username", this.userName);
    this.openCuration = false;
    this.contentHeader = {
      headerTitle: "Curation",
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
            name: "Curation list",
            isLink: false,
          },
        ],
      },
    };
    this.service.getAllCurationList().subscribe(
      (value: Array<CurationList>) => {
        this.logService.debug("Received all data");
        this.rows = value;
        this.tempData = this.rows;
        this.logService.debug(JSON.stringify(this.rows));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
