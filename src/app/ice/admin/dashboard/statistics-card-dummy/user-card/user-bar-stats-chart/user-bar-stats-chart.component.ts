import { Component, OnInit } from '@angular/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';


@Component({
  selector: 'app-user-bar-stats-chart',
  templateUrl: './user-bar-stats-chart.component.html',
  styleUrls: ['./user-bar-stats-chart.component.scss']
})
export class UserBarStatsChartComponent implements OnInit {


  readonly echartsExtentions: any[];
  echartsOptions = {};

  public data = [
    {
      "name" : "Online",
      "upload" : 143
    },
    {
      "name" : "Offline",
      "upload" : 97
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
      grid : {
        top: 10,
        bottom : 0,
        left : 0
      },
      xAxis: {
        type: "value",
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "category",
        data: this.data.map(data => data.name),
        axisLabel: {
          // show: false
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
              color : index == 0 ? "green" : "red",
              barBorderRadius: [0,50,50,0,]
            }
          })),
          barWidth: '40%'
        },
      ]
    };
  }
}
