import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-view-search-sequences",
  templateUrl: "./view-search-sequences.component.html",
  styleUrls: ["./view-search-sequences.component.scss"],
})
export class ViewSearchSequencesComponent implements OnInit {
  public contentHeader: object;
  item;
  filePath;
  items;
  limit: number = 100;
  completeWords: boolean;
  isContentToggled: boolean;
  nonEditedContent: string;
  accessionNumber;
  public fileDownloadUri = environment.baseURL + "/niot/sequence/download";
  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      var sequenceId = params.sequenceId;
      this.niotservice.sequenceId(sequenceId).subscribe((response) => {
        this.item = response;
        console.log("response123445", response);
        this.accessionNumber=response.permanentAccessionNumber;
        console.log("item.sequenceId ", this.item.sequenceId);
        // this.item = response;
        this.items = response.sequenceFilePath.split(",");
        console.log(this.items);
        for (let index = 0; index < this.items.length; index++) {
          let element = this.items[index];
          console.log(element)
          this.filePath = this.fileDownloadUri +this.accessionNumber+"/"+ element;
          console.log(this.filePath)
        }
        this.nonEditedContent = this.item.sequence;
        this.item.sequence = this.formatContent();
      });
    });
  }
  // downloadFile(filepath) {
  //   this.filePath = this.fileDownloadUri +this.accessionNumber+"/"+ filepath;
  //   console.log(this.filePath)
  //   this.http.get(this.filePath).subscribe((response) => {
  //     console.log(response)
  //     // const fileURL = URL.createObjectURL(response);
  //     //  window.open(response, '_blank');
  // }, error => {
  //     console.error('Error downloading file:', error);
  //     // Handle error appropriately
  // });
  // }
  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.item.sequence = this.isContentToggled
      ? this.nonEditedContent
      : this.formatContent();
  }
  formatContent() {
    if (this.completeWords) {
      this.limit = this.item.sequence.substr(0, this.limit).lastIndexOf(" ");
    }
    return `${this.item.sequence.substr(0, this.limit)}...`;
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Sequence Details",
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
            name: "Sequence List ",
            isLink: true,
            link: "/manage-sequence-list",
          },
          {
            name: "Sequence",
            isLink: false,
          },
        ],
      },
    };
  }
}
