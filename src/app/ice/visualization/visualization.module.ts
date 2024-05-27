import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { CircosChartComponent } from "../visualization/circos-chart/circos-chart.component";
import { AuthGuard } from "../../auth/keycloak/auth-gaurd";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VisualizationComponent } from "./visualization.component";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
const visualRoutes: Routes = [
  {
    path: "main",
    component: VisualizationComponent,
  },
];
@NgModule({
  declarations: [CircosChartComponent, VisualizationComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(visualRoutes),
    ContentHeaderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class VisualizationModule {}
