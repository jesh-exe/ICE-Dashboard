import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { listOfPods } from "../history-model/listOfPods";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  public url: string = environment.baseURL + "/compute/history/";
  public isJobOpen: Boolean;
  public onSelectedJobChange: BehaviorSubject<any>;
  public onJobOpenChange: BehaviorSubject<Boolean>;
  constructor(
    public http: HttpClient,
    private router: Router,
    private logService: IceLogService
  ) {
    this.isJobOpen = false;
    this.onSelectedJobChange = new BehaviorSubject([]);
    this.onJobOpenChange = new BehaviorSubject(false);
  }

  getListOfPods(): Observable<listOfPods[]> {
    this.logService.info("Get History list " + this.url);
    return this.http.get<listOfPods[]>(this.url);
  }
  getOnePodDetails(container): Observable<any[]> {
    return this.http.get<any[]>(this.url + container);
  }

  selectedJob(id) {
    if (id !== undefined) {
      this.onSelectedJobChange.next(id);
    }
  }
  loadContent(msgResponse) {
    this.openJob(msgResponse);
  }
  openJob(id) {
    this.isJobOpen = true;
    this.onJobOpenChange.next(this.isJobOpen);
    this.selectedJob(id);
  }
}
