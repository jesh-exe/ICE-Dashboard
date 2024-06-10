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
        "blastContainerCount": 12,
        "codeContainerCount": 1,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      },
      {
        "userName": "sucheta",  
        "blastContainerCount": 12,
        "codeContainerCount": 5,
        "pipelineContainerCount": 12,
        "guiContainerCount": 3,
        "notebookContainerCount": 12
      },
      {
        "userName": "hrishikesh", 
        "blastContainerCount": 12,
        "codeContainerCount": 1,
        "pipelineContainerCount": 12,
        "guiContainerCount": 3,
        "notebookContainerCount": 12
      },
      {
        "userName": null, 
        "blastContainerCount": 12,
        "codeContainerCount": 12,
        "pipelineContainerCount": 32,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      },
      {
        "userName": "blast",  
        "blastContainerCount": 12,
        "codeContainerCount": 46,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 14
      },
      {
        "userName": "preet",  
        "blastContainerCount": 1,
        "codeContainerCount": 12,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      },
      {
        "userName": "asetiya",  
        "blastContainerCount": 1,
        "codeContainerCount": 12,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      },
      {
        "userName": "palash", 
        "blastContainerCount": 2,
        "codeContainerCount": 1,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      },
      {
        "userName": "pallavi",  
        "blastContainerCount": 5,
        "codeContainerCount": 22,
        "pipelineContainerCount": 9,
        "guiContainerCount": 34,
        "notebookContainerCount": 1
      },
      {
        "userName": "sandeep",  
        "blastContainerCount": 1,
        "codeContainerCount": 12,
        "pipelineContainerCount": 12,
        "guiContainerCount": 12,
        "notebookContainerCount": 12
      }
    ];

    const pastelColors = [
      // Blue Shade
      '#ff869a',
      '#ffcb80',
      '#61ead4',
      '#2196F3',
      '#8b6ae3',
      '#42A5F5',
      // '#64B5F6',

      //Purple Shade
      // '#9E7CE5',
      // '#B695EA',
      // '#D1B1F1',
      // '#E5C7F7',
      // '#F0DCF9',
    ];
    const userNames = data.map(item => item.userName || 'Unknown');
    const containerTypes = [
      {
        actualName: 'blastContainerCount',
        name: "BLAST",
      },
      {
        actualName: 'codeContainerCount',
        name: "Code",
      },
      {
        actualName: 'pipelineContainerCount',
        name: "Pipeline",
      },
      {
        actualName: 'guiContainerCount',
        name: "GUI",
      },
      {
        actualName: 'notebookContainerCount',
        name: "Notebook",
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
        top : 0
      },
        // grid : {
        //   bottom : 110,
        //   // left : 30,
        //   // right: 20,
        //   top : 10
        // },
      xAxis: {
        type: 'category',
        data: userNames,
      },
      yAxis: {
        type: 'value',
        // splitLine : false
      },
      series: containerData.map((val,index) => {
        return {
          name: val.type,
          type: 'bar',
          stack: 'total',
          data: val.data,
          barWidth: '40%',
          itemStyle: {
            color: pastelColors[index % pastelColors.length],
            barBorderRadius: index == containerData.length-1 ? [50, 50, 0, 0] : [0,0,0,0],
          }
        };
      })
    };
  }
}
