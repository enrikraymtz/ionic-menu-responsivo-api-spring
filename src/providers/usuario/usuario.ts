import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class UsuarioService {

  token:string;
  data:any;
  headers:any;

  constructor(public http: Http,
              private platform: Platform,
              private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');

    this.cargar_storage();

    this.headers = new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });
  }

  index(){
    return 0;
  }

  activo():boolean{
    if( this.token ){
      return true;
    }else{
      return false;
    }
  }

  ingresar( email:string, contrasena:string){
    this.data = JSON.stringify({ username: email, password: contrasena });
    let url = URL_SERVICIOS + "/auth/login";
    return this.http.post( url, this.data, { headers: this.headers })
                    .map( resp =>{
                      let data_resp = resp.json();
                      if(data_resp.token){
                          this.token = data_resp.token;
                          console.log(this.token);
                          //guardar en storage
                          this.guardar_storage();
                      }

                    });
  }

  cerrar_session(){
    this.token = null;
    //guardar en storage
    this.guardar_storage();
  }

  private guardar_storage(){
    if(this.platform.is("cordova")){
      //Estamos en el dispositivo
       this.storage.set('token', this.token );
    }else{
      //Estamos en el Desktop
      if( this.token ){
        localStorage.setItem("token", this.token );
      }else{
        localStorage.removeItem("token");
      }

    }
  }

  cargar_storage(){
    let promesa = new Promise( (resolve, reject)=>{
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        this.storage.ready().then( ()=>{
          this.storage.get('token').then((token) => {
            if( token ){
              this.token = token;
            }
              resolve();
          });
        });
      }else{
        //Estamos en el Desktop
        if( localStorage.getItem("token") ){
          this.token = localStorage.getItem("token");
        }
          resolve();
      }

    });
    return promesa;
  }

}
