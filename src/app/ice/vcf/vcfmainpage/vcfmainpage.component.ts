import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { VcfService } from "../vcf-service/vcf.service";

@Component({
  selector: "app-vcfmainpage",
  templateUrl: "./vcfmainpage.component.html",
  styleUrls: ["./vcfmainpage.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "chat-application" },
})
export class VcfmainpageComponent implements OnInit {
  public contentHeader: object;
  public statusArray;
  constructor(private service: VcfService) {}
  public data = [
    {
      href: "select",
      title: "Variant File Upload",
      desc: "The Variant Call Format (VCF) specifies the format of a text file used in bioinformatics for storing gene sequence variations. ",
      img: "assets/images/vcf.png",
    },
    {
      href: "snpanalysis",
      title: "SNP based Population Differentiation",
      desc: "Efficient analysis of Single Nucleotide Polymorphisms (SNPs) across genomic samples enable in deciphering the relationship between genotype and phenotype. ",
      img: "assets/images/vcf.svg",
    },
    {
      href: "filterbycondition",
      title: "Variant Prioritization",
      desc: "Variant are often prioritized in genetic studies based on their minimum allele frequency (MAF) and depth. Minimum allele frequency refers to the proportion of individuals in a population who carry a particular variant allele.",
      img: "assets/images/vcf4.png",
    },
    {
      href: "filterbyinfotags",
      title: "Filter By Tags",
      desc: "Variant are often prioritized in genetic studies based on their minimum allele frequency (MAF) and depth. Minimum allele frequency refers to the proportion of individuals in a population who carry a particular variant allele.",
      img: "assets/images/vcf4.png",
    },
    {
      href: "custompopulation",
      title: "Filter By Custom Population ",
      desc: "Variant are often prioritized in genetic studies based on their minimum allele frequency (MAF) and depth. Minimum allele frequency refers to the proportion of individuals in a population who carry a particular variant allele.",
      img: "assets/images/vcf4.png",
    },
    // {
    //   href: "mainpage",
    //   title: "Filter By Tags",
    //   desc: "Variant annotation is a crucial step in genetic research and analysis, as it involves assigning functional or biological information to identified genetic variants. ",
    //   img: "assets/images/filter.png",
    //   button: true,
    //   children: [
    //     {
    //       href: "filterbyinfotags",
    //       title: "Tags",
    //     },
    //     {
    //       href: "custompopulation",
    //       title: "Custom Population",
    //     },
    //   ],
    // },
    {
      href: "functionalannotation",
      title: "Functional Annotation",
      desc: "Variant filtration using annotation terms is an essential step in genetic research and analysis to identify and prioritize variants of interest. ",
      img: "assets/images/FunctionalAnnotation.png",
    },
    {
      href: "setonpop",
      title: "Set Operation on population",
      desc: "Common variants refer to genetic variants that are present in the genomes of two or more populations. These variants are often defined based on their frequency and prevalence across different populations. ",
      img: "assets/images/commonbtwnpop.png",
    },

    // {
    //   href: "igvinfo",
    //   title: "IGV",
    //   desc: "Visualisation is an important step for bioinformatics research to easing the observation of major finding, correlation and trends in huge dataset. The Integrative Genomics Viewer (IGV) is a interactive tool for the visual exploration of genomic data. ",
    //   img: "assets/images/stats.png",
    // },
  ];
  getStatusUpload() {
    this.service.getStatusOfUpload().subscribe((value) => {
      console.log("Status: ", value);
      this.statusArray = value;
    });
  }
  refresh($event) {
    console.log("Refresh Clicked: ", $event);
    this.getStatusUpload();
  }
  ngOnInit(): void {
    this.getStatusUpload();
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
            isLink: false,
          },
        ],
      },
    };
  }
}
