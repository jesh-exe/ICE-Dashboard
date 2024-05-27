import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { BigDataService } from "../big-data-service/big-data.service";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ShortMydriveComponent } from "../short-mydrive/short-mydrive.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FileListService } from "app/ice/storage/storage-service/file-list.service";
import { DataService } from "../big-data-service/dataservice.service";

@Component({
  selector: "app-gatk",
  templateUrl: "./gatk.component.html",
  styleUrls: ["./gatk.component.scss"],
})
export class GatkComponent implements OnInit {
  public contentHeader: object;
  public GatkForm: FormGroup;
  public GatkFormSubmit: boolean = false;
  public Memory: string[] = [
    "1G",
    "2G",
    "3G",
    "4G",
    "5G",
    "6G",
    "7G",
    "8G",
    "9G",
    "10G",
    "11G",
    "12G",
  ];
  public CpuCores: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  public Instances: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public CommandList: string[] = [
    "CollectAllelicCounts",
    "CountBases",
    "CountReads",
    "Pileup",
    "CalcMetadata",
    "CollectBaseDistributionByCycle",
    "CollectInsertSizeMetrics",
    "CollectMultipleMetrics",
    "CollectQualityYieldMetrics",
    "CompareDuplicates",
    "FlagStat",
    "MeanQualityByCycle",
    "QualityScoreDistribution",
    "PathSeqBwa",
    "PathSeqFilter",
    "PathSeqPipeline",
    "PathSeqScore",
    "ApplyBQSR",
    "BQSRPipeline",
    "BaseRecalibrator",
    "BwaAndMarkDuplicatesPipeline",
    "Bwa",
    "ExtractOriginalAlignmentRecordsByName",
    "MarkDuplicates",
    "PrintReads",
    "RevertSam",
    "SortSam",
    "FindBadGenomicKmers",
    "HaplotypeCaller",
    "ReadsPipeline",
    "CpxVariantReInterpreter",
    "DiscoverVariantsFromContigAlignmentsSAM",
    "ExtractSVEvidence",
    "FindBreakpointEvidence",
    "StructuralVariationDiscoveryPipeline",
    "SvDiscoverFromLocalAssemblyContigAlignments",
    "CountVariants",
    "PrintVariants",
  ];
  receivedData;
  receivedOutputData;
  public value;
  @ViewChild("modal", { static: false }) modal: ShortMydriveComponent;

  constructor(
    private service: BigDataService,
    private logService: IceLogService,
    private router: Router,
    private toast: HotToastService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private dataService: DataService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  get submitted(): boolean {
    return this.GatkFormSubmit;
  }
  get form() {
    return this.GatkForm.controls;
  }
  formOnSubmit() {
    this.GatkFormSubmit = true;
    if (this.GatkForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Check again!",
        text: "Kindly check all fields before submitting",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }
    this.logService.debug("SUCCESS data received");
    let gatk = this.GatkForm.value;
    this.logService.debug("Processing....." + JSON.stringify(gatk));
    this.service
      .createJob(gatk)
      .pipe(
        this.toast.observe({
          loading: "Starting GATK Instance...",
          success: "GATK Instance is started",
          error: "There is an issue to start gatk.",
        })
      )
      .subscribe(
        (data) => {
          this.logService.info(JSON.stringify(data));
          this.GatkForm.reset();
          this.GatkFormSubmit = false;
          Swal.fire({
            icon: "success",
            title: "Job Created!",
            text: data.podId,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });

          this.router.navigate(["/bigdata/gatk"]);
        },
        (error) => {
          this.GatkFormSubmit = true;
          this.logService.error("" + JSON.stringify(error));
          this.router.navigate(["**"]);
          Swal.fire({
            icon: "error",
            title: "Failed!",
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        }
      );
  }

  openMyDriveDialog() {
    let modalOpened = this.dialog.open(ShortMydriveComponent);
    modalOpened.afterClosed().subscribe((resultPath) => {
      this.receivedData = resultPath;
    });
  }
  openMyDriveDialogOutput() {
    let modalOpened = this.dialog.open(ShortMydriveComponent);
    modalOpened.afterClosed().subscribe((outputResultPath) => {
      this.receivedOutputData = outputResultPath;
    });
  }

  openModal() {
    console.log("opening modal");
    this.modal.open();
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.receivedData = data;
    });

    this.contentHeader = {
      headerTitle: "Container",
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
            name: "BigData",
            isLink: true,
            link: "/",
          },
          {
            name: "GATK",
            isLink: false,
          },
        ],
      },
    };
    this.GatkForm = new FormGroup({
      command: new FormControl(this.CommandList[0], [Validators.required]),
      input: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(225),
      ]),
      output: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(225),
      ]),
      options: new FormControl(""),
      memory: new FormControl(this.Memory[0], [Validators.required]),
      cores: new FormControl(this.CpuCores[0], [Validators.required]),
      instances: new FormControl(this.Instances[0], [Validators.required]),
    });
  }
}
