import { date } from "./../../admin/user/user-models/date";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { FileShare } from "../file/model/file-share";
import { ListOfFiles } from "../file/model/listOfFiles";

@Injectable({
  providedIn: "root",
})
export class FileShareService {
  private folderUrl = environment.baseURL + "/share/files";
  private getData = environment.baseURL + "/share/fileById";
  private sharewithmeurl = environment.baseURL + "/storage/sharedwithme";
  private getUserList = environment.baseURL + "/share/sharedwithmegetlist";
  // private getFileListofUser = environment.baseURL + "/storage/sharedwithme/";
  private getFilesofFolder =
    environment.baseURL + "/storage/sharedwithme/list/";
  private url = environment.baseURL + "/share/";

  uploadShareList(
    creationDate,
    filePath,
    sharedWithUsers,
    expirationDate,
    directory
  ) {
    let httpheader = new HttpHeaders({});
    const body = {
      filePath,
      sharedWithUsers,
      creationDate,
      expirationDate,
      directory,
    };
    console.log("the body", directory);
    return this.http.post<any>(this.folderUrl, body, {
      headers: httpheader,
    });
  }

  getAllDetails(path) {
    var httpParams = new HttpParams();
    httpParams = httpParams.set("fileId", path);
    console.log("in service path", path);
    return this.http.get<any>(this.getData, { params: httpParams });
  }

  getShareWithMeList() {
    return this.http.get<any>(this.sharewithmeurl);
  }

  getShareWithMeFilesList(url) {
    console.log("urlss", url);
    return this.http.get<any>(url);
  }

  calingSharedWithMePeopleList() {
    return this.http.get<any>(this.getUserList);
  }
  calingSharedWithMeFileList(owner): Observable<any> {
    console.log("in normal share service", owner);
    return this.http.get<any>(this.sharewithmeurl + "/" + owner);
  }

  deleteSharedFile(fileName: string) {
    console.log("filename", fileName);
    let urlDelete = this.url + fileName;
    console.log("urlDelete", urlDelete);
    return this.http.delete<any>(urlDelete);
  }

  constructor(private http: HttpClient) {}
}
