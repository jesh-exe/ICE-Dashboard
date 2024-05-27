import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { VcfService } from "../../vcf-service/vcf.service";
import { colors } from "app/colors.const";
import { IceLogService } from "app/ice/services/ice-log.service";
import { CoreConfigService } from "@core/services/config.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";
@Component({
  selector: "app-job-content",
  templateUrl: "./job-content.component.html",
  styleUrls: ["./job-content.component.scss"],
})
export class JobContentComponent implements OnInit {
  @ViewChild("budgetChartRef") budgetChartRef: any;
  @ViewChild("scrollMe") scrollMe: ElementRef;

  public isMenuToggled = false;
  scrolltop: number = null;
  public activeJob: Boolean;
  public Jobs: any;
  public msgJSON: any;
  public budgetChartoptions;
  private $budgetStrokeColor2 = "#dcdae3";
  constructor(
    private service: VcfService,
    private logService: IceLogService,
    private _coreConfigService: CoreConfigService,
    private toast: HotToastService,
    private router: Router
  ) {
    this.budgetChartoptions = {
      chart: {
        height: 80,
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "line",
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 5],
        width: [2],
      },
      colors: [colors.solid.primary, this.$budgetStrokeColor2],
      tooltip: {
        enabled: false,
      },
    };
  }
  navigateTo() {
    this.router.navigate(["file", "drive"], {
      queryParams: { path: "vcf-analysis-result" },
    });
  }
  expandedRows: { [key: string]: boolean } = {};

  toggleReadMore(item: any) {
    this.expandedRows[item.key] = !this.expandedRows[item.key];
  }
  ngOnInit(): void {
    this.service.onJobOpenChange.subscribe((res) => {
      this.activeJob = res;
      this.logService.debug("Active Job in job content" + JSON.stringify(res));
      setTimeout(() => {
        this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
      }, 0);
    });

    this.service.onSelectedJobChange.subscribe((res) => {
      this.Jobs = res;
      // this.Jobs.popcode.set(JSON.parse(res.popcode));
      this.logService.debug("Job in job content :" + JSON.stringify(res));
      if (res.popcode) {
      }
      if (res.jsonResponse) {
        console.log(res.jsonResponse);
        this.service.getPresignedUrl(res.jsonResponse).subscribe(
          (value) => {
            console.log(value);
            this.msgJSON = value;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
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
            this.budgetChartoptions.chart.width =
              this.budgetChartRef?.nativeElement.offsetWidth;
          }, 100);
        }
      });
  }
}
