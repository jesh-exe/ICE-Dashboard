import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Subject } from "rxjs";
import { date } from "app/ice/admin/user/user-models/date";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: "app-niot-sample-form",
  templateUrl: "./niot-sample-form.component.html",
  styleUrls: ["./niot-sample-form.component.scss"],
})
export class NiotSampleFormComponent implements OnInit {
  contentHeader;
  public sampleForm: FormGroup;
  projectnames;
  project: { name: string; id: number }[] = [];
  isEditMode = false;
  readOnly = false;
  payload;
  sampleTypes: { id: number }[] = [];
  sampleDate: string; //"2024-03-21T13:21:03"
  environmentMaterials: { id: number }[] = [];
  updateSequence: any;
  types: { id: number }[] = [];
  statuses: { id: number }[] = [];
  organismTypes: { id: number }[] = [];
  sequenceTypes: { id: number }[] = [];
  peopleInputType$ = new Subject<string>();
  selectedValue: any;
  sampleName;
  clicked = false;
  alertClose = false;
  toastmsg;
  userData: string = "";
  publicationFields: { id: number }[] = [];
  publicationValue: any;
  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private toast: HotToastService,
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      console.log(params.projectId, "param");
      console.log(params.sampleId, "sampleid param");
      var projectId = params.projectId;
      var sampleId = params.sampleId;
      var sequenceId = params.sequenceId;
      if (sampleId) {
        this.niotservice.sampleByID(sampleId).subscribe((response) => {
          console.log(response);
          console.log(response.sampleName);
          this.sampleForm.patchValue({
            sample: {
              sampleName: response.sampleName,
              type: response.type,
              depth: response.depth,
              longitude: response.longitude,
              latitude: response.latitude,
              location: response.location,
              ph: response.ph,
              temperature: response.temperature,
              pressure: response.pressure,
              salinity: response.salinity,
              dissolvedOxygen: response.dissolvedOxygen,
              environmentMaterial: response.environmentMaterial,
              publications: response.publications,
              sampleDate: response.sampleDate,
              // code: response.code,
              // status: response.status,
            },
            projectId: response.project.id,
          });
          console.log(this.sampleForm, "sampleform");
          this.updateSequence = response.id;
          // this.projectForm.get('name')?.enable();
          //this.projectForm.get('name')?.disable();

          this.isEditMode = true;
          this.readOnly = true;
        });
      }
    });
  }

  inputSampleName(event) {
    console.log(event.target.value, "samplename")
    let name = event.target.value;
    this.niotservice.sampleNameExist(name).subscribe((response) => {
      console.log(response)
      if (response.message !== null) {
        Swal.fire({
          title: response.message,
          icon: 'warning',
        })
        this.clicked = true;
      }
    })
  }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params => {
      console.log(params.projectId,"param projectID")
      if(params.projectId!==undefined)
      this.toastmsg="Project with Id "+params.projectId+" created successfully";
      // this.toast.success("Project with "+params.projectId+" Id created successfully")
    })

    this.niotservice.getProjectList().subscribe((response) => {
      console.log("Sample", response);
      this.projectnames = response.projectDropDownList;
      this.projectnames.map((e) => {
        e.project = `${e.code}_${e.name}`;
      });

      // this.projectnames = response.projects.map(project => ({ id: project.projectId, name: project.name }));
      // console.log("projectnames", this.projectnames);
    });
    this.niotservice.getAllEnumType().subscribe((response) => {
      console.log(response);
      console.log(response.enums.ProjectType);
      this.types = response.enums.ProjectType;
      this.sampleTypes = response.enums.SampleType;
      this.statuses = response.enums.Status;
      //  this.environmentMaterials = response.enums.EnvironmentMaterial;
      this.organismTypes = response.enums.OrganismType;
      this.sequenceTypes = response.enums.SequenceType;
      this.publicationFields = response.enums.PublicationFields;
    });
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
            isLink: true,
            link: "/submit/manage-sample-list",
          },
          {
            name: "Niot Sample Form",
            isLink: false,
          },
        ],
      },
    };

    this.sampleForm = new FormGroup({
      sample: new FormGroup({
        sampleName: new FormControl("", [Validators.required]),
        type: new FormControl("", [Validators.required]),
        depth: new FormControl("", [
          Validators.required,
          Validators.pattern("[0-9]*"),
        ]),
        longitude: new FormControl("", [Validators.required]),
        latitude: new FormControl("", [Validators.required]),
        location: new FormControl("", [Validators.required]),
        ph: new FormControl("", [Validators.required]),
        temperature: new FormControl("", [Validators.required]),
        pressure: new FormControl("", [Validators.pattern("[0-9]*")]),
        salinity: new FormControl(""),
        dissolvedOxygen: new FormControl(""),
        // environmentMaterial: new FormControl("", [Validators.required]),
        publications: new FormControl(""),
        sampleDate: new FormControl("", [Validators.required]),
        // code: new FormControl("", [Validators.required]),
        // status: new FormControl("", [Validators.required]),
      }),
      projectId: new FormControl("", [Validators.required]),
    });
  }
  StoreInputType(event) {
    let othertype = event.target.value;
    console.log("othertype", othertype);
    this.sampleForm.patchValue({
      sample: {
        type: othertype,
      },
    });
    console.log("storeinput type", this.sampleForm.value);
  }
  StorePublishType(event) {
    let otherPublished = event.target.value;
    console.log("otherPublished", otherPublished);
    this.sampleForm.patchValue({
      sample: {
        publications: otherPublished,
      },
    });
  }

  onSampleSubmit() {
    console.log("values", this.sampleForm.value);

    this.sampleForm.value.sample.sampleDate =
      this.sampleForm.value.sample.sampleDate;
    this.niotservice
      .addSampleDetails(this.sampleForm.value)
      .subscribe((response) => {
        console.log(response);
        var sampleId=response.id
        Swal.fire({
          icon: "success",
          title: "Sample Form Submitted!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/submit/niot-sequence-form"],{queryParams:{sampleId}});
          }
        });

        //     var timeInterval = setInterval(() => {
        //   this.router.navigateByUrl('/home');
        //          clearInterval(timeInterval);
        // },5000)
      });
  }

  getCurrentDateTime() {
    const currentDate = new Date();
    //return currentDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth().toString();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  //   getCurrentDateTime1(year?: number, month?: number, day?: number): string {
  //     const currentDate = year && month && day ? new Date(year, month - 1, day) : new Date();
  //     const formattedYear = currentDate.getFullYear();
  //     const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //     const formattedDay = currentDate.getDate().toString().padStart(2, '0');
  //     const hours = currentDate.getHours().toString().padStart(2, '0');
  //     const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  //     const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  //     var datetime=`${formattedYear}-${formattedMonth}-${formattedDay}T${hours}:${minutes}:${seconds}`
  //     // console.log("datetime",datetime)
  //     return datetime;
  // }

  updateSampleDetails() {
    console.log(this.sampleForm.value);
    const sampleID = this.updateSequence;
    (this.payload = this.sampleForm.value.sample), (this.payload.id = sampleID);
    console.log("this.payload ", this.payload);
    this.niotservice.updateSampleDetails(this.payload).subscribe((response) => {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Sample Updated Successfully!",
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

  formatSelectedDate(date: Date): string {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  validatePaste(event:ClipboardEvent) {
    var pastedText = event.clipboardData.getData('text/plain')
    if (isNaN(Number(pastedText))) {
      event.preventDefault();
      }
}

}
