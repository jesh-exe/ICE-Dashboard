import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { CoreCommonModule } from "@core/common.module";
import { SnpAnalysisComponent } from "./snp-analysis/snp-analysis.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgApexchartsModule } from "ng-apexcharts";
import { VcfService } from "./vcf-service/vcf.service";
import { BlockUIModule } from "ng-block-ui";
import { SnpTableResponseComponent } from "./snp-table-response/snp-table-response.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SnpChartComponent } from "./snp-chart/snp-chart.component";
import { SnpChartAnalysisComponent } from "./snp-chart-analysis/snp-chart-analysis.component";
import { IgvviewerComponent } from "./igvviewer/igvviewer.component";
import { VcfSelectionComponent } from "./vcf-selection/vcf-selection.component";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { VcfmainpageComponent } from "./vcfmainpage/vcfmainpage.component";
import { CircosGraphComponent } from "./circos-graph/circos-graph.component";
import { VcfSelectionInfoComponent } from "./vcf-selection-info/vcf-selection-info.component";
import { SNPAnalysisInfo } from "./snp-analysis-info/snp-analysis-info.component";
import { FilterByConditionInfoComponent } from "./filter-by-condition-info/filter-by-condition-info.component";
import { CustomPopulationComponent } from "./custom-population/custom-population.component";
import { FilterbyinfotagsComponent } from "./filterbyinfotags/filterbyinfotags.component";
import { FilterByConditionComponent } from "./filterbycondition/filter-by-condition.component";
import { IgviewerInfoComponent } from "./igvviewer-info/igvviewer-info.component";
import { FunctionalAnnotationComponent } from "./fuctional-annotation/fuctional-annotation.component";
import { NoSpaceDirective } from "./directive/no-space.directive";
import { ShortenPipe } from "./shorten";
import { CustomComponent } from "./custom/custom.component";
import { SetAnalysisOnPopulationComponent } from "./set-analysis-on-population/set-analysis-on-population.component";
import { JobSidebarComponent } from "./vcfmainpage/job-sidebars/job-sidebar.component";
import { CoreSidebarModule } from "@core/components";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { JobContentComponent } from "./vcfmainpage/job-content/job-content.component";
import { TextTransformPipe } from "./TextTransfer";
import { CoreCardModule } from "@core/components/core-card/core-card.module";

const vcfRoutes: Routes = [
  {
    path: "mainpage",
    component: VcfmainpageComponent,
  },
  {
    path: "snpanalysis",
    component: SnpAnalysisComponent,
  },
  {
    path: "snpinfo",
    component: SNPAnalysisInfo,
  },
  {
    path: "filterbyconditioninfo",
    component: FilterByConditionInfoComponent,
  },
  {
    path: "filterbycondition",
    component: FilterByConditionComponent,
  },
  {
    path: "select",
    component: VcfSelectionComponent,
  },

  {
    path: "igv",
    component: IgvviewerComponent,
  },
  {
    path: "circos",
    component: CircosGraphComponent,
  },
  {
    path: "uploadinfo",
    component: VcfSelectionInfoComponent,
  },

  {
    path: "igvinfo",
    component: IgviewerInfoComponent,
  },
  {
    path: "custompopulation",
    component: CustomPopulationComponent,
  },
  {
    path: "filterbyinfotags",
    component: FilterbyinfotagsComponent,
  },
  {
    path: "functionalannotation",
    component: FunctionalAnnotationComponent,
  },
  {
    path: "setonpop",
    component: SetAnalysisOnPopulationComponent,
  },
  {
    path: "customvenn",
    component: CustomComponent,
  },
];
@NgModule({
  declarations: [
    TextTransformPipe,
    ShortenPipe,
    IgviewerInfoComponent,
    SnpAnalysisComponent,
    SNPAnalysisInfo,
    SnpTableResponseComponent,
    SnpChartComponent,
    SnpChartAnalysisComponent,
    IgvviewerComponent,
    VcfSelectionComponent,
    VcfmainpageComponent,
    CircosGraphComponent,
    VcfSelectionInfoComponent,
    FilterByConditionInfoComponent,
    CustomPopulationComponent,
    FilterbyinfotagsComponent,
    FilterByConditionComponent,
    FunctionalAnnotationComponent,
    NoSpaceDirective,
    CustomComponent,
    SetAnalysisOnPopulationComponent,
    JobContentComponent,
    JobSidebarComponent,
  ],
  imports: [
    CoreSidebarModule,
    CommonModule,
    CoreCardModule,
    RouterModule.forChild(vcfRoutes),
    CoreCommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    PerfectScrollbarModule,
    NgApexchartsModule,
    BlockUIModule.forRoot(),
    NgxDatatableModule,
    ContentHeaderModule,
  ],
  providers: [VcfService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class VcfModule {}
