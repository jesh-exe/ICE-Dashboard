import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UserProfile } from "app/ice/admin/user/user-models/user-profile";
import { Role } from "../models/Role";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public currentUser: Observable<UserProfile>;

  public currentUserSubject: BehaviorSubject<UserProfile>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<UserProfile>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): UserProfile {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  // get isAdmin() {
  //   return (
  //     this.currentUser && this.currentUserSubject.value.role === Role.Admin
  //   );
  // }

  /**
   *  Confirms if user is client
   */
  // get isClient() {
  //   return (
  //     this.currentUser && this.currentUserSubject.value.role === Role.Client
  //   );
  // }
}
