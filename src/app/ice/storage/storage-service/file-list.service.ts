import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { FileItem } from "ng2-file-upload";
import { IceLogService } from "app/ice/services/ice-log.service";
import { ListOfFiles } from "app/ice/storage/file/model/listOfFiles";
import { FileElement } from "app/ice/storage/file/model/file-element";
@Injectable({
  providedIn: "root",
})
export class FileListService {
  // public rows: any;

  private baseUrl = environment.baseURL + "/storage/list/";
  // private ipis = "http://10.208.27.72:8082/share/files";
  private driveDataUrl = environment.baseURL + "/storage/";

  constructor(private http: HttpClient, private logService: IceLogService) {}
  getResultPreview(url): Observable<any> {
    return this.http.get(url, { responseType: "text" });
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getAllFiles()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getAllFiles(): Observable<ListOfFiles> {
    return this.http.get<ListOfFiles>(this.baseUrl);
  }
  // this.http.get(this.baseUrl).subscribe((response: ListOfFiles) => {
  //   // console.log(response.listOfFiles);
  //   this.logService.info(JSON.stringify(response.listOfFiles));
  //   //console.log("Response :",response);
  //   //this.onUserListChanged.next(this.rows);
  //  // console.log("Rows :",this.rows);
  //  // resolve(response.listOfFiles);
  // //},

  getPresignedUrl(fileName: string): any {
    //console.log('called GET method')
    var presignedUrl = environment.baseURL + "/storage/file/" + fileName;
    this.logService.info(presignedUrl);
    return this.http.get<any>(presignedUrl).subscribe(
      (data) => {
        this.logService.info(JSON.stringify(data));
        //console.log("Presigned",data)
        window.open(data.url, "_blank");
      },
      (error) => {
        this.logService.error(error);
        //console.log(error);
      }
    );
  }

  deleteFile(fileName: string): Observable<ListOfFiles> {
    let url = environment.baseURL + "/storage/file/" + fileName;
    return this.http.delete<ListOfFiles>(url);
  }

  getlist(fileDownloadUri: string): Observable<ListOfFiles> {
    // console.log("in  list service ", fileDownloadUri);
    let url = fileDownloadUri;
    return this.http.get<ListOfFiles>(url);
    // .subscribe(response=>{
    //   console.log("Test 1",response)
    // })
  }

  getlistForShortDrive(fileDownloadUri: string): Observable<ListOfFiles> {
    console.log("hitting URL : ", fileDownloadUri);
    if (fileDownloadUri.includes("/storage/sharedwithme")) {
      // console.log("do check");
      if (fileDownloadUri.endsWith("/sharedwithme")) {
        //console.log("in if");
        var updatedItem = fileDownloadUri.replace(
          "/storage/sharedwithme/list",
          "/storage/sharedwithme"
        );
        console.log("updatedItem ", updatedItem);
        return this.http.get<ListOfFiles>(updatedItem);
      } else {
        // console.log("in chhota else", fileDownloadUri);
        var updatedItem = fileDownloadUri.replace(
          "/storage/sharedwithme",
          "/storage/sharedwithme/list"
        );
        console.log("updatedItem ", updatedItem);
        return this.http.get<ListOfFiles>(updatedItem);
      }
    } else {
      //console.log("in else");
      let url = fileDownloadUri + "/";
      return this.http.get<ListOfFiles>(url);
    }

    // debugger;
    // if (fileDownloadUri.includes("storage/sharedwithme/list")) {
    //   var updatedItem = fileDownloadUri.replace(
    //     "/storage/sharedwithme/list",
    //     "/storage/sharedwithme"
    //   );
    //   console.log("updatedItem ", updatedItem);
    //   return this.http.get<ListOfFiles>(updatedItem);
    // } else
    //this code is working
    // if (fileDownloadUri.includes("storage/sharedwithme")) {
    //   var updatedItem = fileDownloadUri.replace(
    //     "/storage/sharedwithme",
    //     "/storage/sharedwithme/list"
    //   );
    //   console.log("updatedItem ", updatedItem);
    //   return this.http.get<ListOfFiles>(updatedItem);
    // } else {
    //   let url = fileDownloadUri + "/";
    //   return this.http.get<ListOfFiles>(url);
    // }
  }

  // getSharingData(user: any) {
  //   let url = this.ipis;
  //   return this.http.put(url, user).subscribe((data) => {
  //     console.log("data", data);
  //   });
  //   console.log("in file list service");
  //   console.log("the user", user);
  // }
  getDriveData() {
    console.log("driveDataUrl", this.driveDataUrl);
    return this.http.get<ListOfFiles>(this.driveDataUrl);
  }

  getDriveDataFileList(url) {
    return this.http.get<ListOfFiles>(this.driveDataUrl + url);
    console.log("url in service", url);
  }
}
