
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Stepper from 'bs-stepper';
import { NiotServiceService } from '../niot-service/niot-service.service';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ActivatedRoute } from '@angular/router';
import { forEach } from 'vega-lite/build/src/encoding';
@Component({
  selector: 'app-niot-forms',
  templateUrl: './niot-forms.component.html',
  styleUrls: ['./niot-forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class NiotFormsComponent implements OnInit {
  updateSequence :any
  projectForm: FormGroup;
  public sampleForm: FormGroup;
  sequenceForm: FormGroup;
  isSubmitted = false;
  // members = [
  //   { id: 1, name: 'Preet' },
  //   { id: 2, name: 'Pallavi' },
  //   { id: 3, name: 'Palash' },
  //   { id: 4, name: 'Ajay' },
  // ];
  status = [{ id: 1, name: 'ACTIVE' }, { id: 2, name: 'INACTIVE' }]
  selectedMemberIds: string[];
  projectstatusIds: string[];
  selectedprojectIds: string[];
  fromDate: Date;
  toDate: Date;
  sampleDate: Date;
  projectnames: { name: string }[] = [];
  samplenames: { name: string }[] = [];
  types: { id: number }[] = [];
  sampleTypes: { id: number }[] = [];
  statuses: { id: number }[] = [];
  environmentMaterials: { id: number }[] = [];
  organismTypes: { id: number }[] = [];
  sequenceTypes: { id: number }[] = [];
  membersname:{ id: number }[] = [];
  isEditMode = false;
  readOnly=false;
  payload
  public contentHeader: object;

  private verticalWizardStepper: Stepper;

  verticalWizardNext() {
    this.verticalWizardStepper.next();
  }
  /**
   * Vertical Wizard Stepper Previous
   */
  verticalWizardPrevious() {
    this.verticalWizardStepper.previous();
  }

  get projectform() {

    return this.projectForm.controls;
  }

  // onSubmit() {
  //   alert('Submitted!!');
  //   return false;
  // }

  constructor(private niotservice: NiotServiceService, private _activatedRoute: ActivatedRoute,) {

    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params)
      console.log(params.projectId, "param")
      console.log(params.sampleId,"sampleid param")
      var projectId = params.projectId;
      var sampleId=params.sampleId;
      var sequenceId=params.sequenceId;
      if(projectId){
      this.niotservice.projectByID(projectId).subscribe(response => {
        console.log(response)
        this.projectForm.patchValue({
          name: response.name,
          type: response.type,
          organization: response.organization,
          authorName: response.authorName,
          vesselName: response.vesselName,
          location: response.location,
          fromDate: response.fromDate,
          toDate: response.toDate,
          status: response.status,
          members: response.members
        });
       // this.projectForm.get('name')?.enable();
        //this.projectForm.get('name')?.disable();
        this.updateSequence=response.projectId
        this.isEditMode = true;
        this.readOnly=true;
      })
    }else if(sampleId){
      this.niotservice.sampleByID(sampleId).subscribe(response => {
        console.log(response)
        console.log(response.sampleName)
        this.sampleForm.patchValue({
          sample:{
            sampleName: response.sampleName,
            type: response.type,
            depth: response.depth,
            longitude: response.longitude,
            latitude: response.latitude,
            location: response.location,
            ph: response.ph,
            temperature: response.temperature,
            pressure: response.pressure,
            salinity: response.salinity ,
            dissolvedOxygen: response.dissolvedOxygen ,
            environmentMaterial: response.environmentMaterial ,
            publications: response.publications ,
            sampleDate:response.sampleDate
          },
          projectName: response.project.name,
        });
        console.log(this.sampleForm)
        this.updateSequence=response.id
       // this.projectForm.get('name')?.enable();
        //this.projectForm.get('name')?.disable();

        this.isEditMode = true;
        this.readOnly=true;
      })
    }else if(sequenceId){
      this.niotservice.sequenceId(sequenceId).subscribe(response => {
        console.log("sequence",response)
        console.log("sequenceID",response.sequenceId)
       
        this.sequenceForm.patchValue({
          sequence:{
            sequenceHeader: response.sequenceHeader,
            organismType: response.organismType,
            geneName: response.geneName,
            organismName: response.organismName,
            description: response.description,
            status: response.status,
            sequencingPlatform: response.sequencingPlatform,
            forwardPrimerSequence: response.forwardPrimerSequence,
            reversePrimerSequence: response.reversePrimerSequence,
            sequenceType: response.sequenceType ,
            quality: response.quality ,
          },
          sampleName: response.sample.sampleName ,
        })
console.log(this.sequenceForm.value)

        this.isEditMode = true;
        this.readOnly=true;
        console.log("response.sequenceID",response.sequenceId)
        this.updateSequence = response.sequenceId;
        console.log("this.updateSequence.sequenceID",this.updateSequence)
      })
    }
    })
  }



  getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  ngOnInit() {


    this.verticalWizardStepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });


    // content header
    this.contentHeader = {
      headerTitle: 'NIOT',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Niot Submission Portal',
            isLink: false
          }
        ]
      }
    };


    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      authorName: new FormControl('', [Validators.required]),
      vesselName: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      //'memberName':new FormControl( '',[Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      members: new FormControl('', [Validators.required])
    });




    this.sampleForm = new FormGroup({
      sample: new FormGroup({
        sampleName: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        depth: new FormControl('', [Validators.required]),
        longitude: new FormControl('', [Validators.required]),
        latitude: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        ph: new FormControl("", [Validators.required]),
        temperature: new FormControl("", [Validators.required]),
        pressure: new FormControl("", [Validators.required]),
        salinity: new FormControl("", [Validators.required]),
        dissolvedOxygen: new FormControl("", [Validators.required]),
        environmentMaterial: new FormControl("", [Validators.required]),
        publications: new FormControl("", [Validators.required]),
        sampleDate: new FormControl("", [Validators.required]),
      }),
      projectName: new FormControl('', [Validators.required]),
    });

    this.sequenceForm = new FormGroup({
      sequence: new FormGroup({
        sequenceHeader: new FormControl('', [Validators.required]),
        organismType: new FormControl('', [Validators.required]),
        geneName: new FormControl('', [Validators.required]),
        organismName: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        sequencingPlatform: new FormControl("", [Validators.required]),
        forwardPrimerSequence: new FormControl("", [Validators.required]),
        reversePrimerSequence: new FormControl("", [Validators.required]),
        sequenceType: new FormControl("", [Validators.required]),
        quality: new FormControl("", [Validators.required]),
      }),
      sampleName: new FormControl('', [Validators.required]),
    });
  }


  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onSubmit() {
    console.log(this.projectForm.value);

    this.niotservice.addProjectDetails(this.projectForm.value).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })

  }

  updateProjectDetails(){
    const projectID = this.updateSequence;
    this.payload = this.projectForm.value,
    this.payload.projectId = projectID;
    console.log("this.payload ",this.payload);
    console.log(this.projectForm.value);
    this.niotservice.updateProjectDetails( this.payload).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })
  }

  updateSampleDetails(){
    console.log(this.sampleForm.value);
    const sampleID = this.updateSequence;
    this.payload = this.sampleForm.value.sample,
    this.payload.id = sampleID;
    console.log("this.payload ",this.payload);
    this.niotservice.updateSampleDetails(this.payload).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })
  }

  updateSequenceDetails(){
    console.log("sequence update form object ",this.sequenceForm.value);
     const sequenceID = this.updateSequence;
    this.payload = this.sequenceForm.value.sequence,
    this.payload.sequenceId = sequenceID;
    console.log("this.payload ",this.payload);
    // console.log("Actual sequence update form object 1",this.updateSequence.description);
    // this.updateSequence.sequenceHeader = this.sequenceForm.value.sequence.sequenceHeader;
    // this.updateSequence.description =this.sequenceForm.value.sequence.description
    // // console.log("Actual sequence update form object 2",this.updateSequence.description);
    // this.updateSequence.geneName = this.sequenceForm.value.sequence.geneName
    // this.updateSequence.organismType = this.sequenceForm.value.sequence.organismType
    // this.updateSequence.organismName =this.sequenceForm.value.sequence.organismName
    // this.updateSequence.quality  =this.sequenceForm.value.sequence.quality
    // this.updateSequence.reversePrimerSequence =this.sequenceForm.value.sequence.reversePrimerSequence
    // this.updateSequence.sequenceHeader =this.sequenceForm.value.sequence.sequenceHeader
    // this.updateSequence.sequenceType =this.sequenceForm.value.sequence.sequenceType
    // this.updateSequence.sequencingPlatform =this.sequenceForm.value.sequence.sequencingPlatform
   // this.updateSequence.sequenceId =this.sequenceForm.value.sequence.sequenceId
    this.niotservice.updateSequenceDetails(this.payload).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })
  }

  onSampleSubmit() {
    console.log("values", this.sampleForm.value);
    this.niotservice.addSampleDetails(this.sampleForm.value).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })
  }
  onSequenceSubmit() {
    console.log("values", this.sequenceForm.value);
    this.niotservice.addSequenceDetails(this.sequenceForm.value).subscribe(response => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    })
  }
  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }

  getSampleNames() {
    this.niotservice.getSampleList().subscribe(response => {
      console.log(response.sampleNames)
      this.samplenames = response.snList
      // this.projectnames = response.projects.map(project => ({ id: project.projectId, name: project.name }));
      console.log("projectnames", this.samplenames);
    })
  }

  getProjectNames() {
    this.niotservice.getProjectList().subscribe(response => {
      console.log(response.projectNames)
      this.projectnames = response.projectNames
      // this.projectnames = response.projects.map(project => ({ id: project.projectId, name: project.name }));
      console.log("projectnames", this.projectnames);
    })
  }

  getEnumType() {
    this.niotservice.getAllEnumType().subscribe(response => {
      console.log(response)
      console.log(response.enums.ProjectType);
      this.types = response.enums.ProjectType;
      this.sampleTypes = response.enums.SampleType;
      this.statuses = response.enums.Status;
      this.environmentMaterials = response.enums.EnvironmentMaterial;
      this.organismTypes = response.enums.OrganismType;
      this.sequenceTypes = response.enums.SequenceType
    })
  }

  getUsersName(){
    this.niotservice.getMembersNames().subscribe(response=>{
      //console.log(response)
      const username = response.map(item => item.userId);
      //console.log(username);
      this.membersname=username

    })
  }
}
