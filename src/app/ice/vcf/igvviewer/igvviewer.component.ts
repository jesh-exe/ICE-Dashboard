import { Component, OnInit } from "@angular/core";
import { environment } from "environments/environment";
import igv from "igv";
@Component({
  selector: "app-igvviewer",
  templateUrl: "./igvviewer.component.html",
  styleUrls: ["./igvviewer.component.scss"],
})
export class IgvviewerComponent implements OnInit {
  public contentHeader: object;
  constructor() {}

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "IGV Viewer",
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
            isLink: true,
            link: "/vcfanalysis/igvinfo",
          },
          {
            name: "Visualization",
            isLink: false,
          },
        ],
      },
    };
    var igvDiv = document.getElementById("igv-div");
    const genome_url =
      environment.s3Url +
      "/ice-public/igv/genomes.json" +
      `?randomSeed=${Math.random().toString(36)}`;

    const options = {
      locus: "chr22",
      genome: "hg38",
      genomeList: genome_url,
      loadDefaultGenomes: false,
      tracks: [
        {
          url:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz",
          indexURL:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz.tbi",
          name: "Color by function, SVTYPE",
          visibilityWindow: -1,
          color: function (variant) {
            const svtype = variant.info["SVTYPE"];
            switch (svtype) {
              case "DEL":
                return "#ff2101";
              case "INS":
                return "#001888";
              case "DUP":
                return "#028401";
              case "INV":
                return "#008688";
              case "CNV":
                return "#8931ff";
              case "BND":
                return "#891100";
              default:
                return "#002eff";
            }
          },
        },
        {
          url:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz",
          indexURL:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz.tbi",
          name: "Color by table, SVTYPE",
          visibilityWindow: -1,
          colorBy: "SVTYPE",
          colorTable: {
            DEL: "#ff2101",
            INS: "#001888",
            DUP: "#028401",
            INV: "#008688",
            CNV: "#8931ff",
            BND: "#891100",
            "*": "#002eff",
          },
        },
        {
          url:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz",
          indexURL:
            environment.s3Url +
            "/ice-public/igv/nstd186.GRCh38.variant_call.vcf.gz.tbi",
          name: "Color by REGIONID",
          colorBy: "REGIONID",
          visibilityWindow: -1,
        },
      ],
    };

    igv.createBrowser(igvDiv, options).then(function (browser) {
      this.logService.debug("Created IGV browser");
    });
  }
}
