import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute } from "@angular/router";
import { ResponsiveCSSClassPipe } from "ngx-extended-pdf-viewer";
import { id } from "vega";

@Component({
  selector: "app-view-data",
  templateUrl: "./view-data.component.html",
  styleUrls: ["./view-data.component.scss"],
})
export class ViewDataComponent implements OnInit {
  public contentHeader: object;
  selectedSampleName: string;
  selectedSequenceName: string;
  projectItem;
  pmList: [] = [];
  sample;
  sampleName;
  sequences;
  sampleListId;
  isDropdownOpen = false;
  selectedSample: any;
  sampleList: [] = [];
  selectedSampleId: number;
  selectedSequenceId: any;
  sequenceListId: any = [];
  viewSequence: any;
  sequence: any;
  constructor(
    private niotservice: NiotServiceService,
    private route: ActivatedRoute
  ) {
    console.log("hi");
    this.route.params.subscribe(
      (params) => {
        const projectId = params["projectId"];
        console.log("Project ID:", projectId);

        this.niotservice.showProjectDetails(projectId).subscribe((response) => {
          this.projectItem = response;
          console.log("response123445", response);
        });
      }
      //}
    );
  }

  callSampleDetailsByProjectId(projectId) {
    this.niotservice
      .showSampleDetailByProjectId(projectId)
      .subscribe((response) => {
        this.sample = response;
        console.log("prachi ", this.sample);
        for (var i = 0; i < response.samples.length; i++) {
          //console.log("Sample ID at index ", i, ": ", response.samples[i].id);
          this.sampleListId = response.samples[i].id;
          console.log("this.samplelIST", this.sampleListId);
        }
      });
  }

  callSampleDetails() {
    console.log("Selected Sample ID:", this.selectedSampleId);
    this.niotservice.sampleByID(this.selectedSampleId).subscribe((res) => {
      this.sample = res;
      console.log("PREET ", this.sample);
    });
  }

  showSequenceDetailsBySampleId(value) {
    console.log("in show sequence detatils", value);
    this.niotservice
      .showSequenceDetailBySampleId(value)
      .subscribe((response) => {
        this.sequence = response;
        console.log("in sequnce ", this.sequence);
      });
  }

  callSequenceDetails() {
    console.log("this.selectedSequenceId", this.selectedSequenceId);
    this.niotservice.sequenceId(this.selectedSequenceId).subscribe((res) => {
      console.log("seq response", res);
      this.sequence = res;
      console.log("this.sequenceList ", this.sequence);
    });
  }

  updateSampleDetails(selectedSample: any) {
    this.sample.sampleName = selectedSample.sampleName;
    this.sample.code = selectedSample.code;
    this.sample.type = selectedSample.type;
    this.sample.depth = selectedSample.depth;
    this.sample.latitude = selectedSample.latitude;
    this.sample.longitude = selectedSample.longitude;
    this.sample.ph = selectedSample.ph;
    this.sample.sampleDate = selectedSample.sampleDate;
    this.sample.location = selectedSample.location;
    this.sample.status = selectedSample.status;
    this.sample.temperature = selectedSample.temperature;
    this.sample.pressure = selectedSample.pressure;
    this.sample.salinity = selectedSample.salinity;
    this.sample.dissolvedOxygen = selectedSample.dissolvedOxygen;
    this.sample.environmentMaterial = selectedSample.environmentMaterial;
    this.sample.createdAt = selectedSample.createdAt;
    this.sample.lastUpdate = selectedSample.lastUpdate;
    this.sample.publications = selectedSample.publications;
    this.sample.id = selectedSample.id;
  }

  updateSequenceDetails(selectedSequence: any) {
    this.sequence.sequenceId = selectedSequence.sequenceId;
    this.sequence.description = selectedSequence.description;
    this.sequence.forwardPrimerSequence =
      selectedSequence.forwardPrimerSequence;
    this.sequence.geneName = selectedSequence.geneName;
    this.sequence.organismType = selectedSequence.organismType;
    this.sequence.organismName = selectedSequence.organismName;
    this.sequence.quality = selectedSequence.quality;
    this.sequence.reversePrimerSequence =
      selectedSequence.reversePrimerSequence;
    this.sequence.sequence = selectedSequence.sequence;
    this.sequence.sequenceHeader = selectedSequence.sequenceHeader;
    this.sequence.sequenceType = selectedSequence.sequenceType;
    this.sequence.sequencingPlatform = selectedSequence.sequencingPlatform;
    this.sequence.status = selectedSequence.status;
    this.sequence.tempAccessionNumber = selectedSequence.tempAccessionNumber;
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
            name: "Niot",
            isLink: true,
            link: "/",
          },
          {
            name: "View Details",
            isLink: false,
          },
        ],
      },
    };
  }
}
