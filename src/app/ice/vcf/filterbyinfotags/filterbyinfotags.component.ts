import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { VcfService } from "../vcf-service/vcf.service";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { FilterByInfoTags } from "../vcf-models/filterByInfoTags";

@Component({
  selector: "app-filterbyinfotags",
  templateUrl: "./filterbyinfotags.component.html",
  styleUrls: ["./filterbyinfotags.component.scss"],
})
export class FilterbyinfotagsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public Collection: string[] = [];
  public selectCollection: string = this.Collection[0];
  public infotags: any[] = [];
  public selectedInfoTags: string[] = [];
  public analysisName: string;
  public description: string;
  public difference;
  public checkGT: boolean;
  public checkDP: boolean;
  public differenceValue: any[] = [];
  public calculateTags = ["AC", "AF", "DP", "AN"];
  public selectedCalculateTags: string[] = [];
  public outputFileFormatList = this.service.outputFileFormatList;
  public outputfileformat: string;
  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService
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
  keyBlur() {
    this.checkGTandDP();
    this.service
      .getTags(this.selectCollection)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.infotags.filter((temp) => temp.check == "false");
        this.infotags = [];
        this.logService.debug(JSON.stringify(value));
        let a = new Set(this.calculateTags);
        let b = new Set(value);
        this.difference = new Set([...a].filter((x) => !b.has(x)));
        Array.from(this.difference).filter((temp) => {
          if (temp === "AC" || temp === "AF" || temp === "AF") {
            if (this.checkGT) {
              this.differenceValue.push({ value: temp, check: "false" });
            }
          } else {
            if (this.checkDP) {
              this.differenceValue.push({ value: temp, check: "false" });
            }
          }
        });
        value.filter((temp) =>
          this.infotags.push({ value: temp, check: "false" })
        );
        this.selectedInfoTags = [];
        this.logService.debug(JSON.stringify(this.infotags));
        this.logService.debug(JSON.stringify(this.differenceValue));
      });
  }
  onSelectACAFANDP(event, item: string) {
    this.logService.debug(event.target.checked + item);
    if (event.target.checked) {
      this.selectedCalculateTags.push(item);
    } else {
      const index = this.selectedCalculateTags.indexOf(item);
      if (index > -1) {
        this.selectedCalculateTags.splice(index, 1);
      }
    }
  }
  checkGTandDP() {
    this.service.checkGT(this.selectCollection).subscribe(
      (val) => {
        this.logService.debug("File contains GT " + val);
        this.checkGT = true;
      },
      (error) => {
        this.logService.debug(error);
        this.checkGT = false;
      }
    );
    this.service.checkDP(this.selectCollection).subscribe(
      (val) => {
        this.logService.debug("File contains DP " + val);
        this.checkDP = true;
      },
      (error) => {
        this.logService.debug(error);
        this.checkDP = false;
      }
    );
  }
  onSelect(event, item) {
    this.logService.debug(event.target.checked + item);
    if (event.target.checked) {
      this.selectedInfoTags.push(item);
      //  this.logService.debug(this.selectedKeys);
    } else {
      const index = this.selectedInfoTags.indexOf(item);
      if (index > -1) {
        this.selectedInfoTags.splice(index, 1);
      }
      //  this.logService.debug(this.selectedKeys);
    }
  }
  addFileForAnalysis() {
    this.router.navigate(["vcfanalysis/select"]);
  }
  onSubmit() {
    this.logService.debug(
      this.analysisName +
        " " +
        this.selectCollection +
        " " +
        this.selectedInfoTags +
        " " +
        this.selectedCalculateTags
    );
    this.logService.debug("Submit button Clicked");

    let data = new FilterByInfoTags();
    if (this.analysisName) {
      data.analysisName = this.analysisName;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Enter Project name",
      });
      return;
    }
    if (this.selectCollection) {
      data.collection = this.selectCollection;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select Collection",
      });
      return;
    }
    this.logService.debug(this.selectedInfoTags.length);
    if (this.selectedInfoTags.length > 0) {
      data.infotags = this.selectedInfoTags;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select the tags",
      });
      return;
    }
    this.outputFileFormatList.forEach((item) => {
      if (item.selected === true) {
        this.outputfileformat = item.value;
      }
    });
    if (this.outputfileformat) {
      data.outputExtension = this.outputfileformat;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Enter output file format",
      });
      return;
    }
    data.calculatetags = this.selectedCalculateTags;
    data.description = this.description;
    this.blockUI.start("Loading...");
    this.logService.debug(data);
    this.service
      .submitFilterByInfoTags(data)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value: any) => {
        this.logService.debug(JSON.stringify(value));
        this.blockUI.stop();
        Swal.fire({
          icon: "success",
          title: ` ${value.message} `,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        this.router.navigate(["/vcfanalysis/mainpage"]);
      });

    return false;
  }

  ngOnInit(): void {
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
        this.logService.debug(value);
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
            name: "Filter By Info Tags",
            isLink: false,
          },
        ],
      },
    };
  }
}
