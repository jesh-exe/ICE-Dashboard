import { Component, OnInit } from '@angular/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  echartsExtentions: any;
  echartsOptions = {};


  constructor() {
    this.echartsExtentions = [
      TooltipComponent,
      GridComponent,
      LegendComponent,
      LineChart
    ]
  }

  ngOnInit() {

    const data = [
      {
        "time": "2000-06-05",
        "value": 116
      },
      {
        "time": "2000-06-06",
        "value": 129
      },
      {
        "time": "2000-06-07",
        "value": 135
      },
      {
        "time": "2000-06-08",
        "value": 86
      },
      {
        "time": "2000-06-09",
        "value": 73
      },
      {
        "time": "2000-06-10",
        "value": 85
      }
    ];    

    const dateList = data.map(function (item) {
      return item.time;
    });
    const valueList = data.map(function (item) {
      return item.value;
    });

    this.echartsOptions = {
      visualMap:
      {
        show: false,
        type: 'continuous'
      },
      title:
      {
        left: 'center',
        text: 'Gradient along the y axis'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis:
      {
        data: dateList
      },
      yAxis: {

      },
      series:
      {
        type: 'line',
        showSymbol: false,
        data: valueList
      },
    };

  }
}
