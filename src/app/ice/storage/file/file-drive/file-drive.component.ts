import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import { CoreConfigService } from "@core/services/config.service";
import { FileElement } from "../model/file-element";
import { FileListService } from "app/ice/storage/storage-service/file-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { MatDialog } from "@angular/material/dialog";
import { NewfolderdialogComponent } from "../newfolderdialog/newfolderdialog.component";
import { FileUploadService } from "../../storage-service/file-upload.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";
import { Subject } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { environment } from "environments/environment";
import { NormalFileUploadService } from "../../storage-service/normal-upload.service";
@Component({
  selector: "app-file-drive",
  templateUrl: "./file-drive.component.html",
  styleUrls: ["./file-drive.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("rotatedState", [
      transition("void=>*", [style({ transform: "rotate(0)" })]),
      transition("* => *", [
        style({ transform: "rotate(0)" }),
        animate("650ms", style({ transform: "rotate(360deg)" })),
      ]),
    ]),
  ],
  host: { class: "ecommerce-application" },
})
export class FileDriveComponent implements OnInit {
  // public
  @BlockUI() blockUI: NgBlockUI;
  public page = 1;
  public selectedOption: number = 9;
  public pageSize: number = this.selectedOption;
  public contentHeader: object;
  public gridViewRef = true;
  public fileElements: FileElement[];
  public searchText = "";
  public searchValue = "";
  public tempdata;
  currentPath: string;
  currentPathValue: string;
  @Input() path: string;
  canNavigateUp = false;
  selectedElement: FileElement;
  isSingleClick: Boolean = true;
  public timeoutHandler;
  public fileEle;
  public folderAdded;
  public state: string = "default";
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  selectedValue = "People";
  peopleList: any;
  originalFileList: any;
  searchResultsWithoutNull
  //@Output() folderAdded = new EventEmitter<{ fileName: string }>();

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   *
   */
  selectedHardcodedValue: string = "All";

  constructor(
    private logService: IceLogService,
    public dialog: MatDialog,
    private fileupload: FileUploadService,
    private normalupload: NormalFileUploadService,
    public filelist: FileListService,
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toast: HotToastService,
  ) { 
  }

  updateContentHeader(updatedContentHeader) {
    this.logService.debug(updatedContentHeader);
    this.contentHeader = updatedContentHeader;
  }

  updatefileElement(element) {
    this.fileEle = element;
  }

  getFileOnFilter(element) {
    this.fileElements = element;
  }

  getFileOnSize(element) {
    console.log("after getfileonsize", element);
    this.fileElements = element;
  }

  getAllFileOnFilter(element) {
    console.log("get All file on filter");
    this.fileElements = element;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleEventSidebar() {
    //this._coreSidebarService.getSidebarRegistry('properties-sidebar').toggleOpen();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  backWithLocation() {
    //this.contentHeader["breadcrumb"].links.splice(this.contentHeader["breadcrumb"].links.length - 1, 1)

    let folderpath = this.contentHeader["breadcrumb"].links;

    // debugger
    let path;
    if(folderpath.length>0){
      path = folderpath[folderpath.length - 2].path;
    }
    console.log("locate", path);

    this.router.navigate(["file", "drive"], {
      queryParams: { path: path },
    });
   
  }


  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }
  refresh() {
    let folderpath = this.contentHeader["breadcrumb"].links;
    let path = folderpath[folderpath.length - 1].path;
    console.log("refreshpath", path);
    this.state = this.state === "default" ? "rotated" : "default";
    this.blockUI.start("Loading...");
    let url = environment.baseURL + "/storage/list/";
    if (path == "") {
      console.log("all files");
      this.filelist
        .getAllFiles()
        .pipe(
          this.toast.observe({
            loading: "Files loading...",
            success: "All Files Loaded",
            error: "There is an issue in loading all Files.",
          })
        )
        .subscribe((res) => {
          console.log("res.listOfFiles", res.listOfFiles);
          this.fileElements = res.listOfFiles;
        });
    } else {
      url = url + path;
      console.log("inside files", url);
      this.filelist
        .getlist(url)
        .pipe(
          this.toast.observe({
            loading: "Files loading...",
            success: "Files Loaded",
            error: "There is an issue in loading Files.",
          })
        )
        .subscribe((response) => {
          console.log("response.listOfFiles", response.listOfFiles);
          this.fileElements = response.listOfFiles;
        });
    }
    this.blockUI.stop();
  }
  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  filterUpdate(event) {
    const val: string = event.target.value.toLowerCase();
    console.log("val", val);

    const filteredFiles = this.fileEle?.filter(function (d) {
      return (
        d &&
        !d.isDeleted &&
        d.fileName &&
        d.fileName.toLowerCase().indexOf(val) !== -1
      );
    });
    console.log("filteredFiles", filteredFiles);

    this.normalupload.searchMetadataValue(val).subscribe((response) => {
      console.log("response.fileMetadataList", response.fileMetadataList);

       this.searchResultsWithoutNull = response.fileMetadataList?.filter(
        (file) => file && file.fileName
      );
    });
    const combinedResults = [
      ...(filteredFiles ?? []),
      ...(this.searchResultsWithoutNull ?? []),
    ];

    // Remove duplicates by creating a map with fileName as key
  const uniqueResultsMap = new Map();
  combinedResults.forEach((result) => {
    if (result.fileName) {
      uniqueResultsMap.set(result.fileName, result);
    }
  });

  // Convert the map values back to an array
  this.fileElements = Array.from(uniqueResultsMap.values());

    //this.fileElements = combinedResults;
    console.log("this.fileElements", this.fileElements)
  }

  openNewFolderDialog() {
    let folderpath = this.contentHeader["breadcrumb"].links;
    let pathfolder = folderpath[folderpath.length - 1].path;
    let dialogRef = this.dialog.open(NewfolderdialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.logService.debug(res);
        this.normalupload.uploadFolder(pathfolder, res).subscribe(
          (response) => {
            this.fileElements = response.listOfFiles;
            console.log("filelist", this.fileElements);
            this.logService.debug(this.fileElements);
            Swal.fire({
              icon: "success",
              title: "Created!",
              text: "Folder has been created.",
              customClass: {
                confirmButton: "btn btn-success",
              },
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
      }
    });
  }

  uploadfile() {
    this.logService.debug(this.contentHeader["breadcrumb"].links);
    let folderpath = this.contentHeader["breadcrumb"].links;
    let path = folderpath[folderpath.length - 1].path;
    if (path === "") {
      this.router.navigate(["/file-uploading"]);
    } else {
      this.router.navigate(["/file-uploading"], { queryParams: { path } });
    }
  }

  getSharedByMePeopleList() {
    console.log("shared by me ");
    this.normalupload.calingSharedByMePeopleList().subscribe((response) => {
      this.peopleList = response.userList;
      console.log("userlist", this.peopleList);
    });
  }
  getFileListByOwner(user) {
    console.log("shareby me", user);

    if (user === "All") {
      this.selectedValue = this.selectedHardcodedValue;
      this.normalupload.callingSharedByMe().subscribe((res) => {
        console.log(res);
        this.fileElements = res.listOfFiles;
      });
    } else {
      this.selectedValue = user;
      this.normalupload
        .callingSharedByMePeopleFileList(user)
        .subscribe((response) => {
          console.log("getting shared file list", response.listOfFiles);
          this.fileElements = response.listOfFiles;
          console.log("this.fileElements", this.fileElements);
        });
    }
  }
  cancelSelection() {
    //console.log("cancel works");
    this.selectedValue = "People";
    this.filelist.getAllFiles().subscribe((res) => {
      //console.log("response we getting", res);
      this.fileElements = res.listOfFiles;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void { }
}
