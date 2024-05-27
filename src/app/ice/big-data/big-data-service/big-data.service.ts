import { Injectable } from "@angular/core";
import { GatkModel } from "../big-data-models/gatkModel";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BigDataService {
  public url: string = environment.baseURL + "/compute/";
  constructor(public http: HttpClient, private logService: IceLogService) {}
  createJob(gatk: GatkModel): Observable<any> {
    this.logService.debug("Job running " + JSON.stringify(gatk));
    return this.http.post<any>(this.url + "spark/gatk", gatk);
  }
}
