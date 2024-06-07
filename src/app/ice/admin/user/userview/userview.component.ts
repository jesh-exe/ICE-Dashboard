import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { UsersService } from "../user-services/users.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AdminService } from "../../admin-service/admin.service";
import { UserView } from "../user-models/userView";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-userview",
  templateUrl: "./userview.component.html",
  styleUrls: ["./userview.component.scss"],
})
export class UserviewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public urlLastValue: string;
  public data;
  public contentHeader: object;
  public roles: string[];
  public permission: any;
  public selectedRole: string = "Select Role";
  constructor(
    private aservice: AdminService,
    private service: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      this.logService.debug("Parameter" + parameter);
      this.urlLastValue = parameter.id;
    });
  }
  onCancelClick() {
    if (this.data.userEnabled === true) {
      this.service.disenable(this.data.id).subscribe(
        (data) => {
          this.logService.info(JSON.stringify(data));
          this.ngOnInit();
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
      this.service.enable(this.data.id).subscribe(
        (data) => {
          this.logService.info("Enable: " + JSON.stringify(data));
          this.ngOnInit();
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
    }
  }
  keyBlur() {
    this.blockUI.start("Loading...");
    this.service.assignRole(this.data.id, this.selectedRole).subscribe(
      (val) => {
        this.logService.debug("Role Changed: " + val);
        this.ngOnInit();
        Swal.fire({
          icon: "success",
          title: "Completed",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        this.blockUI.stop();
      },
      (error) => {
        console.error("Role", error);
        this.ngOnInit();
        Swal.fire({
          icon: "error",
          title: "Validation Failed!",
          customClass: {
            confirmButton: "btn btn-warning",
          },
        });
        this.blockUI.stop();
      }
    );
  }
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
            isLink: true,
            link: "/admin/user/table",
          },
          {
            name: "View",
            isLink: false,
          },
        ],
      },
    };
    this.service.getUserByIdPreview(this.urlLastValue).subscribe(
      (value: UserView) => {
        this.data = value;
        this.selectedRole = this.data.permission != "" ? this.data.permission : "Select Role"
        this.logService.debug(JSON.stringify(value));
        console.log(value);
      },
      (error) => {
        console.log("preview", error);
      }
    );
    this.service.getAllRoles().subscribe(
      (value: string[]) => {
        this.roles = value;
        this.logService.debug(JSON.stringify(value));
      },
      (error) => {
        console.log("preivew", error);
      }
    );
  }
}
