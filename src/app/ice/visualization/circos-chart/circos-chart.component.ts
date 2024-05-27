import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { lineChart } from "./chart";

window.addEventListener("resize", (event) => console.warn("RESIZE:L", event));
@Component({
  selector: "app-circos-chart",
  templateUrl: "./circos-chart.component.html",
  styleUrls: ["./circos-chart.component.scss"],
})
export class CircosChartComponent implements AfterViewInit {
  @ViewChild("graph") graph!: ElementRef;
  ngAfterViewInit() {
    lineChart(this.graph.nativeElement);
  }
}
