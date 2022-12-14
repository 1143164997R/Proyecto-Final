import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')
  center = {
    lat: 0,
    lng: 0
  }
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  markerId; 
  coordinates: any [] =[];
  constructor() { }
  ngOnInit() {
  }


  async ionViewDidEnter(){
    await this.getCurrentPosition();
    this.watchPosition();
  }

  async createMap(){
    this.newMap = await GoogleMap.create({
      id:'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config: {
        center: this.center,
        zoom:14,
      }
    });
    this.addMarker(this.center.lat, this.center.lng)
    this.addListeners();
  }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
    this.createMap();
  }

  async addMarker(lat, lng){
    this.markerId = await this.newMap.addMarker({
      coordinate:{
        lat: lat,
        lng: lng
      },
      draggable: true,
      iconUrl:'assets/Images/musica.png'
    });
  }

  async removeMarker(id?){
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  showCoordsHistory(){
    this.coordinates.forEach(coord => {
      this.addMarker(coord.lat, coord.lng);
    });
  }

  setCamera(lat, lng){
    this.removeMarker()
    this.addMarker(lat, lng)
    this.newMap.setCamera({
      coordinate:{
        lat: lat,
        lng: lng
      },
      animate: false,
      animationDuration: 1000
    });
    
  }

  async watchPosition(){
    await Geolocation.watchPosition({}, position=>{
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setCamera(this.center.lat, this.center.lng)
      this.coordinates.push({coordinate:{
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      })
    });
  }

  async addListeners(){

    await this.newMap.setOnMarkerClickListener((event)=>{
      this.removeMarker(event.markerId);
    })

    await this.newMap.setOnMapClickListener((event)=>{
      this.addMarker(event.latitude, event.longitude);
    })
  }
}
