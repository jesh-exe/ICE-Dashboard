import { Component, OnInit } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-total-container-pie',
  templateUrl: './total-container-pie.component.html',
  styleUrls: ['./total-container-pie.component.scss']
})
export class TotalContainerPieComponent implements OnInit {

  echartExtensions: any[]
  echartsOptions = {}

  constructor() {
    this.echartExtensions = [
      TooltipComponent,
      LegendComponent,
      PieChart,
      GridComponent
    ]
  }

  ngOnInit() {
    this.echartsOptions = {
      grid: {
        left: 10,
        right: '55%',
        top: 'center',
        bottom: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item'
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
          radius: ['35%', '85%'],
          center: ['83%', '50%'],
          label: {
            show: false
          },
          data: [
            { value: 11, name: 'Stopped', itemStyle : {color : "rgb(19, 221, 210)"}},
            { value: 34, name: 'Running', itemStyle : {color : "rgb(91, 126, 234)"}},
          ]
        }
      ]
    };
  }
}
