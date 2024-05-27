import { element } from "protractor";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-niot-project-form",
  templateUrl: "./niot-project-form.component.html",
  styleUrls: ["./niot-project-form.component.scss"],
})
export class NiotProjectFormComponent implements OnInit {
  contentHeader;
  projectForm: FormGroup;
  readOnly = false;
  updateSequence: any;
  isEditMode = false;
  payload;
  types: { id: number }[] = [];
  fromDate: string;
  toDate: string;
  statuses: { id: number }[] = [];
  sampleTypes: { id: number }[] = [];
  membersname: { id: number }[] = [];
  environmentMaterials: { id: number }[] = [];
  organismTypes: { id: number }[] = [];
  sequenceTypes: { id: number }[] = [];
  projectnames: { name: string }[] = [];
  keywords: string;
  public basicDPdata: NgbDateStruct;
  formData: any;
  selectedType: string = null;
  name: string;
  selectedValue: string;
  userInputData: string = "";
  clicked = false;
  items: string[] = [];
  selectedValues: { label: string }[] = [];

  get projectform() {
    return this.projectForm.controls;
  }

  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      console.log(params.projectId, "param");
      console.log(params.sampleId, "sampleid param");
      var projectId = params.projectId;
      var sampleId = params.sampleId;
      var sequenceId = params.sequenceId;
      if (projectId) {
        this.niotservice.projectByID(projectId).subscribe((response) => {
          console.log(response);
          this.projectForm.patchValue({
            name: response.name,
            type: response.type,
            organization: response.organization,
            authorName: response.authorName,
            vesselName: response.vesselName,
            location: response.location,
            fromDate: response.fromDate,
            toDate: response.toDate,
            // status: response.status,
            members: response.members,
            keywords: response.keywords,
          });
          // this.projectForm.get('name')?.enable();
          //this.projectForm.get('name')?.disable();
          this.updateSequence = response.projectId;
          this.isEditMode = true;
          this.readOnly = true;
        });
      }
    });
  }

  // getCurrentDateTime() {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //   const day = currentDate.getDate().toString().padStart(2, "0");
  //   // const hours = currentDate.getHours().toString().padStart(2, "0");
  //   // const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  //   // const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  //   // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  //   console.log("date", year, month, day);
  //   return `${year}-${month}-${day}`;
  // }
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
            name: "Project List",
            isLink: true,
            link: "/submit/manage-project-list",
          },
          {
            name: "Niot Project Form",
            isLink: false,
          },
        ],
      },
    };

    this.projectForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),

      organization: new FormControl("", [Validators.required]),
      authorName: new FormControl("", [Validators.required]),
      vesselName: new FormControl(""),
      location: new FormControl("", [Validators.required]),
      fromDate: new FormControl("", [Validators.required]),
      toDate: new FormControl(""),
      members: new FormControl([]),
      keywords: new FormControl("", [Validators.required]),
    });
    this.getEnumType();
  }
  private formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  StoreInputType(event) {
    let othertype = event.target.value;
    this.projectForm.patchValue({
      type: othertype,
    });
  }

  onSubmit() {
    console.log("formData", this.projectForm.value);
    this.niotservice
      .addProjectDetails(this.projectForm.value)
      .subscribe((response) => {
        console.log(response);
        var projectId = response.projectId;
        Swal.fire({
          icon: "success",
          title: "Project Form Submitted!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/submit/niot-sample-form"], {
              queryParams: { projectId },
            });
          }
        });
      });
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }

  updateProjectDetails() {
    const projectID = this.updateSequence;
    (this.payload = this.projectForm.value),
      (this.payload.projectId = projectID);
    console.log("this.payload ", this.payload);
    console.log(this.projectForm.value);
    this.niotservice
      .updateProjectDetails(this.payload)
      .subscribe((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Project Updated Successfully!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("/submit/manage-niot-form-data");
          }
        });

        // var timeInterval = setInterval(() => {
        //   this.router.navigateByUrl('/home');
        //          clearInterval(timeInterval);
        // },5000)
      });
  }

  getEnumType() {
    this.niotservice.getAllEnumType().subscribe((response) => {
      console.log(response);
      console.log(response.enums.ProjectType);
      this.types = response.enums.ProjectType;
      this.sampleTypes = response.enums.SampleType;
      this.statuses = response.enums.Status;
      this.environmentMaterials = response.enums.EnvironmentMaterial;
      this.organismTypes = response.enums.OrganismType;
      this.sequenceTypes = response.enums.SequenceType;
    });
  }
  // onTypeChange(event: any) {
  //   const selectedType = event;
  //   console.log("othervalue");
  //   if (selectedType === "Other") {
  //     this.projectForm.get("otherInput").enable();
  //   } else {
  //     this.projectForm.get("otherInput").disable();
  //   }
  //   if (this.selectedType !== "Other") {
  //     this.otherValue = "";
  //   }
  // }
  inputProjectName(event) {
    console.log(event.target.value, "projectname");
    let name = event.target.value;
    this.niotservice.projectNameExist(name).subscribe((response) => {
      console.log(response.message);
      if (response.message !== null) {
        Swal.fire({
          title: response.message,
          icon: "warning",
        });
        this.clicked = true;
      }
    });
  }
  getProjectNames() {
    this.niotservice.getProjectList().subscribe((response) => {
      console.log(response.projectNames);
      this.projectnames = response.projectNames;
      // this.projectnames = response.projects.map(project => ({ id: project.projectId, name: project.name }));
      console.log("projectnames", this.projectnames);
    });
  }

  getUsersName() {
    this.niotservice.getMembersNames().subscribe((response) => {
      console.log("username", response);
      const username = response.map((item) => item.userId);
      console.log("username", username);
      this.membersname = username;
    });
  }

  formatSelectedDate(date: Date): string {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  onTagAdded(event: any) {
    console.log("Added value:", event);
    this.selectedValues = event;
    const concatenatedString: string = this.selectedValues
      .map((element) => element.label)
      .join(",");
    console.log(concatenatedString);
    this.projectForm.patchValue({
      keywords: concatenatedString,
    });
  }
}
