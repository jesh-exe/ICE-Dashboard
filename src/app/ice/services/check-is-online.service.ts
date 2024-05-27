import { Injectable } from "@angular/core";
import isOnline from "is-online";
import { ToastrService } from "ngx-toastr";
import { IceLogService } from "./ice-log.service";
@Injectable({
  providedIn: "root",
})
export class CheckIsOnlineService {
  iceOnline: boolean = true;

  constructor(
    private toastr: ToastrService,
    private logService: IceLogService
  ) {}
  check() {
    setInterval(() => {
      let options = {
        timeout: 1000,
      };
      isOnline(options).then((status) => {
        if (status) {
          // console.log("u are online");
          this.iceOnline = true;
        } else {
          this.iceOnline = false;
          this.toastr.warning(`U are Offline`, "Warning!", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
            progressBar: true,
            timeOut: 1000,
          });
          // console.log("u are offline");
        }
      });
    }, 10000);
  }
  // this.checkStatus.checkIt().then((res) => { console.log("i am printing this", res) });
  async checkIt() {
    var flag;
    setInterval(() => {
      isOnline().then((status) => {
        if (status) {
          this.logService.debug("u are online");
          flag === true;
          return status;
        } else {
          this.logService.debug("u are offline");
          flag === false;
          return status;
        }
      });
    }, 10000);
    return flag;
  }
  //return flag;
}
