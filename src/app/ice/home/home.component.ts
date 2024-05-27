import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { PlyrComponent } from "ngx-plyr";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  images = ["cdac"].map((n) => `assets/images/carousel/${n}.jpeg`);
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
  goToAdmin() {
    this.router.navigate(["admin/dashboard"]);
  }
  goToUsers() {
    this.router.navigate(["admin/user/userlist"]);
  }
  goToContactUs() {
    this.router.navigate(["contactUs"]);
  }
  goToAboutUs() {
    this.router.navigate(["aboutUs"]);
  }
  goToUpload() {
    this.router.navigate(["file-uploading"]);
  }
  goToVcf() {
    this.router.navigate(["vcfanalysis/start"]);
  }
  goToFileDrive() {
    this.router.navigate(["file/drive"]);
  }

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
}
