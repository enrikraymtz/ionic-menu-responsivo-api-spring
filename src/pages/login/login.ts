import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { UsuarioService } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string = "";
  contrasena:string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl:AlertController,
              private viewCtrl: ViewController,
              private _us: UsuarioService) {
  }

  ingresar( ){
    this._us.ingresar( this.email, this.contrasena )
            .subscribe( ()=>{
              if( this._us.activo() ){
                this.viewCtrl.dismiss(true);
              }else{
                this.alertCtrl.create({
                  title: "Error al iniciar",
                  subTitle: "Usuario y/o Contraseña incorrectos!",
                  buttons: ["OK"]
                }).present();
              }
            });
  }

}
