import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent, GridComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, GridComponent, BarChart, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-stacked-line-chart',
  templateUrl: './stacked-line-chart.component.html',
  styleUrls: ['./stacked-line-chart.component.scss']
})
export class StackedLineChartComponent implements OnInit {

  @Output() selectedName = new EventEmitter();

  echartsExtentions: any;
  echartsOptions = {};

  constructor() {
    this.echartsExtentions = [
      TooltipComponent,
      GridComponent,
      LegendComponent,
      BarChart,
      LineChart,
      ToolboxComponent
    ]
  }

  ngOnInit() {

    const data = [
      {
        "username": "user1",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "user2",
        "totalRunningContainer": 20,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "user3",
        "totalRunningContainer": 5,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 5,
        "containerContainerCount": 7,
        "codeContainerCount": 3,
        "otherContainerCount": 3
      },
      {
        "username": "user4",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "user5",
        "totalRunningContainer": 15,
        "blastContainerCount": 14,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "user6",
        "totalRunningContainer": 30,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "user7",
        "totalRunningContainer": 10,
        "blastContainerCount": 41,
        "guiContainerCount": 3,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 1
      },
      {
        "username": "user8",
        "totalRunningContainer": 22,
        "blastContainerCount": 4,
        "guiContainerCount": 31,
        "notebookContainerCount": 0,
        "containerContainerCount": 1,
        "codeContainerCount": 12,
        "otherContainerCount": 1
      },
      {
        "username": "user9",
        "totalRunningContainer": 10,
        "blastContainerCount": 4,
        "guiContainerCount": 3,
        "notebookContainerCount": 10,
        "containerContainerCount": 1,
        "codeContainerCount": 1,
        "otherContainerCount": 11
      },
      {
        "username": "user10",
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
        name: "Total",
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

    const containerData = containerTypes.map(type => {
      return {
        type: type.name,
        data: data.map(item => item[type.actualName])
      };
    });

    const pastelColors = [
      // Blue Shade
      // '#1976D2',
      // '#1E88E5',
      // '#2196F3',
      // '#42A5F5',
      // '#64B5F6',
      // '#90CAF9',

      //Purple Shade
      '#8b6ae3',
      '#9E7CE5',
      '#B695EA',
      '#D1B1F1',
      '#E5C7F7',
      '#F0DCF9',
    ];

    this.echartsOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        left: 'center',
        // bottom: 0,
        // top : -10,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: { show: true, type: ['line', 'bar', 'pie'] },
          restore: { show: true },
          saveAsImage: { show: true },
        }
      },
      grid : {
        top : 0
      },
      legend: {
        // {
        //   left: 'center', 
        //   top: 20,
        //   data: ['Completed', 'Pending', 'Succeeded', 'Failed']
        // },
        // {
        //   left: 'center', 
        //   bottom: 0,
        //   data: containerTypes.map(type => type.name)
        // }
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: usernames,
        axisLabel: {
          fontWeight: 'bold',
        }
      },
      yAxis: [
        // {
        //   type: 'value',
        //   name: 'Running Containers',
        //   splitLine: false,
        //   max: 100,
        //   axisLabel: {
        //     fontWeight: 'bold', 
        //   }
        // },
        // {
        //   type: 'value',
        //   name: 'Total Container',
        //   position: 'right',
        //   splitLine: false,
        //   min: -50,
        //   // interval : ,
        //   axisLabel: {
        //     formatter: '{value}',
        //     fontWeight: 'bold'
        //   }
        // }
        {
          type: 'value',
          name: 'Running Containers',
          splitLine: false,
          axisLabel: {
            fontWeight: 'bold',
          }
        },
        {
          type: 'value',
          name: 'Total Container',
          position: 'right',
          splitLine: false,
          axisLabel: {
            formatter: '{value}',
            fontWeight: 'bold'
          }
        }
      ],
      series: [
        ...containerData.map((val, index) => ({
          name: val.type,
          type: 'bar',
          stack: 'total',
          data: val.data,
          barWidth: '30%',
          itemStyle: {
            color: pastelColors[index % pastelColors.length]
          }
        })),
        {
          name: 'Completed',
          type: 'line',
          yAxisIndex: 1,
          data: [21, 5, 13, 4, 8, 15, 7, 10, 5, 20],
          smooth : true,
        },
        {
          name: 'Pending',
          type: 'line',
          yAxisIndex: 1,
          data: [2, 12, 23, 9, 14, 3, 25, 18, 8, 12],
          smooth : true,
        },
        {
          name: 'Succeeded',
          type: 'line',
          yAxisIndex: 1,
          data: [8, 2, 17, 15, 9, 6, 19, 14, 12, 11],
          smooth : true,
        },
        {
          name: 'Failed',
          type: 'line',
          yAxisIndex: 1,
          data: [1, 19, 3, 12, 11, 8, 4, 7, 15, 9],
          smooth : true,
        }
      ]
    };

    const chartInstance = echarts.init(document.getElementById('yourChartId') as HTMLDivElement);
    chartInstance.setOption(this.echartsOptions);

    chartInstance.on('click', (params) => {
      if (params.seriesType === 'bar' && params.componentType === 'series') {
        const userName = usernames[params.dataIndex];
        alert('Hi ' + userName);
      }
    });
  }
}
