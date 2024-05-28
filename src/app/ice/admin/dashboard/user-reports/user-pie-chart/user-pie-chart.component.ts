import { Component, OnInit } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-user-pie-chart',
  templateUrl: './user-pie-chart.component.html',
  styleUrls: ['./user-pie-chart.component.scss']
})
export class UserPieChartComponent implements OnInit {

  
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
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '90%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '65%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    
    
  }

}
