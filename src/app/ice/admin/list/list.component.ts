import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { IceLogService } from 'app/ice/services/ice-log.service';
import {AdminService} from 'app/ice/admin/admin-service/admin.service';
import { UserList } from 'app/ice/admin/user/user-models/userlist';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data;
  public param;
  ColumnMode = ColumnMode;
  public selectedOption = 10;    
  public selectedStatus = [];
  public searchValue = '';
  private tempData = [];
  public urlLastValue: string;
  loadingIndicator = true;
  reorderable = true;


  constructor(private activatedRoute: ActivatedRoute, private logService:IceLogService, private service : AdminService) { }
  filterUpdate(event) {
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: UserList) {
      if (d == null) {
        return;
      }
      return d.firstName.toLowerCase().indexOf(val) !== -1 || d.lastName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.data = temp;
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(parameter => {
      this.logService.debug("Parameter"+JSON.stringify(parameter));
      this.param=parameter.value;
      
    })
      this.service.getData(this.param).subscribe((value: Array<UserList>) => {
        this.logService.debug(JSON.stringify(value));
        this.data=value;
        this.tempData=value;
        this.logService.debug("Got That"+JSON.stringify(this.data));
      });


  }

}
