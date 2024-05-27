import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { FileListService } from 'app/ice/storage/storage-service/file-list.service';
import { FileList } from 'app/file-list';
import { IceLogService } from 'app/ice/services/ice-log.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  public page: number = 1;
  public selectedOption: number = 5;
  public pageSize: number = this.selectedOption;
  public rows;
  public temp = [];
  public searchValue = '';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public tempData = [];
  public contentHeader: object;
  
  constructor(
    private filelist: FileListService,
    private http: HttpClient,
    private logService: IceLogService
    ) {
  }
  filterUpdate(event) {
    const val: string = event.target.value.toLowerCase();
  
    const temp = this.tempData.filter(function (d) {
      if (d == null) {
        return;
      }
      return d.fileName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  selected(event) {
    this.pageSize = event;
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Storage List',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name:'Storage list',
            isLink: false
          }
        ]
      }
    };
    this.filelist.getAllFiles().subscribe((response) => {
      this.logService.info(JSON.stringify(response));
      this.rows = response;
      this.tempData = this.rows;
      this.logService.debug("Tempdata is copied");
    })
  }

  downloadFile(fileName: string) {
    let response = this.filelist.getPresignedUrl(fileName);
  }

  ConfirmTextOpen(fileName) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    })
      .then((result) =>{
        if (result.value) {
   this.filelist.deleteFile(fileName).subscribe((response)=>{
    this.logService.info(JSON.stringify(response));
    //console.log("test deleted",response);
    this.ngOnInit()
   });
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your Data has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        }else{
          return;
        }
      })
    }

}
