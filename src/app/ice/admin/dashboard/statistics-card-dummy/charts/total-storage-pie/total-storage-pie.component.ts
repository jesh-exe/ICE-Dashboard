import { Component, OnInit } from '@angular/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

@Component({
  selector: 'app-total-storage-pie',
  templateUrl: './total-storage-pie.component.html',
  styleUrls: ['./total-storage-pie.component.scss']
})
export class TotalStoragePieComponent implements OnInit {

  echartExtensions: any[]
  echartsOptions = {}

  public dataFromBackend : any = {
    totalSize : "216478792",
    totalUsed : "195057424",
    available : "21421368",
    usePercentage : "91",
    fileSystem : "sda6"
  }


  constructor() {
    this.echartExtensions = [TooltipComponent,
      LegendComponent,
      PieChart,
      GridComponent
    ]
  }

  ngOnInit() {
    console.log(this.convertToGigaByte(this.dataFromBackend.totalSize));
    this.echartsOptions = {
      grid: {
        left: 10,
        right: '55%', // Adjust the right value to position the pie chart on the right side
        top: 'center',
        bottom: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 'center',
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '85%'],
          center: ['83%', '50%'],
          label: {
            show: false
          },
          data: [
            { value: this.convertToGigaByte(this.dataFromBackend.available), name: 'Remaining', itemStyle : {color : "#eec281"}},
            { value: this.convertToGigaByte(this.dataFromBackend.totalUsed), name: 'Used', itemStyle : {color : "#d17d15"}},
          ]
        }
      ]
    };
  }

  public convertToGigaByte(size : string | number ) : number
  {
    if(typeof(size) === "string")
      size = Number.parseInt(size);
    return Math.round((size/1000000));
  }

}
