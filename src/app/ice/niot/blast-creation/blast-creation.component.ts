import { Component, OnInit, QueryList, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HotToastService } from "@ngneat/hot-toast";
import { NiotServiceService } from "../niot-service/niot-service.service";
import { Blast } from "../niot-models/Blast";

@Component({
  selector: "app-blast-creation",
  templateUrl: "./blast-creation.component.html",
  styleUrls: ["./blast-creation.component.scss"],
})
export class BlastCreationComponent implements OnInit {
  public contentHeader: object;
  public BLASTForm: FormGroup;
  public BLASTFormSubmit: boolean = false;
  public Databases: string[];
  public Tools: string[] = ["blastn", "blastp"];
  public outputFormat: any[] = [
    { label: "BLAST XML", value: 5 },
    { label: "Tabular", value: 6 },
    { label: "Tabular with comment lines", value: 7 },
    { label: "HTML", value: 8 },
  ];
  public processing = false;
  public fileData = null;
  public error;
  constructor(
    private service: NiotServiceService,
    private logService: IceLogService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.service.getDBList().subscribe((value: string[]) => {
      console.log("DBLIST: ", value);
      this.Databases = value;
    });
  }

  get submitted(): boolean {
    return this.BLASTFormSubmit;
  }
  get form() {
    return this.BLASTForm.controls;
  }
  formOnSubmit() {
    this.BLASTFormSubmit = true;
    // console.log(this.BLASTForm);
    if (this.BLASTForm.invalid) {
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
    let search = new Blast();
    search.jobName = this.BLASTForm.get("jobName").value;
    search.sequence = this.BLASTForm.get("sequence").value.replace(
      /(\\r)|(\\n)/g,
      "\n"
    );
    search.accessionId = this.BLASTForm.get("accessionId").value;
    // search.toolName = this.BLASTForm.get("toolName").value;
    search.db = this.BLASTForm.get("db").value;
    search.output_format = this.BLASTForm.get("output_format").value;
    search.max_target_sequence = this.BLASTForm.get(
      "max_target_sequence"
    ).value;
    search.word_size = this.BLASTForm.get("word_size").value;
    // search.html = this.BLASTForm.get("html").value;
    this.logService.debug("Processing....." + JSON.stringify(search));
    console.log("Final", search);
    this.service
      .addBlastSearch(search)
      .pipe(
        this.toast.observe({
          loading: "Starting Blast Search...",
          success: "Blast Search is started",
          error: "There is an issue to start search.",
        })
      )
      .subscribe(
        (data: any) => {
          this.logService.info(JSON.stringify(data));
          this.BLASTForm.reset();
          this.BLASTFormSubmit = false;
          Swal.fire({
            icon: "success",
            title: "Blast Job successfully submitted",
            text: search.jobName + " submitted",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          this.router.navigate(["/submit/blast"]);
        },
        (error) => {
          this.BLASTFormSubmit = true;
          this.logService.error("" + JSON.stringify(error));
          this.router.navigate(["/submit/blast-creation"]);
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
  asIsOrder(a, b) {
    return 1;
  }
  OnFileChange(files: File[]) {
    this.processing = true;
    this.fileData = null;
    if (files.length === 0) {
      this.processing = false;
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      var allowedExtensions = /(\.fa|\.fasta)$/i;
      if (!allowedExtensions.exec(file.name)) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "Invalid file type!",
        });
        return false;
      }
      this.fileData = evt.target.result as string;
      // console.log(this.fileData);
      this.BLASTForm.patchValue({ sequence: this.fileData });
      this.processing = false;
    };
    reader.onerror = (evt) => {
      this.error = "Error while reading the file, please try again";
      this.processing = false;
    };
    reader.readAsText(file);
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "BLAST",
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
            name: "List",
            isLink: true,
            link: "/submit/blast",
          },
          {
            name: "Create",
            isLink: false,
          },
        ],
      },
    };
    // debugger;
    this.BLASTForm = new FormGroup({
      jobName: new FormControl("", [Validators.required]),
      sequence: new FormControl(""),
      accessionId: new FormControl(""),
      // toolName: new FormControl(this.Tools[0], [Validators.required]),
      db: new FormControl("", [Validators.required]),
      max_target_sequence: new FormControl(""),
      expect_threshold: new FormControl(""),
      word_size: new FormControl(""),
      output_format: new FormControl(""),
      // html: new FormControl(false),
    });
  }
}
