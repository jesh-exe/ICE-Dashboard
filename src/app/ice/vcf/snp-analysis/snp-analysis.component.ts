import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import Stepper from "bs-stepper";
import { IceLogService } from "app/ice/services/ice-log.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { snpRequestData } from "../vcf-models/SnpRequestData";
import { VcfService } from "../vcf-service/vcf.service";
import { Router } from "@angular/router";

import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: "app-snp-analysis",
  templateUrl: "./snp-analysis.component.html",
  styleUrls: ["./snp-analysis.component.scss"],
})
export class SnpAnalysisComponent implements OnInit {
  private WizardStepper: Stepper;

  @BlockUI() blockUI: NgBlockUI;
  public sampleList: string[] = [];
  public Collection: string[] = [];
  public Chromosomes: string[] = [];
  public Set: string[] = [];
  public msgResponse: any;
  public selectCollection: string = this.Collection[0];
  public selectChromosomes: string = this.Chromosomes[0];
  public set1Selected: string[] = [];
  public set2Selected: string[] = [];
  public rangeFrom: number;
  public rangeTo: number;
  public contentHeader: object;

  addFileForAnalysis() {
    this.router.navigate(["vcfanalysis/select"]);
  }
  set1UnselectAll() {
    this.sampleList = this.sampleList.concat(this.set1Selected);
    this.set1Selected = [];
  }

  set2UnselectAll() {
    this.sampleList = this.sampleList.concat(this.set2Selected);
    this.set2Selected = [];
  }
  Next() {
    this.WizardStepper.next();
  }
  Previous() {
    this.WizardStepper.previous();
  }
  myFunc() {
    this.logService.debug(this.set1Selected + "" + this.set1Selected.length);
    this.logService.debug("-----------");
    this.sampleList = this.Set.filter((obj) => {
      for (let i = 0; i < this.set1Selected.length; i++) {
        if (obj === this.set1Selected[i]) {
          return false;
        }
      }
      for (let i = 0; i < this.set2Selected.length; i++) {
        if (obj === this.set2Selected[i]) {
          return false;
        }
      }

      return true;
    });
    this.logService.debug(this.sampleList);
  }
  onSubmit() {
    this.logService.debug("clicked on submit button");
    this.blockUI.start("Loading...");
    let request = new snpRequestData();
    request.from = this.rangeFrom;
    request.to = this.rangeTo;
    request.collection = this.selectCollection;
    request.set1 = this.set1Selected;
    request.set2 = this.set2Selected;
    request.chromosome = this.selectChromosomes;
    this.service
      .getSNPResponse(request)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(JSON.stringify(value));
        // this.logService.debug(JSON.stringify((value);
        this.msgResponse = value;
        this.blockUI.stop();
      });
    return false;
  }
  collectionNext(selectCollection) {
    this.service
      .getSamples(selectCollection)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(value.sampleNames);
        this.sampleList = value.sampleNames;
        this.Set = this.sampleList;
        this.logService.debug("samplelist" + this.sampleList);
        this.Chromosomes = value.chromosomes;
        this.logService.debug("Chromosomes" + this.Chromosomes);
        this.selectChromosomes = this.Chromosomes[0];
        this.WizardStepper.next();
      });
  }
  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService
  ) {}

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
          // {
          //   name: "Info",
          //   isLink: true,
          //   link: "/vcfanalysis/snpinfo",
          // },
          {
            name: "SNP based population differentiation",
            isLink: false,
          },
        ],
      },
    };
    this.logService.debug(this.service.getCollection());
    this.service
      .getCollection()
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(value);
        this.Collection = value.collectionNames;
      });
    this.WizardStepper = new Stepper(document.querySelector("#stepper"), {
      linear: false,
      animation: true,
    });
  }
}
