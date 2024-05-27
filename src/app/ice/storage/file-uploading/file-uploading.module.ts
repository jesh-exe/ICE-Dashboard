import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FileUploadingComponent } from 'app/ice/storage/file-uploading/file-uploading.component';

import { CUSTOM_ELEMENTS_SCHEMA,NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContentHeaderComponent } from 'app/layout/components/content-header/content-header.component';


// routing
const routes: Routes = [
  {
    path: 'form-elements/file/uploader',
    component:FileUploadingComponent ,
    data: { animation: 'file-uploader' }
  }
];

@NgModule({
  declarations: [ContentHeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
   ContentHeaderModule,
    CardSnippetModule,
    FileUploadModule,
    CoreCommonModule,FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbTypeahead,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    ]
})


  
export class FileUploadingModule {}