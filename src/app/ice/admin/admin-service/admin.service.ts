import { Injectable } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { UserList } from "app/ice/admin/user/user-models/userlist";
import { Message } from "../admin-models/Message";
import { Stats } from "../admin-models/stats";
import { ActivityMessageDTO } from "../admin-models/ActivityMessageDTO";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public url: string = environment.baseURL + "/users/";
  public statsUrl: string = environment.baseURL + "/storage-stats/";
  public TimeLineURL: string = environment.baseURL + "/timeline/";

  constructor(private http: HttpClient, private logService: IceLogService) {}

  getOneDetailTimeline(id): Observable<any> {
    return this.http.get<any>(this.TimeLineURL + id);
  }

  getTimeline(): Observable<ActivityMessageDTO> {
    return this.http.get<ActivityMessageDTO>(this.TimeLineURL);
  }
  getTotalStorageStatsListPerUser() {
    return this.http.get<Stats>(this.statsUrl + "getUsageList");
  }
  getTotalStorageStats() {
    return this.http.get<Stats>(this.statsUrl + "getUsageIce");
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(this.url + "count/");
  }

  getTimelineData(): Observable<Message> {
    return this.http.get<Message>(this.url + "timeline");
  }

  getData(data): Observable<UserList[]> {
    this.logService.debug("I am called");
    if (data) {
      return this.http.get<UserList[]>(this.url + data);
    }
    return this.http.get<UserList[]>(this.url);
  }
}
