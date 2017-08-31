import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoService } from "../../providers/index.services";
import { Producto } from '../../model/producto.model';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto:Producto;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoService) {
      this._cs.index();
      this.producto = this.navParams.get( "producto" );
      console.log(this.producto, );
  }



}
