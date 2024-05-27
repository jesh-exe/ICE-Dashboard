import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-sequence-list",
  templateUrl: "./sequence-list.component.html",
  styleUrls: ["./sequence-list.component.scss"],
})
export class SequenceListComponent implements OnInit {
  public contentHeader: object;
  route: ActivatedRoute;
  sequencedetails;

  constructor(private niotservice: NiotServiceService, private router: Router) {
    this.niotservice.getSequenceDetails().subscribe((response) => {
      console.log(response);
      this.sequencedetails = response.sequences;
      console.log(":sampledetails", this.sequencedetails);
    });
  }

  editsequence(item) {
    console.log(item);
    this.router.navigate(["submit/niot-sequence-form"], {
      queryParams: { sequenceId: item },
    });
  }

  deletesequence(item) {
    console.log(item);
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
        this.niotservice.deleteSequenceById(item).subscribe(
          (response) => {
            console.log(response);
            this.sequencedetails = response.sequences;
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
  navigateToSequence(id) {
    this.router.navigate(["submit/search-sequence"], {
      queryParams: { sequenceId: id },
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
            name: "Sequence List",
            isLink: false,
          },
        ],
      },
    };
  }
}
