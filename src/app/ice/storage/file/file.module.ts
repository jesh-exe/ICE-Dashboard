import { CommonModule } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
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
import { FileDriveComponent } from "app/ice/storage/file/file-drive/file-drive.component";
import { EcommerceSidebarComponent } from "app/ice/storage/file/file-drive/sidebar/sidebar.component";
import { FileItemComponent } from "./file-item/file-item.component";
import { OverlayModule } from "@angular/cdk/overlay";
//import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { ItemListComponent } from "./item-list/item-list.component";
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
import { MonacoEditorModule } from "@materia-ui/ngx-monaco-editor";
//import { NgbdDropdownBasic } from "./dropdown-basic";
// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   observer: true
// };

// routing
const routes: Routes = [
  {
    path: "drive",
    component: FileDriveComponent,
  },
  {
    path: "drive/:currentPathValue",
    component: FileDriveComponent,
  },
  {
    path: "file-uploading",
    component: FileUploadingComponent,
  },
];

@NgModule({
  declarations: [
    FileDriveComponent,
    EcommerceSidebarComponent,
    FileItemComponent,
    ItemListComponent,
    NewfolderdialogComponent,
    //NgbdDropdownBasic,
    // FilterPipe
  ],
  imports: [
    MonacoEditorModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class FileModule {}
