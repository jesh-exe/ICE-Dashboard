import { date } from "../../../admin/user/user-models/date";
import { FileShareService } from "../../storage-service/file-share.service";
import { Name } from "../../../admin/user/user-models/name";
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
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-shared-item",
  templateUrl: "./shared-item.component.html",
  styleUrls: ["./shared-item.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "ecommerce-application" },
})
export class SharedItemComponent implements OnInit {
  // Input Decorotor
  public fg: FormGroup;
  @Input() file;
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
  public icon;
  public iconName;
  path;
  username;
  data = [];
  share = [];
  filename;
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
  isHidden = false;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   *  @param {NgbModal} modalService
   */

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
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      dateTime: new FormControl(
        "",
        Validators.compose([Validators.required, this.validateDateTime])
      ),
    });
  }

  changeWebsite(e, username) {
    //console.log("changeWebsite", e.target.value, username);
    this.share.map((value) => {
      if (value.username === username) {
        console.log("username", username);
        value.accesstype = e.target.value;
      }
    });
    this.logService.debug("Inside the Shared Model");
    //console.log(this.share);
  }

  selectedDate: string = new Date().toISOString();

  onSubmit() {
    // this.expirationDate = new Date();
    this.expirationDate = `${this.selectedDate}:00`;
    //console.log("Selected date:", this.expirationDate);
  }

  frm = new FormGroup({
    accesstype: new FormControl(),
  });

  get form() {
    return this.fg.controls;
  }
  @ViewChild("inputUrl") inputUrl: ElementRef;
  @ViewChild("datepicker") datepicker;

  copy(inputElement) {
    this.overlayRef.dispose();
    //console.log("inputElement", inputElement);
    const el = document.createElement("textarea");
    el.value = inputElement;
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

  addCustomUser = (term) => ({ id: term, name: term });

  // addShare(shareList: any) {
  //   console.log("fg", this.fg);
  //   console.log("add", shareList);
  //   if (shareList.length == 1) {
  //     this.share.push({ username: shareList[0].id, accesstype: "view" });
  //   } else {
  //     this.share.push({
  //       username: shareList[shareList.length - 1].id,
  //       accesstype: "view",
  //     });
  //   }
  //   console.log("share", this.share);
  // }
  // removeShare(shareList: any) {
  //   console.log("remove", shareList);
  //   // debugger;
  //   this.share = this.share.filter((value) => {
  //     for (let i = 0; i < shareList.length; i++) {
  //       if (shareList[i].id === value.username) return true;
  //     }
  //     return false;
  //   });
  // }

  modalOpenVC(modalVC) {
    this.overlayRef.dispose();
    this.share = [];
    // console.log("this.share", this.share);
    this.modalService.open(modalVC, {
      centered: true,
    });
  }

  // menu share item clicked
  // fetchShareList(path) {
  //   console.log("in componennt ", path);
  //   this.fileshare.getAllDetails(path).subscribe((response) => {
  //     console.log("preet", response);
  //     this.share = response.sharelist;
  //     this.oneShareObject = response.owner;
  //     console.log("who is owner", this.oneShareObject);
  //     this.selectedDate = response.expirationDate;
  //     console.log("the response", response.sharelist);
  //     var tempNgSelect = [];
  //     this.share.map((val) => {
  //       tempNgSelect.push({ id: val.username, name: val.username });
  //     });
  //     this.fg.get("email").patchValue(tempNgSelect);
  //     console.log("init", this.fg.get("email").value);
  //   });
  // }

  // sendShareList(modalVC) {
  //   // console.log("SHARELIST", this.share);
  //   this.expirationDate = new Date();
  //   // console.log("date on submit, ", this.expirationDate);
  //   this.path = this.filename;
  //   // console.log("");
  //   this.modalService.dismissAll(modalVC);
  //   this.fileshare
  //     .uploadShareList(
  //       this.creationDate,
  //       this.path,
  //       this.share,
  //       `${this.selectedDate}:00`
  //     )
  //     .subscribe((response) => {
  //       console.log("3rdresponse", response);

  //       console.log("the response from service", this.oneShareObject);
  //     });
  // }

  showElementClick(file) {
    this.overlayRef.dispose();
    //console.log("showElementClick", file);
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
          return (
            this.overlayRef !== null &&
            this.overlayRef !== undefined &&
            this.overlayRef.overlayElement !== null &&
            this.overlayRef.overlayElement !== undefined &&
            //!!this.overlayRef &&
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
    //console.log("in sharing ");
  }

  getFileExtension(file: FileElement) {
    this.filename = file.fileName;
    // console.log("this.filename", this.filename);
    //console.log("file-list", this.filename);
    if (file.directory) {
      var last = file.fileName.split("/");
      for (let i = 0; i < last.length; i++) {
        this.name = last[i];
        //console.log("name1", this.name);
      }
    } else {
      this.name = file.fileName.split("/").pop();
      // console.log("name", this.name);
    }
    let ext = this.filename.split(".").pop();
    let obj = this.iconList.filter((row) => {
      if (row.type === ext) {
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
  // getCurrentDateTime() {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  //   const day = currentDate.getDate().toString().padStart(2, "0");
  //   const hours = currentDate.getHours().toString().padStart(2, "0");
  //   const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}T${hours}:${minutes}`;
  // }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(""),
      //date: ["", dateValidator],
    });
    this.iconName = this.getFileExtension(this.file);
    //console.log("iconname", this.iconName);
  }
}
