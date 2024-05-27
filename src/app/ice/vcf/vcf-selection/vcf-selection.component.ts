import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { UploadModel } from "../vcf-models/UploadModel";
import { VcfService } from "../vcf-service/vcf.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: "app-vcf-selection",
  templateUrl: "./vcf-selection.component.html",
  styleUrls: ["./vcf-selection.component.scss"],
})
export class VcfSelectionComponent implements OnInit {
  public VCF: string[] = [];
  public GTF: string[] = [];
  public selectvcf: string;
  public selectgtf: string;
  public loadData: UploadModel;
  public contentHeader: object;

  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService
  ) {}

  onSubmit() {
    this.logService.debug("Submit button Clicked");
    this.logService.debug(this.selectvcf + "  " + this.selectgtf);
    this.loadData = new UploadModel();
    this.loadData.gtfFile = this.selectgtf;
    this.loadData.vcfFile = this.selectvcf;
    this.service
      .submitLoadingData(this.loadData)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe(
        (value) => {
          this.logService.info("Done" + JSON.stringify(value));
          Swal.fire({
            icon: "success",
            title: "Upload Process Initialized. Kindly wait for Notification",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          this.router.navigate(["vcfanalysis/mainpage"]);
        },
        (error) => {
          this.logService.error("" + JSON.stringify(error));
          Swal.fire({
            icon: "error",
            title: "Error !",
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        }
      );
  }
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
            name: "Variant File Upload",
            isLink: false,
          },
        ],
      },
    };
    this.service
      .getFileThroughMetadataViaStorage("vcf")
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(JSON.stringify(value));

        this.VCF = value.fileMetadataList.map(function (val, index) {
          return val.fileName;
        });
      });
    this.service
      .getFileThroughMetadataViaStorage("gtf")
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(JSON.stringify(value));

        this.GTF = value.fileMetadataList.map(function (val, index) {
          return val.fileName;
        });
      });
  }
}
