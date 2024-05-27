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
import { env } from "process";
import { sha3_256 } from "js-sha3";
@Injectable({
  providedIn: "root",
})
export class NormalFileUploadService {

  isSuccess = false;
  private baseUrl = environment.baseURL + "/storage/upload/";
  private folderUrl = environment.baseURL + "/storage/create/";
  public getfileurl: string = environment.baseURL + "/metadata/search/";
  public getmetadataurl = environment.baseURL + "/storage/sharedmetadata/";
  public getShareByMePeopleList =
    environment.baseURL + "/share/sharedbymegetlist";
  public getFileListofUser = environment.baseURL + "/storage/sharedbyme";
  public getMetadataValue =
    environment.baseURL + "/storage/getByMetadataValue/";
  public getFileExtension =
    environment.baseURL + "/storage/accepted-extensions";
    public validateMetadata= environment.baseURL + "/storage/checkRegex";
  //headers=new Headers();
  headers: string[] = [];

  constructor(private http: HttpClient, private logService: IceLogService) {}

  searchMetadataValue(value) {
   // const params = new HttpParams().set('metadata', value);

    return this.http.get<any>(this.getMetadataValue +value)
  }

  callingSharedByMe() {
    return this.http.get<any>(this.getFileListofUser);
  }

  private calculateHash(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
        const fileData = new Uint8Array(arrayBuffer);
        const hashValue = sha3_256(fileData);
        resolve(hashValue);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  uploadFile(param: any, file: any, httpheader: HttpHeaders) {
    if (param) {
      if (param === "") {
        var storageUrl = this.baseUrl;
      } else if (param === null) {
        var storageUrl = this.baseUrl;
      } else if (param && file.webkitRelativePath) {
        var folderpath = "";
        var lastPath = file.webkitRelativePath.split("/");
        for (let i = 0; i < lastPath.length - 1; i++) {
          folderpath += lastPath[i] + "/";
        }
        var storageUrl = this.baseUrl + param + "/" + folderpath;
      } else {
        var storageUrl = this.baseUrl + param;
        console.log("this.storageurl", storageUrl);
      }
    } else {
      if (file.webkitRelativePath === "") {
        var storageUrl = this.baseUrl;
        console.log("test1");
      } else {
        var folderpath = "";
        var lastPath = file.webkitRelativePath.split("/");
        for (let i = 0; i < lastPath.length - 1; i++) {
          folderpath += lastPath[i] + "/";
        }
        var storageUrl = this.baseUrl + folderpath;
        console.log("test");
      }
    }
    console.log("FILE", file.name);
    var formData: FormData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post<any>(storageUrl, formData, {
      headers: httpheader,
      reportProgress: true,
      observe: "events",
    });
    // .subscribe(
    //   (event) => {
    //     //console.log("event",file)
    //     if (event.type === HttpEventType.UploadProgress) {
    //       // console.log("checking event",event.total,event.loaded)
    //       fileUpload.progress.set(
    //         file.name,
    //         Math.round((100 / event.total) * event.loaded)
    //       );
    //       fileUpload.isSuccess.set(file.name, false);
    //       this.logService.info(JSON.stringify(fileUpload.progress));
    //       this.logService.info(JSON.stringify(fileUpload.isSuccess));
    //     } else if (event.type == HttpEventType.Response) {
    //       fileUpload.isSuccess.set(file.name, true);
    //       let n = 100 / queue.length;
    //       fileUpload.totalSize = fileUpload.totalSize - file.size;
    //       console.log("fileUpload.totalSize", fileUpload.totalSize);
    //       fileUpload.totalfileSize = filesize(fileUpload.totalSize, {
    //         base: 10,
    //         standard: "jedec",
    //       });
    //      fileUpload.progressstatus = 100 - Math.round(n);
    //       queue.pop(file);
    //       console.log("queue", queue);
    //       if(queue.length===0){
    //         Swal.fire({
    //           title: 'Upload Complete',
    //           text: 'All files have been uploaded successfully.',
    //           icon: 'success',
    //         });
    //       }

    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //     var timeInterval = setInterval(() => {
    //       isOnline().then((status) => {
    //         if (status) {
    //           debugger;
    //           clearInterval(timeInterval);

    //           console.log("is online");
    //           this.uploadFile(
    //             file,
    //             storageUrl,
    //             fileUpload,
    //             httpheader,
    //             queue
    //           );
    //         } else {
    //           console.log("offline");
    //         }
    //       });
    //     }, 5000);
    //     var str = error.error.exceptionMessage;
    //     //str = str.split(":").pop();
    //     this.logService.error(error);
    //     Swal.fire({
    //       icon: "error",
    //       title: str,
    //       customClass: {
    //         confirmButton: "btn btn-warning",
    //       },
    //     });
    //   },
    // );
  }

  uploadMetadata(item) {
    //console.log('in service',item.length);
    this.headers = item;
    //console.log("header", this.headers);
    return this.headers;
  }

  uploadFolder(pathfolder: any, folder: any): Observable<ListOfFiles> {
    console.log("in service folder", folder);
    let httpheader = new HttpHeaders({});
    if (pathfolder === "") {
      return this.http.put<ListOfFiles>(this.folderUrl + folder, {
        headers: httpheader,
        observe: "events",
      });
    } else {
      return this.http.put<ListOfFiles>(
        this.folderUrl + pathfolder + "/" + folder,
        { headers: httpheader, observe: "events" }
      );
    }
  }

  shortDriveUploadFolder(
    pathfolder: any,
    folderName: any
  ): Observable<ListOfFiles> {
    // console.log("in service folder +", folderName);
    let httpheader = new HttpHeaders({});
    // console.log("pathfolder", pathfolder, "+", folderName);
    if (pathfolder === undefined) {
      return this.http.put<ListOfFiles>(this.folderUrl + folderName, {
        headers: httpheader,
        observe: "events",
      });
    } else {
      var path = pathfolder.substring(pathfolder.indexOf("/list/") + 6);
      // console.log(this.folderUrl + "1" + path + "=>" + folderName);
      return this.http.put<ListOfFiles>(
        this.folderUrl + path + "/" + folderName,
        {
          headers: httpheader,
          observe: "events",
        }
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
    if (ext) {
      httpParams = httpParams.set("ext", ext);
    }
    if (keys.length > 0) {
      console.log("service keys", keys);
      httpParams = httpParams.set("keys", keys);
    }
    // console.log(body);
    // return this.http.get<any>(this.getfileurl + "multipleFilterFiles" + body);

    return this.http.get<any>(this.getfileurl + "multipleFilterFiles", {
      params: httpParams,
    });
  }

  calingSharedByMePeopleList() {
    return this.http.get<any>(this.getShareByMePeopleList);
  }

  callingSharedByMePeopleFileList(owner) {
    console.log("in service", owner);
    return this.http.get<any>(this.getFileListofUser + "/" + owner);
  }
  checkingExtensions() {
    return this.http.get<any>(this.getFileExtension);
  }
  checkMetadataValue(val: any) {
    var formData: FormData = new FormData();
    formData.append("inputString",val)
    return this.http.post<any>(this.validateMetadata,formData);
  }
}
