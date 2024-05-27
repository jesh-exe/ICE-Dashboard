import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { IceLogService } from "app/ice/services/ice-log.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CurationDto } from "../niot-models/CurationDto";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Status } from "../niot-models/status";
import { KeycloakService } from "keycloak-angular";
import { WGSCurationDto } from "../niot-models/WGSCurationDto";

@Component({
  selector: "app-wgs-curation-view",
  templateUrl: "./wgs-curation-view.component.html",
  styleUrls: ["./wgs-curation-view.component.scss"],
})
export class WgsCurationViewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public urlLastValue: number;
  public fullData: any;
  public remark: string;
  public userName: string;
  constructor(
    private service: NiotServiceService,
    private router: Router,
    private keycloakService: KeycloakService,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      this.logService.debug("Parameter" + parameter);
      this.urlLastValue = parameter.id;
    });
  }
  openForWGSCuration(item) {
    this.blockUI.start("Loading...");
    this.service.openForWGSCuration(item.id).subscribe((value) => {
      console.log("opened", value);
      // this.fullData = value;
      this.ngOnInit();
      this.blockUI.stop();
    });
  }
  AcceptOrRejectOrRevokeWGSCuration(item, state) {
    this.blockUI.start("Loading...");
    console.log(this.remark);
    let data = new WGSCurationDto();
    (data.curationNGSId = item.id), (data.sequenceId = item.ngsSequence.ID);

    if (this.remark && state == "Accept") {
      data.remarks = this.remark;
      (data.status = Status.accepted),
        this.service.AcceptOrRejectOrRevokeWGSCuration(data).subscribe(
          (value) => {
            console.log("accepted", value);
            this.blockUI.stop();
            Swal.fire({
              icon: "success",
              title: "Successfully Accepted!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
            this.router.navigate(["/submit/wgs-curation-dashboard"]);
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.error.error,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
          }
        );
    } else if (this.remark && state == "Reject") {
      data.remarks = this.remark;
      (data.status = Status.rejected),
        this.service.AcceptOrRejectOrRevokeWGSCuration(data).subscribe(
          (value) => {
            console.log("rejected", value);
            this.blockUI.stop();
            Swal.fire({
              icon: "success",
              title: "Successfully Rejected!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
            this.router.navigate(["/submit/wgs-curation-dashboard"]);
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.error.error,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
          }
        );
    } else if (state == "Pending") {
      data.remarks = this.remark;
      (data.status = Status.pending),
        this.service.AcceptOrRejectOrRevokeWGSCuration(data).subscribe(
          (value) => {
            console.log("revoked", value);
            this.blockUI.stop();
            Swal.fire({
              icon: "success",
              title: "Successfully Rejected!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
            this.router.navigate(["/submit/wgs-curation-dashboard"]);
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.error.error,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
          }
        );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Add remark",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
    }
  }
  async ngOnInit(): Promise<void> {
    var userInfo = await this.keycloakService
      .getKeycloakInstance()
      .loadUserInfo();
    this.userName = userInfo["preferred_username"];
    if (this.urlLastValue) {
      this.service.getOneWGSCuration(this.urlLastValue).subscribe((value) => {
        console.log("Full pogo", value);
        this.fullData = value;
      });
    }

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
            name: "WGS Curation list",
            isLink: true,
            link: "/submit/wgs-curation-dashboard",
          },
          {
            name: "WGS Curation View",
            isLink: false,
          },
        ],
      },
    };
  }
}
