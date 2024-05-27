import { Injectable } from "@angular/core";
import { Name } from "app/ice/admin/user/user-models/name";
import { UserProfile } from "app/ice/admin/user/user-models/user-profile";
import { KeycloakService } from "keycloak-angular";
import { ToastrService } from "ngx-toastr";
import { connect, StringCodec } from "nats.ws";
import { IceLogService } from "./ice-log.service";
import { environment } from "environments/environment";
import { BehaviorSubject } from "rxjs";
interface notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}
@Injectable()
export class WebsocketService {
  public user: UserProfile;
  public url: string = environment.websocketUrl;
  public onApiDataChange: BehaviorSubject<any>;
  public onTimeLineDataChange: BehaviorSubject<any>;
  public apiData: any = [];

  constructor(
    private toastr: ToastrService,
    private keycloak: KeycloakService,
    private logService: IceLogService
  ) {
    this.logService.debug("Websocket is loged");
    this.onApiDataChange = new BehaviorSubject("");
    this.onTimeLineDataChange = new BehaviorSubject("");
    //this.send();
  }
  async send() {
    this.keycloak
      .getKeycloakInstance()
      .loadUserInfo()
      .then((son) => {
        this.user = new UserProfile();
        this.user.name = new Name();
        this.user.name.firstName = son["given_name"];
        this.user.name.lastName = son["family_name"];
        this.user.email = son["email"];
        this.user.userName = son["preferred_username"];
      })
      .catch((err) => {
        this.logService.error(err);
      });
    this.logService.debug("websocket going to start");

    const nc = await connect({
      servers: [this.url + "/wss/"],
    });
    this.logService.debug("websocket is connected");
    const sc = StringCodec();

    const sub = nc.subscribe(`activity.notify.${this.user.userName}`);
    (async () => {
      for await (const m of sub) {
        this.logService.debug("Received from NATS");
        this.logService.debug(
          `NATS:[${sub.getProcessed()}]: ${sc.decode(m.data)}`
        );
        // this.toastService.show(``, {
        //   delay: 2000,
        //   autohide: true
        // });
        //
        this.toastr.success(`${sc.decode(m.data)}`, "Success!", {
          positionClass: "toast-top-right",
          toastClass: "toast ngx-toastr",
          closeButton: true,
          progressBar: true,
          timeOut: 10000,
        });
        this.onApiDataChange.next(`${sc.decode(m.data)}`);
      }
      this.logService.debug("subscription closed");
    })();
    const subTimeLine = nc.subscribe(`Timeline.*`);
    (async () => {
      for await (const m1 of subTimeLine) {
        this.logService.debug("Received from NATS");
        this.logService.debug(
          "Timeline msg" +
            `[${subTimeLine.getProcessed()}]: ${sc.decode(m1.data)}`
        );
        this.onTimeLineDataChange.next(`${sc.decode(m1.data)}`);
      }
      this.logService.debug("subscription closed");
    })();
    return true;
  }
}
