import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { UploadModel } from "../vcf-models/UploadModel";
import { VcfService } from "../vcf-service/vcf.service";
import { Router } from "@angular/router";
import { FilterByCondition } from "../vcf-models/filterByCondition";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { item } from "../vcf-models/Item";
@Component({
  selector: "app-filter-by-condition",
  templateUrl: "./filter-by-condition.component.html",
  styleUrls: ["./filter-by-condition.component.scss"],
})
export class FilterByConditionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public description: string;
  public Key: string[] = [];
  public Operator: any[] = [
    { id: "gt", value: "Greater Than(>)" },
    { id: "lt", value: "Less than(<)" },
    { id: "eq", value: "Equals (==)" },
    { id: "gt", value: "Range" },
    { id: "gte", value: "Greater than Equal too(>=)" },
    { id: "lte", value: "Less than Equal too(<=)" },
  ];
  public selectkey: string;
  public selectoperator: string;
  public contentHeader: object;
  public Collection: string[] = [];
  public selectCollection: string = this.Collection[0];
  public items: item[] = [];
  public outputFileFormatList = this.service.outputFileFormatList;
  public outputfileformat: string;
  public item = this.addNewItem();
  public analysisName: string;
  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService
  ) {}
  keyBlur() {
    // console.log("i am called");
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
        this.logService.debug(JSON.stringify(value));
        this.Key = value;
      });
  }

  addNewItem() {
    this.items.push({
      key: "",
      operator: "",
      value: "",
    });
  }
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }
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
  onSubmit() {
    this.logService.debug("Submit button Clicked");
    this.logService.debug(JSON.stringify(this.items));

    let data = new FilterByCondition();
    data.description = this.description;
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
    this.logService.debug(this.items);
    if (this.items.length > 0) {
      data.parameters = this.items;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Select the condition",
      });
      return;
    }

    this.outputFileFormatList.forEach((item) => {
      if (item.selected === true) {
        this.outputfileformat = item.value;
      }
    });
    if (this.outputfileformat) {
      data.outputfileformat = this.outputfileformat;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Enter output file format",
      });
      return;
    }
    this.blockUI.start("Loading...");
    this.service
      .getFilterByConditionResponse(data)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(JSON.stringify(value));
        this.blockUI.stop();
        Swal.fire({
          icon: "success",
          title: `${value.message}`,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        this.router.navigate(["vcfanalysis/mainpage"]);
      });
    return false;
  }

  addFileForAnalysis() {
    this.router.navigate(["vcfanalysis/select"]);
  }
  ngOnInit(): void {
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
          //   link: "/vcfanalysis/filterbyconditioninfo",
          // },
          {
            name: "Variant Prioritization",
            isLink: false,
          },
        ],
      },
    };
  }
}
