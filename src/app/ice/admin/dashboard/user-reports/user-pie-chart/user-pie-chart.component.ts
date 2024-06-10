import { Component, Input, OnInit } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-user-pie-chart',
  templateUrl: './user-pie-chart.component.html',
  styleUrls: ['./user-pie-chart.component.scss']
})
export class UserPieChartComponent implements OnInit {

  @Input() selectedName : string;
  
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
        bottom : 0
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          // radius: ['40%', '65%'],
          // radius: ['45%', '75%'],
          center: ['50%', '40%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: 'BLAST' },
            { value: 735, name: 'Notebook' },
            { value: 580, name: 'GUI' },
            { value: 484, name: 'Code' },
          ]
        }
      ]
    };
    
    
  }

}
