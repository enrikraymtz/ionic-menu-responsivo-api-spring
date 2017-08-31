import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosService } from '../../providers/productos/productos';
//import { ProductoPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoria:any = {};
  pagina:number=0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps: ProductosService) {
    this.pagina = 0;
    this.categoria = this.navParams.get( "categoria" );
    this._ps.por_categoria.length = 0; //Metodo para limpiar el arreglo
    this._ps.cargar_por_categoria( this.categoria.id, this.pagina );
    console.log( this.categoria );
  }


  siguiente_pagina( infiniteScroll ){
      this.pagina++;
      console.log("pagina: "+ this.pagina);
      this._ps.cargar_por_categoria( this.categoria.id, this.pagina ).then(()=> {
        infiniteScroll.complete();
      });
  }

  enviarProducto( producto:any ){
    this.navCtrl.push( "ProductoPage", { producto }  );
  }

}
