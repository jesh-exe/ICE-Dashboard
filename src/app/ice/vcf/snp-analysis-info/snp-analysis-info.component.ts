import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-snp-analysis-info",
  templateUrl: "./snp-analysis-info.component.html",
  styleUrls: ["./snp-analysis-info.component.scss"],
})
export class SNPAnalysisInfo implements OnInit {
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
