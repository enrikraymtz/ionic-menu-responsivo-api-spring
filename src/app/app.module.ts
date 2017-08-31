import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Services
import { MyApp } from './app.component';
import { CarritoService } from '../providers/carrito/carrito';
import { ProductosService } from '../providers/productos/productos';
import { UsuarioService } from '../providers/usuario/usuario';
import { UbicacionService } from '../providers/ubicacion/ubicacion';

//pipes

//plugins
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

//mapas
import { AgmCoreModule } from '@agm/core';

import { MapsPage } from '../pages/maps/maps';
import { TabsPage } from '../pages/tabs/tabs'

@NgModule({
  declarations: [
    MyApp,
    MapsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASWjtsLS3cT6eqz1ASh84yOD0cOY8kwko'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoService,
    Geolocation,
    ProductosService,
    UsuarioService,
    UbicacionService
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
