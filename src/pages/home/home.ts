import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosService, CarritoService, UsuarioService } from "../../providers/index.services";
import { ProductoPage } from '../index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private _ps: ProductosService,
              private _cs: CarritoService,
              private _us: UsuarioService) {

  }

  siguiente_pagina( infiniteScroll ){
    this._ps.cargar_todos().then( ()=>{
         infiniteScroll.complete();
      })
  }

  enviarProducto( producto:any ){
    this.navCtrl.push( ProductoPage, { producto }  )
  }

}
