import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ActivatedRoute } from "@angular/router";
import { error } from "console";

@Component({
  selector: "app-sample-list",
  templateUrl: "./sample-list.component.html",
  styleUrls: ["./sample-list.component.scss"],
})
export class SampleListComponent implements OnInit {
  public contentHeader: object;
  route: ActivatedRoute;

  sampledetails;
  error1;

  constructor(private niotservice: NiotServiceService, private router: Router) {
    this.niotservice.getSampleDetails().subscribe((response) => {
      console.log(response);
      this.sampledetails = response.samples;
      console.log(":sampledetails", this.sampledetails);
    });
  }

  editsample(item) {
    console.log(item);
    this.router.navigate(["submit/niot-sample-form"], {
      queryParams: { sampleId: item },
    });
  }

  deletesample(item) {
    console.log(item);
    // this.niotservice.deleteSampleById(item).subscribe((response) => {
    //   console.log(response);
    //   this.sampledetails = response.samples;
    //   Swal.fire({
    //     icon: "success",
    //     title: "Deleted!",
    //     customClass: {
    //       confirmButton: "btn btn-success",
    //     },
    //   });
    //   // this.niotservice.getProjectDetails().subscribe(response=>{
    //   //   console.log(response.projects)
    //   //   this.projectdetails=response.projects;
    //   // })
    // });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then((result) => {
      if (result.value) {
        // console.log("result.value", result.value);
        this.niotservice.deleteSampleById(item).subscribe(
          (response) => {
            console.log(response);
            this.sampledetails = response.samples;
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          },

          (error) => {
            console.log(error);
            this.error1 = error;
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.error.message,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
          }
        );
      }
    });
  }

  navigateToSample(projectId) {
    console.log("hi");
    this.router.navigate(["submit/view-sampledata"], {
      queryParams: { sampleId: projectId },
    });
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Submit",
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
            name: "Submit",
            isLink: true,
            link: "/submit/manage-niot-form-data",
          },
          {
            name: "Sample List",
            isLink: false,
          },
        ],
      },
    };
  }
}
