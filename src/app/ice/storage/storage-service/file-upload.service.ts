import { FileUploadingComponent } from "app/ice/storage/file-uploading/file-uploading.component";
import { environment } from "environments/environment";
import {
  HttpClient,
  HttpProgressEvent,
  HttpEvent,
  HttpHeaders,
  HttpEventType,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FileItem } from "ng2-file-upload";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { IceLogService } from "app/ice/services/ice-log.service";
import { Observable } from "rxjs/internal/Observable";
import { ListOfFiles } from "app/main/sample/file-explorer/model/listOfFiles";
// import isOnline from "is-online";
import { filesize } from "filesize";
@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  isSuccess = false;
  private baseUrl = environment.baseURL + "/storage/upload/";
  private folderUrl = environment.baseURL + "/storage/folder/";
  public getfileurl: string =
    environment.baseURL + "/storage/getMetadataByFilters";
  public getmetadataurl = environment.baseURL + "/storage/share/metadata/";

  //headers=new Headers();
  headers: string[] = [];

  constructor(private http: HttpClient, private logService: IceLogService) {}

  async getPresignedUrl(
    param: any,
    fileItem: any,
    fileUpload: FileUploadingComponent,
    headers: any[],
    queue: FileItem[]
  ) {
    console.log("test", fileItem, headers);
    let httpheader = new HttpHeaders();
    //console.log("httpheader LENGTH", headers.length);
    for (let i = 0; i < headers.length; i++) {
      httpheader = httpheader.set(headers[i].key, headers[i].value);
      // console.log(headers[i].key, headers[i].value);
    }
    if (param === "") {
      var presignedUrl = this.baseUrl + fileItem.name;
    } else if (param === null) {
      var presignedUrl = this.baseUrl + fileItem.name;
    } else {
      var presignedUrl = this.baseUrl + param + "/" + fileItem.name;
    }

    return this.http
      .get<any>(presignedUrl, { headers: httpheader })
      .subscribe((data) =>
        this.uploadFile(fileItem, data.url, fileUpload, httpheader, queue)
      );
  }

  uploadFile(
    file: File,
    s3Url: string,
    fileUpload: FileUploadingComponent,
    httpheader: HttpHeaders,
    queue
  ) {
    this.http
      .put<any>(s3Url, file, {
        headers: httpheader,
        reportProgress: true,
        observe: "events",
      })
      .subscribe(
        (event) => {
          //console.log("event",file)
          if (event.type === HttpEventType.UploadProgress) {
            // console.log("checking event",event.total,event.loaded)
            fileUpload.progress.set(
              file.name,
              Math.round((100 / event.total) * event.loaded)
            );
            fileUpload.isSuccess.set(file.name, false);
            this.logService.info(JSON.stringify(fileUpload.progress));
            this.logService.info(JSON.stringify(fileUpload.isSuccess));
          } else if (event.type == HttpEventType.Response) {
            fileUpload.isSuccess.set(file.name, true);
            Swal.fire(
              file.name + " file Uploaded Successfully!",
              "",
              "success"
            );
            let n = 100 / queue.length;
            queue.pop(file);
            fileUpload.totalSize = fileUpload.totalSize - file.size;
            console.log("fileUpload.totalSize", fileUpload.totalSize);
            fileUpload.totalfileSize = filesize(fileUpload.totalSize, {
              base: 10,
              standard: "jedec",
            });
            fileUpload.progressstatus = 100 - Math.round(n);
            console.log("fileUpload.progressstatus", fileUpload.progressstatus);
            console.log("queue", queue);
          }
        },
        (error) => {
          console.log(error);
          // var timeInterval = setInterval(() => {
          //   isOnline().then((status) => {
          //     if (status) {
          //       debugger;
          //       clearInterval(timeInterval);

          //       console.log("is online");
          this.uploadFile(file, s3Url, fileUpload, httpheader, queue);
          //       } else {
          //         console.log("offline");
          //       }
          //     });
          //   }, 5000);
          //   this.logService.error(error);
          //   Swal.fire({
          //     icon: "error",
          //     title: "Failed!",
          //     customClass: {
          //       confirmButton: "btn btn-warning",
          //     },
          //   });
        }
      );
  }

  uploadMetadata(item) {
    //console.log('in service',item.length);
    this.headers = item;
    //console.log("header", this.headers);
    return this.headers;
  }

  uploadFolder(pathfolder: any, folder: any): Observable<ListOfFiles> {
    this.logService.debug(folder);
    let httpheader = new HttpHeaders({});
    if (pathfolder === "") {
      return this.http.post<ListOfFiles>(this.folderUrl + folder, {
        headers: httpheader,
        observe: "events",
      });
    } else {
      return this.http.post<ListOfFiles>(
        this.folderUrl + pathfolder + "/" + folder,
        { headers: httpheader, observe: "events" }
      );
    }
  }

  getFileOnMetadata(key) {
    return this.http.get<any>(this.getmetadataurl + key);
  }

  getFileOnMultipleFilter(from, to, ext, keys) {
    let httpheader = new HttpHeaders({});
    //const body = { ext: ext, from: from, to: to, key: key };
    var httpParams = new HttpParams();

    if (from) {
      httpParams = httpParams.set("from", from);
      httpParams = httpParams.set("to", to);
    }
    if (ext.length > 0) {
      console.log("service keys", ext);
      httpParams = httpParams.set("ext", ext);
    }
    if (keys.length > 0) {
      console.log("service keys", keys);
      httpParams = httpParams.set("keys", keys);
    }
    // console.log(body);
    // return this.http.get<any>(this.getfileurl + "multipleFilterFiles" + body);
    console.log("this.getfileurl", this.getfileurl, {
      params: httpParams,
    });
    return this.http.get<any>(this.getfileurl, {
      params: httpParams,
    });
  }
}
