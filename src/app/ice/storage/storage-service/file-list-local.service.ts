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
export class FileListLocalService {
  // public rows: any;

  private baseUrl = environment.baseURL + "/storage/list/";

  // private ipis = "http://10.208.27.72:8082/share/files";

  constructor(private http: HttpClient, private logService: IceLogService) {}

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
    console.log("called GET method");
    var presignedUrl = environment.baseURL + "/storage/share/sign/" + fileName;
    console.log(presignedUrl);
    return this.http.get<any>(presignedUrl).subscribe((response) => {
      console.log("response", response.presignedurl);
      window.open(response.presignedurl, "_blank");
    });
  }
  getPresignedUrlforDownload(fileName: string): any {
    console.log("called GET method");
    var presignedUrl = environment.baseURL + "/storage/sign/" + fileName;
    console.log(presignedUrl);
    return this.http.get<any>(presignedUrl).subscribe((response) => {
      console.log("response", response.presignedurl);
      window.open(response.presignedurl, "_blank");
    });
  }

  deleteFile(fileName: string): Observable<ListOfFiles> {
    // console.log("file deleting", fileName);
    let url = environment.baseURL + "/storage/delete/" + fileName;
    return this.http.delete<ListOfFiles>(url);
  }

  getlist(fileDownloadUri: string): Observable<ListOfFiles> {
    let url = fileDownloadUri;
    return this.http.get<ListOfFiles>(url);
    // .subscribe(response=>{
    //   console.log("Test 1",response)
    // })
  }

  // getSharingData(user: any) {
  //   let url = this.ipis;
  //   return this.http.put(url, user).subscribe((data) => {
  //     console.log("data", data);
  //   });
  //   console.log("in file list service");
  //   console.log("the user", user);
  // }
}
