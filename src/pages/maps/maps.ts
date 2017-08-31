import { Component } from '@angular/core';

import { UbicacionService } from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  lat: number;
  lng: number;

  constructor( private _ubicacion: UbicacionService ) {
      this._ubicacion.iniciar_localizacion();

  }

}
