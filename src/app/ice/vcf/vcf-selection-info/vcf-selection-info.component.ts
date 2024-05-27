import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vcf-selection-info",
  templateUrl: "./vcf-selection-info.component.html",
  styleUrls: ["./vcf-selection-info.component.scss"],
})
export class VcfSelectionInfoComponent implements OnInit {
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
