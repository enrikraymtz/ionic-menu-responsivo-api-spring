import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosService } from '../../providers/index.services';
import { ProductoPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps: ProductosService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaPage');
  }

  buscar_productos(ev: any){
     let val = ev.target.value;
     this._ps.buscar_producto(val);
  }

  enviarProducto( producto:any ){
    this.navCtrl.push( ProductoPage, { producto }  )
  }

}
