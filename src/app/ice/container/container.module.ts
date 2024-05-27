import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { ClipboardModule } from "ngx-clipboard";
import { CommonModule } from "@angular/common";
import { ContainerCreationComponent } from "./container-creation/container-creation.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/auth/keycloak/auth-gaurd";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { JobsComponent } from "./jobs/jobs.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TruncatePipe } from "./truncate.pipe";
import { MomentModule } from "ngx-moment";
import { ImageListingComponent } from "./image-listing/image-listing.component";
import { ContainerDetailsComponent } from "./container-details/container-details.component";
import { CoreCardModule } from "@core/components/core-card/core-card.module";
import { cpuUnitPipe } from "./cpuUnit.pipe";
const containerRoutes: Routes = [
  {
    path: "create-container",
    component: ContainerCreationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "jobs",
    component: JobsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "images",
    component: ImageListingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "details/:id",
    component: ContainerDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ContainerCreationComponent,
    JobsComponent,
    TruncatePipe,
    cpuUnitPipe,
    ImageListingComponent,
    ContainerDetailsComponent,
  ],
  imports: [
    CoreCardModule,
    ClipboardModule,
    MomentModule,
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    NgxDatatableModule,
    RouterModule.forChild(containerRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ContainerModule {}
