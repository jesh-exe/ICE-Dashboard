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
// import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  selector: "app-snp-chart-analysis",
  templateUrl: "./snp-chart-analysis.component.html",
  styleUrls: ["./snp-chart-analysis.component.scss"],
})
export class SnpChartAnalysisComponent implements OnInit {
  @Input() msgResponse: any;
  @Input() selectCollection: any;
  public isMenuToggled = false;
  @ViewChild("apexBarChartRef") apexBarChartRef: any;
  @ViewChild("modalLG", { read: TemplateRef })
  sayHelloTemplate: TemplateRef<any>;
  public apexBarChart: Partial<ChartOptions>;
  showData: any;

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
    var donut = {
      series1: "#666699",
      series2: "#009434",
      series3: "#ffe700",
      series4: "#09C596",
      series5: "#C06500",
      series6: "#C02B37",
    };
    var data = this.msgResponse.statsMap;
    // var length=data.length;
    var datafull = this.msgResponse.statsMap;
    var xaxisvalues = [];

    // var xaxisvalues = data.map(function(val, index){
    //   return val.chromosome;
    // })
    var A_A: number[] = [];
    var A_T: number[] = [];
    var A_G: number[] = [];
    var A_C: number[] = [];
    var T_A: number[] = [];
    var T_T: number[] = [];
    var T_G: number[] = [];
    var T_C: number[] = [];
    var G_A: number[] = [];
    var G_T: number[] = [];
    var G_G: number[] = [];
    var G_C: number[] = [];
    var C_A: number[] = [];
    var C_T: number[] = [];
    var C_G: number[] = [];
    var C_C: number[] = [];
    for (const [key, m] of Object.entries(data)) {
      // console.log(key, m);
      xaxisvalues.push(key);
      A_A.push(m["A/A"]?.count | 0);
      A_T.push(m["A/T"]?.count | 0);
      A_G.push(m["A/G"]?.count | 0);
      A_C.push(m["A/C"]?.count | 0);
      G_A.push(m["G/A"]?.count | 0);
      G_T.push(m["G/T"]?.count | 0);
      G_G.push(m["G/G"]?.count | 0);
      G_C.push(m["G/C"]?.count | 0);
      T_A.push(m["T/A"]?.count | 0);
      T_T.push(m["T/T"]?.count | 0);
      T_C.push(m["T/C"]?.count | 0);
      T_G.push(m["T/G"]?.count | 0);
      C_A.push(m["C/A"]?.count | 0);
      C_T.push(m["C/T"]?.count | 0);
      C_G.push(m["C/G"]?.count | 0);
      C_C.push(m["C/C"]?.count | 0);
    }
    //console.log(xaxisvalues,A_A);

    // for (const [key, value] of Object.entries(data)) {
    //   console.log(key, value);
    //   var data1 = value;
    //   for (const [key, value] of Object.entries(data1)) {
    //     console.log(key, value);
    //     var data2 = value;
    //     for (const [key, value] of Object.entries(data1)) {
    //       console.log(key, value);
    //       xaxisvalues.push(key);
    //     }
    //   }
    // }

    // data.map(function (val, index) {
    //   var m = val.mapOfMutationCount;
    //   A_A.push(m['A/A'] | 0);
    //   A_T.push(m['A/T'] | 0);
    //   A_G.push(m['A/G'] | 0);
    //   A_C.push(m['A/C'] | 0);
    //   G_A.push(m['G/A'] | 0);
    //   G_T.push(m['G/T'] | 0);
    //   G_G.push(m['G/G'] | 0);
    //   G_C.push(m['G/C'] | 0);
    //   T_A.push(m['T/A'] | 0);
    //   T_T.push(m['T/T'] | 0);
    //   T_C.push(m['T/C'] | 0);
    //   T_G.push(m['T/G'] | 0);
    //   C_A.push(m['C/A'] | 0);
    //   C_T.push(m['C/T'] | 0);
    //   C_G.push(m['C/G'] | 0);
    //   C_C.push(m['C/C'] | 0);

    // })

    this.apexBarChart = {
      chart: {
        type: "bar",

        zoom: {
          enabled: true,
        },
        events: {
          click: (event, chartContext, config) => {
            console.log(config);
            console.log(xaxisvalues[config.dataPointIndex]);
            console.log(this.apexBarChart.series[config.seriesIndex]);
            var click = datafull[xaxisvalues[config.dataPointIndex]];
            var click1 =
              click[this.apexBarChart.series[config.seriesIndex].name];
            this.showData = click1.snps;
            this.modalService.open(this.sayHelloTemplate, {
              scrollable: true,
              size: "xl",
            });
          },
        },
        stacked: true,

        toolbar: {
          show: true,
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
      series: [
        {
          name: "A/A",
          data: A_A,
        },
        {
          name: "A/T",
          data: A_T,
        },
        {
          name: "A/G",
          data: A_G,
        },
        {
          name: "A/C",
          data: A_C,
        },
        {
          name: "T/A",
          data: T_A,
        },
        {
          name: "T/T",
          data: T_T,
        },
        {
          name: "T/G",
          data: T_G,
        },
        {
          name: "T/C",
          data: T_C,
        },
        {
          name: "G/A",
          data: G_A,
        },
        {
          name: "G/T",
          data: G_T,
        },
        {
          name: "G/G",
          data: G_G,
        },
        {
          name: "G/C",
          data: G_A,
        },
        {
          name: "C/A",
          data: C_A,
        },
        {
          name: "C/T",
          data: C_T,
        },
        {
          name: "C/G",
          data: C_G,
        },
        {
          name: "C/C",
          data: C_C,
        },
      ],
      colors: [
        colors.solid.primary,
        colors.solid.secondary,
        colors.solid.success,
        colors.solid.info,
        colors.solid.warning,
        colors.solid.danger,
        donut.series1,
        donut.series2,
        donut.series3,
        donut.series4,
        donut.series5,
        donut.series6,
      ],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
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
      yaxis: {
        show: true,
        labels: {
          show: true,
          formatter: function (value) {
            return value + "";
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
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Mutation";
          },
        },
        x: {
          formatter: function (val) {
            return "Chromosomes : " + val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
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
