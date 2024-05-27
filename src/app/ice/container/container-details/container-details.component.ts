import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { containerService } from "../container-service/container.service";
import { HotToastService } from "@ngneat/hot-toast";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-container-details",
  templateUrl: "./container-details.component.html",
  styleUrls: ["./container-details.component.scss"],
})
export class ContainerDetailsComponent implements OnInit {
  public contentHeader: object;
  public jobName: String;
  public jobsDetails;
  public isReload = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: containerService,
    private toast: HotToastService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((parameter) => {
      console.log("Parameter", parameter);
      this.jobName = parameter.id;
      this.loadData();
    });
  }
  confirmTextOpen(jobName) {
    this.service.deleteAContainer(jobName);
  }
  copyDynamicText(password) {
    if (password) {
      this.service.copytoClipboard(password);
    }
  }
  refresh($event) {
    if ($event === "reload") {
      // console.log($event, ": Start");
      this.isReload = true;
      this.loadData();
    }
  }
  loadData() {
    this.service
      .getOneContainerDetails(this.jobName)
      .pipe(
        this.toast.observe({
          loading: "Loading details of Conatiner...",
          success: "Loaded Success",
          error: "There is an issue to loading instance.",
        })
      )
      .subscribe(
        (value: any) => {
          console.log("Full data", value);
          this.jobsDetails = value.jobsDetails;
          this.isReload = false;
        },
        (err) => {
          console.log("error", err.error);
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: err.error.error,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
          this.router.navigate(["/container/jobs"]);
        }
      );
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Container",
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
            name: "Jobs",
            isLink: true,
            link: "/container/jobs",
          },
          {
            name: "Details",
            isLink: false,
          },
        ],
      },
    };
  }
}
