import { FileListLocalService } from "./../../storage-service/file-list-local.service";
import { FileList } from "./../../../../file-list";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { EcommerceService } from "../../storage-service/ecommerce.service";
import { FileListService } from "../../storage-service/file-list.service";
import { FileElement } from "../model/file-element";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { IceLogService } from "app/ice/services/ice-log.service";
import { environment } from "environments/environment";
import { FileUploadService } from "../../storage-service/file-upload.service";
import { filesize } from "filesize";
import { HotToastService } from "@ngneat/hot-toast";
import { FileShareService } from "../../storage-service/file-share.service";
import { FileListComponent } from "../../file-list/file-list.component";

@Component({
  selector: "app-shared-list",
  templateUrl: "./shared-list.component.html",
  styleUrls: ["./shared-list.component.scss"],
})
export class SharedListComponent implements OnInit {
  @Input() fileElements: FileElement[];
  public page = 1;
  public selectedOption: number = 12;
  public pageSize: number = this.selectedOption;
  @Input() public gridViewRef;
  currentPath: string;
  currentPathValue: string;
  public tempdata;
  public contentHeader: object;
  isSingleClick: Boolean = true;
  public timeoutHandler;
  selectedElement: FileElement;
  canNavigateUp = false;
  public searchText = "";
  public completePath;
  @Output() newfileElement = new EventEmitter<string>();
  @Output() contentHeaderEvent = new EventEmitter<object>();
  @Output() fileicon = new EventEmitter<string>();
  public icon;
  public seticon: any[] = [];
  public ext;
  public filetype;
  propfilename: string;
  metadata;
  propfilesize;
  filecreationdate;
  filelastmodificationdate;
  columnsArr = ["Key", "Value"];
  dataSourceEmpty: boolean;
  pathValue: any;
  dynamicWord;
  version: any;
  expirationDate: any;
  fileOwner: any;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    public filelist: FileListService,
    public filesharelist: FileShareService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private logService: IceLogService,
    private fileupload: FileUploadService,
    private toast: HotToastService,
    private fileListLocal: FileListLocalService
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      //console.log(",", params);

      let url = environment.baseURL + "/storage/sharedwithme";
      let folderUrl = environment.baseURL + "/storage/sharedwithme/list";

      this.currentPath = url;

      if (params["path"]) {
        //console.log("params", params["path"]);
        this.completePath = params["path"];
        url = url + this.completePath;

        folderUrl = folderUrl + this.completePath;

        this.currentPath = url;
        this.filesharelist
          .getShareWithMeFilesList(folderUrl)
          .pipe(
            this.toast.observe({
              loading: "Files loading...",
              success: "Files Loaded",
              error: "There is an issue in loading Files.",
            })
          )
          .subscribe((response) => {
            this.fileElements = response.listOfFiles;
            console.log("All Files got Loaded" + this.fileElements);
            this.tempdata = this.fileElements;
            this.newfileElement.emit(this.tempdata);
            const match = this.currentPath.match(/\/sharedwithme\/([^/]+)/i);
            this.dynamicWord = match ? match[1] : null;
            this.prepareBreadCrumb();
          });
      } else {
        this.filesharelist
          .getShareWithMeList()
          .pipe(
            this.toast.observe({
              loading: "Files loading...",
              success: "All Files got Loaded",
              error: "There is an issue in loading all the Files.",
            })
          )
          .subscribe((response) => {
            this.fileElements = response.listOfFiles;
            console.log("All Files got Loaded" + response.listOfFiles);
            this.tempdata = this.fileElements;
            //console.log("tempdata", this.tempdata);
            this.newfileElement.emit(this.tempdata);
            this.prepareBreadCrumb();
          });
      }
    });
  }

  navigateToFolder(element: FileElement) {
    if (element.directory) {
      this.isSingleClick = false;
      clearTimeout(this.timeoutHandler);
    }
    this.logService.debug("navigate down");
    this.currentPath = element.fileDownloadUri;
    //console.log("test", this.currentPath);

    this.currentPathValue = this.currentPath.substring(
      this.currentPath.indexOf("/sharedwithme") + 13
    );
    if (this.currentPathValue.endsWith("/")) {
      this.currentPathValue = this.currentPathValue.substring(
        0,
        this.currentPathValue.length - 1
      );
      this.logService.debug("CurrentPathValue" + this.currentPathValue);
      //console.log("value", this.currentPathValue);
    }

    this.router.navigate(["shared", "shareddrive"], {
      queryParams: { path: this.currentPathValue },
    });
    this.canNavigateUp = true;
  }

  removeSegmentFromUrl(url, segmentToRemove) {
    const regex = new RegExp(`/${segmentToRemove}/`, "i");
    return url.replace(regex, "/");
  }

  prepareBreadCrumb() {
    // console.log("this.currentPathValue", this.currentPath);

    // console.log("dynamicWord", this.dynamicWord);

    const modifiedUrl = this.removeSegmentFromUrl(
      this.currentPath,
      this.dynamicWord
    );
    // console.log("modifiedUrl", modifiedUrl);

    this.currentPathValue = modifiedUrl.substring(
      this.currentPath.indexOf("/sharedwithme") + 14
    );

    // console.log("this.currentPathValue", this.currentPathValue);

    var paths = this.currentPathValue.split("/");
    // console.log("paths", paths, paths.length);

    this.contentHeader = {
      headerTitle: "Shared With Me",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    this.contentHeader["breadcrumb"].links = [];

    this.contentHeader["breadcrumb"].links.push({
      name: "Files",
      isLink: true,
      link: "/shared/shareddrive",
    });

    let cummulativePath = "";
    for (let i = 0; i < paths.length; i++) {
      if (cummulativePath === "") {
        cummulativePath = paths[i];
      } else {
        cummulativePath = cummulativePath + "/" + paths[i];
      }

      if (i == paths.length - 1) {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: false,
          link: "/shared/shareddrive",
          path:
            (this.dynamicWord ? "/" + this.dynamicWord : "") +
            "/" +
            cummulativePath,
        });
      } else {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: true,
          link: "/shared/shareddrive",
          path:
            (this.dynamicWord ? "/" + this.dynamicWord : "") +
            "/" +
            cummulativePath,
        });
      }

      this.contentHeaderEvent.emit(this.contentHeader);
    }
  }

  toggleEventSidebar() {
    this._coreSidebarService
      .getSidebarRegistry("properties-sidebar")
      .toggleOpen();
  }

  selected(event) {
    this.pageSize = event;
  }

  showElement(file) {
    this.isSingleClick = true;
    this.timeoutHandler = setTimeout(() => {
      if (this.isSingleClick) {
        this.selectedElement = file;
        let uri = file.fileDownloadUri;
        console.log("uri", uri);
        const parameterValue = uri.split("/sign/")[1];
        console.log("uri", parameterValue);
        this.fileupload
          .getFileOnMetadata(parameterValue)
          .subscribe((response) => {
            // this.logService.debug(
            //   "Loaded Metadata Properties" + response.metadataDetails
            // );
            console.log("share metadata response", response);

            this.ext = response.metadataDetails["ext"];
            this.propfilesize = filesize(response.metadataDetails["size"], {
              base: 10,
              standard: "jedec",
            });
            this.filecreationdate = response.metadataDetails["creationDate"];
            this.filelastmodificationdate =
              response.metadataDetails["lastModifiedDate"];
            this.version = response.metadataDetails["version"];
            this.expirationDate = response.metadataDetails["expirationDate"];
            this.fileOwner = response.metadataDetails["userName"];
            this.metadata = response.metadataDetails.metadata;
            this.dataSourceEmpty = Object.keys(this.metadata).length === 0;
          });
        if (this.selectedElement.directory) {
          this.filetype = "Directory";
          var last = this.selectedElement.fileName.split("/");
          for (let i = 0; i < last.length - 1; i++) {
            this.propfilename = last[i];
          }
        } else {
          this.filetype = "File";
          this.propfilename = this.selectedElement.fileName.split("/").pop();
        }
        this.toggleEventSidebar();
        clearTimeout(this.timeoutHandler);
      }
    }, 250);
  }

  downloadedElement(file: FileElement) {
    let uri = file.fileDownloadUri;
    console.log("uri ", uri);
    if (!file.directory) {
      console.log("for file");
      const parameterValue = uri.split("/sign/")[1];
      console.log(parameterValue);
      this.fileListLocal.getPresignedUrl(parameterValue);
    } else {
      const parameterValue = uri.split("/sharedwithme/")[1];
      console.log("for folder", parameterValue);
      this.fileListLocal.getPresignedUrl(parameterValue);
    }
  }

  removeElement(file: FileElement) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then((result) => {
      if (result.value) {
        this.filesharelist.deleteSharedFile(file.fileName).subscribe(
          (res) => {
            this.logService.debug("File got deleted" + res);
            this.filesharelist
              .getShareWithMeList()
              .pipe(
                this.toast.observe({
                  loading: "Files loading...",
                  success: "All Files Loaded",
                  error: "There is an issue in loading all Files.",
                })
              )
              .subscribe((res) => {
                this.logService.debug(
                  "Loading List of Files after delete" + res
                );
                this.fileElements = res.listOfFiles;
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                });
              });
          },
          (err) => {
            this.logService.error(JSON.stringify(err));
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
      } else {
        return;
      }
    });
  }

  ngOnInit(): void {}
}
