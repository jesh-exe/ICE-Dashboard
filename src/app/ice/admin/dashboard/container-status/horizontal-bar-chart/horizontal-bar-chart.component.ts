import { Component, OnInit } from '@angular/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})

export class HorizontalBarChartComponent implements OnInit {

  echartsExtentions: any;
  echartsOptions = {};

  constructor() {
    this.echartsExtentions = [
      TooltipComponent,
      GridComponent,
      LegendComponent,
      BarChart
    ]
  }

  ngOnInit() {
    const data = [
      {
        "userName": "prachi",
        "runningContainerCount": 12,
        "pendingContainerCount": 1,

      },
      {
        "userName": "sucheta",
        "runningContainerCount": 12,
        "pendingContainerCount": 5,

      },
      {
        "userName": "hrishikesh",
        "runningContainerCount": 12,
        "pendingContainerCount": 1,

      },
      {
        "userName": null,
        "runningContainerCount": 12,
        "pendingContainerCount": 12,

      },
      {
        "userName": "blast",
        "runningContainerCount": 12,
        "pendingContainerCount": 16,

      },
      {
        "userName": "preet",
        "runningContainerCount": 1,
        "pendingContainerCount": 12,

      },
      {
        "userName": "asetiya",
        "runningContainerCount": 1,
        "pendingContainerCount": 12,

      },
      {
        "userName": "palash",
        "runningContainerCount": 2,
        "pendingContainerCount": 1,

      },
      {
        "userName": "pallavi",
        "runningContainerCount": 5,
        "pendingContainerCount": 22,

      },
      {
        "userName": "sandeep",
        "runningContainerCount": 1,
        "pendingContainerCount": 12,

      }
    ];

    const userNames = data.map(item => item.userName);

    this.echartsOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 0
      },
      grid: {
        bottom: 110,
        top: 10,
        // containLabel: true
      },
      yAxis: {
        type: 'category',
        data: userNames,
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          name: "Running",
          type: 'bar',
          data: data.map(val => val.runningContainerCount),
          itemStyle : {
            barBorderRadius: [0, 50, 50, 0]
          }
        },
        {
          name: "Pending",
          type: 'bar',
          data: data.map(val => val.pendingContainerCount),
          itemStyle : {
            barBorderRadius: [0, 50, 50, 0]
          }
        }
      ]
    };
  }
}
