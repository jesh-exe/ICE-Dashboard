//import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FileUploadModule } from 'ng2-file-upload';
import { SampleComponent } from './sample.component';

import { AuthGuard } from 'app/auth/keycloak/auth-gaurd';
//import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploadingComponent } from '../../ice/storage/file-uploading/file-uploading.component';
import { HomePageComponent } from 'app/ice/about-us/home-page/home-page.component';
import {CarouselComponent} from '../../ice/home/carousel/carousel.component';
import { GoogleMapsComponent } from '../../ice/contact-us/google-maps/google-maps.component';
import { ContactUsComponent } from '../../ice/contact-us/contact-us/contact-us.component';
import { AboutUsComponent } from '../../ice/about-us/about-us/about-us.component';
import { FileListComponent } from '../../ice/storage/file-list/file-list.component';
// import {MatMenuModule} from '@angular/material/menu';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { MatCardModule } from '@angular/material/card';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { FormsModule } from '@angular/forms';

import { FileModule } from '../../ice/storage/file/file.module';
import { FileDriveComponent } from '../../ice/storage/file/file-drive/file-drive.component';


import { MetadataComponent } from '../../ice/storage/metadata/metadata.component';
import { NgxFileDropModule } from 'ngx-file-drop';

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' },
    canActivate: [AuthGuard]
  },
 
  // {
  //   path: 'file-uploader',
  //   component: FileUploaderComponent,
  //    data: { animation: 'fileup' }
  // }
];

@NgModule({

  declarations: [SampleComponent ,FileUploadingComponent ,GoogleMapsComponent,ContactUsComponent, AboutUsComponent, FileListComponent, FileManagerComponent, MetadataComponent,HomePageComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,NgbModule, FileUploadModule,MatCardModule,FileExplorerModule, FormsModule],

  exports: [SampleComponent, ]
})
export class SampleModule {}
