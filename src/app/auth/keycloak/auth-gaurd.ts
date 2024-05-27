import { environment } from "environments/environment";
import { Injectable } from "@angular/core";

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";
import { UserProfile } from "app/ice/admin/user/user-models/user-profile";
import { AuthenticationService } from "../service";
import { Role } from "../models/Role";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { IceLogService } from "app/ice/services/ice-log.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected authservice: AuthenticationService,
    protected coreMenuService: CoreMenuService,
    public logService: IceLogService
  ) {
    super(router, keycloak);
  }
  public currentUser: UserProfile;
  public menu: any;

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    // console.debug("Auth:",state.url)
    if (!this.authenticated) {
      this.logService.debug("Auth:" + environment.basePath + state.url);
      await this.keycloak.login({
        redirectUri: environment.basePath + state.url,
      });
      this.coreMenuService.setMenuChanged();
    }
    
    this.currentUser = new UserProfile();
    this.currentUser.role = this.roles;
    // this.logService.debug(this.currentUser);
    let key = "main";
    this.menu = this.coreMenuService.getMenu(key);
    // this.logService.debug("I am in menu" + JSON.stringify(this.menu));
    this.menu.forEach(function (value) {
      if (value.id === "login") {
        value.hidden = true;
      }
    });
    console.log("Roles keycloak : " + this.roles);
    // console.log("menu", this.menu);
console.log("Rourter defined role",route.data.roles);
    // this.logService.debug("I am in" + JSON.stringify(this.menu));

    this.authservice.currentUserSubject.next(this.currentUser);

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    if (requiredRoles.some((role) => this.roles.includes(role))) {
      return true;
    } else {
      // navigate to unauthrorzed url
      this.router.navigate(["unauthorized"]);
    }
  }
}
