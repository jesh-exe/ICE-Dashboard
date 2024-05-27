import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";
import { coreConfig } from "app/app-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { initializeKeycloak } from "./auth/keycloak/keycloak-init";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { FileUploadModule } from "ng2-file-upload";
import { FileUploadingComponent } from "app/ice/storage/file-uploading/file-uploading.component";
import { ContactUsComponent } from "./ice/contact-us/contact-us/contact-us.component";
import { AboutUsComponent } from "./ice/about-us/about-us/about-us.component";
import { UserModule } from "./ice/admin/user/user.module";
import { VcfModule } from "./ice/vcf/vcf.module";
import { AdminModule } from "./ice/admin/admin.module";
import { AuthGuard } from "./auth/keycloak/auth-gaurd";
import { FileListComponent } from "./ice/storage/file-list/file-list.component";
import { MatMenuModule } from "@angular/material/menu";
import { FileManagerComponent } from "./main/sample/file-manager/file-manager.component";
import { HomeModule } from "./ice/home/home.module";
import { WebsocketService } from "./ice/services/websocket.service";
import { ToastrModule } from "ngx-toastr";
import { RegisterComponent } from "./ice/admin/user/register/register.component";
import { UnauthorizationComponent } from "./ice/unauthorization/unauthorization.component";
// import { CheckIsOnlineService } from "./ice/services/check-is-online.service";
import { ContainerModule } from "./ice/container/container.module";
import { Home2Module } from "./ice/home2/home2.module";
import { BigDataModule } from "./ice/big-data/big-data.module";
import { SharedModule } from "./ice/storage/shared-with-me/shared.module";
import { HistoryModule } from "./ice/history/history.module";
import { NiotModule } from "./ice/niot/niot.module";
import { UserDashboardComponent } from "./ice/user-dashboard/user-dashboard.component";
import { ContentHeaderModule } from "./layout/components/content-header/content-header.module";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./ice/home2/home2.module").then((m) => m.Home2Module),
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
  },
  {
    path: "vcfanalysis",
    loadChildren: () => import("./ice/vcf/vcf.module").then((m) => m.VcfModule),
    canActivate: [AuthGuard],
    data: { roles: ["vcf"] },
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./ice/admin/admin.module").then((m) => m.AdminModule),
    // canActivate: [AuthGuard],
    // data: { roles: ["admin"] },
  },
  {
    path: "container",
    loadChildren: () =>
      import("./ice/container/container.module").then((m) => m.ContainerModule),
    canActivate: [AuthGuard],
    data: { roles: ["compute"] },
  },
  {
    path: "workflow",
    loadChildren: () =>
      import("./ice/workflow/workflow.module").then((m) => m.WorkflowModule),
    canActivate: [AuthGuard],
    data: { roles: ["pipeline"] },
  },
  // {
  //   path: "history",
  //   loadChildren: () =>
  //     import("./ice/history/history.module").then((m) => m.HistoryModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: ["compute", "admin" ] },
  // },
  {
    path: "visualization",
    loadChildren: () =>
      import("./ice/visualization/visualization.module").then(
        (m) => m.VisualizationModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ["compute"] },
  },
  {
    path: "bigdata",
    loadChildren: () =>
      import("./ice/big-data/big-data.module").then((m) => m.BigDataModule),
    canActivate: [AuthGuard],
    data: { roles: ["compute"] },
  },
  {
    path: "unauthorized",
    component: UnauthorizationComponent,
    data: { animation: "misc" },
  },
  {
    path: "file-uploading",
    component: FileUploadingComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
    data: { roles: ["upload", "storage"] },
  },
  {
    path: "file-list",
    component: FileListComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
    data: { roles: ["storage"] },
  },
  {
    path: "contactUs",
    component: ContactUsComponent,
  },
  {
    path: "aboutUs",
    component: AboutUsComponent,
  },

  {
    path: "file-explorer",
    component: FileManagerComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
    data: { roles: ["storage"] },
  },
  {
    path: "file",
    loadChildren: () =>
      import("./ice/storage/file/file.module").then((m) => m.FileModule),
    canActivate: [AuthGuard],
    data: { roles: ["storage"] },
  },
  {
    path: "user-dashboard",
    component: UserDashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "submit",
    loadChildren: () =>
      import("./ice/niot/niot.module").then((m) => m.NiotModule),
  },
  {
    path: "shared",
    loadChildren: () =>
      import("./ice/storage/shared-with-me/shared.module").then(
        (m) => m.SharedModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ["storage"] },
  },
  {
    path: "**",
    redirectTo: "/pages/miscellaneous/error",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizationComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDatatableModule,
    ContentHeaderModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    TranslateModule.forRoot(),
    Home2Module,
    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,
    FileUploadModule,
    UserModule,
    VcfModule,
    BigDataModule,
    AdminModule,
    ContainerModule,
    HistoryModule,

    //Keycloak module
    KeycloakAngularModule,
    MatMenuModule,
    HomeModule,
    SharedModule,
    NiotModule,

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },

    WebsocketService,
    // CheckIsOnlineService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule { }
function routes1(
  routes1: any
):
  | any[]
  | import("@angular/core").Type<any>
  | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error("Function not implemented.");
}
