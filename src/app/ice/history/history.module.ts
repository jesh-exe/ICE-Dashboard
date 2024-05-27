import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { ClipboardModule } from "ngx-clipboard";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/auth/keycloak/auth-gaurd";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { HistoryJobsComponent } from "./history-jobs/history-jobs.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MomentModule } from "ngx-moment";

import { CoreCardModule } from "@core/components/core-card/core-card.module";
import { CoreSidebarModule } from "@core/components";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

const historyRoutes: Routes = [
  {
    path: "historyJobs",
    component: HistoryJobsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [HistoryJobsComponent],
  imports: [
    PerfectScrollbarModule,
    CoreSidebarModule,
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
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: "No data to display", // Message to show when array is presented, but contains no values
        totalMessage: "total", // Footer total message
        selectedMessage: "selected", // Footer selected message
      },
    }),
    RouterModule.forChild(historyRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HistoryModule {}
