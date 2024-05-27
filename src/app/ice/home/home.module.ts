import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { RouterModule, Routes } from '@angular/router';
import { PlyrModule } from 'ngx-plyr';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const homeRoutes: Routes = [
  {
    path: 'home2',
    component: HomeComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    CarouselComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ContentHeaderModule,
    CoreCommonModule,
    RouterModule.forChild(homeRoutes),
    NgbModule,
    PlyrModule,
    SwiperModule
  ],
    providers: [
      {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
      }
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
