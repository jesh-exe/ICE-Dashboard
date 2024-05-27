import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-ngs-sequence-list",
  templateUrl: "./ngs-sequence-list.component.html",
  styleUrls: ["./ngs-sequence-list.component.scss"],
})
export class NgsSequenceListComponent implements OnInit {
  public contentHeader: object;
  ngsSequencedetails;
  constructor(private niotservice: NiotServiceService, private router: Router) {
    this.niotservice.getNgsSequenceDetails().subscribe((response) => {
      this.ngsSequencedetails = response.ngssequenceList;
      console.log(this.ngsSequencedetails);
    });
  }

  navigateToNgsSequence(id) {
    this.router.navigate(["submit/view-ngsSequence"], {
      queryParams: { id: id },
    });
  }

  editsequence(item) {
    console.log(item);
    this.router.navigate(["submit/niot-ngsSequence-form"], {
      queryParams: { ngsSequenceId: item },
    });
  }

  deleteNgssequence(item) {
    console.log(item);
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
        this.niotservice.deleteNgsSequenceById(item).subscribe(
          (response) => {
            console.log(response);
            this.ngsSequencedetails = response;
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          },

          (error) => {
            //console.log(error.details);
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
            name: " WGS Submission List",
            isLink: false,
          },
        ],
      },
    };
  }
}
