import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { CoreConfigService } from "@core/services/config.service";
import { colors } from "app/colors.const";
import { IceLogService } from "app/ice/services/ice-log.service";
import { AdminService } from "app/ice/admin/admin-service/admin.service";
import { WebsocketService } from "app/ice/services/websocket.service";
import { TimeLine } from "../admin-models/TimeLine";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Stats } from "../admin-models/stats";
import { ActivityMessageDTO } from "../admin-models/ActivityMessageDTO";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public page = 1;
  public pageSize = 6;
  @ViewChild("earningChartRef") earningChartRef: any;
  @ViewChild("statePrimaryChartRef") statePrimaryChartRef: any;
  // Public
  public data: any;
  public storageStats: Stats[] = new Array();
  public overViewChartoptions;
  public statePrimaryChartoptions;
  public storageUseChartoptions;
  public isMenuToggled = false;
  public timeLineData: TimeLine[] = [];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public tl: TimeLine;
  public contentHeader: object;

  chartColors = {
    column: {
      series1: "#826af9",
      series2: "#d2b0ff",
      bg: "#f8d3ff",
    },
    success: {
      shade_100: "#7eefc7",
      shade_200: "#06774f",
    },
    donut: {
      series1: "#ffe700",
      series2: "#00d4bd",
      series3: "#826bf8",
      series4: "#2b9bf4",
      series5: "#FFA1A1",
    },
    area: {
      series3: "#a4f8cd",
      series2: "#60f2ca",
      series1: "#2bdac7",
    },
  };
  // Private
  private $trackBgColor = "#EBEBEB";
  private $earningsStrokeColor3 = "#28c76f33";
  private tempData = [];
  public tempFilterData;
  public previousStatusFilter = "";
  public searchValue = "";
  public timeline;
  filterUpdate(event) {
    this.logService.debug("User is Searching");
    const val: string = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      if (d == null) {
        return;
      }
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 ||
        d.lastName.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.timeLineData = temp;
  }

  filterByStatus(event) {
    const filter = event ? event.value : "";
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.timeLineData = this.tempFilterData;
  }

  filterRows(statusFilter): any[] {
    this.searchValue = "";
    this.logService.debug(statusFilter);
    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.userStatus.indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }
  covertToPercentage(data, type) {
    if (type === "G") {
      return ((data * 1024 * 1024) / 5242880) * 100;
    } else if (type === "M") {
      return ((data * 1024) / 5242880) * 100;
    } else {
      return (data / 5242880) * 100;
    }
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Admin",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Dashboard",
            isLink: false,
          },
        ],
      },
    };
    // this.service.getTotalStorageStatsListPerUser().subscribe((res: any) => {
    //   console.log("Stats", res);
    //   this.storageStats = res.storageList;
    //   // res.storageList.forEach(function (value: any) {
    //   //   console.log(value);
    //   // });
    // });
    // this.service.getTotalStorageStats().subscribe((res: any) => {
    //   console.log("Stats Total", res);
    //   // this.storageStats = res.storageList;
    //   // res.storageList.forEach(function (value: any) {
    //   //   console.log(value);
    //   // });
    // });
    this.service.getTimeline().subscribe((res: ActivityMessageDTO) => {
      this.timeline = res;
      console.log("time", this.timeline);
    });
    this.websocket.onTimeLineDataChange.subscribe((res) => {
      let res1;
      try {
        res1 = JSON.parse(res);
        this.logService.debug("JSON parsed data" + res1);
      } catch (error) {
        this.logService.debug(error);
      }

      if (res1) {
        let tl = new TimeLine();
        tl.userName = res1.userName;
        tl.path = res1.path;
        tl.message = res1.message;
        tl.action = res1.action;
        tl.service = res1.service;
        this.timeLineData.push(tl);
        this.timeLineData = [...this.timeLineData];
        this.tempData = this.timeLineData;
        this.logService.debug("Notify " + this.timeLineData);
        this.logService.debug("I am notified" + this.timeLineData[0].userName);
      }
    });
    // this.service.getUserDetails().subscribe((value) => {
    //   this.logService.debug(JSON.stringify(value));
    //   this.data = value;
    // });
    this._coreConfigService.getConfig().subscribe((config) => {
      setTimeout(() => {
        this.isMenuToggled = true;
        this.storageUseChartoptions.chart.width =
          this.earningChartRef?.nativeElement.offsetWidth;
      }, 1000);
    });
  }
  constructor(
    private _coreConfigService: CoreConfigService,
    private logService: IceLogService,
    private service: AdminService,
    private websocket: WebsocketService
  ) {
    this.storageUseChartoptions = {
      chart: {
        type: "donut",
        height: 120,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [53, 47],
      legend: { show: false },
      comparedResult: [2, 8],
      labels: ["Used", "Unused"],
      stroke: { width: 0 },
      colors: [colors.solid.success, this.$earningsStrokeColor3],
      grid: {
        padding: {
          right: -20,
          bottom: -8,
          left: -20,
        },
      },
      plotOptions: {
        pie: {
          startAngle: -10,
          donut: {
            labels: {
              show: true,
              name: {
                offsetY: 15,
              },
              value: {
                offsetY: -15,
                formatter: function (val) {
                  return parseInt(val) + "%";
                },
              },
              total: {
                show: true,
                offsetY: 15,
                label: "Used",
                formatter: function (w) {
                  return "53%";
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 1325,
          options: {
            chart: {
              height: 100,
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 120,
            },
          },
        },
        {
          breakpoint: 1065,
          options: {
            chart: {
              height: 100,
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 120,
            },
          },
        },
      ],
    };
    this.statePrimaryChartoptions = {
      chart: {
        height: 30,
        width: 30,
        type: "radialBar",
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15,
        },
      },
      colors: [colors.solid.primary],
      series: [54.4],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "22%",
          },
          track: {
            background: this.$trackBgColor,
          },
          dataLabels: {
            showOn: "always",
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
    };
  }
}
