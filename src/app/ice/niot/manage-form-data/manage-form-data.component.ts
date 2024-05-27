import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-manage-form-data",
  templateUrl: "./manage-form-data.component.html",
  styleUrls: ["./manage-form-data.component.scss"],
})
export class ManageFormDataComponent implements OnInit {
  public contentHeader: object;
  projectdetails;
  route: ActivatedRoute;

  constructor(private niotservice: NiotServiceService, private router: Router) {
    this.niotservice.getProjectDetails().subscribe((response) => {
      console.log(response);
      console.log(response.projects);
      this.projectdetails = response.projects;
      console.log(":projectdetails", this.projectdetails);
      console.log("project.length", this.projectdetails.length);
    });
  }

  editproject(item) {
    console.log(item);
    this.router.navigate(["submit/niot-project-form"], {
      queryParams: { projectId: item },
    });
  }

  deleteproject(item) {
    console.log(item);
    // this.niotservice.deleteProjectById(item).subscribe((response) => {
    //   console.log(response);
    //   this.projectdetails = response.projects;
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
        console.log("result.value", result.value);
        this.niotservice.deleteProjectById(item).subscribe(
          (response) => {
            console.log(response);
            this.projectdetails = response.projects;
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          },
          (error) => {
            console.log(error.error.message);
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

  navigateToComponent(item) {
    console.log("hello", item);
    this.router.navigate(["submit/view-projectdata"], {
      queryParams: { projectId: item },
    });
  }
  // navigateToProject(projectId) {
  //   console.log("hi", projectId);
  //   this.router.navigate(["submit/view-data/", projectId], {
  //     relativeTo: this.route,
  //   });
  // }

  ngOnInit(): void {
    // content header
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
            name: "Project List",
            isLink: false,
          },
        ],
      },
    };
  }
}
