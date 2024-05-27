import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { Curation } from "../niot-models/Curation";
import { CurationDto } from "../niot-models/CurationDto";
import { organismResponse } from "../niot-models/organismResponse";
import { WGSCurationDto } from "../niot-models/WGSCurationDto";

@Injectable({
  providedIn: "root",
})
export class NiotServiceService {
  private niotUrl = environment.baseURL + "/niot/";
  private blastUrl = environment.baseURL + "/compute/blast";
  private addProjectDetailUrl = environment.baseURL + "/niot/project/add";
  private getProjectListUrl =
    environment.baseURL + "/niot/project/getAllProjectNamesByUser";
  private addSampleDetailsUrl = environment.baseURL + "/niot/sample/add";
  private getSampleListUrl =
    environment.baseURL + "/niot/sample/getAllSampleNames";
  private addSequenceDetailsUrl =
    environment.baseURL + "/niot/sequence/addSequence";
  private addNGSSequenceDetailsUrl =
    environment.baseURL + "/niot/NGSSequence/addNGSSequence";
  private getProjectDetailsUrl =
    environment.baseURL + "/niot/project/getAllProjectsByUser";
  private deleteProjectbyId = environment.baseURL + "/niot/project/delete/";
  private enumtype = environment.baseURL + "/niot/enum/getAll";
  private getProjectById = environment.baseURL + "/niot/project/find/";
  private updateProjectDetailUrl = environment.baseURL + "/niot/project/update";
  private getMembersName = environment.baseURL + "/users/";
  private updateSampleDetailUrl = environment.baseURL + "/niot/sample/update";
  private updateSequenceDetailUrl =
    environment.baseURL + "/niot/sequence/updateSequence";
  private getSampleDetailsUrl =
    environment.baseURL + "/niot/sample/getSamplesByUserId";
  private getSampleById = environment.baseURL + "/niot/sample/getSampleById/";
  private getProjectDetailsToShow = environment.baseURL + "/niot/project/find/";
  private getSampleDetailsToShow =
    environment.baseURL + "/niot/sample/getSampleByProjectId/ ";
  private getSequenceDetailsbySampleId =
    environment.baseURL + "/niot/sequence/getAllSequencesBySampleId/ ";
  private getAllSequenceDetails =
    environment.baseURL + "/niot/sequence/getSequencesByUserId";
  private deleteSamplebyId = environment.baseURL + "/niot/sample/delete/";
  private deleteSequencebyId =
    environment.baseURL + "/niot/sequence/deleteSequenceById/";
  private getSequenceById =
    environment.baseURL + "/niot/sequence/getSequenceById/";
  private getSearchParameters =
    environment.baseURL + "/niot/sequence/getSearchParameters";
  private searchSequence = environment.baseURL + "/niot/sequence/search";
  private getAcceptedSequences =
    environment.baseURL + "/niot/sequence/getAcceptedSequences";
  private getSampleByProjectId =
    environment.baseURL + "/niot/sequence/getSampleByProjectId/";
  private getTempAccNumber =
    environment.baseURL + "/niot/sequence/getTemporaryAccessionNumber/";
  private getFileUrl = environment.baseURL + "/storage/submit/upload";
  public results_url: string =
    environment.baseURL + "/storage/workflow/blastdownload/";
  public fileDownloadUri = environment.baseURL + "/storage/submit/download/";
  private getNGSTempAccNumber =
    environment.baseURL + "/niot/NGSSequence/getTemporaryAccessionNumber/";
  private getNgsSequenceById =
    environment.baseURL + "/niot/NGSSequence/getNGSSequenceById/";
  private updateNgsSequenceDetailUrl =
    environment.baseURL + "/niot/NGSSequence/updateNGSSequence";
  private getAllNgsSequenceDetails =
    environment.baseURL + "/niot/NGSSequence/getSequenceByUserId";
  private deleteNgsSequencebyId =
    environment.baseURL + "/niot/NGSSequence/deleteById/";

  private getNgsSequenceDetailsbySampleId =
    environment.baseURL + "/niot/NGSSequence/getSequenceNGSListBy/ ";

  private checkprojectExists =
    environment.baseURL + "/niot/project/nameExists/";

  private checksampleExists = environment.baseURL + "/niot/sample/nameExists/";

  constructor(private http: HttpClient) {}

  getAllWGSCurationList() {
    return this.http.get(
      this.niotUrl + "ngsCuration/getAllIgnoringMyNgsSequence"
    );
  }
  getOneWGSCuration(id) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>(
      this.niotUrl + "ngsCuration/getNGSCurationById/" + id
    );
  }
  openForWGSCuration(id) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<Curation>(this.niotUrl + "ngsCuration/view", {
      params: queryParams,
    });
  }
  AcceptOrRejectOrRevokeWGSCuration(data: WGSCurationDto) {
    return this.http.put<WGSCurationDto>(
      this.niotUrl + "NGSSequence/curate",
      data
    );
  }
  getOrganismNameResults(data: string): Observable<organismResponse> {
    return this.http.get<organismResponse>(
      this.niotUrl + "organism/getByText/" + data
    );
  }

  getOneBlastDetails(containerName) {
    return this.http.get(this.blastUrl + "/output/" + containerName);
  }
  getResults(resultsPath): Observable<any> {
    // console.log(resultsPath);
    return this.http.get(this.results_url + resultsPath, {
      responseType: "text",
    });
  }

  getDBList() {
    return this.http.get(this.blastUrl + "/dblist");
  }
  addBlastSearch(body) {
    return this.http.post(this.blastUrl, body);
  }

  listBlastSearch() {
    return this.http.get(this.blastUrl + "/status");
  }

  getAllCurationList() {
    return this.http.get(this.niotUrl + "curation/getAllIgnoringMySequence ");
  }
  getOneCuration(id) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>(this.niotUrl + "curation/getCurationById", {
      params: queryParams,
    });
  }
  openForCuration(id) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<Curation>(this.niotUrl + "curation/view", {
      params: queryParams,
    });
  }
  AcceptOrRejectOrRevoke(data: CurationDto) {
    return this.http.put<CurationDto>(this.niotUrl + "sequence/curate", data);
  }
  addProjectDetails(body) {
    let httpheader = new HttpHeaders({});
    return this.http.post<any>(this.addProjectDetailUrl, body, {
      headers: httpheader,
    });
  }

  getProjectList() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getProjectListUrl, {
      headers: httpheader,
    });
  }

  addSampleDetails(body) {
    console.log(body, "body");
    let httpheader = new HttpHeaders({});
    return this.http.post<any>(this.addSampleDetailsUrl, body, {
      headers: httpheader,
    });
  }

  showProjectDetails(projectId) {
    // console.log("in service", projectId);
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getProjectDetailsToShow + projectId, {
      headers: httpheader,
    });
  }

  showSampleDetailByProjectId(projectId) {
    console.log("in sample details", projectId);
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getSampleDetailsToShow + projectId, {
      headers: httpheader,
    });
  }
  showSequenceDetailBySampleId(sampleId) {
    console.log("in sequence service", sampleId);
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getSequenceDetailsbySampleId + sampleId, {
      headers: httpheader,
    });
  }

  getSampleList() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getSampleListUrl, {
      headers: httpheader,
    });
  }

  addSequenceDetails(body) {
    console.log(body, "body");
    let httpheader = new HttpHeaders({});
    
    return this.http.post<any>(this.addSequenceDetailsUrl, body, {
      headers: httpheader,
    });
  }

  getProjectDetails() {
    let httpheader = new HttpHeaders({});

    return this.http.get<any>(this.getProjectDetailsUrl, {
      headers: httpheader,
    });
  }
  deleteProjectById(item) {
    console.log("item", item);
    return this.http.delete<any>(this.deleteProjectbyId + item);
  }

  getAllEnumType() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.enumtype, {
      headers: httpheader,
    });
  }

  projectByID(id) {
    return this.http.get<any>(this.getProjectById + id);
  }

  sampleByID(id) {
    return this.http.get<any>(this.getSampleById + id);
  }

  updateProjectDetails(body) {
    let httpheader = new HttpHeaders({});
    return this.http.put<any>(this.updateProjectDetailUrl, body, {
      headers: httpheader,
    });
  }

  getMembersNames() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getMembersName, {
      headers: httpheader,
    });
  }

  updateSampleDetails(body) {
    console.log(body);
    let httpheader = new HttpHeaders({});
    return this.http.put<any>(this.updateSampleDetailUrl, body, {
      headers: httpheader,
    });
  }

  updateSequenceDetails(body) {
    let httpheader = new HttpHeaders({});
    return this.http.put<any>(this.updateSequenceDetailUrl, body, {
      headers: httpheader,
    });
  }

  getSampleDetails() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getSampleDetailsUrl, {
      headers: httpheader,
    });
  }

  getSequenceDetails() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getAllSequenceDetails, {
      headers: httpheader,
    });
  }

  deleteSequenceById(item) {
    return this.http.delete<any>(this.deleteSequencebyId + item);
  }

  deleteSampleById(item) {
    return this.http.delete<any>(this.deleteSamplebyId + item);
  }
  sequenceId(id) {
    return this.http.get<any>(this.getSequenceById + id);
  }

  getSearchParam() {
    return this.http.get<any>(this.getSearchParameters);
  }

  searchSeq(body) {
    console.log("body", body);

    return this.http.post<any>(this.searchSequence, body);
  }

  getApprovedSequences() {
    return this.http.get<any>(this.getAcceptedSequences);
  }

  getSampleListByProjectId(projectId) {
    let httpheader = new HttpHeaders({});
    console.log("projectid", projectId);
    return this.http.get<any>(this.getSampleByProjectId + projectId, {
      headers: httpheader,
    });
  }

  getTempAccNo(value) {
    //  console.log("value", value);
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getTempAccNumber + value, {
      headers: httpheader,
    });
  }
  uploadData(selectedFile, tempAccesionNumber) {
    console.log(selectedFile, "selectedFIle");
    var formData: FormData = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("files", selectedFile[i], selectedFile[i].name);
    }
    formData.append("tempAccessionNumber", tempAccesionNumber);
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    let httpheader = new HttpHeaders({});
    return this.http.post<any>(this.getFileUrl, formData, {
      headers: httpheader,
    });
  }

  // fileDownload(path) {
  //   console.log(path,"path")
  //    this.http.get<any>(this.fileDownloadUri ,path)
  //   //  .subscribe((response) => {
  //   //   console.log("response", response);
  //   //  // window.open(response, "_blank");
  //   // });
  //   // return this.http.get<any>(this.fileDownloadUri + path, {
  //   //   headers: httpheader,
  //   // });
  // }

  addNGSSequenceDetails(payload: any) {
    let httpheader = new HttpHeaders({});
    return this.http.post<any>(this.addNGSSequenceDetailsUrl, payload, {
      headers: httpheader,
    });
  }

  getNGSTempAccNo(event: any) {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getNGSTempAccNumber + event, {
      headers: httpheader,
    });
  }

  ngsSequenceId(id) {
    return this.http.get<any>(this.getNgsSequenceById + id);
  }

  updateNgsSequenceDetails(body) {
    let httpheader = new HttpHeaders({});
    return this.http.put<any>(this.updateNgsSequenceDetailUrl, body, {
      headers: httpheader,
    });
  }

  getNgsSequenceDetails() {
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getAllNgsSequenceDetails, {
      headers: httpheader,
    });
  }

  deleteNgsSequenceById(item: any) {
    return this.http.delete<any>(this.deleteNgsSequencebyId + item);
  }

  showNgsSequenceDetailBySampleId(sampleId: any) {
    console.log("in ngs sequence service", sampleId);
    let httpheader = new HttpHeaders({});
    return this.http.get<any>(this.getNgsSequenceDetailsbySampleId + sampleId, {
      headers: httpheader,
    });
  }

  projectNameExist(name: any) {
    return this.http.get<any>(this.checkprojectExists + name);
  }

  sampleNameExist(name: any) {
    return this.http.get<any>(this.checksampleExists + name);
  }
}
