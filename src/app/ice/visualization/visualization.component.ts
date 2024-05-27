import { AfterViewInit, Component, OnInit } from "@angular/core";
import { IceLogService } from "../services/ice-log.service";

@Component({
  selector: "app-visualization",
  templateUrl: "./visualization.component.html",
  styleUrls: ["./visualization.component.scss"],
})
export class VisualizationComponent implements OnInit, AfterViewInit {
  public contentHeader: object;
  mainChart: any;

  constructor(private logService: IceLogService) {}
  public handleMainChart(chartData: any) {
    this.logService.debug("main chart data");
    this.mainChart = chartData;
    this.logService.debug(this.mainChart);
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "Circo Graph",
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
            name: "Visualization",
            isLink: false,
          },
        ],
      },
    };
  }
  ngAfterViewInit() {
    this.logService.debug("parent");
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
