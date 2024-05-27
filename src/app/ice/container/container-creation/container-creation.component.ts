import { Component, OnInit, QueryList, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { containerService } from "../container-service/container.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Docker } from "../container-model/docker";

@Component({
  selector: "app-container-creation",
  templateUrl: "./container-creation.component.html",
  styleUrls: ["./container-creation.component.scss"],
})
export class ContainerCreationComponent implements OnInit {
  public dockerImage: any;
  public contentHeader: object;
  public ContainerForm: FormGroup;
  public ContainerFormSubmit: boolean = false;
  public Memory: any = [
    { key: "1", value: "1Gi" },
    { key: "2", value: "2Gi" },
    { key: "3", value: "3Gi" },
    { key: "4", value: "4Gi" },
    { key: "5", value: "5Gi" },
    { key: "6", value: "6Gi" },
    { key: "7", value: "7Gi" },
    { key: "8", value: "8Gi" },
    { key: "9", value: "9Gi" },
    { key: "10", value: "10Gi" },
    { key: "11", value: "11Gi" },
    { key: "12", value: "12Gi" },
  ];
  public Cpu: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private service: containerService,
    private logService: IceLogService,
    private router: Router,
    private toast: HotToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  get submitted(): boolean {
    return this.ContainerFormSubmit;
  }
  get form() {
    return this.ContainerForm.controls;
  }
  formOnSubmit() {
    this.ContainerFormSubmit = true;
    if (this.ContainerForm.invalid) {
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
    let image = new Docker();
    if (
      this.ContainerForm.get("containerName").value &&
      this.ContainerForm.get("jobDescription").value
    ) {
      image.containerName =
        this.ContainerForm.get("containerName").value.trim();
      image.jobDescription =
        this.ContainerForm.get("jobDescription").value.trim();
    }
    image.imageName = this.ContainerForm.get("imageName").value.trim();
    image.cpu = this.ContainerForm.get("cpu").value;
    image.memory = this.ContainerForm.get("memory").value;
    image.notebook = this.ContainerForm.get("notebook").value;
    this.logService.debug("Processing....." + JSON.stringify(image));
    console.log("Final", image);
    this.service
      .createContainer(image)
      .pipe(
        this.toast.observe({
          loading: "Starting container Instance...",
          success: "Container Instance is started",
          error: "There is an issue to start instance.",
        })
      )
      .subscribe(
        (data) => {
          this.logService.info(JSON.stringify(data));
          this.ContainerForm.reset();
          this.ContainerFormSubmit = false;
          Swal.fire({
            icon: "success",
            title: "Successfully Created Pod!",
            text: data.podId,
            customClass: {
              confirmButton: "btn btn-success",
            },
          });

          this.router.navigate(["/container/jobs"]);
        },
        (error) => {
          this.ContainerFormSubmit = true;
          this.logService.error("" + JSON.stringify(error));
          console.error("", error.error);

          // for (let item of Object.entries(error.error)) {
          //   console.log(item);
          // }
          let text = "";

          let err = JSON.parse(JSON.stringify(error.error));
          for (let [key, value] of Object.entries(err)) {
            console.log(value);
            text = text + " <br/> " + value;
          }
          Swal.fire({
            icon: "error",
            title: "Failed!",
            html: text,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
          // this.router.navigate(["/container/jobs"]);
        }
      );
  }
  asIsOrder(a, b) {
    return 1;
  }

  ngOnInit(): void {
    let data;
    this.activatedRoute.queryParams.subscribe((params) => {
      data = params;
      console.log(data);
    });
    this.ContainerForm = new FormGroup({
      containerName: new FormControl(data.containerName, [Validators.required]),
      jobDescription: new FormControl(data.jobDescription),
      imageName: new FormControl(data.imageName, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(225),
      ]),
      memory: new FormControl(this.Memory[0].key, [Validators.required]),
      cpu: new FormControl(this.Cpu[0], [Validators.required]),
      notebook: new FormControl(data.notebook),
    });
    // this.service
    //   .getListOfImages()
    //   .pipe(
    //     this.toast.observe({
    //       loading: "Loading...",
    //       success: "Success",
    //       error: "There is an issue to start instance.",
    //     })
    //   )
    //   .subscribe((value: any) => {
    //     console.log("DockerImageslist", value);
    //     this.dockerImage = value.images;
    //   });

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
            name: "Jobs",
            isLink: true,
            link: "/container/jobs",
          },
          {
            name: "Images",
            isLink: true,
            link: "/container/images",
          },
          {
            name: "Create Container",
            isLink: false,
          },
        ],
      },
    };
    // debugger;
  }
}
