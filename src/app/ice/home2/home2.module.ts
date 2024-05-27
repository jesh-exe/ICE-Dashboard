import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { Carousel2Component } from "./carousel2/carousel2.component";
import { Home2Component } from "./home2.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreCommonModule } from "@core/common.module";
import { RouterModule, Routes } from "@angular/router";
import { PlyrModule } from "ngx-plyr";
import {
  SwiperConfigInterface,
  SwiperModule,
  SWIPER_CONFIG,
} from "ngx-swiper-wrapper";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};

const homeRoutes: Routes = [
  {
    path: "home",
    component: Home2Component,
    pathMatch: "full",
  },
];
@NgModule({
  declarations: [Carousel2Component, Home2Component],
  imports: [
    CommonModule,
    ContentHeaderModule,
    CoreCommonModule,
    RouterModule.forChild(homeRoutes),
    NgbModule,
    PlyrModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class Home2Module {}
