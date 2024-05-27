import { date } from "./../../../admin/user/user-models/date";
import { FileShareService } from "./../../storage-service/file-share.service";
import { Name } from "./../../../admin/user/user-models/name";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Output,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
} from "@angular/core";
import { FileElement } from "../model/file-element";
import { FileListService } from "app/ice/storage/storage-service/file-list.service";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { fromEvent, Observable, Subject, Subscription } from "rxjs";
import { TemplatePortal } from "@angular/cdk/portal";
import { take, filter } from "rxjs/operators";
import { IceLogService } from "app/ice/services/ice-log.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClipboardService } from "ngx-clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";
import { UsersService } from "app/ice/admin/user/user-services/users.service";
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
} from "@materia-ui/ngx-monaco-editor";
import { Console } from "console";
import { KeycloakService } from "keycloak-angular";
import { environment } from "environments/environment";
@Component({
  selector: "app-file-item",
  templateUrl: "./file-item.component.html",
  styleUrls: ["./file-item.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "ecommerce-application" },
})
export class FileItemComponent implements OnInit {
  // Input Decorotor
  public fg: FormGroup;
  @Input() file;
  @ViewChild("preview") preview: ElementRef;
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Input("gridViewRef") gridViewRef = true;
  @Output() elementDownload = new EventEmitter<FileElement>();
  @ViewChild("userMenu") userMenu: TemplateRef<any>;
  @Input() canNavigateUp: string;
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  sub: Subscription;
  overlayRef: OverlayRef | null;
  @Output() showElement = new EventEmitter<FileElement>();
  @ViewChild(MonacoEditorComponent)
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: "dark",
    language: "html",
    roundedSelection: true,
    autoIndent: "full",
  };
  public code;
  public icon;
  public iconName;
  path;
  username;
  data = [];
  sharedWithUserList = [];
  email;
  filename;
  ext;
  public owner;
  creationDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  myForm: FormGroup;
  //expirationDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  iconList = [
    { type: "pdf", icon: "fa fa-file-pdf-o" },
    { type: "vcf", icon: "fa fa-file-code-o" },
    { type: "html", icon: "fa fa-html5" },
    { type: "xhtml", icon: "fa fa-html5" },
    { type: "jpg", icon: "fa fa-file-image-o" },
    { type: "png", icon: "fa fa-file-image-o" },
    { type: "jpeg", icon: "fa fa-picture-o" },
    { type: "zip", icon: "fa fa-file-archive-o" },
  ];
  public name;
  result: any;
  expirationDate: any;
  selectedDateTime: Date;
  oneShareObject: any;
  directory: boolean;

  constructor(
    public filelist: FileListService,
    private logService: IceLogService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private modalService: NgbModal,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private fileshare: FileShareService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private fb: FormBuilder,
    private keycloakService: KeycloakService
  ) {
    this.myForm = this.formBuilder.group({
      dateTime: new FormControl(
        "",
        Validators.compose([Validators.required, this.validateDateTime])
      ),
    });
  }

  modalPreview(file) {
    console.log("added", location.origin);
    console.log("modalPreview", file);
    this.modalService.open(this.preview, {
      centered: true,
      size: "xl",
    });
    var url = file.fileDownloadUri.replace(
      environment.baseURL + "/storage/sign/",
      environment.baseURL + "/storage/preview/"
    );
    this.filelist.getResultPreview(url).subscribe((value) => {
      console.log(value);
      this.code = value;
    });
  }

  changeWebsite(e, userName) {
    //console.log("changeWebsite", e.target.value, userName);
    this.sharedWithUserList.map((value) => {
      if (value.userName === userName) {
        // console.log("username", userName);
        value.accessType = e.target.value;
      }
    });
    this.logService.debug(
      "Shared User List Received" + this.sharedWithUserList
    );
    //console.log(this.sharedWithUserList);
  }

  selectedDate: string = null;
  //= new Date().toISOString();

  onSubmit() {
    // this.expirationDate = new Date();
    this.expirationDate = this.selectedDate;
    this.logService.debug("Selected date:" + this.expirationDate);
    //console.log("Selected date:", this.expirationDate);
  }

  frm = new FormGroup({
    accessType: new FormControl(),
  });

  get form() {
    return this.fg.controls;
  }
  @ViewChild("inputUrl") inputUrl: ElementRef;
  @ViewChild("datepicker") datepicker;

  async copy(inputElement) {
    this.overlayRef.dispose();
    this.logService.debug("inputElement:" + inputElement);
    // console.log("inputElement", inputElement);
    const el = document.createElement("textarea");
    var userInfo = await this.keycloakService
      .getKeycloakInstance()
      .loadUserInfo();
    // debugger;
    el.value = "/data/" + userInfo["preferred_username"] + "/" + inputElement;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    Swal.fire({
      icon: "success",
      title: "Copied to clipboard!!",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  userObj: any[] = [];
  users = [];

  addCustomUser(name) {
    return name;
  }

  // addCustomUser = (term) => ({ id: term, name: term });

  addShare(shareList: any) {
    // console.log("fg", this.fg);
    console.log("add", shareList);
    if (shareList.length == 1) {
      // this.user.forEach((shareList)=>{
      this.sharedWithUserList.push({
        userName: shareList[0],
        accessType: "read",
      });
      // })
    } else {
      this.sharedWithUserList.push({
        userName: shareList[shareList.length - 1],
        accessType: "read",
      });
    }
    this.logService.debug(
      "Adding user to sharelist:" + this.sharedWithUserList
    );
    // console.log("share", this.sharedWithUserList);
  }
  removeShare(shareList: any) {
    // console.log("remove", shareList);
    // debugger;
    this.logService.debug("Removing user from sharelist:" + shareList);
    this.sharedWithUserList = this.sharedWithUserList.filter((value) => {
      for (let i = 0; i < shareList.length; i++) {
        if (shareList[i] === value.userName) return true;
      }
      return false;
    });
  }

  modalOpenVC(modalVC) {
    // console.log("modal vc", this.file.directory);
    this.overlayRef.dispose();
    this.sharedWithUserList = [];
    //console.log("this.share", this.sharedWithUserList);
    this.modalService.open(modalVC, {
      centered: true,
    });
  }

  // menu share item clicked
  fetchShareList(path) {
    this.logService.debug("Fetching from sharelist:");

    this.userService.getAllUserNames().subscribe((response) => {
      console.log("Usernames", response);
      this.users = response.map((item) => item["username"]);
      console.log(this.users);
    });

    this.fileshare.getAllDetails(path).subscribe((response) => {
      this.sharedWithUserList = response.sharedWithUserList;
      this.oneShareObject = response.owner;
      this.selectedDate = response.expirationDate;

      var tempNgSelect = [];
      this.sharedWithUserList.map((val) => {
        tempNgSelect.push({ id: val.userName, name: val.userName });
      });
      this.fg.get("email").patchValue(tempNgSelect);
      console.log("init", this.fg.get("email").value);
    });
  }

  sendShareList(modalVC) {
    // console.log("SHARELIST", this.share);
    //this.expirationDate = new Date();
    // console.log("date on submit, ", this.expirationDate);
    this.path = this.filename;
    this.directory = this.file.directory;
    // console.log("is it file or director", this.directory);
    this.modalService.dismissAll(modalVC);
    this.fileshare
      .uploadShareList(
        this.creationDate,
        this.path,
        this.sharedWithUserList,
        (this.selectedDate = this.selectedDate
          ? `${this.selectedDate}:00`
          : null),
        this.directory
      )
      .subscribe((response) => {
        this.logService.debug("Sening the sharelist:");
      });
    Swal.fire({
      icon: "success",
      title: "File Shared!!",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  showElementClick(file) {
    console.log("file", file);
    this.showElement.emit(file);
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  navigate(file: FileElement) {
    if (file.directory) {
      this.navigatedDown.emit(file);
    }
  }

  downloadElement(file: FileElement) {
    this.overlayRef.dispose();
    this.elementDownload.emit(file);
  }

  open({ x, y }: MouseEvent, file: FileElement) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.viewContainerRef, {
        $implicit: file,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, "click")
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          // console.log("clickTarget", clickTarget);
          return (
            this.overlayRef !== null &&
            this.overlayRef !== undefined &&
            this.overlayRef.overlayElement !== null &&
            this.overlayRef.overlayElement !== undefined &&
            // !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  deleteElement(file: FileElement) {
    this.overlayRef.dispose();
    this.logService.debug(file);
    this.elementRemoved.emit(file);
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  shareElement(file: FileElement) {
    this.logService.debug("In Shared Drive:");
  }

  getFileExtension(file: FileElement) {
    this.filename = file.fileName;
    this.directory = file.directory;
    // console.log("file-list", this.filename);
    if (file.directory) {
      var last = file.fileName.split("/");
      //console.log("name",last)
      for (let i = 0; i < last.length; i++) {
        //console.log("last",last[i]);
        this.name = last[i];
      }
    } else {
      this.name = file.fileName.split("/").pop();
    }
    this.ext = this.filename.split(".").pop();
    //console.log("extension", this.ext);
    let obj = this.iconList.filter((row) => {
      if (row.type === this.ext) {
        return true;
      }
    });
    if (file.directory === true) {
      this.icon = "fa fa-folder";
      return this.icon;
    } else if (obj.length > 0) {
      this.icon = obj[0].icon;
      return this.icon;
    } else {
      this.icon = "fa fa-file";
      return this.icon;
    }
  }

  validateDateTime(control: FormControl): { [s: string]: boolean } {
    const selectedDateTime = new Date(control.value);
    const now = new Date();

    if (
      selectedDateTime <= now ||
      selectedDateTime.getTime() - now.getTime() < 3600000
    ) {
      return { invalidDateTime: true };
    }

    return null;
  }
  //for date validation
  getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.fg = this.fb.group({
      email: [],
    });
    // this.fg = new FormGroup({
    //   email: new FormControl(""),
    //   //date: ["", dateValidator],
    // });
    this.iconName = this.getFileExtension(this.file);
  }
}
