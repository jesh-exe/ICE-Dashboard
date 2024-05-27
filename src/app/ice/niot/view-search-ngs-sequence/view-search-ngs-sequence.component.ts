import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "environments/environment";
@Component({
  selector: "app-view-search-ngs-sequence",
  templateUrl: "./view-search-ngs-sequence.component.html",
  styleUrls: ["./view-search-ngs-sequence.component.scss"],
})
export class ViewSearchNgsSequenceComponent implements OnInit {
  public contentHeader: object;
  item;
  filePath;
  accessionNumber
  public fileDownloadUri = environment.baseURL + "/niot/NGSSequence/download";
  items: any;
  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      var ngssequenceId = params.id;
      this.niotservice.ngsSequenceId(ngssequenceId).subscribe((response) => {
        this.item = response;
        console.log("response123445", response);
        console.log("item.sequenceId ", this.item.id);
        this.accessionNumber=response.permanentAccessionNumber;
        // this.filePath = this.item.ngsSequenceFilePath;
        // this.filePath = this.fileDownloadUri + this.filePath;
        this.items = response.ngsSequenceFilePath.split(",");
        console.log(this.items);
        for (let index = 0; index < this.items.length; index++) {
          let element = this.items[index];
          console.log(element)
          this.filePath = this.fileDownloadUri +this.accessionNumber+"/"+ element;
          console.log(this.filePath)
        }
      });
    });
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "WGS Submission Details",
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
            name: "Search ",
            isLink: true,
            link: "/search",
          },
          {
            name: "Sequence Search",
            isLink: false,
          },
        ],
      },
    };
  }
}
