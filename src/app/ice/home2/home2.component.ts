import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { PlyrComponent } from "ngx-plyr";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from "@angular/animations";
declare const L: any;
@Component({
  selector: "app-home",
  templateUrl: "./home2.component.html",
  styleUrls: ["./home2.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate(
          "600ms ease-in",
          style({ transform: "translateX(0%)", opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class Home2Component implements OnInit, OnDestroy {
  images = ["cdac"].map((n) => `assets/images/carousel/${n}.jpeg`);
  show: boolean = true;
  map: any;
  @ViewChild(PlyrComponent)
  public plyr: PlyrComponent;

  constructor(private router: Router) {}

  public centeredSlideIndex = 1;
  public swiperCenteredSlides: SwiperConfigInterface = {
    // slidesPerView: 5,
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  public player: Plyr;
  public plyrOptions = { tooltips: { controls: true } };
  public poster = environment.s3Url + "/ice-public/videos/anvaya.png";
  public videoSources: Plyr.Source[] = [
    {
      src: environment.s3Url + "/ice-public/videos/Anvaya-HD.mp4",
      type: "video/mp4",
      size: 576,
    },
  ];
  public poster1 = environment.s3Url + "/ice-public/videos/biology.png";

  public videoSources1: Plyr.Source[] = [
    {
      src:
        environment.s3Url +
        "/ice-public/videos/BIGDATA-Bioinfomatic-2018-Final.mp4",
      type: "video/mp4",
      size: 576,
    },
  ];

  public contentHeader: object;

  trackByFn(index, material) {
    return index; // or material.id
  }

  aboutus() {
    this.router.navigate(["/aboutUs"]);
  }

  contactus() {
    this.router.navigate(["/contactUs"]);
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.map = L.map("map1").setView(
      [18.534874165051413, 73.81091636841792],
      13
    ); //13 is for zoom

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJlZXRqOTciLCJhIjoiY2t3eGQ5ZmxoMGN6NDJwbGNuejZyMzVlNSJ9.lsETVMMk85Xt7vZi8pNghw",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ).addTo(this.map);

    let marker = L.marker([18.534874165051413, 73.81091636841792]).addTo(
      this.map
    );

    marker
      .bindPopup(
        "<b>CDAC Pune<br>Innovation Park 34, B/1, Panchawati Rd, Panchawati, Pashan, Pune, Maharashtra 411008</b>"
      )
      .openPopup();
    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
        ],
      },
    };
  }
  ngOnDestroy() {
    console.log("Items destroyed");
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }
}
