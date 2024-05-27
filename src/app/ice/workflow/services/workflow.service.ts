import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { pipeline } from "../workflow-models/pipeline";
import { listOfRuns } from "../workflow-models/listOfRuns";
import { KeycloakService } from "keycloak-angular";

@Injectable({
  providedIn: "root",
})
export class WorkflowService {
  public url: string = environment.baseURL + "/pipeline/";
  public results_url: string = environment.baseURL + "/storage/workflow";
  public onSelectedRunChange: BehaviorSubject<any>;
  public onRunOpenChange: BehaviorSubject<Boolean>;
  public onResultChange: BehaviorSubject<any>;
  public isRunOpen: Boolean;
  public url_Test: string = environment.baseURL + "/compute/";
  public apiData: any;

  constructor(
    public http: HttpClient,
    private logService: IceLogService,
    protected readonly keycloak: KeycloakService
  ) {
    this.isRunOpen = false;
    this.onSelectedRunChange = new BehaviorSubject([]);
    this.onResultChange = new BehaviorSubject([]);
    this.onRunOpenChange = new BehaviorSubject(false);
  }
  downloadParams(data, filename) {
    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(jsonBlob);
    const anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
  async getData(url) {
    let token = await this.keycloak.getToken();
    return this.http
      .get(url + "?token=" + token, { responseType: "text" })
      .toPromise();
  }
  loadResult(value) {
    if (value !== undefined) {
      this.onResultChange.next(value);
    }
  }
  getResults(resultsPath): Observable<any> {
    let path;
    if (Array.from(resultsPath)[0] !== "/") {
      path = "/" + resultsPath;
    } else {
      path = resultsPath;
    }
    return this.http.get<any>(this.results_url + path);
  }
  getListOfRuns(): Observable<listOfRuns[]> {
    this.logService.info("Get List of Runs " + this.url + "history/");
    return this.http.get<listOfRuns[]>(this.url + "history/");
  }
  getOneRunDetails(container): Observable<any[]> {
    return this.http.get<any[]>(this.url + "history/" + container);
  }

  selectedJob(id) {
    if (id !== undefined) {
      this.onSelectedRunChange.next(id);
    }
  }
  loadContent(msgResponse) {
    this.openJob(msgResponse);
  }
  openJob(id) {
    this.isRunOpen = true;
    this.onRunOpenChange.next(this.isRunOpen);
    this.selectedJob(id);
  }
  getPipelines(): Observable<any> {
    this.logService.info("Get List of Pipeline " + this.url);
    return this.http.get<any>(this.url);
  }
  getJson(name: string): Observable<any> {
    this.logService.info("Get form details " + this.url + "schema/" + name);
    return this.http.get<any>(this.url + "schema/" + name);
  }
  getOnePipelineIntro(name: string) {
    this.logService.info("Get Intro Details " + this.url + "intro/" + name);
    return this.http.get(this.url + "intro/" + name, {
      responseType: "text",
    });
  }
  getOnePipelineDefaultParameter(name: string) {
    this.logService.info(
      "Get Default Param Details " + this.url + "inputparam/" + name
    );
    return this.http.get(this.url + "inputparam/" + name);
  }
  submitAPipeline(request: pipeline) {
    this.logService.info(
      "Submit details " + this.url + " " + JSON.stringify(request)
    );
    return this.http.post<any>(this.url, request);
  }
}
