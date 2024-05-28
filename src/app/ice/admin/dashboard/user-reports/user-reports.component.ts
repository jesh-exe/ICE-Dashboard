import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.scss']
})
export class UserReportsComponent implements OnInit {

  public flag: boolean = false;

  public adminData: any = {
    storage: 95,
    container: 55,
    pipelines: 25,
    vcf: 65
  }

  constructor() { }

  ngOnInit() {
  }

  getDataOfUser() {
    this.flag = !this.flag;
    this.adminData = {
      storage: 15,
      container: 75,
      pipelines: 95,
      vcf: 55
    }
  }

}
