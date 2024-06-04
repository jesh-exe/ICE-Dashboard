
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

  constructor() { }

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
        bottom: 80,
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

    const data = [
      {
        "username": "User 1",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "User 2",
        "totalRunningContainer": 20,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "User 3",
        "totalRunningContainer": 5,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "User 4",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "User 5",
        "totalRunningContainer": 15,
        "blastContainerCount": 14,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "User 6",
        "totalRunningContainer": 30,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "User 7",
        "totalRunningContainer": 10,
        "blastContainerCount": 41,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "User 8",
        "totalRunningContainer": 22,
        "blastContainerCount": 4,
        "guiContainerCount": 31,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 12,
        "otherContainerCount": 1
      },
      {
        "username": "User 9",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 10,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 11
      },
      {
        "username": "User 10",
        "totalRunningContainer": 20,
        "blastContainerCount": 34,
        "guiContainerCount": 3,
        "notebookContainerCount": 10,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      }
    ];
    const usernames = data.map(item => item.username || 'Unknown');
    const containerTypes = [
      {
        actualName: 'totalRunningContainer',
        name: "Total Running",
      },
      {
        actualName: 'blastContainerCount',
        name: "BLAST",
      },
      {
        actualName: 'guiContainerCount',
        name: "GUI",
      },
      {
        actualName: 'notebookContainerCount',
        name: "Notebook",
      },
      {
        actualName: 'codeContainerCount',
        name: "Code",
      },
      {
        actualName: 'otherContainerCount',
        name: "Others",
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
      xAxis: { data: usernames },
      series: seriesData
    });

    // Register click event handler for the chart
    this.echartsInstance.on('click', (params) => {
      const userName = usernames[params.dataIndex];
      this.selectedName.emit(userName);
    });
  }
}
