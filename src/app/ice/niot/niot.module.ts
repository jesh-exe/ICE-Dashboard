import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { CoreCommonModule } from "@core/common.module";
import { CardSnippetModule } from "@core/components/card-snippet/card-snippet.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { NiotFormsComponent } from "./niot-forms/niot-forms.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageFormDataComponent } from "./manage-form-data/manage-form-data.component";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ManagerNiotFormDataComponent } from "./manager-niot-form-data/manager-niot-form-data.component";
import { SampleListComponent } from "./sample-list/sample-list.component";
import { CurationDashboardComponent } from "./curation-dashboard/curation-dashboard.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ViewDataComponent } from "./view-data/view-data.component";
import { SequenceListComponent } from "./sequence-list/sequence-list.component";
import { SearchFunctionalityComponent } from "./search-functionality/search-functionality.component";
import { ViewSearchSequencesComponent } from "./view-search-sequences/view-search-sequences.component";
import { BlastSearchComponent } from "./blast-search/blast-search.component";
import { BlastCreationComponent } from "./blast-creation/blast-creation.component";
import { CurationViewComponent } from "./curation-view/curation-view.component";
// import { AuthGuard } from "./auth/keycloak/auth-gaurd";
import { ViewSearchProjectComponent } from "./view-search-project/view-search-project.component";
import { ViewSearchSampleComponent } from "./view-search-sample/view-search-sample.component";
import { FormDashboardComponent } from "./form-dashboard/form-dashboard.component";
import { NiotProjectFormComponent } from "./niot-project-form/niot-project-form.component";
import { NiotSampleFormComponent } from "./niot-sample-form/niot-sample-form.component";
import { NiotSequenceFormComponent } from "./niot-sequence-form/niot-sequence-form.component";
import { AuthGuard } from "app/auth/keycloak/auth-gaurd";
import { BlastResultsComponent } from "./blast-results/blast-results.component";
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { ParametersComponent } from "../workflow/activity/parameters/parameters.component";
import { WorkflowModule } from "../workflow/workflow.module";
import { NgsSequenceFormComponent } from "./ngs-sequence-form/ngs-sequence-form.component";
import { NgsSequenceListComponent } from "./ngs-sequence-list/ngs-sequence-list.component";
import { ViewSearchNgsSequenceComponent } from "./view-search-ngs-sequence/view-search-ngs-sequence.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { WgsCurationDashboardComponent } from "./wgs-curation-dashboard/wgs-curation-dashboard.component";
import { WgsCurationViewComponent } from "./wgs-curation-view/wgs-curation-view.component";
const niotRoutes: Routes = [
  {
    path: "manage-project-list",
    component: ManageFormDataComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "niot-form",
    component: NiotFormsComponent,
  },
  {
    path: "manage-niot-form-data",
    component: ManagerNiotFormDataComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "manage-sample-list",
    component: SampleListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "curation-dashboard",
    component: CurationDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["curator"] },
  },
  {
    path: "view-data/:projectId",
    component: ViewDataComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "manage-sequence-list",
    component: SequenceListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "search-sequence",
    component: ViewSearchSequencesComponent,
  },
  {
    path: "view-projectdata",
    component: ViewSearchProjectComponent,
  },
  {
    path: "view-sampledata",
    component: ViewSearchSampleComponent,
  },
  {
    path: "blast",
    component: BlastSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "blast-creation",
    component: BlastCreationComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "blast-result/:id",
    component: BlastResultsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "curation-view/:id",
    component: CurationViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ["curator"] },
  },
  {
    path: "search",
    component: SearchFunctionalityComponent,
  },
  {
    path: "form-dashboard",
    component: FormDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "niot-project-form",
    component: NiotProjectFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "niot-sample-form",
    component: NiotSampleFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "niot-sequence-form",
    component: NiotSequenceFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "manage-ngs-sequence-list",
    component: NgsSequenceListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "niot-ngsSequence-form",
    component: NgsSequenceFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["repository"] },
  },
  {
    path: "view-ngsSequence",
    component: ViewSearchNgsSequenceComponent,
  },
  {
    path: "wgs-curation-dashboard",
    component: WgsCurationDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["curator"] },
  },
  {
    path: "wgs-curation-view/:id",
    component: WgsCurationViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ["curator"] },
  },
];

@NgModule({
  declarations: [
    NiotFormsComponent,
    ManageFormDataComponent,
    CurationDashboardComponent,
    ManagerNiotFormDataComponent,
    SampleListComponent,
    ViewDataComponent,
    SequenceListComponent,
    SearchFunctionalityComponent,
    ViewSearchSequencesComponent,
    BlastSearchComponent,
    BlastCreationComponent,
    CurationViewComponent,
    ViewSearchProjectComponent,
    ViewSearchSampleComponent,
    FormDashboardComponent,
    NiotProjectFormComponent,
    NiotSampleFormComponent,
    NiotSequenceFormComponent,
    BlastResultsComponent,
    NgsSequenceFormComponent,
    NgsSequenceListComponent,
    ViewSearchNgsSequenceComponent,
    WgsCurationDashboardComponent,
    WgsCurationViewComponent,
  ],
  imports: [
    AutoCompleteModule,
    WorkflowModule,
    RouterModule.forChild(niotRoutes),
    MonacoEditorModule,
    NgxExtendedPdfViewerModule,
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    CoreDirectivesModule,
    NgSelectModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: "No data to display", // Message to show when array is presented, but contains no values
        totalMessage: "total", // Footer total message
        selectedMessage: "selected", // Footer selected message
      },
    }),
    ReactiveFormsModule,
    NgbModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class NiotModule {}
