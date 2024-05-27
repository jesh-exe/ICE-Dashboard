import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/auth/keycloak/auth-gaurd";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MomentModule } from "ngx-moment";
import { FormGenerationComponent } from "./form-generation/form-generation.component";
import { SplitLastPipe } from "./workflow-pipes/SplitLastPipe";
import { SafePipe } from "./workflow-pipes/SafePipe";
import { Replace } from "./workflow-pipes/Replace";
import { ListPipelinesComponent } from "./list-pipelines/list-pipelines.component";
import { RunsComponent } from "./list-pipelines/runs/runs.component";
import { LaunchpadComponent } from "./list-pipelines/launchpad/launchpad.component";
import { ActivityComponent } from "./activity/activity.component";
import { ActivityContentComponent } from "./activity/activity-content/activity-content.component";
import { ActivitySidebarsComponent } from "./activity/activity-sidebars/activity-sidebars.component";
import { CsvModule } from "@ctrl/ngx-csv";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CoreCardModule } from "@core/components/core-card/core-card.module";
import { ResultsComponent } from "./activity/results/results.component";
import { AddAuthToken } from "./workflow-pipes/AddAuthToken";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { ReplaceNull } from "./workflow-pipes/ReplaceNull";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { ParametersComponent } from "./activity/parameters/parameters.component";
const workflowRoutes: Routes = [
  {
    path: "list",
    component: ListPipelinesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "input/:pipelineName",
    component: FormGenerationComponent,
    canActivate: [AuthGuard],
    data: { animation: "collapse" },
  },
  {
    path: "activity/:containerName",
    component: ActivityComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AddAuthToken,
    FormGenerationComponent,
    SplitLastPipe,
    SafePipe,
    ListPipelinesComponent,
    RunsComponent,
    LaunchpadComponent,
    ActivityComponent,
    ActivityContentComponent,
    ActivitySidebarsComponent,
    ResultsComponent,
    Replace,
    ReplaceNull,
    ParametersComponent,
  ],
  imports: [
    MonacoEditorModule,
    NgxExtendedPdfViewerModule,
    PerfectScrollbarModule,
    MomentModule,
    CommonModule,
    CoreCardModule,
    CoreCommonModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    CsvModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: "No data to display", // Message to show when array is presented, but contains no values
        totalMessage: "total", // Footer total message
        selectedMessage: "selected", // Footer selected message
      },
    }),
    RouterModule.forChild(workflowRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class WorkflowModule {}
