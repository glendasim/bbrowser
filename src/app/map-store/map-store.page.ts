import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapSettingsService } from '../map-settings.service';

declare var google;

@Component({
  selector: 'app-map-store',
  templateUrl: './map-store.page.html',
  styleUrls: ['./map-store.page.scss'],
})
export class MapStorePage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement;
  map: any;
  myLocation: any;
  constructor(private mapService: MapSettingsService) {}

  ngOnInit() {}

  listMarkers = [
    {
      position: new google.maps.LatLng(1.3523958344894185, 103.94434983259349),
      store: "Popular Bookstore",
      location: "Tampines Mall",
      time: "0900 - 2100"
    },
    {
      position: new google.maps.LatLng(1.3529983669544374, 103.94476301742746),
      store: "Popular Bookstore",
      location: "Tampines Mall",
      time: "0900 - 2100"
    },
    {
      position: new google.maps.LatLng(1.3476137226296256, 103.9377508732945),
      store: "Popular Bookstore",
      location: "Tampines Mall",
      time: "0900 - 2100"
    },
  ];

  ngAfterViewInit() {
    let mapOptions = {
      center: { lat: 1.3508825777500164, lng: 103.94122230684937 },
      zoom: 15,
      zoomControl: false,
      rotateControl: true,
      mapTypeControl: false,
      disableDefaultUI: true,
      styles: this.mapService.mapStyle,
    };
    // render the map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.mark();
  }

  mark() {

    for (let i = 0; i < this.listMarkers.length; i++) {
      const contentString =
      '<div id="content" style="color: black">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' + this.listMarkers[i].store + '</h1>' +
      '<div id="bodyContent" style="color: black">' +
      "<p>Location: " + this.listMarkers[i].location + "</p>" +
      "<p>Time: " + this.listMarkers[i].time + "</p>" +
      "</div>" +
      "</div>";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: this.listMarkers[i].position,
        map: this.map,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: this.map,
          shouldFocus: false,
        });
    })
    }
  }
}
