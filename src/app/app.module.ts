import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Services
import { MyApp } from './app.component';
import { CarritoService } from '../providers/carrito/carrito';
import { ProductosService } from '../providers/productos/productos';
import { UsuarioService } from '../providers/usuario/usuario';

//pipes
import { ImagenPipe } from '../pipes/imagen/imagen';

//plugins
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

//Components
import {
  CarritoPage,
  CategoriasPage,
  HomePage,
  LoginPage,
  OrdenesPage,
  PorCategoriasPage,
  ProductoPage,
  TabsPage,
  OrdenesDetallePage
} from '../pages/index.paginas';

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarritoPage,
    CategoriasPage,
    HomePage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoService,
    ProductosService,
    UsuarioService
  ]
})
export class AppModule {}
