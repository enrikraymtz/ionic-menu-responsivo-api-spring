import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CarritoService } from '../../providers/index.services';

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoService,
              private viewCtrl: ViewController) {
    this._cs.index();
    this.viewCtrl.data;
  }

}
