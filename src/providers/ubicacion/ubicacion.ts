import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class UbicacionService {

  lat:number;
  lng:number;

  constructor(private geolocation:Geolocation) {
    console.log('Hello UbicacionProvider Provider');
    
  }

  iniciar_localizacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     this.lat = data.coords.latitude;
     this.lng = data.coords.longitude;
     console.log(data);
     console.log(this.lat);
     console.log(this.lng);
     console.log("peubdas");
    });
  }

}
