import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { WebsocketService } from "app/ice/services/websocket.service";

// import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';

// Interface
class notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: "app-navbar-notification",
  templateUrl: "./navbar-notification.component.html",
})
export class NavbarNotificationComponent implements OnInit {
  public notifications: any[] = [];

  constructor(
    private websocket: WebsocketService,
    private logService: IceLogService
  ) {}
  readAll() {
    this.notifications = [];
  }
  ngOnInit(): void {
    this.websocket.onApiDataChange.subscribe((res) => {
      this.logService.debug(JSON.stringify(res));
      if (res) {
        this.notifications.push(res);
      }
      this.logService.debug("I am notified" + this.notifications);
    });
    // this.notifications.messages=this.websocket.notificationData;
  }
}
