import { Component, OnInit } from "@angular/core";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-search-project",
  templateUrl: "./view-search-project.component.html",
  styleUrls: ["./view-search-project.component.scss"],
})
export class ViewSearchProjectComponent implements OnInit {
  public contentHeader: object;
  item: any[] = [];
  page = 1;
  pageSize = 5;
  itemsOnCurrentPage;
  totalItems;
  project;

  sampleLength: any;

  constructor(
    private niotservice: NiotServiceService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      var projectId = params.projectId;
      this.niotservice.projectByID(projectId).subscribe((response) => {
        this.project = response;
        console.log("project", response);
      });
      this.niotservice
        .showSampleDetailByProjectId(projectId)
        .subscribe((response) => {
          this.item = response.samples;
          this.updateItemsOnCurrentPage();
          console.log("samplelist", response);
          console.log("samplelist length", this.item.length);
          this.sampleLength = this.item.length;
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
  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
    console.log(this.page, "pagenumber");
    this.updateItemsOnCurrentPage();
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Project Details",
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
            name: "Project List ",
            isLink: true,
            link: "/manage-project-list",
          },
          {
            name: "Project",
            isLink: false,
          },
        ],
      },
    };
  }

  viewSampleDetails(id) {
    this.router.navigate(["submit/view-sampledata"], {
      queryParams: { sampleId: id },
    });
  }
}
