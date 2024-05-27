import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GatkComponent } from "./gatk/gatk.component";
import { CoreCommonModule } from "@core/common.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { ShortMydriveComponent } from "./short-mydrive/short-mydrive.component";

const bigdataRoutes: Routes = [
  {
    path: "gatk",
    component: GatkComponent,
  },
];

@NgModule({
  declarations: [GatkComponent, ShortMydriveComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild(bigdataRoutes),
    ContentHeaderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class BigDataModule {}
