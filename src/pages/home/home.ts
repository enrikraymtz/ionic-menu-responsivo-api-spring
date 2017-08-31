import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { ProductosService, CarritoService, UsuarioService } from "../../providers/index.services";
//import { ProductoPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private _ps: ProductosService,
              private _cs: CarritoService,
              private _us: UsuarioService) {
      this._cs.index();
      this._ps.index();
      this._us.index();
  }

  siguiente_pagina( infiniteScroll ){
    this._ps.cargar_todos().then( ()=>{
         infiniteScroll.complete();
      })
  }

  enviarProducto( producto:any ){
    this.navCtrl.push( "ProductoPage", { producto }  )
  }

}
