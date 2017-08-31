import { Component } from '@angular/core';
/*
import { HomePage, CategoriasPage, OrdenesPage,
         BusquedaPage, MapsPage, FilePage } from '../index.paginas';
*/

import { MapsPage } from '../maps/maps';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1="HomePage";
  tab2="CategoriasPage";
  tab3="OrdenesPage";
  tab4="BusquedaPage";
  tab5=MapsPage;
  tab6="FilePage";

}
