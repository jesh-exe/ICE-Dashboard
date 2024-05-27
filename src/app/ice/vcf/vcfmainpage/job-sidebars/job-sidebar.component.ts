import { Component, OnInit } from "@angular/core";
import { IceLogService } from "app/ice/services/ice-log.service";
import { VcfService } from "app/ice/vcf/vcf-service/vcf.service";

@Component({
  selector: "app-job-sidebar",
  templateUrl: "./job-sidebar.component.html",
})
export class JobSidebarComponent implements OnInit {
  public jobs;
  public searchText;

  constructor(private service: VcfService, private logService: IceLogService) {}

  openJob(id) {
    this.logService.debug("id:" + id);
    this.service.openJob(id);
  }

  ngOnInit(): void {
    this.service.getallJobs().subscribe((value) => {
      this.logService.debug("AllJobs" + value);
      this.jobs = value;
    });
  }
}
