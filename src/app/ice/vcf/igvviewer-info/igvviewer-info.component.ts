import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-igvviewer-info",
  templateUrl: "./igvviewer-info.component.html",
  styleUrls: ["./igvviewer-info.component.scss"],
})
export class IgviewerInfoComponent implements OnInit {
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
