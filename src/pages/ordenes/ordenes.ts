import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoService } from '../../providers/index.services';
//import { OrdenesDetallePage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle = "OrdenesDetallePage";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoService ) {

  }

  ionViewWillEnter() {
    console.log('Cargando ordenes');
    this._cs.cargar_ordenes();
  }

}
