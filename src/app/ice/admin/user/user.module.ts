import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreSidebarModule } from "@core/components";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { RegisterComponent } from "./register/register.component";
import { UserEditComponent } from "./useredit/useredit.component";
import { UserListComponent } from "./user-list/user-list.component";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { UsersService } from "./user-services/users.service";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { AuthGuard } from "app/auth/keycloak/auth-gaurd";
import { TableComponent } from "./table/table.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { UserviewComponent } from "./userview/userview.component";
import { EmailComposeComponent } from "./table/email-compose/email-compose.component";
import { QuillModule } from "ngx-quill";
import { NgSelectModule } from "@ng-select/ng-select";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { BlockUIModule } from "ng-block-ui";

const appRoutes: Routes = [
  {
    path: "table",
    component: TableComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },

  {
    path: "useredit/:id",
    component: UserEditComponent,
    // pathMatch:'full',
    canActivate: [AuthGuard],
  },
  {
    path: "userview/:id",
    component: UserviewComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    RegisterComponent,
    UserListComponent,
    UserEditComponent,
    TableComponent,
    UserviewComponent,
    EmailComposeComponent,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
    QuillModule.forRoot(),
    CorePipesModule,
    CoreSidebarModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    ContentHeaderModule,
    NgxDatatableModule,
    MatSliderModule,
    MatSlideToggleModule,
    BlockUIModule.forRoot(),
  ],
  providers: [UsersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UserModule {}
