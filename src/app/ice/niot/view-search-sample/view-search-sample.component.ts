import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
declare const L: any;
@Component({
  selector: "app-view-search-sample",
  templateUrl: "./view-search-sample.component.html",
  styleUrls: ["./view-search-sample.component.scss"],
})
export class ViewSearchSampleComponent implements OnInit {
  public contentHeader: object;
  sample;
  item: any[] = [];
  page = 1;
  ngsPage = 1;
  pageSize = 5;
  ngspageSize = 5;
  itemsOnCurrentPage;
  totalItems;
  totalNgsItems;
  sequenceLength;
  ngsSequenceLength;
  map: any;
  ngsitem: any[] = [];
  ngsitemsOnCurrentPage;
  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      var sampleId = params.sampleId;
      this.niotservice.sampleByID(sampleId).subscribe((response) => {
        this.sample = response;
        console.log("sample", response);
        this.map = L.map("sampleMap").setView(
          [12.951170342661884, 80.21150858198666],
          2
        ); //13 is for zoom
        // map.remove();
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJlZXRqOTciLCJhIjoiY2t3eGQ5ZmxoMGN6NDJwbGNuejZyMzVlNSJ9.lsETVMMk85Xt7vZi8pNghw",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "your.mapbox.access.token",
          }
        ).addTo(this.map);
        const markerIcon = L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          // specify the path here
          iconUrl: "/assets/images/marker-icon.png",
          shadowUrl: "/assets/images/marker-shadow.png",
        });
        let marker = L.marker([response.latitude, response.longitude], {
          title: response.sampleName.toString(),
          icon: markerIcon,
        }).addTo(this.map);
        marker.bindPopup(response.sampleName.toString()).openPopup();
      });
      this.niotservice
        .showSequenceDetailBySampleId(sampleId)
        .subscribe((response) => {
          this.item = response.sequences;
          console.log("item length", this.item, this.item.length);
          this.sequenceLength = this.item.length;
          this.updateItemsOnCurrentPage();
        });

      this.niotservice
        .showNgsSequenceDetailBySampleId(sampleId)
        .subscribe((response) => {
          this.ngsitem = response.ngssequenceList;
          console.log("NGS item length", this.ngsitem, this.ngsitem.length);
          this.ngsSequenceLength = this.ngsitem.length;
          this.updateNgsItemsOnCurrentPage();
        });
    });
  }
  updateItemsOnCurrentPage(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.item.length);
    this.totalItems = this.item.length;
    console.log("totalItems", this.totalItems);
    this.itemsOnCurrentPage = this.item.slice(startIndex, endIndex);
    console.log(this.itemsOnCurrentPage, "this.itemsOnCurrentPage");
  }
  updateNgsItemsOnCurrentPage(): void {
    const startIndex = (this.ngsPage - 1) * this.ngspageSize;
    const endIndex = Math.min(
      startIndex + this.ngspageSize,
      this.ngsitem.length
    );
    this.totalNgsItems = this.ngsitem.length;
    console.log("totalNgsItems", this.totalNgsItems);
    this.ngsitemsOnCurrentPage = this.ngsitem.slice(startIndex, endIndex);
    console.log(this.ngsitemsOnCurrentPage, "this.ngsitemsOnCurrentPage");
  }
  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
    console.log(this.page, "pagenumber");
    this.updateItemsOnCurrentPage();
  }

  onNgsPageChange(pageNumber: number): void {
    this.ngsPage = pageNumber;
    console.log(this.page, "pagenumber");
    this.updateNgsItemsOnCurrentPage();
  }

  viewSequenceDetails(id) {
    this.router.navigate(["submit/search-sequence"], {
      queryParams: { sequenceId: id },
    });
  }

  viewNgsSequenceDetails(id) {
    this.router.navigate(["submit/view-ngsSequence"], {
      queryParams: { id: id },
    });
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Sample Details",
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
            name: "Sample List ",
            isLink: true,
            link: "/manage-sample-list",
          },
          {
            name: "Sample",
            isLink: false,
          },
        ],
      },
    };
  }
}
