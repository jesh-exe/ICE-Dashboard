import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { UsersService } from "../user-services/users.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import { UserList } from "../user-models/userlist";
import { Subject } from "rxjs";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { EmailComposeComponent } from "./email-compose/email-compose.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "email-application" },
})
export class TableComponent implements OnInit {
  @ViewChild(EmailComposeComponent, { static: false })
  email: EmailComposeComponent;
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public data: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selectStatus: any = [
    { name: "All", value: "" },
    { name: "Activated", value: "Activated" },
    { name: "Deactivated", value: "Deactivated" },
    { name: "JustEnrolled", value: "JustEnrolled" },
  ];
  public mailid: string[];
  public items;
  public value1;
  public selectedStatus = [];
  public searchValue = "";
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  public rows;
  public tempFilterData;
  public previousStatusFilter = "";
  public openComposeRef;
  public isReload = false;

  constructor(
    private service: UsersService,
    private router: Router,
    private logService: IceLogService
  ) {
    this._unsubscribeAll = new Subject();
  }

  reload($event) {
    // This is fake API call example for reload
    if ($event === "reload") {
      this.logService.debug($event + ": Start");
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
        this.logService.debug($event + ": End");
      }, 5000);
    }
  }

  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: UserList) {
      if (d == null) {
        return;
      }
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 ||
        d.lastName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
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
        row.userStatus.indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  confirmTextOpen(id) {
    this.logService.debug("I am In");
    this.service.deleteUser(id);
    this.ngOnInit();
    this.router.navigate(["/admin/user/table"]);
  }
  // openCompose() {
  //   this.logService.debug("Email compose called");
  //   this.openComposeRef = true;
  //   this.service.composeEmail(this.openComposeRef);
  // }
  sort(event: MatSlideToggleChange, row: any) {
    this.blockUI.start("Loading...");
    this.logService.info("sort");
    const value = event.checked;
    this.logService.info(row.id);
    this.logService.debug(value);
    if (value === false) {
      this.value1 = this.service.disenable(row.id).subscribe(
        (data) => {
          this.logService.info(JSON.stringify(data));
          this.ngOnInit();
          this.blockUI.stop();
        },
        (error) => {
          this.logService.error("" + JSON.stringify(error));
          this.router.navigate(["**"]);
          Swal.fire({
            icon: "error",
            title: "Validation Failed!",
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        }
      );
    } else if (value === true) {
      this.service.enable(row.id).subscribe(
        (data) => {
          this.logService.info("Enable: " + JSON.stringify(data));
          this.ngOnInit();
          this.blockUI.stop();
        },
        (error) => {
          this.logService.error("" + JSON.stringify(error));
          this.router.navigate(["**"]);
          Swal.fire({
            icon: "error",
            title: "Validation Failed!",
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        }
      );
    } else {
      return;
    }
  }
  // mail(mail: string[]) {
  //   this.logService.debug(mail);
  //   this.mailid = mail;
  // }
  // allmail(items) {
  //   this.logService.debug(items);
  //   this.items = items;
  // }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Admin",
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
            name: "Users list",
            isLink: false,
          },
        ],
      },
    };
    // this.openCompose();
    this.service.getAllUsers().subscribe((value: Array<UserList>) => {
      this.logService.debug("Received all data");
      // this.logService.debug(JSON.stringify(value));
      this.rows = value;
      this.tempData = this.rows;
      this.logService.debug("Tempdata copied");
      this.logService.debug(JSON.stringify(this.rows));
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
