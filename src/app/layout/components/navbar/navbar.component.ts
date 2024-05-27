// import isOnline from "is-online";
import { environment } from "environments/environment";
import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "app/auth/service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { CoreMediaService } from "@core/services/media.service";
import { UserProfile } from "app/ice/admin/user/user-models/user-profile";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Name } from "app/ice/admin/user/user-models/name";
import { IceLogService } from "app/ice/services/ice-log.service";
// import { CheckIsOnlineService } from "app/ice/services/check-is-online.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy {
  public horizontalMenu: boolean;
  public hiddenMenu: boolean;
  checkonoff: boolean;
  public coreConfig: any;
  public currentSkin: string;
  public prevSkin: string;
  //public currentUser: userProfile;
  // public isOnline = true;
  public languageOptions: any;
  public navigation: any;
  public selectedLanguage: any;

  @HostBinding("class.fixed-top")
  public isFixed = false;

  @HostBinding("class.navbar-static-style-on-scroll")
  public windowScrolled = false;

  // Add .navbar-static-style-on-scroll on scroll using HostListener & HostBinding
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop > 100) &&
      this.coreConfig.layout.navbar.type == "navbar-static-top" &&
      this.coreConfig.layout.type == "horizontal"
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreMediaService} _coreMediaService
   * @param {MediaObserver} _mediaObserver
   * @param {TranslateService} _translateService
   */
  user: UserProfile;
  // public hideValue: boolean = true;
  // public toastStyle: object = {};
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private _coreMediaService: CoreMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    public _translateService: TranslateService,
    private keycloak: KeycloakService,
    private logService: IceLogService // private iceOnlineService: CheckIsOnlineService
  ) {
    this.keycloak
      .getKeycloakInstance()
      .loadUserInfo()
      .then((son) => {
        this.user = new UserProfile();
        this.user.name = new Name();
        this.user.name.firstName = son["given_name"];
        this.user.name.lastName = son["family_name"];
        this.user.email = son["email"];
        this.logService.debug("I am Logged in");
      })
      .catch((err) => {
        this.logService.error(err);
      });
    this.languageOptions = {
      en: {
        title: "English",
        flag: "in",
      },
      hi: {
        title: "Hindi",
        flag: "in",
      },
      mr: {
        title: "Marathi",
        flag: "in",
      },
      ta: {
        title: "Tamil",
        flag: "in",
      },
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // setInterval(async () => {
    //   var res = this.iceOnlineService.iceOnline;
    //   // console.log(res);
    //   if (res) {
    //     this.isOnline = true;
    //     // console.log("user is  online");
    //   } else {
    //     this.isOnline = false;
    //     // console.log("user is offline");
    //   }
    // }, 1000);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  /**
   * Set the language
   *
   * @param language
   */
  setLanguage(language): void {
    // Set the selected language for the navbar on change
    this.selectedLanguage = language;

    // Use the selected language id for translations
    this._translateService.use(language);

    this._coreConfigService.setConfig(
      { app: { appLanguage: language } },
      { emitEvent: true }
    );
  }

  /**
   * Toggle Dark Skin
   */
  toggleDarkSkin() {
    // Get the current skin

    this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.currentSkin = config.layout.skin;
      });

    // Toggle Dark skin with prevSkin skin
    this.prevSkin = localStorage.getItem("prevSkin");

    if (this.currentSkin === "dark") {
      this._coreConfigService.setConfig(
        { layout: { skin: this.prevSkin ? this.prevSkin : "default" } },
        { emitEvent: true }
      );
    } else {
      localStorage.setItem("prevSkin", this.currentSkin);
      this._coreConfigService.setConfig(
        { layout: { skin: "dark" } },
        { emitEvent: true }
      );
    }
  }

  /**
   * Logout method
   */
  async logout() {
    localStorage.removeItem("currentUser");
    this.keycloak.logout(environment.basePath + "/home");

    // this._router.navigate(['/pages/authentication/login-v2']);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.logService.debug(this.languageOptions);
    // get the currentUser details from localStorage
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Subscribe to the config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
        this.horizontalMenu = config.layout.type === "horizontal";
        this.hiddenMenu = config.layout.menu.hidden === true;
        this.currentSkin = config.layout.skin;

        // Fix: for vertical layout if default navbar fixed-top than set isFixed = true
        if (this.coreConfig.layout.type === "vertical") {
          setTimeout(() => {
            if (this.coreConfig.layout.navbar.type === "fixed-top") {
              this.isFixed = true;
            }
          }, 0);
        }
      });

    // Horizontal Layout Only: Add class fixed-top to navbar below large screen
    if (this.coreConfig.layout.type == "horizontal") {
      // On every media(screen) change
      this._coreMediaService.onMediaUpdate
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
          const isFixedTop = this._mediaObserver.isActive("bs-gt-xl");
          if (isFixedTop) {
            this.isFixed = false;
          } else {
            this.isFixed = true;
          }
        });
    }

    // Set the selected language from default languageOptions
    this.selectedLanguage = _.find(this.languageOptions, {
      id: this._translateService.currentLang,
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
