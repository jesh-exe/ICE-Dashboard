import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images = ["ICE01","ICE02", "ICE03"].map((n) => `assets/images/carousel/${n}.jpg`);

  constructor() { }

  ngOnInit(): void {
  }

}
