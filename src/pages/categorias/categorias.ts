import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosService }  from "../../providers/index.services";
//import { PorCategoriasPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  porCategoria = "PorCategoriasPage";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _ps: ProductosService) {
  }



}
