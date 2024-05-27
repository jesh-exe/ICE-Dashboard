import { FileUploadService } from "app/ice/storage/storage-service/file-upload.service";
import {
  Component,
  ElementRef,
  OnInit,
  PipeTransform,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { FileItem, FileUploader } from "ng2-file-upload";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { UploadService } from "../storage-service/upload.service";
import { Observable, Subject, merge } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
// import { CheckIsOnlineService } from "app/ice/services/check-is-online.service";
import { filesize } from "filesize";
import { NormalFileUploadService } from "../storage-service/normal-upload.service";
import { HttpEventType, HttpHeaders } from "@angular/common/http";
import { forkJoin } from "rxjs";
// import isOnline from "is-online";
import { headers } from "nats.ws";

const states = [
  "filetype",
  "Assay_Type",
  "LibrarySelection",
  "LibrarySource",
  "LibraryLayout",
  "Platform",
  "Model",
  "Number_of_Replicates",
  "AVG_Read_Length_fastq",
  "Number_of_Reads",
  "size_MB",
  "InsertSize",
  "Organism_Name",
  "Organism_Scientific_Name",
  "cell_line",
  "tissue",
  "Sex",
  "Phenotype",
];

@Component({
  selector: "app-file-uploading",
  templateUrl: "./file-uploading.component.html",
  styleUrls: ["./file-uploading.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadingComponent implements OnInit, PipeTransform {
  onMetadataChange() {
    throw new Error("Method not implemented.");
  }
  public transform(collection: any[], term = "") {
    return collection.filter((item) =>
      item.toString().toLowerCase().startsWith(term.toString().toLowerCase())
    );
  }

  public items = [{ key: "", value: "" }];
  public item = {
    key: "",
    value: "",
  };
  private focusObservableList = Array<Subject<string>>();
  private clickObservableList = Array<Subject<string>>();
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild("instance") inst: QueryList<NgbTypeahead>;
  @ViewChild("metadataUploader") metadataUploader: ElementRef;

  // public
  public _control: FormControl;
  progress = new Map();
  progressstatus = 0;
  public contentHeader: object;
  public hasAnotherDropZoneOver: boolean = false;
  public hasBaseDropZoneOver: boolean = false;
  public name;
  listFilesToUpload = [];
  public uploader: FileUploader = new FileUploader({
    //url: URL,
    isHTML5: true,
  });
  id: number;
  filePath: string;
  files: [];
  fileName: string;
  isSuccess = new Map();
  breadCrumb: any;
  clicked = false;
  totalSize: number = 0;
  totalfileSize;
  fileContent: string = "";
  key;
  value;
  public trimmedvalue;
  public trimmedvalues;
  public extensionList: any[] = [];
  currentIndex = 0;
  validateInput(event) {
    let val = event.target.value;
    console.log(val)
    this.normalupload.checkMetadataValue(val).subscribe((res)=>{
      // console.log(res.metadataValue)
      if(res.metadataValue!==null){
        Swal.fire({
          title:res.metadataValue,
          icon: 'warning',
        })
        this.clicked = true;
      }else{
        this.clicked = false;
      }
    })

  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  onFileChange() {
    this.totalSize = 0;

    for (let i = 0; i < this.uploader.queue.length; i++) {
      console.log(this.uploader.queue[i].file.rawFile);
      let ext = this.uploader.queue[i].file.name.split(".").pop();
      let smallExt = ext.toLowerCase();
      console.log("smallExt", smallExt);
      //in normal file upload service
      this.normalupload.checkingExtensions().subscribe((res) => {
        // console.log("response", res);
        this.extensionList = res.acceptedExtensionList;
        if (!this.extensionList.includes(smallExt)) {
          Swal.fire(
            "Not valid Extension ( Use 'txt', 'pdf', 'c', 'jpg', 'jpeg', 'mp4', 'seq', 'fasta', 'vcf', 'gtf', 'fastq', 'fa', 'fq', 'fna', 'gff', 'gff3', 'bam', 'sam', 'bed', 'gz', 'tar', 'zip' files to Upload ).",
            "",
            "warning"
          );
          console.log("extension not matching");
          this.uploader.queue.splice(i, 1); // Remove the file from the queue
          i--;
        }
      });

      if (/\s/.test(this.uploader.queue[i].file.name)) {
        Swal.fire(
          "Filename contains spaces. Please rename the file.",
          "",
          "warning"
        );
        let c = this.uploader.queue.splice(i, 1);
        console.log("pop", c);
        i--;
      }
    }

    for (let i = 0; i < this.uploader.queue.length; i++) {
      this.totalSize = this.totalSize + this.uploader.queue[i].file.size;
      this.totalfileSize = filesize(this.totalSize, {
        base: 10,
        standard: "jedec",
      });
    }
  }

  remove(id) {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const test = this.uploader.queue[i].file?.size;
      if (this.uploader.queue.indexOf(this.uploader.queue[i]) === id) {
        this.uploader.queue.splice(i, 1);
        this.totalSize = this.totalSize - test;
        this.totalfileSize = filesize(this.totalSize, {
          base: 10,
          standard: "jedec",
        });
        break;
      }
    }
  }

  getfileSize(size) {
    return filesize(size, { base: 10, standard: "jedec" });
  }

  recursivecall(filePath, currentFile, httpheader) {
    this.normalupload.uploadFile(filePath, currentFile, httpheader).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          let progres = Math.round((100 / event.total) * event.loaded);
          console.log("queue", this.uploader.queue, this.uploader.queue.length);
          console.log(
            "this.uploader.queue[this.currentIndex].file.name",
            this.uploader.queue[this.currentIndex].file.name
          );
          //this.progress.set(currentFile,50);
          this.progress.set(
            this.uploader.queue[this.currentIndex].file.name,
            progres
          );
          console.log(this.progress, "progress set");
          this.isSuccess.set(
            this.uploader.queue[this.currentIndex].file.name,
            false
          );
        } else if (event.type == HttpEventType.Response) {
          console.log(this.uploader.queue.length);
          this.isSuccess.set(
            this.uploader.queue[this.currentIndex].file.name,
            true
          );
          //this.progress.set(currentFile,100);
          console.log("complete progress =>", this.progress);

          let n = 100 / this.uploader.queue.length;
          console.log("n", n);
          this.progressstatus += n;
          console.log(this.progressstatus, "status");
          if (this.progress.size === this.uploader.queue.length) {
            if (this.uploader.queue.length > 1) {
              var timeInterval = setInterval(() => {
                Swal.fire({
                  title: "Upload Complete",
                  text:
                    "All " +
                    this.uploader.queue.length +
                    " files have been uploaded successfully.",
                  icon: "success",
                });
                console.log("check");
                this.uploader.queue = [];
                clearInterval(timeInterval);
              }, 5000);
            } else if (this.uploader.queue.length === 1) {
              //debugger;
              Swal.fire({
                title: "Upload Complete",
                text:
                  this.uploader.queue.length +
                  " file has been uploaded successfully.",
                icon: "success",
              });
              console.log("check");
              this.uploader.queue = [];
              this.resetFields();
              clearInterval(timeInterval);
            }
          } else {
            console.log("try");
            this.currentIndex++;
            this.uploadAll();
          }
        }
      },
      (error) => {
        console.log(error);
        var str = error.error.exceptionMessage;
        str = str.split(":").pop();
        this.logService.error(error);
        Swal.fire({
          icon: "error",
          title: str,
          customClass: {
            confirmButton: "btn btn-warning",
          },
        });
        // var timeInterval = setInterval(() => {
        //   isOnline().then((status) => {
        //     if (status) {
        //       //debugger;
        //       clearInterval(timeInterval);
        //       console.log("is online");
        //       let trimstring = str.trim;
        //       console.log(trimstring, "string");
        //       console.log(error.status, "error status");
        //       if (error.status === 500) {
        //         console.log("PREET");
        this.progress.set(this.uploader.queue[this.currentIndex].file.name, 0);
        // var queue = this.uploader.queue;
        // this.uploader.queue.shift();
        // this.recursivecall(this.filePath,currentFile, httpheader)
        this.currentIndex++,
          this.recursivecall(
            this.filePath,
            this.uploader.queue[this.currentIndex].file.rawFile,
            httpheader
          );
        //       } else {
        //         this.recursivecall(this.filePath, currentFile, httpheader);
        //       }
        //     } else {
        //       console.log("offline");
        //     }
        //   });
        // }, 5000);
      }
    );
  }

  async uploadAll() {
    // var res = this.iceOnlineService.iceOnline;
    // if (res) {
    this.clicked = true;
    let threshold = 500 * 1024 * 1024;
    let n = 100 / this.uploader.queue.length;

    console.log("Qu size :", this.uploader.queue.length);
    let httpheader = new HttpHeaders();

    //debugger;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].key !== "") {
        httpheader = httpheader.set(
          "ice-meta-" + this.items[i].key,
          this.items[i].value
        );
        console.log("httpheader", httpheader);
      }
    }

    if (this.currentIndex < this.uploader.queue.length) {
      //this.progressstatus = Math.round(this.currentIndex * n);
      const currentFile = this.uploader.queue[this.currentIndex].file.rawFile;
      console.log(currentFile + "<= currentFile = >" + this.currentIndex);
      this.progress.set(this.uploader.queue[this.currentIndex].file.name, 0);
      console.log("this.proess", this.progress);
      this.isSuccess.set(
        this.uploader.queue[this.currentIndex].file.name,
        false
      );
      this.recursivecall(this.filePath, currentFile, httpheader);
    }
    // else {
    //   //this.uploader.queue.pop()
    //          if(this.uploader.queue.length===0){
    //         Swal.fire({
    //           title: 'Upload Complete',
    //           text: 'All files have been uploaded successfully.',
    //           icon: 'success',
    //         });
    //   console.log('All files uploaded');}
    // }

    //************************************************************************* */

    // for (let i = 1; i <= this.uploader.queue.length; i++) {
    //   this.progressstatus = Math.round(i * n);
    //   // console.log("check size ", this.uploader.queue[i - 1].file.size);
    //   this.progress.set(this.uploader.queue[i - 1].file.rawFile, 0);
    //   this.isSuccess.set(this.uploader.queue[i - 1].file.rawFile, false);

    //   // if (this.uploader.queue[i - 1].file.size >= threshold) {
    //   //   await this.awsS3UploadService.uploadMultipartFile(
    //   //     this.filePath,
    //   //     this.uploader.queue[i - 1].file.rawFile,
    //   //     this,
    //   //     this.items,
    //   //     this.uploader.queue
    //   //   );
    //   // } else {
    //     this.normalupload.uploadFile(
    //     this.filePath,
    //     this.uploader.queue[i - 1].file.rawFile,
    //     this,
    //     httpheader,
    //     this.uploader.queue)
    //   //await this.awsS3UploadService.uploadMultipartFile(this.filePath,this.uploader.queue[i-1].file.rawFile,this.items);
    //   // await this.awsS3UploadService.fileSelected(this.filePath,this.uploader.queue[i-1].file.rawFile,this.items);
    // }
    //*****************************************************************************/
    // } else {
    //   Swal.fire(
    //     "Hello, You are offline, please check the internet connection to upload files",
    //     "",
    //     "warning"
    //   );
    // }
  }

  constructor(
    private fileupload: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private logService: IceLogService,
    private normalupload: NormalFileUploadService,
    private awsS3UploadService: UploadService,
    private toastr: ToastrService // private iceOnlineService: CheckIsOnlineService
  ) { }
  prepareBreadCrumb() {
    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    this.contentHeader["breadcrumb"].links = [];

    this.contentHeader["breadcrumb"].links.push({
      name: "File Uploader",
      isLink: true,
      link: "/file-uploading",
    });

    let cummulativePath = "";

    var paths = this.filePath.split("/");
    console.log("paths", this.filePath);

    for (let i = 0; i < paths.length; i++) {
      console.log("paths.length", paths.length);
      if (cummulativePath === "") {
        cummulativePath = paths[i];
        console.log("cummulativePath", cummulativePath);
      } else {
        console.log("paths[i]", paths[i]);
        cummulativePath = cummulativePath + "/" + paths[i];
        console.log("cummulativePath", cummulativePath);
      }

      if (i == paths.length - 1) {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: false,
          link: "/file-uploading",
          path: cummulativePath,
        });
      } else {
        this.contentHeader["breadcrumb"].links.push({
          name: paths[i],
          isLink: true,
          link: "/file-uploading",
          path: cummulativePath,
        });
      }
    }
  }
  addNewItem(items: any) {
    // this.newItemEvent.emit(items);
    //this.headers=items;
    this.items.push({
      key: "",
      value: "",
    });
    this.logService.debug(items);
  }
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }
  //metadata file upload
  previewFile(event: any): void {
    const file: File = event.target.files[0];
    console.log("file SELECTED ", file);
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result as string;
      this.convertFileToKeyvalue();
    };
    reader.readAsText(file);
    this.addNewItem(this.items);
  }

  convertFileToKeyvalue() {
    this.items = [];
    const keyValueArray = this.fileContent
      .split("\n")
      .filter((line: string) => {
        if (line) return true;
        else return false;
      })
      .map((line: string) => {
        const [key, value] = line.split(":");

        this.trimmedvalue = { key: key.trim(), value: value.trim() };
        console.log("all keys", this.trimmedvalue.key);
        var str1 = key.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_");
        // console.log("all keys2", str1);
        var str2 = value.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_");
        // console.log("all keys2", str2);
        this.trimmedvalues = { key: str1, value: str2 };
        this.items.push({
          key: this.trimmedvalues.key,
          value: this.trimmedvalues.value,
        });
        return this.items;
      });

    console.log(keyValueArray);
  }
  resetMeatdataFileUploader() {
    this.metadataUploader.nativeElement.value = null;
  }
  resetFields() {
    for (let i of this.items) {
      i.key = "";
      i.value = "";
    }
    this.clicked = false;
    this.progress = new Map();

    // this.items = [{ key: "", value: "" }];
    //this.addNewItem({ key: "", value: "" });
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.awsS3UploadService.uploadProgress$.subscribe((event) => {
      const index = this.uploader.queue.findIndex(
        (item) => item.file.name === event.token
      );
      const fileprogress = this.uploader.queue[index].progress || 0;
      this.uploader.queue[index].progress =
        event.progress > fileprogress ? event.progress : fileprogress;
      this.progress.set(event.token, this.uploader.queue[index].progress);
    });

    this.awsS3UploadService.finishedProgress$.subscribe((event) => {
      const index = this.uploader.queue.findIndex(
        (item) => item.file.name === event.token
      );
      this.isSuccess.set(event.token, event.success);
    });

    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.logService.debug(param.get("path"));
      this.filePath = param.get("path");
      if (this.filePath === null) {
        this.filePath = "";
      }
      this.prepareBreadCrumb();
    });

    // content header
    // this.contentHeader = {
    //   headerTitle: "File Uploader",
    //   actionButton: true,
    //   breadcrumb: {
    //     type: "",
    //     links: [
    //       {
    //         name: "Home",
    //         isLink: true,
    //         link: "/",
    //       },
    //       {
    //         name: "File Uploader",
    //         isLink: true,
    //         link: "/",
    //       },
    //     ],
    //   },
    // };
  }

  ngAfterViewInit() {
    // console.log(this.inst);
    this.focus$.subscribe((item) => {
      this.logService.debug(item);
      const tableIndex = Number(item);
      let focusItem$: Subject<string>;
      this.focusObservableList.some((focus, index) => {
        if (index === tableIndex) {
          focusItem$ = focus;
          return true;
        } else {
          return false;
        }
      });
      if (item) {
        focusItem$.next(item);
      }
    });
  }

  search = (text$: Observable<string>) => {
    // input value change stream for each control
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    // input click stream for each control
    const inputClick$ = new Subject<string>();
    this.clickObservableList.push(inputClick$);
    const clicksWithClosedPopup$ = inputClick$.pipe(
      filter((item) => {
        // const tableIndex = states.findIndex(element => element.position === item.position)
        const tableIndex = Number(item);
        let ngbTypeHeader: NgbTypeahead;
        this.inst.some((value, index) => {
          if (tableIndex === index) {
            ngbTypeHeader = value;
            return true;
          }
          return false;
        });
        return ngbTypeHeader && !ngbTypeHeader.isPopupOpen();
      }),
      map((item) => "")
    );
    // input focus stream for each control
    const inputFocus$ = new Subject<string>();
    this.focusObservableList.push(inputFocus$);
    const focusSteam$ = inputFocus$.pipe(map((item) => ""));
    // merge all stream
    return merge(debouncedText$, focusSteam$, clicksWithClosedPopup$).pipe(
      map((term) => {
        console.log("term :", term);
        if (term === "") {
          return states;
        } else {
          return states.filter(
            (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
          );
        }
      })
    );
  };
}
