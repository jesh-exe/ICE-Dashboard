import {
  NgModule,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { NgbModule, NgbProgressbar, NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { CoreCommonModule } from "@core/common.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgSelectModule } from "@ng-select/ng-select";
import { ListComponent } from "./list/list.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { EchartsxModule } from 'echarts-for-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { WelcomeCardComponent } from "./dashboard/welcome-card/welcome-card.component";
import { StatisticsCardComponent } from "./dashboard/statistics-card/statistics-card.component";
import { TotalUsersPieComponent } from "./dashboard/statistics-card/total-users-pie/total-users-pie.component";
import { TotalStoragePieComponent } from "./dashboard/statistics-card/total-storage-pie/total-storage-pie.component";
import { TotalContainerPieComponent } from "./dashboard/statistics-card/total-container-pie/total-container-pie.component";
import { UserReportsComponent } from "./dashboard/user-reports/user-reports.component";
import { BarChartComponent } from "./dashboard/user-reports/bar-chart/bar-chart.component";
import { UserPieChartComponent } from "./dashboard/user-reports/user-pie-chart/user-pie-chart.component";
import { ContainerStatusComponent } from "./dashboard/container-status/container-status.component";
import { StackedBarChartComponent } from "./dashboard/container-status/stacked-bar-chart/stacked-bar-chart.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerStatusDummyComponent } from "./dashboard/container-status-dummy/container-status-dummy.component";
import { StackedBarStatusComponent } from "./dashboard/container-status-dummy/stacked-bar-status/stacked-bar-status.component";
import { StackedBarTypeComponent } from "./dashboard/container-status-dummy/stacked-bar-type/stacked-bar-type.component";
import { StackedLineChartComponent } from "./dashboard/container-status-dummy/stacked-line-chart/stacked-line-chart.component";
import { StorageQuotaComponent } from "./dashboard/storage-quota/storage-quota.component";
import { NightingalePieChartComponent } from "./dashboard/storage-quota/nightingale-pie-chart/nightingale-pie-chart.component";
import { StatisticsCardDummyComponent } from "./dashboard/statistics-card-dummy/statistics-card-dummy.component";
import { UserCardComponent } from "./dashboard/statistics-card-dummy/user-card/user-card.component";
import { UserBarStatsChartComponent } from "./dashboard/statistics-card-dummy/user-card/user-bar-stats-chart/user-bar-stats-chart.component";


const adminRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
  },
  {
    path: "list",
    component: ListComponent,
    pathMatch: "full",
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    WelcomeCardComponent,
    StatisticsCardComponent,
    TotalUsersPieComponent,
    TotalStoragePieComponent,
    TotalContainerPieComponent,
    UserReportsComponent,
    BarChartComponent,
    UserPieChartComponent,
    ContainerStatusComponent,
    StackedBarChartComponent,
    ContainerStatusDummyComponent,
    StackedBarStatusComponent,
    StackedBarTypeComponent,
    StackedLineChartComponent,
    StorageQuotaComponent,
    NightingalePieChartComponent,
    StatisticsCardDummyComponent,
    UserCardComponent,
    UserBarStatsChartComponent
  ],
  imports: [
    ContentHeaderModule,
    NgbModule,
    RouterModule,
    CommonModule,
    RouterModule.forChild(adminRoutes),
    CoreCommonModule,
    NgApexchartsModule,
    EchartsxModule,
    NgbProgressbarModule,
    NgSelectModule,
    MatTabsModule,
    MatTooltipModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: "No data to display", // Message to show when array is presented, but contains no values
        totalMessage: "total", // Footer total message
        selectedMessage: "selected", // Footer selected message
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule { }
