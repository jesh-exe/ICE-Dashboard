import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: "app-niot-sequence-form",
  templateUrl: "./niot-sequence-form.component.html",
  styleUrls: ["./niot-sequence-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NiotSequenceFormComponent implements OnInit {
  contentHeader;
  sequenceForm: FormGroup;
  samplenames: {
    sampleCode: any;
    sampleName: any;
    id: any;
    sample: string;
    name: string;
  }[] = [];
  isEditMode = false;
  readOnly = false;
  payload;
  types: { id: number }[] = [];
  organismTypes: { id: number }[] = [];
  statuses: { id: number }[] = [];
  sequenceTypes: { id: number }[] = [];
  updateSequence: any;
  sampleTypes: { id: number }[] = [];
  environmentMaterials: { id: number }[] = [];
  projectnames: {
    id: any;
    project: string;
    code: any;
    relation: { name: string }[];
    name: string;
  }[] = [];
  projectId;
  tempAccNumber: any;
  path: any;
  isFormEnabled: boolean = false;
  selectedFileName: string[] = [];
  relations: { name: string }[] = [];
  sample: { id: number; sampleCode: string }[] = [];
  file: File[];
  selectedFiles: FileList;
  filteredOrganism;
  toastmsg: string;
  alertClose = false;
  selectedOption: string = 'sequence'; // Default option selected

  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      var sequenceId = params.sequenceId;
      if (sequenceId) {
        this.niotservice.sequenceId(sequenceId).subscribe((response) => {
          console.log("sequence", response);
          console.log("sequenceID", response.sequenceId);
          this.enableForm();
          this.sequenceForm.patchValue({
            sequence: {
              sequenceHeader: response.sequenceHeader,
              organismType: response.organismType,
              geneName: response.geneName,
              organismName: response.organismName,
              description: response.description,
              // status: response.status,
              sequencingPlatform: response.sequencingPlatform,
              forwardPrimerSequence: response.forwardPrimerSequence,
              reversePrimerSequence: response.reversePrimerSequence,
              sequenceType: response.sequenceType,
              strain: response.strain,
              // quality: response.quality,
              sequence: response.sequence,
            },
            sampleId: response.sample.id,
            projectId: response.sample.project.projectId,
          });
          console.log(this.sequenceForm.value);

          this.isEditMode = true;
          this.readOnly = true;
          console.log("response.sequenceID", response.sequenceId);
          this.updateSequence = response.sequenceId;
          console.log("this.updateSequence.sequenceID", this.updateSequence);
        });
      }
    });
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
  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params => {
      console.log(params.sampleId, "param projectID")
      if (params.sampleId !== undefined)
        this.toastmsg = "Sample with Id " + params.sampleId + " created successfully";
      // this.toast.success("Project with "+params.projectId+" Id created successfully")
    })

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
            isLink: true,
            link: "/submit/manage-sequence-list",
          },
          {
            name: "Niot Sequence Form",
            isLink: false,
          },
        ],
      },
    };

    this.sequenceForm = new FormGroup({
      //  sequence: new FormGroup({
      sequenceHeader: new FormControl("", [Validators.required]),
      organismType: new FormControl("", [Validators.required]),
      geneName: new FormControl("", [Validators.required]),
      organismName: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      // status: new FormControl("", [Validators.required]),
      sequencingPlatform: new FormControl("", [Validators.required]),
      forwardPrimerSequence: new FormControl(""),
      reversePrimerSequence: new FormControl(""),
      sequenceType: new FormControl("", [Validators.required]),
      // quality: new FormControl("", [Validators.required]),
      sequence: new FormControl("",),
      strain: new FormControl("", [Validators.required]),
      selectedOption: new FormControl('', Validators.required),
      //   }),
      sampleId: new FormControl("", [Validators.required]),
      projectId: new FormControl("", [Validators.required]),
      files: new FormControl(null),
    });

    this.getEnumType();
    this.getProjectNames();
  }

  getSampleNames() {
    console.log("hello", this.sequenceForm.get("projectId").value);
    this.niotservice
      .showSampleDetailByProjectId(this.sequenceForm.get("projectId").value)
      .subscribe((response) => {
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
      });
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

  logSelectedOption() {
    console.log('Selected Option:', this.selectedOption);
  }

  enableForm() {
    this.sequenceForm.enable();
    this.isFormEnabled = true;
  }
  onSequenceSubmit() {
    
    console.log(this.sequenceForm.value)
    this.sequenceForm.value.files = this.selectedFiles
    delete this.sequenceForm.value.projectId;
    delete this.sequenceForm.value.sequence.selectedOption
    console.log(this.sequenceForm.value, "sequenceform")
    var formData: FormData = new FormData();
    this.payload = this.sequenceForm.value;

    if (this.payload.files && this.payload.files.length > 0) {
      for (let i = 0; i < this.payload.files.length; i++) {
        console.log(this.payload.files[i]);
              formData.append('files', this.payload.files[i], this.payload.files[i].name);

        // var file = this.payload.files[i];
        // var reader = new FileReader();

        // reader.onload = () => {
        //   var text = reader.result as string;                 // the entire file

        //   var firstLine = text.split('\n').shift(); // first line 

        //  console.log(firstLine, "firstlien");

        // // debugger;
        //   if (firstLine.length > 0 && firstLine.trim().startsWith('>')) {
        //     if(firstLine.includes(this.sequenceForm.get('sequenceHeader').value) && firstLine.includes(this.sequenceForm.get('organismName').value) ){
        //       console.log('sequenceHeader or organismName is present in the first line of the file.');
        //       formData.append('files', this.payload.files[i], this.payload.files[i].name);
        //     }else{
        //       console.log("else")
        //       Swal.fire({
        //         icon: "warning",
        //         title: "sequenceHeader or organismName is not present in the first line of the file." ,
        //       });
        //       //this.isFormEnabled=true
        //       return
        //     }
        //     console.log('First line of the file starts with ">"');
        //   } else {
        //     console.log('First line of the file does not start with ">"');
        //     Swal.fire({
        //       icon: "warning",
        //       title:"The file does not start with '> '" +
        //         " Please upload a file that starts with '>'",
        //     });
        //     return 
        //   }


        // }
        // reader.readAsText(file, 'UTF-8');

      }
    }

    // Append other data to FormData
    formData.append('sequenceHeader', this.payload.sequenceHeader);
    formData.append('organismType', this.payload.organismType);
    formData.append('geneName', this.payload.geneName);
    formData.append('organismName', this.payload.organismName);
    formData.append('description', this.payload.description);
    formData.append('sequencingPlatform', this.payload.sequencingPlatform);
    formData.append('forwardPrimerSequence', this.payload.forwardPrimerSequence);
    formData.append('reversePrimerSequence', this.payload.reversePrimerSequence);
    formData.append('sequenceType', this.payload.sequenceType);
    formData.append('strain', this.payload.strain);
    formData.append('sampleId', this.payload.sampleId);
    formData.append('sequence', this.payload.sequence);

    console.log(formData, "after")
    this.niotservice
      .addSequenceDetails(formData)
      .subscribe((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Sequence with "+response.tempAccessionNumber +" submitted successfully.",
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

  updateSequenceDetails() {
    console.log("sequence update form object ", this.sequenceForm.value);
    const sequenceID = this.updateSequence;
    (this.payload = this.sequenceForm.value.sequence),
      (this.payload.sequenceId = sequenceID);
    // this.payload.projectId = this.sequenceForm.value.sequence.projectName;
    this.payload.id = this.sequenceForm.value.sequence.sampleId;
    console.log("this.payload ", this.payload);
    this.niotservice
      .updateSequenceDetails(this.payload)
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
  //for multiple file upload
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    console.log("file upload event ", this.selectedFiles);

    if (this.selectedFiles.length > 0) {
      // Process the selected files here
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.selectedFileName.push(this.selectedFiles[i].name);
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
        console.log("test")
        // var file = this.selectedFiles[i];
        // var reader = new FileReader();

        // reader.onload = () => {
        //   var text = reader.result as string;                 // the entire file

        //   var firstLine = text.split('\n').shift(); // first line 

        //   if (firstLine.length > 0 && firstLine[0].trim().startsWith('>')) {
        //     if(firstLine[0].includes(this.sequenceForm.get('sequenceHeader').value) || firstLine[0].includes(this.sequenceForm.get('organismName').value) ){
        //       console.log('sequenceHeader or organismName is present in the first line of the file.');
        //     }else{
        //       Swal.fire({
        //         icon: "warning",
        //         title: "sequenceHeader or organismName is not present in the first line of the file." ,
        //       });
        //     }
        //     console.log('First line of the file starts with ">"');

        //   } else {
        //     console.log('First line of the file does not start with ">"');
        //     Swal.fire({
        //       icon: "warning",
        //       title:"The file does not start with '> '" +
        //         " Please upload a file that starts with '>'",
        //     });
        //   }

        //   console.log(firstLine, "firstlien");
        //   // use the console for debugging
        // }
        // reader.readAsText(file, 'UTF-8');
        // this.file.push( selectedFiles[i]);
        // console.log("Selected File:",   this.file);
      }
    }
  }

  removeFile(index: number) {
    this.selectedFileName.splice(index, 1);
  }
  //for single file upload
  // onFileSelected(event: any) {
  //   const selectedFile: File = event.target.files[0];
  //   this.selectedFileName = selectedFile;
  //   console.log("selectedFileName ", this.selectedFileName);
  //   if (selectedFile) {
  //     console.log("Selected File:", selectedFile);
  //     console.log("Temporary Accession Number:", this.tempAccNumber);

  //     this.niotservice
  //       .uploadData(selectedFile, this.tempAccNumber)
  //       .subscribe((resp) => {
  //         console.log("upload data", resp);
  //         this.path = resp.sequencefilePath;
  //       });
  //   }
  //   this.enableForm();
  // }
  onOrganismTypeSelected(event: any) {
    console.log("Selected organism type:", event);
    this.niotservice.getTempAccNo(event).subscribe((response) => {
      //  / console.log("temp acc no", response);
      this.tempAccNumber = response.tempAccessionNumber;
      console.log("temp acc no", this.tempAccNumber);
    });
  }
}
