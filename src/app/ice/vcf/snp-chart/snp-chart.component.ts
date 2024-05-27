import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  TemplateRef,
} from "@angular/core";
import { CoreConfigService } from "@core/services/config.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates,
} from "ng-apexcharts";
import { colors } from "app/colors.const";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HotToastService } from "@ngneat/hot-toast";
export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}

@Component({
  selector: "app-snp-chart",
  templateUrl: "./snp-chart.component.html",
  styleUrls: ["./snp-chart.component.scss"],
})
export class SnpChartComponent implements OnInit {
  @Input() msgResponse: any;
  @Input() selectCollection: any;
  public isMenuToggled = false;
  @ViewChild("apexBarChartRef") apexBarChartRef: any;
  @ViewChild("modalLG", { read: TemplateRef })
  sayHelloTemplate: TemplateRef<any>;
  public apexBarChart: Partial<ChartOptions>;
  public showData: any;
  constructor(
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal,
    private toast: HotToastService
  ) {}

  ngOnChanges() {
    this.callme();
  }

  ngOnInit(): void {
    this.callme();
  }
  callme() {
    var data = this.msgResponse.statsChrCountMap;
    // var length=data.length;
    var xaxisvalues = [];
    var yaxisvalues = [];
    for (const [key, value] of Object.entries(data)) {
      // console.log(key, value);
      xaxisvalues.push(key);
      yaxisvalues.push(value);
    }
    // var xaxisvalues = data.map(function(val, index){
    //   return val.chromosome;
    // })
    // var yaxisvalues = data.map(function(val, index){
    //   return val.mutationCount;
    // })
    this.apexBarChart = {
      series: [
        {
          name: "Mutation",
          data: yaxisvalues,
        },
      ],
      chart: {
        type: "bar",
        zoom: {
          enabled: true,
        },
        // events: {
        //   click(event, chartContext, config) {
        //     // var found;
        //     debugger;
        //     // console.log(config);
        //     // console.log(xaxisvalues[config.dataPointIndex]);
        //     console.log(datafull[xaxisvalues[config.dataPointIndex]]);
        //     var click = datafull[xaxisvalues[config.dataPointIndex]]
        //     Object.keys(click);
        //     // this.showData = click;
        //     // this.modalService.open(this.sayHelloTemplate, {
        //     //   scrollable: true,
        //     //   size: 'xl',
        //     // });
        //     Swal.fire(
        //       {
        //         title: 'Map Of Mutation Count:',
        //         text: JSON.stringify(Object.keys(click)),
        //         showCloseButton: true,
        //         customClass: {
        //           confirmButton: 'btn btn-primary'
        //         }
        //       });
        //   },
        // },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
          },
          export: {
            csv: {
              filename: this.selectCollection,
              columnDelimiter: ",",
              headerCategory: "Chromosomes",
              headerValue: "Mutation",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: this.selectCollection,
            },
            png: {
              filename: this.selectCollection,
            },
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: [colors.solid.success],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: xaxisvalues,
        tickPlacement: "on",
        labels: {
          formatter: function (value) {
            return value;
          },
        },
        title: {
          text: "Chromosomes",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: colors.solid.primary,
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          formatter: function (value) {
            return value + "";
          },
        },
        title: {
          text: "Mutation",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: colors.solid.primary,
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Mutation";
          },
        },
        x: {
          formatter: function (val) {
            return "Chromosome : " + val;
          },
        },
      },
    };
    this._coreConfigService
      .getConfig()
      .pipe(
        this.toast.observe({
          loading: "Loading...",
          success: "Success",
          error: "Error",
        })
      )
      .subscribe((config) => {
        if (
          config.layout.menu.collapsed === true ||
          config.layout.menu.collapsed === false
        ) {
          setTimeout(() => {
            this.isMenuToggled = true;
            this.apexBarChart.chart.width =
              this.apexBarChartRef?.nativeElement.offsetWidth;
          }, 900);
        }
      });
  }
}
