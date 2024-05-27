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
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { FileUploadingComponent } from "../../file-uploading/file-uploading.component";
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
import { FileShareService } from "../../storage-service/file-share.service";
@Component({
  selector: "app-sharedwithme-drive",
  templateUrl: "./sharedwithme-drive.component.html",
  styleUrls: ["./sharedwithme-drive.component.scss"],
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
export class SharedWithMeDriveComponent implements OnInit {
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
  public peopleList = [];
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  selectedValue: any = "People";

  //@Output() folderAdded = new EventEmitter<{ fileName: string }>();

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   *
   */

  constructor(
    private logService: IceLogService,
    public dialog: MatDialog,
    private fileupload: FileUploadService,
    public filelist: FileListService,
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toast: HotToastService,
    private fileShareService: FileShareService
  ) {}

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
    this.fileElements = element;
  }

  getAllFileOnFilter(element) {
    this.fileElements = element;
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

    this.router.navigate(["shared", "shareddrive"], {
      queryParams: { path: path },
    });
   
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

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }
  refresh() {
    let folderpath = this.contentHeader["breadcrumb"].links;
    let path = folderpath[folderpath.length - 1].path;
    this.logService.debug("Loading path after refresh "+ path);
    this.state = this.state === "default" ? "rotated" : "default";
    this.blockUI.start("Loading...");
    let url = environment.baseURL + "/storage/sharedwithme";
    if (path == "") {
      this.fileShareService
        .getShareWithMeList()
        .pipe(
          this.toast.observe({
            loading: "Files loading...",
            success: "All Files Loaded",
            error: "There is an issue in loading all Files.",
          })
        )
        .subscribe((res) => {
          this.logService.debug("Loading all files "+ res.listOfFiles);
          this.fileElements = res.listOfFiles;
        });
    } else {
      url = url + path;
      // console.log("inside files", url);
      this.fileShareService
        .getShareWithMeFilesList(url)
        .pipe(
          this.toast.observe({
            loading: "Files loading...",
            success: "Files Loaded",
            error: "There is an issue in loading Files.",
          })
        )
        .subscribe((response) => {
          this.logService.debug("Loading files"+ response.listOfFiles);
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

    const temp = this.fileEle.filter(function (d) {
      if (d == null) {
        return;
      }
      return d.fileName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.fileElements = temp;
  }

  openNewFolderDialog() {
    let folderpath = this.contentHeader["breadcrumb"].links;
    let pathfolder = folderpath[folderpath.length - 1].path;
    let dialogRef = this.dialog.open(NewfolderdialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.logService.debug(res);
        this.fileupload.uploadFolder(pathfolder, res).subscribe(
          (response) => {
            this.fileElements = response.listOfFiles;
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
  getPeopleList() {
    this.fileShareService
      .calingSharedWithMePeopleList()
      .subscribe((response) => {
        // console.log("getting shared people list", response.userList);
        this.peopleList = response.userList;
      });
  }
  cancelSelection() {
    this.selectedValue = "People";
    this.fileShareService.getShareWithMeList().subscribe((res) => {
      this.fileElements = res.listOfFiles;
    });
  }
  sharedPeopleFileList(owner: any) {
    this.selectedValue = owner;
    this.fileShareService
      .calingSharedWithMeFileList(owner)
      .subscribe((response) => {
        this.logService.debug("Getting shared file list !"+ response.listOfFiles);
        this.fileElements = response.listOfFiles;
        this.logService.debug("Loading files"+ this.fileElements);
      });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}
}
