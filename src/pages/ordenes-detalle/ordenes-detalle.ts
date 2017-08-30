import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoService } from '../../providers/index.services';

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoService ) {
    this.orden = this.navParams.get( "orden" );
    console.log(this.orden);
  }

  borrar_orden( id ){
    this._cs.borrar_orden( id )
            .subscribe( data => {
              if( data.status == "SUCCESS" ){
                this.navCtrl.pop();
              }else{
                  //manejo de errores

              }
            });
  }

}
