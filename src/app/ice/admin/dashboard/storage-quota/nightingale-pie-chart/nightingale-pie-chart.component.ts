import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { LegendComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

@Component({
  selector: 'app-nightingale-pie-chart',
  templateUrl: './nightingale-pie-chart.component.html',
  styleUrls: ['./nightingale-pie-chart.component.scss']
})
export class NightingalePieChartComponent implements OnInit, OnChanges {

  @Input() data: any[];

  echartsExtensions: any[];
  echartsOptions = {};

  constructor() {
    this.echartsExtensions = [
      ToolboxComponent,
      LegendComponent,
      PieChart,
      CanvasRenderer,
    ];
  }

  ngOnChanges(): void {
    this.loadChart();
  }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    this.echartsOptions = {
      tooltip: {
        show: true
      },
      legend: {
        show: true,
        // bottom : 0,
        left : 'left',
        orient : 'vertical'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Storage Used',
          type: 'pie',
          radius: [20, 180],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          label: {
            show: false
          },
          data: this.data ? this.data.map(val => ({
            value: val.quotaUsed,
            name: val.username,
          })) : []
        }
      ]
    };
  }

}
