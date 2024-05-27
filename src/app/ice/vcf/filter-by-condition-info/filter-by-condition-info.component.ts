import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-by-condition-info",
  templateUrl: "./filter-by-condition-info.component.html",
  styleUrls: ["./filter-by-condition-info.component.scss"],
})
export class FilterByConditionInfoComponent implements OnInit {
  public contentHeader: object;
  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "VCF Analysis",
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
            name: "VCF Analysis",
            isLink: true,
            link: "/vcfanalysis/mainpage",
          },

          {
            name: "Info",
            isLink: false,
          },
        ],
      },
    };
  }
}
