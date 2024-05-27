import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchStateServiceService } from "../niot-service/search-state-service.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-search-functionality",
  templateUrl: "./search-functionality.component.html",
  styleUrls: ["./search-functionality.component.scss"],
})
export class SearchFunctionalityComponent implements OnInit {
  public contentHeader: object;
  searchParameters: string[];
  keyValuePairs: { [key: string]: string } = {};
  searchValue;
  selectedParam;
  sequencedetails;
  page = 1;
  pageSize = 5;
  totalItems;
  itemsOnCurrentPage;
  route: ActivatedRoute;
  error1: any;

  constructor(
    private niotservice: NiotServiceService,
    private router: Router,
    private searchStateService: SearchStateServiceService
  ) {}

  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
    console.log(this.page, "pagenumber");
    this.updateItemsOnCurrentPage();
  }

  updateItemsOnCurrentPage(): void {
    console.log(":updateItems");
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.sequencedetails.length
    );
    this.totalItems = this.sequencedetails.length;
    console.log("totalItems", this.totalItems);
    this.itemsOnCurrentPage = this.sequencedetails.slice(startIndex, endIndex);

    console.log(this.itemsOnCurrentPage, "this.itemsOnCurrentPage");
  }

  getSearchParameters() {
    this.niotservice.getSearchParam().subscribe((response) => {
      console.log(response);
      this.searchParameters = response.searchParameters;
    });
    // this.searchParameters=["projectName","userId"];
    // console.log(this.searchParameters)
  }
  toggleSelection(param?: string): void {
    if (param === this.selectedParam) {
      this.selectedParam = null; // Deselect if already selected
      if ((this.selectedParam = null)) this.sequencedetails = [];
      // console.log("this.selectedParam",this.selectedParam)
      // this.niotservice.getApprovedSequences().subscribe(response=>{
      //   console.log(response,"deselect")
      //   this.sequencedetails= response.sequences;
      // })
    } else {
      if (param === undefined) this.sequencedetails = [];
      //{
      //  // console.log(param,"param1")
      //   this.niotservice.getApprovedSequences().subscribe(response=>{
      //     console.log(response,"deselect")
      //     this.sequencedetails= response.sequences;
      //   })
      // }
      //console.log("param",param)
      this.selectedParam = param; // Select the clicked parameter
    }
  }

  getSearchValue(searchValue, searchParam) {
    // this.keyValuePairs[searchParam]=searchValue;
    if (searchParam === undefined) {
      console.log("in error");
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Please select the Search Type",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    } else {
      console.log(this.keyValuePairs);
      const searchValues = { [searchParam]: searchValue };

      this.niotservice.searchSeq({ searchValues: searchValues }).subscribe(
        (response) => {
          console.log(response);

          this.sequencedetails = response.sequences;
          console.log(this.sequencedetails.length, "length");
          this.searchStateService.setSequencedetails(this.sequencedetails);
          this.updateItemsOnCurrentPage();
        },
        (error) => {
          console.log("in error");
          Swal.fire({
            icon: "warning",
            title: "Error",
            text: error.error.message,
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
        }
      );
    }
  }

  clearSearchInput() {
    this.searchValue = "";
  }

  navigateToComponent(item) {
    console.log("hello");
    this.router.navigate(["submit/search-sequence"], {
      queryParams: { sequenceId: item },
    });
  }

  viewProjectDetails(id) {
    this.router.navigate(["submit/view-projectdata"], {
      queryParams: { projectId: id },
    });
  }
  viewSampleDetails(id) {
    this.router.navigate(["submit/view-sampledata"], {
      queryParams: { sampleId: id },
    });
  }

  ngOnInit(): void {
    this.getSearchParameters();
    this.contentHeader = {
      headerTitle: "Search",
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
            isLink: false,
          },
        ],
      },
    };

    this.sequencedetails = this.searchStateService.getSequencedetails();
    this.updateItemsOnCurrentPage();
    // if (!this.sequencedetails) {
    //   // If sequencedetails is not available in the service, fetch it
    //   this.niotservice.getApprovedSequences().subscribe(response => {
    //     this.sequencedetails = response.sequences;
    //     // Update the state in the service after fetching sequencedetails
    //     this.searchStateService.setSequencedetails(this.sequencedetails);
    //   });
    // }
  }
}
