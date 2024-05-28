import { Component, OnInit } from '@angular/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit {

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
        "totalContainerCount": 1,
        "runningContainerCount": 0,
        "completedContainerCount": 1,
        "pendingContainerCount": 0,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      },
      {
        "userName": "sucheta",
        "totalContainerCount": 8,
        "runningContainerCount": 0,
        "completedContainerCount": 5,
        "pendingContainerCount": 0,
        "failedContainerCount": 3,
        "succeededContainerCount": 0
      },
      {
        "userName": "hrishikesh",
        "totalContainerCount": 4,
        "runningContainerCount": 0,
        "completedContainerCount": 1,
        "pendingContainerCount": 0,
        "failedContainerCount": 3,
        "succeededContainerCount": 0
      },
      {
        "userName": null,
        "totalContainerCount": 32,
        "runningContainerCount": 0,
        "completedContainerCount": 0,
        "pendingContainerCount": 32,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      },
      {
        "userName": "blast",
        "totalContainerCount": 72,
        "runningContainerCount": 0,
        "completedContainerCount": 46,
        "pendingContainerCount": 0,
        "failedContainerCount": 12,
        "succeededContainerCount": 14
      },
      {
        "userName": "preet",
        "totalContainerCount": 1,
        "runningContainerCount": 1,
        "completedContainerCount": 0,
        "pendingContainerCount": 0,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      },
      {
        "userName": "asetiya",
        "totalContainerCount": 1,
        "runningContainerCount": 1,
        "completedContainerCount": 0,
        "pendingContainerCount": 0,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      },
      {
        "userName": "palash",
        "totalContainerCount": 3,
        "runningContainerCount": 2,
        "completedContainerCount": 1,
        "pendingContainerCount": 0,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      },
      {
        "userName": "pallavi",
        "totalContainerCount": 71,
        "runningContainerCount": 5,
        "completedContainerCount": 22,
        "pendingContainerCount": 9,
        "failedContainerCount": 34,
        "succeededContainerCount": 1
      },
      {
        "userName": "sandeep",
        "totalContainerCount": 1,
        "runningContainerCount": 1,
        "completedContainerCount": 0,
        "pendingContainerCount": 0,
        "failedContainerCount": 0,
        "succeededContainerCount": 0
      }
    ];

    const userNames = data.map(item => item.userName || 'Unknown');
    const containerTypes = [
      {
        actualName: 'runningContainerCount',
        name: "Running",
      },
      {
        actualName: 'completedContainerCount',
        name: "Completed",
      },
      {
        actualName: 'pendingContainerCount',
        name: "Pending",
      },
      {
        actualName: 'failedContainerCount',
        name: "Failed",
      },
      {
        actualName: 'succeededContainerCount',
        name: "Succeded",
      },
    ] as const;
    const containerData = containerTypes.map(type => {
      return {
        type: type.name,
        data: data.map(item => item[type.actualName])
      };
    });

    this.echartsOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom : 0
      },
      grid : {
        bottom : 110,
        left : 30,
        right: 20,
        top : 10
      },
      xAxis: {
        type: 'category',
        data: userNames
      },
      yAxis: {
        type: 'value'
      },
      series: containerData.map(val => {
        return {
          name: val.type,
          type: 'bar',
          stack: 'total',
          data: val.data,
          barWidth: '20%',
          itemStyle: {
            borderRadius: [10, 10, 0, 0] // Rounded top corners
          }
        };
      })
    };
  }
}
