import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { WorkflowService } from "../services/workflow.service";
import { ActivatedRoute } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { HotToastService } from "@ngneat/hot-toast";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ShortMydriveComponent } from "../../big-data/short-mydrive/short-mydrive.component";
import { pipeline } from "../workflow-models/pipeline";
import { line } from "d3";
@Component({
  selector: "app-form-generation",
  templateUrl: "./form-generation.component.html",
  styleUrls: ["./form-generation.component.scss"],
})
export class FormGenerationComponent implements OnInit {
  // @ViewChild("iframe") iframe: ElementRef;
  @ViewChild("myDiv") public myDiv: ElementRef;
  @ViewChildren("myDiv") templates: QueryList<HTMLElement>;

  jsonFormData: any;
  isHidden: boolean = false;
  public contentHeader: object;
  public pipelineName: string;
  public myFormSubmit: boolean = false;
  public myForm: FormGroup = new FormGroup({});
  opened: string;
  show: boolean = false;
  innerHTML;

  constructor(
    public dialog: MatDialog,
    private service: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService,
    private toast: HotToastService,
    private renderer: Renderer2
  ) {}

  openMyDriveDialog(feild) {
    let modalOpened = this.dialog.open(ShortMydriveComponent);
    modalOpened.afterClosed().subscribe((resultPath) => {
      if (resultPath) {
        this.myForm.controls[feild].setValue("/" + resultPath);
      }
    });
  }
  toggle(index) {
    this.opened = index;
    this.show = !this.show;
  }
  asIsOrder(a, b) {
    return 1;
  }
  render() {
    this.renderer.setProperty(
      this.myDiv.nativeElement,
      "innerHTML",
      this.innerHTML
    );
  }
  ngAfterViewInit() {
    this.templates.changes.subscribe((list) => {
      if (this.myDiv) {
        this.render();
      }
    });
  }
  loadDefaultParameter() {
    this.service
      .getOnePipelineDefaultParameter(this.pipelineName)
      .subscribe((value: any) => {
        console.log("Default", Object.keys(value).length);
        for (let x in value) {
          if (this.myForm.controls[x]) {
            this.myForm.controls[x].setValue(value[x]);
          }
        }
        // value.split(/\r?\n/).forEach((line) => {
        //   var tab = line.split("=");
        //   if (tab.length > 1 && this.myForm.controls[tab[0].trim()]) {
        //     if (tab[1].trim() === "false" || tab[1].trim() === "true") {
        //       tab[1] = JSON.parse(tab[1]);
        //       this.myForm.controls[tab[0].trim()].setValue(tab[1]);
        //     } else {
        //       this.myForm.controls[tab[0].trim()].setValue(tab[1].trim());
        //     }
        //   }
        // });
      });
  }
  clear() {
    this.myForm.reset();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.logService.debug("Parameter" + parameter);
      this.pipelineName = parameter.pipelineName;
      this.logService.debug(this.pipelineName);
    });

    this.service
      .getJson(this.pipelineName)
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Loaded Success",
          error: "There is an issue to loading pipeline.",
        })
      )
      .subscribe(
        (value: any) => {
          this.logService.debug(value);
          this.logService.debug("Received all data form");
          this.logService.debug(value.content);
          this.jsonFormData = value; //responsible for sorting
          this.logService.debug("Pallavi" + this.jsonFormData);
          this.service.getOnePipelineIntro(this.pipelineName).subscribe(
            (html) => {
              this.innerHTML = html;
              this.render();
            },
            (error) => {
              this.logService.error(
                "Error in loading Introduction of pipeline" +
                  JSON.stringify(error)
              );
            }
          );

          this.contentHeader = {
            headerTitle: "Workflow",
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
                  name: "Pipelines",
                  isLink: true,
                  link: "/workflow/list",
                },
                {
                  name: this.pipelineName,
                  isLink: false,
                },
              ],
            },
          };
          this.createForm(this.jsonFormData);
        },
        (error) => {
          this.logService.error(
            "Error in loading content of pipeline" + JSON.stringify(error)
          );
        }
      );
  }
  get submitted(): boolean {
    return this.myFormSubmit;
  }

  createForm(controls: any) {
    let workflowName = {
      title: "Workflow Name",
      type: "object",
      help_text: "",
      description: "",
      fa_icon: "fas fa-pager",
      required: ["ice_pipeline_name"],
      properties: {
        ice_pipeline_name: {
          description: "Kindly define a name for your pipeline",
          fa_icon: "fas fa-arrow-circle-right",
          help_text:
            "Certainly! When naming a pipeline, consider choosing a title that reflects the purpose, function, or nature of the process involved. A suitable name for a pipeline could be 'RefineFlow' or 'DataRefactor.' These names imply the idea of streamlining or improving data flow, which aligns with the concept of a pipeline. However, please provide more context or information if you have specific requirements for the name",
          type: "string",
        },
        ice_pipeline_description: {
          description: "Kindly give a description of your pipeline",
          fa_icon: "fas fa-bars",
          help_text:
            "Certainly! When providing a description of your pipeline, it is important to include details about the specific processes, tasks, or operations it encompasses. Here's an example:'RefineFlow is an automated data processing pipeline that systematically cleanses, transforms, and structures raw input data into a standardized format suitable for analysis. By implementing a series of carefully designed steps, RefineFlow efficiently manages data flow, ensuring consistency and reliability in the data output, ultimately facilitating seamless data analysis and interpretation.'This description highlights the key functionalities and objectives of the pipeline, emphasizing its role in enhancing the quality and usability of data for analytical purposes. If you have any specific requirements or additional details you'd like to include, please provide them for a more tailored description.",
          type: "string",
        },
      },
    };
    controls.definitions = { workflowName, ...controls.definitions };
    console.log("controls.definitions", controls);
    this.logService.debug(controls.definitions);
    for (const [key, value] of Object.entries(controls.definitions)) {
      console.log("Check" + key, value);
      var ans: any = value;
      for (const [key1, value1] of Object.entries(ans["properties"])) {
        var data: any = value1;
        if (ans.required?.includes(key1)) {
          this.myForm.addControl(
            key1,
            new FormControl(data["default"] ? data["default"] : "", [
              Validators.required,
            ])
          );
        } else {
          this.myForm.addControl(
            key1,
            new FormControl(data["default"] ? data["default"] : "")
          );
        }
      }
    }
  }

  onSubmit() {
    // debugger;
    this.myFormSubmit = true;
    if (this.myForm.invalid && this.myForm) {
      Swal.fire({
        icon: "error",
        title: "Check again!",
        text: "Kindly check all fields before submitting",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
      return;
    }
    this.logService.debug("SUCCESS data received");
    let form: any = {};

    for (var key in this.myForm.value) {
      if (this.myForm.value[key] !== "") {
        form[key] = this.myForm.value[key];
      }
    }
    let requestData = new pipeline();
    requestData.name = this.pipelineName;
    requestData.params = form;
    console.log("Final", Object.keys(form).length, form);
    this.service
      .submitAPipeline(requestData)
      .pipe(
        this.toast.observe({
          loading: "Starting Pipeline Instance...",
          success: "Pipeline Instance is started",
          error: "There is an issue to start pipeline.",
        })
      )
      .subscribe(
        (val) => {
          this.logService.debug(
            "Result of Workflow pipeline: " + JSON.stringify(val)
          );
          this.myForm.reset();
          this.myFormSubmit = false;
          Swal.fire({
            icon: "success",
            title: "Successfully Submitted Pipeline!",
            text: val.podId,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });

          // this.router.navigate(["/container/jobs"]);
        },
        (error) => {
          this.logService.error("Workflow: " + JSON.stringify(error));
        }
      );
  }
}
