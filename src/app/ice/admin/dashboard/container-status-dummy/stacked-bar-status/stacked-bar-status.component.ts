
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, BarChart, CanvasRenderer]);

@Component({
  selector: 'app-stacked-bar-status',
  templateUrl: './stacked-bar-status.component.html',
  styleUrls: ['./stacked-bar-status.component.scss']
})
export class StackedBarStatusComponent implements OnInit {

  @Output() selectedName = new EventEmitter();

  echartsInstance: any;
  echartsOptions: any;

  constructor() {}

  ngOnInit() {
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
        left: 30,
        right: 20,
        top: 10
      },
      xAxis: {
        type: 'category',
        data: [], 
      },
      yAxis: {
        type: 'value',
      },
      series: [], 
    };

    this.initializeEcharts();
  }

  initializeEcharts() {
    this.echartsInstance = echarts.init(document.getElementById('barChart'));
    this.echartsInstance.setOption(this.echartsOptions);

    // Fill xAxis and series dynamically
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
    
    const seriesData = containerTypes.map(type => {
      return {
        name: type.name,
        type: 'bar',
        stack: 'total',
        data: data.map(item => item[type.actualName]),
        barWidth: '40%',
      };
    });
    
    this.echartsInstance.setOption({
      xAxis: { data: userNames },
      series: seriesData
    });

    // Register click event handler for the chart
    this.echartsInstance.on('click', (params) => {
      const userName = userNames[params.dataIndex];
      this.selectedName.emit(userName);
    });
  }
}
