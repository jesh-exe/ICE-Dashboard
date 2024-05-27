import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { environment } from "environments/environment";
import { Docker } from "../container-model/docker";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Jobs } from "../container-model/Jobs";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable({
  providedIn: "root",
})
export class containerService {
  public url: string = environment.baseURL + "/compute/";
  constructor(
    public http: HttpClient,
    private router: Router,
    private logService: IceLogService,
    private _clipboardService: ClipboardService,
    private toast: HotToastService,
    private toastr: ToastrService
  ) {}
  deleteAContainer(jobName) {
    this.logService.debug("Delete Pod Called");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then((result) => {
      if (result.value) {
        this.deleteContainer(jobName)
          .pipe(
            this.toast.observe({
              loading: "Deleting container Instance...",
              success: "container Instance is deleted",
              error: "There is an issue to delete instance.",
            })
          )
          .subscribe(
            (data: any) => {
              this.logService.info("Done" + JSON.stringify(data));
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                html:
                  "Your Container has been deleted. <br/><br/> <b>" +
                  data.duration +
                  "</span> ",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              // setTimeout(() => this.getList(), 2000);
              setTimeout(() => this.router.navigate(["/container/jobs"]), 2000);
            },
            (err) => {
              this.logService.error(JSON.stringify(err));
              this.router.navigate(["**"]);
              Swal.fire({
                icon: "error",
                title: "Failed!",
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
          );
      }
    });
  }
  copytoClipboard(password) {
    this._clipboardService.copyFromContent(password);
    this.toastr.success("", "Copied!", {
      positionClass: "toast-top-right",
      toastClass: "toast ngx-toastr",
      closeButton: true,
      progressBar: true,
      timeOut: 1000,
    });
  }
  getOneContainerDetails(id): Observable<any> {
    return this.http.get<any>(this.url + "container/" + id);
  }

  getListOfImages(): Observable<any> {
    this.logService.info("Get List Of Images " + this.url + "images");
    return this.http.get<any>(this.url + "images");
  }

  deleteContainer(jobName: string): Observable<any> {
    return this.http.delete<any>(this.url + "container?id=" + jobName);
  }

  createContainer(docker: Docker): Observable<any> {
    this.logService.debug("Docker Container running " + JSON.stringify(docker));
    return this.http.post<any>(this.url + "container", docker);
  }

  getLogs(jobName): Observable<string> {
    const headers = new HttpHeaders().set("Content-Type", "application/text");
    const parameters = new HttpParams().set("id", jobName);
    const options = { params: parameters, headers: headers };
    this.logService.info("Get pods Info " + this.url + "logs?id=" + jobName);
    return this.http.get<string>(`${this.url}logs`, options);
  }

  getListOfPods(): Observable<any[]> {
    this.logService.info("get List Of Pods " + this.url + "container/");
    return this.http.get<any[]>(this.url + "container");
  }
  just = {
    jobName: "pallavi-pod-dttf5",
    createdDate: "01-11-2023 05:52:18",
    imageName: "hub.bio.pune.cdac.in/proxy/ubuntu",
    command:
      "-c while true; do echo Welcome to ICE Compute new pods ; sleep 10;done",
    cpu: "1000",
    memory: "1",
    state: "Running",
    minOld: "2023-11-01T05:52:18Z",
    password: null,
    type: "pod",
  };
}
