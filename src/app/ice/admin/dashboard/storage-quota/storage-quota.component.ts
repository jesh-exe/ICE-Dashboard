import { Component, OnInit } from '@angular/core';
import { dataTool } from 'echarts/core';

@Component({
  selector: 'app-storage-quota',
  templateUrl: './storage-quota.component.html',
  styleUrls: ['./storage-quota.component.scss']
})
export class StorageQuotaComponent implements OnInit {

  numberOfUsers: string = "10";
  public data: any[] = [
    {
      username: 'Jayesh',
      quotaUsed: 40,
    },
    {
      username: 'Supriya',
      quotaUsed: 38,
    },
    {
      username: 'Prachi',
      quotaUsed: 32,
    },
    {
      username: 'Renu',
      quotaUsed: 30,
    },
    {
      username: 'Palash',
      quotaUsed: 28,
    },
    {
      username: 'Preet',
      quotaUsed: 26,
    },
    {
      username: 'Ajay',
      quotaUsed: 22,
    },
    {
      username: 'Pallavi',
      quotaUsed: 18,
    }
  ]
  data1 = this.data;

  constructor() { }

  ngOnInit() {
  }

  handleNumberOfUsers() {
    if(this.numberOfUsers == '10')
    {
      this.data = [
        ...this.data1,
      ]
    }
    if(this.numberOfUsers == '20')
    {
      this.data = [
        ...this.data,
        ...this.data
      ]
    }
    if(this.numberOfUsers == '30')
    {
      this.data = [
        ...this.data,
        ...this.data,
        ...this.data
      ]
    }
  }

}
