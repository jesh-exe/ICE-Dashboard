import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { VcfService } from "../vcf-service/vcf.service";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { SetAnalysisOnPopulation } from "../vcf-models/setAnalysisOnPopulation";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-set-analysis-on-population",
  templateUrl: "./set-analysis-on-population.component.html",
  styleUrls: ["./set-analysis-on-population.component.scss"],
})
export class SetAnalysisOnPopulationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild("modalVC", { read: TemplateRef })
  public change: boolean = false;
  public checkGT: boolean = false;
  public contentHeader: object;
  public Collection: string[] = [];
  public selectCollection: string = this.Collection[0];
  public popcode: Map<string, string[]>;
  public discarded: Map<string, string[]>;
  public masterSample: string[];
  public description: string;
  public analysisName: string;
  public data: any;
  public outputfileformat;
  // Template: TemplateRef<any>;
  showData: any;
  public outputFileFormatList = this.service.outputFileFormatList;
  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService,
    private modalService: NgbModal
  ) {}
  radioChecked(id, i) {
    this.outputFileFormatList.forEach((item) => {
      if (item.id !== id) {
        item.selected = false;
      } else {
        // this.outputfileformat = item.value;
        item.selected = true;
      }
    });
  }
  popFileUpload(fileList: any): void {
    let file = fileList.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      var allowedExtensions = /(\.doc|\.docx|\.odt|\.tex|\.txt)$/i;
      if (!allowedExtensions.exec(file.name)) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Invalid file type!",
        });
        return false;
      }
      this.logService.debug(e.target);
      this.logService.debug(e.target.result);
      var fileContent = e.target.result.toString();
      this.popcode = new Map<string, string[]>();
      this.discarded = new Map<string, string[]>();
      fileContent.split(/\r?\n/).forEach((line) => {
        var tab = line.split("\t");
        if (
          tab[0] &&
          tab[1] &&
          this.masterSample.includes(tab[1]) &&
          this.service.isCaseSensitiveRegExp(tab[1]) &&
          this.service.checkDuplicate(tab[1], this.popcode)
        ) {
          if (this.popcode.get(tab[0])) {
            this.popcode.get(tab[0]).push(tab[1]);
          } else {
            this.popcode.set(tab[0], [tab[1]]);
          }
        } else {
          if (this.discarded.get(tab[0])) {
            this.discarded.get(tab[0]).push(tab[1]);
          } else {
            this.discarded.set(tab[0], [tab[1]]);
          }
        }
      });
    };
    fileReader.readAsText(file);
  }

  keyBlur() {
    this.service.getSamples(this.selectCollection).subscribe((val) => {
      this.logService.debug("Master Sample list" + val.sampleNames);
      this.masterSample = val.sampleNames;
    });

    this.service.checkGT(this.selectCollection).subscribe(
      (val) => {
        this.logService.debug("File contains GT" + val);
        this.checkGT = true;
        this.change = true;
      },
      (error) => {
        this.change = false;
        this.logService.debug(error);
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "File doesn't contain GT!",
        });
      }
    );
  }

  addFileForAnalysis() {
    this.router.navigate(["vcfanalysis/select"]);
  }
  onSubmit(modalVC) {
    // this.logService.debug(
    //   this.analysisName,
    //   this.selectCollection,
    //   this.outputfileformat,
    //   this.popcode
    // );

    this.logService.debug("Submit button Clicked");

    this.data = new SetAnalysisOnPopulation();
    this.data.description = this.description;
    if (this.analysisName) {
      this.data.analysisName = this.analysisName;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Enter Project name",
      });
      return;
    }
    if (this.selectCollection) {
      this.data.collection = this.selectCollection;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select Collection",
      });
      return;
    }

    if (this.popcode) {
      let convMap = {};
      this.popcode.forEach((val: string[], key: string) => {
        convMap[key] = val;
      });
      this.data.popcode = convMap;
      console.log(convMap, this.data.popcode);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select the population file",
      });
      return;
    }
    this.outputFileFormatList.forEach((item) => {
      if (item.selected === true) {
        this.outputfileformat = item.value;
      }
    });
    if (this.outputfileformat) {
      this.data.outputExtension = this.outputfileformat;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select the output file format",
      });
      return;
    }
    this.logService.debug(JSON.stringify(this.data));
    this.modalService.open(modalVC, {
      centered: true,
      size: "lg",
    });
  }
  confirmSubmit() {
    this.blockUI.start("Loading...");
    console.log(this.data);
    this.logService.debug(JSON.stringify(this.data));
    this.service
      .submitSetAnalysisOnPopulation(this.data)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe(
        (value: any) => {
          this.logService.debug(JSON.stringify(value));
          this.blockUI.stop();
          Swal.fire({
            icon: "success",
            title: `${value.message} `,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          this.modalService.dismissAll();
          this.router.navigate(["/vcfanalysis/mainpage"]);
        },
        (error) => {
          this.logService.error(JSON.stringify(error));
        }
      );

    return false;
  }

  ngOnInit(): void {
    this.change = false;
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
        this.logService.debug(JSON.stringify(value));
        this.Collection = value.collectionNames;
      });
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
            name: "Set Analysis On Population",
            isLink: false,
          },
        ],
      },
    };
  }
}
