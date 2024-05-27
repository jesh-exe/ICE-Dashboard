import { ListOfFiles } from "app/ice/storage/file/model/listOfFiles";
import { FileElement } from "./../../storage/file/model/file-element";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FileListService } from "app/ice/storage/storage-service/file-list.service";
import { NormalFileUploadService } from "app/ice/storage/storage-service/normal-upload.service";
import { environment } from "environments/environment";

@Component({
  selector: "app-short-mydrive",
  templateUrl: "./short-mydrive.component.html",
  styleUrls: ["./short-mydrive.component.scss"],
})
export class ShortMydriveComponent implements OnInit {
  private driveDataUrl = environment.baseURL + "/storage/sharedwithme";
  fileElements: FileElement[];
  @ViewChild("myModal", { static: false }) modal: ElementRef;
  filename: any;
  directory: boolean;
  name: string;
  currentFolder: string;
  currentFolderName: string;
  showBackButton: boolean = false;
  public icon;
  public iconName = [];
  inputForm: FormGroup;
  inputFields: string = "";
  public show: boolean = false;
  listOfDrives;
  routes = [];
  currentDriveName;

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
  folderName: any;

  constructor(
    public dialogRef: MatDialogRef<ShortMydriveComponent>,
    private fileListService: FileListService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private normalupload: NormalFileUploadService
  ) {
    this.fileListService.getDriveData().subscribe((response) => {
      this.fileElements = response.listOfFiles;
      this.iconName = [];
      this.fileElements.forEach((file) => {
        let icon = this.getFileExtension(file);
        this.iconName.push(icon);
      });
    });

    this.inputForm = this.fb.group({
      inputFields: this.fb.array([]),
    });
  }

  onSelect(item) {
    console.log("url item", item);
    if (item.includes("/sharedwithme/")) {
      console.log("condition with / ");
      var updatedItem = item.replace(
        "/storage/sharedwithme",
        "/storage/sharedwithme/list"
      );
      console.log("Updated URL:", updatedItem);
      this.fileListService.getlist(updatedItem).subscribe((res) => {
        console.log("in 2nd if condition", res);
        this.fileElements = res.listOfFiles;
        this.iconName = [];
        this.fileElements.forEach((file) => {
          let icon = this.getFileExtension(file);
          this.iconName.push(icon);
        });
      });
    } else {
      this.fileListService.getlist(item).subscribe((res) => {
        console.log("ress2", res);
        this.fileElements = res.listOfFiles;
        this.iconName = [];
        this.fileElements.forEach((file) => {
          let icon = this.getFileExtension(file);
          this.iconName.push(icon);
        });
      });
    }
  }

  open() {
    this.modal.nativeElement.style.display = "block";
  }
  close() {
    this.dialog.closeAll();
  }

  openFolder(folder: FileElement): void {
    console.log("folder", folder);

    if (folder.directory) {
      this.onSelect(folder.fileDownloadUri);
      this.showBackButton = true;
      this.currentFolder = folder.fileDownloadUri;
      // this.currentFolderName = this.currentFolder.substring(
      //   this.currentFolder.lastIndexOf("/list/") + 6
      // );
      // if (this.currentFolder.includes("/sharedwithme/")) {
      //   this.currentFolderName = this.currentFolder.substring(
      //     this.currentFolder.lastIndexOf("/sharedwithme/") + 14
      //   );
      //   console.log("currentFolderName sharedwithme", this.currentFolderName);
      // } else
      if (this.currentFolder.includes("/storage/")) {
        this.currentFolderName = this.currentFolder.substring(
          this.currentFolder.lastIndexOf("/storage/") + 9
        );
        console.log("currentFolderName storage-------", this.currentFolderName);
      }
      if (this.currentFolder.includes("/list/")) {
        console.log("hello", this.currentFolderName);
        this.currentFolderName = this.currentFolder.substring(
          this.currentFolder.lastIndexOf("/list/") + 6
        );
      }
    }
  }

  goBack(): void {
    console.log("in goback 1 ", this.currentFolder);
    // debugger;

    if (this.currentFolder.endsWith("/")) {
      this.currentFolder = this.currentFolder.substring(
        0,
        this.currentFolder.lastIndexOf("/")
      );
    }
    this.currentFolder = this.currentFolder.substring(
      0,
      this.currentFolder.lastIndexOf("/")
    );

    if (
      this.currentFolder
        .substring(0, this.currentFolder.lastIndexOf("/"))
        .endsWith("/sharedwithme")
    ) {
      this.currentFolder = this.currentFolder.substring(
        0,
        this.currentFolder.lastIndexOf("/")
      );
    }
    console.log("this.currentFolder in go back ", this.currentFolder);

    this.fileListService
      .getlistForShortDrive(this.currentFolder)
      .subscribe((res) => {
        console.log("res", res);
        this.fileElements = res.listOfFiles;
        this.iconName = [];
        this.fileElements.forEach((file) => {
          let icon = this.getFileExtension(file);
          this.iconName.push(icon);
        });
      });

    if (this.currentFolder.includes("/storage/public")) {
      //console.log("this,,,,", this.currentFolder);
      this.currentFolderName = this.currentFolder.substring(
        this.currentFolder.indexOf("/storage") + 8 + 1
      );
      console.log("this.currentFolder1", this.currentFolder);
    } else if (this.currentFolder.includes("/storage/sharedwithme")) {
      // debugger;
      this.currentFolderName = this.currentFolder.substring(
        this.currentFolder.indexOf("/storage") + 8
      );
      console.log("this.currentFolder2", this.currentFolder);
    } else {
      this.currentFolderName = this.currentFolder.substring(
        this.currentFolder.indexOf("/storage") + 8 + 6
      );
    }

    if (this.currentFolder === "https://ice-dev.bio.pune.cdac.in/storage") {
      this.showBackButton = false;
    }
  }

  getFileExtension(fileElements) {
    this.filename = fileElements.fileName;
    this.directory = fileElements.directory;
    if (this.directory === true) {
      this.icon = "fa fa-folder";
      return this.icon;
    }

    if (fileElements.directory) {
      var last = fileElements.fileName.split("/");
      for (let i = 0; i < last.length; i++) {
        this.name = last[i];
      }
    } else {
      this.name = fileElements.fileName.split("/").pop();
    }
    let ext = this.filename.split(".").pop();
    let obj = this.iconList.filter((row) => {
      if (row.type === ext) {
        return true;
      }
    });
    if (obj.length > 0) {
      let extIconObj = obj.pop();
      return extIconObj.icon;
    }
    return "fa fa-file";
  }

  onClickCopyPath(file) {
    console.log("file:  ", file);
    console.log("single time clicked");
    // if (
    //   file.fileDownloadUri.includes("/list/") ||
    //   file.fileDownloadUri.includes("/sign/")
    // ) {
    //   console.log("in else if");
    //   const urlParam = file.fileDownloadUri.split(/\/list\/|\/sign\//);
    //   const valueAfterSign = urlParam[1];
    //   console.log("path2 ", valueAfterSign);
    //   const el = document.createElement("textarea");
    //   el.value = valueAfterSign;
    //   document.body.appendChild(el);
    //   el.select();
    //   document.execCommand("copy");
    //   document.body.removeChild(el);
    //   this.dialogRef.close(el.value);
    // } else
    if (
      file.fileDownloadUri.includes("/sharedwithme") ||
      file.fileDownloadUri.includes("/sign")
    ) {
      console.log("in if loop of  sharedwithme");

      const urlParam = file.fileDownloadUri.split(/\/sharedwithme|\/sign/);
      console.log("copied path", urlParam);
      const valueAfterSign = urlParam[1];
      console.log("path2 ", valueAfterSign);
      const el = document.createElement("textarea");
      el.value = valueAfterSign;
      console.log("el.value", el.value);
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.dialogRef.close(el.value);
    } else if (file.fileDownloadUri.includes("/public")) {
      console.log("in else if");
      const urlParam = file.fileDownloadUri.split("/storage");
      const valueAfterSign = urlParam[1];
      console.log("path2 ", valueAfterSign);
      const el = document.createElement("textarea");
      el.value = valueAfterSign;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.dialogRef.close(el.value);
    } else {
      console.log("file:  ", file);
      // console.log("single time clicked", file);
      const el = document.createElement("textarea");
      el.value = file.fileName;
      console.log("copied path", el.value);
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.dialogRef.close(file.fileName);
    }
  }

  addFolder(folderName) {
    console.log("addfolder", this.currentFolder);
    if (this.currentFolder === undefined) {
      this.normalupload
        .shortDriveUploadFolder(this.currentFolder, folderName)
        .subscribe((response) => {
          this.fileElements = response.listOfFiles;
          console.log("filelist", this.fileElements);
        });
    } else {
      console.log("  this.currentFolder ", this.currentFolder);
      this.normalupload
        .shortDriveUploadFolder(this.currentFolder, folderName)
        .subscribe((response) => {
          this.fileElements = response.listOfFiles;
          console.log("filelist222", this.fileElements);
        });
    }
  }

  form = new FormGroup({
    inputFields: new FormControl("", [Validators.pattern(/^\S*$/)]),
  });

  toggle() {
    this.show = !this.show;
    this.inputFields = "";
    // console.log("inputFields ", this.currentFolder);
  }
  checkCurrentFolder() {
    console.log("checkCurrentFolder", this.currentFolder);
    if (
      this.currentFolder.includes("/sharedwithme") ||
      this.currentFolder.includes("/public")
    ) {
      this.show = false;
    }
  }

  ngOnInit(): void {}
}
