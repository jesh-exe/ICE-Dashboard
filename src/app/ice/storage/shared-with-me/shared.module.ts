import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
//import {MatMenuModule} from '@angular/material/menu';
import { NouisliderModule } from "ng2-nouislider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule } from "@core/components";
import { CoreTouchspinModule } from "@core/components/core-touchspin/core-touchspin.module";
import { CoreCardModule } from "@core/components/core-card/core-card.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

//import { EcommerceService } from 'app/ice/storage/storage-service/ecommerce.service';
import { SharedWithMeDriveComponent } from "app/ice/storage/shared-with-me/sharedwithme-drive/sharedwithme-drive.component";
import { SidebarComponent } from "app/ice/storage/shared-with-me/sharedwithme-drive/sidebar/sidebar.component";
import { SharedItemComponent } from "./shared-item/shared-item.component";
import { OverlayModule } from "@angular/cdk/overlay";
//import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { SharedListComponent } from "./shared-list/shared-list.component";
import { NewfolderdialogComponent } from "./newfolderdialog/newfolderdialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FileUploadingComponent } from "../file-uploading/file-uploading.component";
import { BlockUIModule } from "ng-block-ui";
import { NgSelectModule } from "@ng-select/ng-select";
import { ClipboardModule } from "ngx-clipboard";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
//import { NgbdDropdownBasic } from "./dropdown-basic";
// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   observer: true
// };

// routing
const routes: Routes = [
  {
    path: "shareddrive",
    component: SharedWithMeDriveComponent,
  },
  {
    path: "shareddrive/:currentPathValue",
    component: SharedWithMeDriveComponent,
  },
  {
    path: "file-uploading",
    component: FileUploadingComponent,
  },
];

@NgModule({
  declarations: [
    SharedWithMeDriveComponent,
    SidebarComponent,
    SharedItemComponent,
    SharedListComponent,
    NewfolderdialogComponent,
    //NgbdDropdownBasic,
    // FilterPipe
  ],
  imports: [
    //
    RouterModule.forChild(routes),
    // SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCardModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    CommonModule,
    //MatMenuModule,
    OverlayModule,
    // MatToolbarModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    BlockUIModule,
    NgSelectModule,
    ClipboardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
  // providers: [
  //   {
  //     provide: SWIPER_CONFIG,
  //     useValue: DEFAULT_SWIPER_CONFIG
  //   }
  // ]
  providers: [DatePipe],
})
export class SharedModule {}
