import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: "app-ngs-sequence-form",
  templateUrl: "./ngs-sequence-form.component.html",
  styleUrls: ["./ngs-sequence-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NgsSequenceFormComponent implements OnInit {
  contentHeader;
  filteredOrganism;
  ngssequenceForm: FormGroup;
  projectnames: {
    id: any;
    project: string;
    code: any;
    relation: { name: string }[];
    name: string;
  }[] = [];
  readOnly = false;
  samplenames: {
    sampleCode: any;
    sampleName: any;
    id: any;
    sample: string;
    name: string;
  }[] = [];
  tempAccNumber;
  sequenceTypes: { id: number }[] = [];
  organismTypes: { id: number }[] = [];
  path: any;
  selectedFileName: string[] = [];
  isEditMode = false;
  payload;
  sample: { id: number; sampleCode: string }[] = [];
  file: File;
  updateNgsSequence: any;
  selectedFiles: FileList;
  getSampleNames() {
    console.log("hello", this.ngssequenceForm.get("projectId").value);
    this.niotservice
      .showSampleDetailByProjectId(this.ngssequenceForm.get("projectId").value)
      .subscribe(
        (response) => {
          console.log("samplelist by user id", response.samples);
          this.samplenames = response.samples;
          // .map((sample) => ({
          //   code:sample.sampleCode,
          //   name: sample.sampleName,
          //   id: sample.id,
          // }));
          this.samplenames.map((e) => {
            e.sample = `${e.sampleCode}_${e.sampleName}`;
          });
          console.log("samplenames", this.samplenames);
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
  }
  getProjectNames() {
    this.niotservice.getProjectList().subscribe((response) => {
      console.log("hi", response.projectDropDownList);
      this.projectnames = response.projectDropDownList;
      // this.projectnames = response.projects.map(project => ({ id: project.projectId, name: project.name }));
      this.projectnames.map((e) => {
        e.project = `${e.code}_${e.name}`;
        console.log(e.project);
      });
      console.log("projectnames", this.projectnames);
    });
  }

  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      var ngssequenceId = params.ngsSequenceId;
      if (ngssequenceId) {
        this.niotservice.ngsSequenceId(ngssequenceId).subscribe((response) => {
          console.log("sequence", response);
          this.ngssequenceForm.patchValue({
            ngsSequence: {
              header: response.header,
              organismType: response.organismType,
              description: response.description,
              organismName: response.organismName,
              platform: response.platform,
              type: response.type,
              files: response.ngsSequenceFilePath,
            },
            sampleId: response.sample.id,
            projectId: response.sample.project.projectId,
          });
          console.log(this.ngssequenceForm.value);

          this.isEditMode = true;
          this.readOnly = true;
          this.updateNgsSequence = response.id;
          console.log("this.updateSequence.sequenceID", this.updateNgsSequence);
        });
      }
    });
  }

  onNgsSequenceSubmit() {
    console.log("values", this.ngssequenceForm.value);
    this.ngssequenceForm.value.files = this.selectedFiles

                var formData: FormData = new FormData();
                this.payload = this.ngssequenceForm.value
                delete this.payload.projectId;
                if (this.payload.files && this.payload.files.length > 0) {
                  for (let i = 0; i < this.payload.files.length; i++) {
                    console.log(this.payload.files[i])
                    formData.append('files', this.payload.files[i], this.payload.files[i].name);
                  }
                }

                formData.append('header', this.payload.header);
                formData.append('organismType', this.payload.organismType);
                formData.append('organismName', this.payload.organismName);
                formData.append('description', this.payload.description);
                formData.append('platform', this.payload.platform);
                formData.append('type', this.payload.type);
                formData.append('sampleId', this.payload.sampleId);
    // this.niotservice
    //   .getNGSTempAccNo(this.ngssequenceForm.value.ngsSequence.organismType)
    //   .subscribe((response) => {
    //     //  / console.log("temp acc no", response);
    //     this.tempAccNumber = response.tempAccessionNumber;
    //     console.log("temp acc no", this.tempAccNumber);
    //     this.niotservice
    //       .uploadData(this.selectedFiles, this.tempAccNumber)
    //       .subscribe((resp) => {
    //         console.log("upload data", resp);
    //         this.path = resp.sequencefilePath;

    //         this.payload = this.ngssequenceForm.value;
    //         this.payload.ngsSequence.ngsSequenceFilePath = this.path;
    //         this.payload.ngsSequence.tempAccessionNumber = this.tempAccNumber;
    //         delete this.payload.projectId;
    //         console.log("this.payload", this.payload);

            this.niotservice
              .addNGSSequenceDetails(formData)
              .subscribe((response) => {
                console.log(response);
                Swal.fire({
                  icon: "success",
                  title: " WGS Submission Submitted!",
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigateByUrl("/submit/manage-niot-form-data");
                  }
                });
              });
      //     });
      // });
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
            name: "Submit ",
            isLink: true,
            link: "/submit/manage-niot-form-data",
          },
          {
            name: "WGS Submission List",
            isLink: true,
            link: "/submit/manage-ngs-sequence-list",
          },
          {
            name: "WGS Submission Form",
            isLink: false,
          },
        ],
      },
    };

    this.ngssequenceForm = new FormGroup({
    //  ngsSequence: new FormGroup({
        header: new FormControl("", [Validators.required]),
        organismType: new FormControl("", [Validators.required]),
        description: new FormControl("", [
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(2),
        ]),
        organismName: new FormControl("", [Validators.required]),
        platform: new FormControl("", [Validators.required]),
        type: new FormControl("", [Validators.required]),
        files: new FormControl(null, [Validators.required]),
      //}),
      sampleId: new FormControl("", [Validators.required]),
      projectId: new FormControl("", [Validators.required]),
    });
    this.getProjectNames();
    this.getEnumType();
  }
  getEnumType() {
    this.niotservice.getAllEnumType().subscribe((response) => {
      console.log(response);
      this.sequenceTypes = response.enums.SequenceType;
      this.organismTypes = response.enums.OrganismType;
    });
  }

  // onOrganismTypeSelected(event: any) {
  //   console.log("Selected organism type:", event);
  //   this.niotservice.getNGSTempAccNo(event).subscribe((response) => {
  //     //  / console.log("temp acc no", response);
  //     this.tempAccNumber = response.tempAccessionNumber;
  //     console.log("temp acc no", this.tempAccNumber);
  //   });
  // }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    console.log("file upload event ", this.selectedFiles);
    if (this.selectedFiles.length > 0) {
      // Process the selected files here
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.selectedFileName.push(this.selectedFiles[i].name);
        console.log("Selected File:", this.file);

        if (this.selectedFiles[i].name.includes(" ")) {
          console.log(
            "File name contains spaces. Skipping file:",
            this.selectedFiles[i].name
          );
          alert(
            "File name contains spaces: " +
              this.selectedFiles[i] +
              " Please upload a file without spaces in name"
          );
          continue;
        }
      }
    }
  }
  filterOrganism(event: AutoCompleteCompleteEvent) {
    let query = event.query;
    this.niotservice.getOrganismNameResults(query).subscribe(
      (val) => {
        console.log(val);
        this.filteredOrganism = val.organismNames;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  removeFile(index: number) {
    this.selectedFileName.splice(index, 1);
  }
  updateSequenceDetails() {
    console.log("sequence update form object ", this.ngssequenceForm.value);
    const ngssequenceID = this.updateNgsSequence;
    (this.payload = this.ngssequenceForm.value.ngsSequence),
      (this.payload.id = ngssequenceID);
    console.log("this.payload ", this.payload);
    this.niotservice
      .updateNgsSequenceDetails(this.payload)
      .subscribe((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Sequence Updated Successfully!",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("/submit/manage-niot-form-data");
          }
        });
      });
  }
}
