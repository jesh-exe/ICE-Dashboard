import { Injectable } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { Data } from "../vcf-models/data";
import { snpRequestData } from "../vcf-models/SnpRequestData";
import { UploadModel } from "../vcf-models/UploadModel";
import { FilterByCondition } from "../vcf-models/filterByCondition";
import { CustomPopulationRequestData } from "../vcf-models/customPopulationRequestData";
import { FilterByInfoTags } from "../vcf-models/filterByInfoTags";
import { functionalAnnotation } from "../vcf-models/funtionalAnnotation";
import { SetAnalysisOnPopulation } from "../vcf-models/setAnalysisOnPopulation";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VcfService {
  public url: string = environment.baseURL + "/vcf-analysis/";
  public urlUpload: string = environment.baseURL + "/vcf-upload/";
  public getfileurl: string =
    environment.baseURL + "/storage/getMetadataByExt/";
  public isJobOpen: Boolean;
  public onSelectedJobChange: BehaviorSubject<any>;
  public onJobOpenChange: BehaviorSubject<Boolean>;

  outputFileFormatList = [
    {
      id: 1,
      name: "outputfileformat",
      value: "vcf",
      label: ".vcf",
      selected: true,
    },
    {
      id: 2,
      name: "outputfileformat",
      value: "csv",
      label: ".csv",
      selected: false,
    },
    {
      id: 3,
      name: "outputfileformat",
      value: "tsv",
      label: ".tsv",
      selected: false,
    },
  ];

  constructor(private http: HttpClient, private logService: IceLogService) {
    this.isJobOpen = false;
    this.onSelectedJobChange = new BehaviorSubject([]);
    this.onJobOpenChange = new BehaviorSubject(false);
  }

  getPresignedUrl(fileName: string): any {
    var uri = environment.baseURL + "/storage/sign/" + fileName;
    return this.http
      .get<any>(uri)
      .pipe(mergeMap((character) => this.http.get(character.presignedurl)));
  }

  submitSetAnalysisOnPopulation(data: SetAnalysisOnPopulation) {
    debugger;
    this.logService.info(
      "Get VCF SetAnalysisOnPopulation Service is called through " +
        this.url +
        "common" +
        JSON.stringify(data)
    );
    return this.http.post<SetAnalysisOnPopulation>(this.url + "common", data);
  }

  submitCustomPopulation(data: CustomPopulationRequestData) {
    this.logService.info(
      "Get VCF CustomPopulation Service is called through " +
        this.url +
        "process/CustomePopTAG" +
        JSON.stringify(data)
    );
    return this.http.post<CustomPopulationRequestData>(
      this.url + "process/CustomePopTAG",
      data
    );
  }
  submitFilterByInfoTags(data: FilterByInfoTags) {
    this.logService.info(
      "Get VCF FilterByInfoTags Service is called through " +
        this.url +
        "process/TAG" +
        JSON.stringify(data)
    );
    return this.http.post<FilterByInfoTags>(this.url + "process/TAG", data);
  }
  getFileThroughMetadataViaStorage(filetype) {
    this.logService.info(
      "Get VCF File Service is called through " + this.getfileurl + filetype
    );
    return this.http.get<any>(this.getfileurl + filetype);
  }

  submitLoadingData(data: UploadModel) {
    this.logService.info(
      "Submit Data Service is called through" +
        this.urlUpload +
        "process" +
        JSON.stringify(data)
    );
    return this.http.post<any>(this.urlUpload + "process", data);
  }

  getCollection(): Observable<any> {
    this.logService.info("Get Collection called: " + this.url);
    return this.http.get<any>(this.url);
  }

  getSamples(collectionselected): Observable<Data> {
    this.logService.info(
      "Get Sample Service is called through " + this.url + collectionselected
    );
    return this.http.get<Data>(this.url + collectionselected);
  }

  getSNPResponse(Data: snpRequestData): Observable<any> {
    this.logService.info(
      "Get VCF SNP Response Service is called through " +
        this.url +
        "snp" +
        JSON.stringify(Data)
    );
    return this.http.post<any>(this.url + "snp", Data);
  }
  getFilterByConditionResponse(Data: FilterByCondition): Observable<any> {
    this.logService.info(
      "Get Filter By Condition Response Service is called through " +
        this.url +
        "info/TAGByCondition" +
        JSON.stringify(Data)
    );
    return this.http.post<any>(this.url + "info/TAGByCondition", Data);
  }
  getFunctionalAnnotationResponse(Data: functionalAnnotation): Observable<any> {
    this.logService.info(
      "Get Functional Annotation Response Service is called through " +
        this.url +
        "ann" +
        JSON.stringify(Data)
    );
    return this.http.post<any>(this.url + "ann", Data);
  }

  getTags(collectionselected: string): Observable<any> {
    this.logService.info(
      "Get VCF Info Key Service is called through " +
        this.url +
        "info/" +
        collectionselected
    );
    return this.http.get<any>(this.url + "info/" + collectionselected);
  }
  checkGT(collectionName) {
    return this.http.get<any>(this.url + "checkGT/" + collectionName);
  }
  checkDP(collectionName) {
    return this.http.get<any>(this.url + "checkDP/" + collectionName);
  }
  getStatusOfUpload(): Observable<any> {
    this.logService.info("Get Status Of Upload: " + this.urlUpload + "status");
    return this.http.get<any>(this.urlUpload + "status");
  }
  getFAValues(): Observable<any> {
    this.logService.info("Get FA Values: " + this.url + "fa");
    return this.http.get<any>(this.url + "fa");
  }
  checkDuplicate(sample: string, popcode): boolean {
    var result = true;
    popcode.forEach((value: string[], key: string) => {
      if (value.includes(sample)) {
        result = false;
      }
    });
    return result;
  }

  isCaseSensitiveRegExp(input: string): boolean {
    const pattern = /([A-Z]+[0-9]+)/;
    return pattern.test(input);
  }
  getallJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "job/resultByUser");
  }

  selectedJob(id) {
    if (id !== undefined) {
      this.onSelectedJobChange.next(id);
    }
  }

  openJob(id) {
    this.isJobOpen = true;
    this.onJobOpenChange.next(this.isJobOpen);
    this.selectedJob(id);
  }
}
