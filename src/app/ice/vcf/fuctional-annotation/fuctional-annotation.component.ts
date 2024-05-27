import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { VcfService } from "../vcf-service/vcf.service";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-fuctional-annotation",
  templateUrl: "./fuctional-annotation.component.html",
  styleUrls: ["./fuctional-annotation.component.scss"],
})
export class FunctionalAnnotationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public contentHeader: object;
  public functionalAnnotationForm: FormGroup;
  public Collection: string[] = [];
  public functionalAnnotationFormSubmit: boolean = false;
  public outputFileFormatList = this.service.outputFileFormatList;
  public FAValues;
  constructor(
    private logService: IceLogService,
    private service: VcfService,
    private router: Router,
    private toast: HotToastService
  ) {}
  onRadioChange(outputFileFormat: string) {
    this.functionalAnnotationForm.value.outputfileformat = outputFileFormat;
  }
  get form() {
    return this.functionalAnnotationForm.controls;
  }
  getFAValues() {
    this.service.getFAValues().subscribe(
      (value) => {
        console.log("FA Values", value);
        this.FAValues = value;
      },
      (error) => {
        console.error("FA Value error", error);
      }
    );
  }
  addFileForAnalysis() {
    this.router.navigate(["vcfanalysis/select"]);
  }
  onSubmit() {
    this.functionalAnnotationFormSubmit = true;
    if (this.functionalAnnotationForm.invalid) {
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
    let data = this.functionalAnnotationForm.value;
    this.logService.debug("Processing....." + JSON.stringify(data));
    this.blockUI.start("Loading...");
    this.service
      .getFunctionalAnnotationResponse(data)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((value) => {
        this.logService.debug(JSON.stringify(value));
        Swal.fire({
          icon: "success",
          title: `${value.message}`,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        this.functionalAnnotationForm.reset();
        this.blockUI.stop();
        this.router.navigate(["/vcfanalysis/mainpage"]);
      });
    return false;
  }

  get submitted(): boolean {
    return this.functionalAnnotationFormSubmit;
  }
  ngOnInit(): void {
    this.getFAValues();
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
          {
            name: "Functional Annotation",
            isLink: false,
          },
        ],
      },
    };
    this.functionalAnnotationForm = new FormGroup({
      analysisName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(225),
        Validators.pattern("^[a-zA-Z0-9_-]*$"),
      ]),
      collection: new FormControl("", [Validators.required]),
      faValue: new FormControl("", [Validators.required]),
      outputfileformat: new FormControl("", [Validators.required]),
      description: new FormControl(""),
    });
  }
}
