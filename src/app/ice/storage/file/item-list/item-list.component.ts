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
import { FileListLocalService } from "../../storage-service/file-list-local.service";
import { NormalFileUploadService } from "../../storage-service/normal-upload.service";
@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
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
  @Output() navigationback = new EventEmitter<boolean>();
  @Output() contentHeaderEvent = new EventEmitter<object>();
  @Output() fileicon = new EventEmitter<string>();
  public icon;
  public seticon: any[] = [];
  public ext;
  public filetype;
  propfilename: string;
  metadata;
  matadataKeys;
  matadetails;
  propfilesize;
  version;
  expirationDate;
  filecreationdate;
  filelastmodificationdate;
  sharedInfoName;
  dataSourceEmpty2: boolean;
  // sharedInfoAccessType;
  sharedInfoTable = ["Name", "Access Type"];
  columnsArr = ["Key", "Value"];
  dataSourceEmpty: boolean;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    public filelist: FileListService,
    public fileListlocal: FileListLocalService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private logService: IceLogService,
    private fileupload: FileUploadService,
    private toast: HotToastService,
    private normalFileupload: NormalFileUploadService
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log("param", params);
      let url = environment.baseURL + "/storage/list/";
      this.currentPath = url;

      if (params["path"]) {
        this.completePath = params["path"];
        url = url + this.completePath;

        this.currentPath = url;

        this.fileListlocal
          .getlist(url)
          .pipe(
            this.toast.observe({
              loading: "Files loading...",
              success: "Files Loaded",
              error: "There is an issue in loading Files.",
            })
          )
          .subscribe((response) => {
            this.fileElements = response.listOfFiles;
            console.log("line no 87", this.fileElements);
            this.tempdata = this.fileElements;
            this.newfileElement.emit(this.tempdata);
            this.prepareBreadCrumb();
          });
      } else {
        this.fileListlocal
          .getAllFiles()
          .pipe(
            this.toast.observe({
              loading: "Files loading...",
              success: "All Files got Loaded",
              error: "There is an issue in loading all the Files.",
            })
          )
          .subscribe((response) => {
            this.fileElements = response.listOfFiles;
            console.log("list:", this.fileElements);
            this.logService.debug(this.fileElements);
            this.tempdata = this.fileElements;
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
    // this.logService.debug(element);

    this.currentPath = element.fileDownloadUri;
    console.log("test123", this.currentPath);
    this.currentPathValue = this.currentPath.substring(
      this.currentPath.indexOf("/list/") + 6
    );
    console.log("test456", this.currentPathValue);

    if (this.currentPathValue.endsWith("/")) {
      this.currentPathValue = this.currentPathValue.substring(
        0,
        this.currentPathValue.length - 1
      );
    }

    this.router.navigate(["file", "drive"], {
      queryParams: { path: this.currentPathValue },
    });
   
    this.canNavigateUp = true;
  }

  prepareBreadCrumb() {
    console.log("this.currentPath", this.currentPath);
    this.currentPathValue = this.currentPath.substring(
      this.currentPath.indexOf("/list/") + 6
    );
    console.log("this.currentPathValue", this.currentPathValue);
    var paths = this.currentPathValue.split("/");
    console.log("paths", paths, paths.length);

    this.contentHeader = {
      headerTitle: "File Drive",
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
      link: "/file/drive",
    });

    let cummulativePath = "";
    for (let i = 0; i < paths.length; i++) {
      if (cummulativePath === "") {
        cummulativePath = paths[i];
        console.log("1st",cummulativePath)
      } else {
        cummulativePath = cummulativePath + "/" + paths[i];
        console.log("2nd",cummulativePath)
      }

      if (i == paths.length - 1) {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: false,
          link: "/file/drive",
          path: cummulativePath,
        });
      } else {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: true,
          link: "/file/drive",
          path: cummulativePath,
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
        this.normalFileupload
          .getFileOnMetadata(file.fileName)
          .subscribe((response) => {
            console.log("metadata properties", response);
            // console.log(
            //   "Sharing information",
            //   response.fileSharedInfo.sharedWithUserList
            // );
            // console.log(
            //   "response.ext",
            //   response.fileMetadata.metadataDetails.ext
            // );
            // if(response.fileMetadata.metadataDetails !== null){
              this.matadetails=response.fileMetadata.metadataDetails;
              this.ext = response.fileMetadata.metadataDetails.ext;
              console.log("ext", this.ext);
              this.propfilesize = filesize(
                response.fileMetadata.metadataDetails.size,
                {
                  base: 10,
                  standard: "jedec",
                }
              );
              console.log("this.propfilesize",this.propfilesize)
              this.version = response.fileMetadata.metadataDetails.version;

              this.filecreationdate =
                response.fileMetadata.metadataDetails.creationDate;
                console.log("filecreationdate",this.filecreationdate);
              this.filelastmodificationdate =
                response.fileMetadata.metadataDetails.lastModifiedDate;
            //}
            this.metadata = response.fileMetadata.metadataDetails.metadata;
            this.matadataKeys = Object.keys(this.metadata);

            console.log("this.metadata",this.metadata)
      
            // this.dataSourceEmpty = Object.keys(this.metadata).length === 0;
            // this.dataSourceEmpty2 = Object.keys(this.metadata).length === 0;
            // console.log("this.dataSourceEmpty", this.dataSourceEmpty);
            // if (response.fileSharedInfo.sharedWithUserList != null) {
            // this.sharedInfoName = []; // Initialize as an empty array

            // if (response.fileSharedInfo!== null) {
            //   this.sharedInfoName = response.fileSharedInfo.sharedWithUserList;
                          
            // }
            // this.expirationDate =
            // response.fileSharedInfo.expirationDate;
                   this.sharedInfoName = response.fileSharedInfo
                    console.log("shared info", this.sharedInfoName);
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
    let filename = file.fileName;
    this.fileListlocal.getPresignedUrlforDownload(filename);
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
        console.log("result.value", result.value);
        console.log("result", result);
        console.log("file.fileName", file.fileName);
        let url = environment.baseURL + "/storage/list/";
        const parts = file.fileName.split('/');
        parts.pop();
        var extractedstring=parts.join('/');
        url=url+extractedstring;
        this.fileListlocal.deleteFile(file.fileName).subscribe(
          (res) => {
            this.logService.debug(res);
            console.log("file list response", res);
            this.fileListlocal
            .getlist(url)
              .pipe(
                this.toast.observe({
                  loading: "Files loading...",
                  success: "All Files Loaded",
                  error: "There is an issue in loading all Files.",
                })
              )
              .subscribe((res) => {
                this.fileElements = res.listOfFiles;
                this.tempdata = this.fileElements;
                this.newfileElement.emit(this.tempdata);
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
