import { Component, OnInit } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { type } from 'os';

@Component({
  selector: 'app-total-users-pie',
  templateUrl: './total-users-pie.component.html',
  styleUrls: ['./total-users-pie.component.scss']
})
export class TotalUsersPieComponent implements OnInit {

  echartExtensions: any[]
  echartsOptions = {}

  constructor() {
    this.echartExtensions = [TooltipComponent,
      LegendComponent,
      PieChart,
      GridComponent
    ]
  }

  ngOnInit() {
    this.echartsOptions = {
      grid: {
        left: 10,
        right: '55%', // Adjust the right value to position the pie chart on the right side
        top: 'center',
        bottom: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        // formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 'center',
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '70%'],
          center: ['85%', '50%'],
          label: {
            show: false
          },
          data: [
            { value: 50, name: 'Offline', itemStyle : {color : "#71e4da"}},
            { value: 80, name: 'Online', itemStyle : {color : "#0aad49"} },
          ]
        }
      ]
    };
  }


}
