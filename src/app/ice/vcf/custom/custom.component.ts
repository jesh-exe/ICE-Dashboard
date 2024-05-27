import { Component, Input, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-custom",
  templateUrl: "./custom.component.html",
  styleUrls: ["./custom.component.scss"],
})
export class CustomComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef;
  @Input() msgJSON: any;
  public data;
  constructor() {}
  ngOnInit(): void {
    console.log("onIt", this.msgJSON);
    this.data = this.msgJSON;
  }

  onLoad() {
    console.log("Onload", this.data);
    this.iframe.nativeElement.contentWindow.postMessage(this.msgJSON, "*");
    // this.iframe.nativeElement.style.display = "none";
    this.iframe.nativeElement.style.height =
      this.iframe.nativeElement.contentWindow.document.body.scrollHeight + "px";
  }
}
