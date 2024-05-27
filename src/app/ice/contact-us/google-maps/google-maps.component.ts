import { Component, OnDestroy, OnInit } from "@angular/core";
declare const L: any;

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.scss"],
})
export class GoogleMapsComponent implements OnInit, OnDestroy {
  constructor() {}
  public map: any;
  ngOnInit(): void {
    this.map = L.map("map").setView(
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
  }
  ngOnDestroy() {
    console.log("Items destroyed contact Us");
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }
}
