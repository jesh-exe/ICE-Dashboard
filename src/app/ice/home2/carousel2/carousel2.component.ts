import { Component, OnInit } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from "@angular/animations";
@Component({
  selector: "app-carousel2",
  templateUrl: "./carousel2.component.html",
  styleUrls: ["./carousel2.component.scss"],
  animations: [
    trigger("slideview", [
      transition(":enter", [
        style({ transform: "translateY(100%)", opacity: 0 }),
        animate(
          "600ms ease-in",
          style({ transform: "translateY(0%)", opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class Carousel2Component implements OnInit {
  show: boolean = true;
  images = ["ICE_1_scaled", "ICE_2_scaled", "ICE_3_scaled", "ICE_4_scaled"].map(
    (n) => `assets/images/carousel/${n}.jpg`
  );

  constructor() {}

  ngOnInit(): void {}
}
