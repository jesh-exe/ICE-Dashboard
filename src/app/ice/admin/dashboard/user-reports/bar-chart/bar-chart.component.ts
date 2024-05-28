import { Component, OnInit } from '@angular/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  readonly echartsExtentions: any[];
  echartsOptions = {};

  public data = [
    {
      "name" : "Jayesh",
      "upload" : 500
    },
    {
      "name" : "Prachi",
      "upload" : 800
    },
    {
      "name" : "Supriya",
      "upload" : 1200
    },
    {
      "name" : "Preet",
      "upload" : 700
    },
    {
      "name" : "Palash",
      "upload" : 550
    }
    ,
    {
      "name" : "Arpit",
      "upload" : 550
    }
  ]

  constructor() {
    this.echartsExtentions = [BarChart, TooltipComponent, GridComponent, LegendComponent];
  }

  ngOnInit() {
    this.echartsOptions = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      xAxis: {
        type: "category",
        data: this.data.map(data => data.name),
        axisLabel: {
          show: false
        }
      },
      legend: {
        show:false,
        bottom: 0
      },
      series: [
        {
          name: "Upload",
          type: "bar",  
          data: this.data.map((data, index) => ({
            value: data.upload,
            itemStyle: {
              color: index === 2 ? '#7367f0' : '#b8c2cc',
              barBorderRadius: [50, 50, 0, 0]
            }
          })),
          barWidth: '40%'
        },
      ]
    };
  }
}
