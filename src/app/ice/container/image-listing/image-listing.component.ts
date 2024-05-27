import { Component, OnInit } from "@angular/core";
import { containerService } from "../container-service/container.service";
import { HotToastService } from "@ngneat/hot-toast";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Docker } from "../container-model/docker";

@Component({
  selector: "app-image-listing",
  templateUrl: "./image-listing.component.html",
  styleUrls: ["./image-listing.component.scss"],
})
export class ImageListingComponent implements OnInit {
  public dockerImage: any;
  public contentHeader: object;
  public grid = true;
  public page = 1;
  public pageSize = 12;
  public searchText = "";
  constructor(
    private service: containerService,
    private toast: HotToastService,
    private _clipboardService: ClipboardService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  routeToCreateContainer(item) {
    console.log(item);
    let data = new Docker();
    data.imageName = item.imageName;
    data.containerName = "CustomiseName";
    data.jobDescription = "Description for Job";
    if (item.type === "notebook") {
      data.notebook = true;
    }
    this.router.navigate(["/container/create-container"], {
      queryParams: { ...data },
      skipLocationChange: true,
    });
  }
  copyClip(imageName) {
    console.log(imageName);
    if (imageName) {
      this._clipboardService.copyFromContent(imageName);
      this.toastr.success("", "Copied!", {
        positionClass: "toast-top-right",
        toastClass: "toast ngx-toastr",
        closeButton: true,
        progressBar: true,
        timeOut: 1000,
      });
    }
  }
  ngOnInit(): void {
    this.service
      .getListOfImages()
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "There is an issue to start instance.",
        })
      )
      .subscribe((value: any) => {
        console.log("DockerImageslist", value);
        this.dockerImage = value.images;
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
            name: "Jobs",
            isLink: true,
            link: "/container/jobs",
          },
          // {
          //   name: "Create Container",
          //   isLink: true,
          //   link: "/container/create-container",
          // },
          {
            name: "Images",
            isLink: false,
          },
        ],
      },
    };
  }
}
