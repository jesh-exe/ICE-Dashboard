import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IceLogService } from "app/ice/services/ice-log.service";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserProfile } from "../user-models/user-profile";
import { UserEdit } from "../user-models/userEdit";
import { UserList } from "../user-models/userlist";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { emailRequest } from "../user-models/emailRequest";
import { UserView } from "../user-models/userView";

@Injectable()
export class UsersService {
  public rows: Array<UserProfile>;
  public onUserListChanged: BehaviorSubject<any>;
  public composeEmailRef: boolean;
  public composeEmailChanged: BehaviorSubject<boolean>;

  public url: string = environment.baseURL + "/users/";

  genderList = [
    {
      id: 1,
      name: "gender",
      value: "MALE",
      label: "Male",
    },
    {
      id: 2,
      name: "gender",
      value: "FEMALE",
      label: "Female",
    },
    {
      id: 3,
      name: "gender",
      value: "TRANSGENDER",
      label: "Transgender",
    },
  ];

  constructor(
    public http: HttpClient,
    private router: Router,
    private logService: IceLogService
  ) {
    this.composeEmailChanged = new BehaviorSubject(false);
  }

  getAllUserNames() {
    console.log("in service");
    return this.http.get<any>(this.url + "getFullname");
  }

  assignRole(id, permission) {
    this.logService.debug("Assign Roles" + id + "&&" + permission);
    return this.http.post<any>(this.url + "addRole", {
      id: id,
      permission: permission,
    });
  }
  getAllRoles() {
    this.logService.debug("Get All Roles");
    return this.http.get<string[]>(this.url + "roles");
  }
  composeEmail(value) {
    this.logService.debug("Email compose Service called");
    this.composeEmailRef = value;
    this.composeEmailChanged.next(this.composeEmailRef);
    this.logService.debug(this.composeEmailRef);
  }

  emailexists(userEmail: string) {
    this.logService.debug("Email entered " + userEmail);
    return this.http.get(this.url + "existingEmail/" + userEmail, {
      observe: "response",
    });
  }
  userNameExists(userName: string) {
    this.logService.debug("Username entered " + userName);
    return this.http.get(this.url + "existingUser/" + userName, {
      observe: "response",
    });
  }
  phoneNumberExists(phoneNumber: number) {
    this.logService.debug("Contact Number entered " + phoneNumber);
    return this.http.get(this.url + "existingContactNumber/" + phoneNumber);
  }
  editUser(user: UserEdit, userid: string) {
    this.logService.debug("Edit User Clicked");
    this.logService.debug(JSON.stringify(user + userid));

    delete user.id;
    delete user.userName;
    delete user.contactNumber;
    this.logService.debug("Sending Data" + JSON.stringify(user));
    this.http.put<any>(this.url + userid, user).subscribe(
      (data) => {
        this.logService.info("Done" + JSON.stringify(data));
        Swal.fire("Saved!", "", "success");
        this.router.navigate(["/admin/user/table"]);
      },
      (error) => {
        this.logService.error(JSON.stringify(error));
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
  regUser(user: UserProfile) {
    this.logService.debug("Registering User" + JSON.stringify(user));
    return this.http.post<any>(this.url, user).subscribe(
      (data) => {
        this.logService.info(JSON.stringify(data));
      },
      (error) => {
        this.logService.error("" + JSON.stringify(error));
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
  enable(userid) {
    this.logService.debug("Activate User called" + userid);
    return this.http.get<any>(this.url + "activate/" + userid);
  }
  sendMail(data: emailRequest) {
    this.logService.debug("Send Mail to User called" + data);
    return this.http.post<any>(this.url + "sendmail", data);
  }
  disenable(userid) {
    this.logService.debug("DeActivate User called" + userid);
    return this.http.get<any>(this.url + "deactivate/" + userid);
  }

  deleteUser(id: number) {
    this.logService.debug("Delete User Called");
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
        this.logService.debug("I am in yes");
        this.logService.info("Delete Service Called" + this.url + id);
        this.http.delete<any>(this.url + id).subscribe(
          (data) => {
            this.logService.info("Done" + JSON.stringify(data));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your Data has been deleted.",
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
            this.router.navigate(["/admin/user/table"]);
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
  getUserByIdPreview(id: string) {
    this.logService.info(
      "Get User By Id Service Called through " + this.url + id
    );
    return this.http.get<UserView>(this.url + "preview/" + id).pipe(
      tap((_) => this.logService.debug("fetched data")),
      catchError(this.handleError<any[]>("Error in getting particular data"))
    );
  }
  getUserById(id: string) {
    this.logService.info(
      "Get User By Id Service Called through " + this.url + id
    );
    return this.http.get<UserEdit>(this.url + id).pipe(
      tap((_) => this.logService.debug("fetched data")),
      catchError(this.handleError<any[]>("Error in getting particular data"))
    );
  }
  getAllUsers(): Observable<UserList[]> {
    this.logService.info("Get All Users Service Called through " + this.url);
    return this.http.get<UserList[]>(this.url).pipe(
      tap((_) => this.logService.debug("fetched data")),
      catchError(this.handleError<any[]>("Error in getting all users"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      this.logService.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logService.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
