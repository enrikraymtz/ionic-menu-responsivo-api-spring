import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../usuario/usuario';

//URL SERVICIO
import { URL_SERVICIOS } from '../../config/url.servicios';

//Paginas que funcionaran como modalCtrl
import { LoginPage, CarritoPage } from '../../pages/index.paginas';

@Injectable()
export class CarritoService {

  headers:any;
  items:any[] = [];
  total_carrito:number = 0;
  ordenes:any[] = [];

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage,
              private _us: UsuarioService,
              private modalCtrl: ModalController) {
    console.log('Hello CarritoProvider Provider');
    this.cargar_storage();
    this.actualizar_total();
    this.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this._us.token
    });
  }

  remove_item( idx:number ){
    this.items.splice( idx, 1 );
    this.guardar_storage();
  }

  ver_carrito(){
    let modal:any;
    if( this._us.token ){
      //Mostrar carrito
      modal = this.modalCtrl.create( CarritoPage );
    }else{
      //Mostrar modal
      modal = this.modalCtrl.create( LoginPage );
    }

    modal.present();

    modal.onDidDismiss( (abrirCarrito:boolean) =>{
      if (abrirCarrito){
        this.modalCtrl.create( CarritoPage ).present();
      }
    })
  }

  realizar_pedido(){
    let codigos:string[] = [];
    let data:string;

    for( let item of this.items ){
      codigos.push( item.codigo );
    }

    data = JSON.stringify({ items: codigos.join(",") });

    let url = URL_SERVICIOS + "/pedidos/realizar_orden";
    return this.http.post( url, data, { headers: this.headers })
                    .subscribe( resp=> {
                      let respuesta = resp.json();

                      if( respuesta.status = "SUCCESS" ){
                        //todo bien
                        this.items = [];
                        this.guardar_storage();
                        this.alertCtrl.create({
                          title: "Orden realizada",
                          subTitle: "Nos contactaremos con usted proximamente",
                          buttons: ["OK"]
                        }).present();
                      }else{
                        //error
                        console.log("Error");
                        this.alertCtrl.create({
                          title: "Error en la orden",
                          subTitle: respuesta.message,
                          buttons: ["OK"]
                        }).present();
                      }

                    });
  }

  agregar_carrito( item_parametro:any ){
    for(let item of this.items ){
      if( item.codigo == item_parametro.codigo ){
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.producto+ ", ya se encuentra en su carrito de compra",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    this.items.push( item_parametro );
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total(){
    this.total_carrito = 0;
    for(let item of this.items){
      this.total_carrito += Number( item.precio_compra );
    }
  }

  private guardar_storage(){
    if(this.platform.is("cordova")){
      //Estamos en el dispositivo
       this.storage.set('items', this.items );
    }else{
      //Estamos en el Desktop
      localStorage.setItem("items", JSON.stringify(this.items) );
    }
  }

  cargar_storage(){
    let promesa = new Promise( (resolve, reject)=>{
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        this.storage.ready().then( ()=>{
          this.storage.get('items').then((items) => {
            if( items ){
              this.items = items;
            }
              resolve();
          });
        });
      }else{
        //Estamos en el Desktop
        if( localStorage.getItem("items") ){
          this.items = JSON.parse( localStorage.getItem("items") );
        }
          resolve();
      }

    });
    return promesa;
  }

  cargar_ordenes(){
    let url = URL_SERVICIOS + "/pedidos/obtener_orden";
    this.http.get( url, { headers: this.headers })
                    .map( resp =>  resp.json() )
                    .subscribe( data =>{
                        if( data.status == "SUCCESS" ){
                            this.ordenes = data.data;
                        }else{
                          //error
                        }
                    });
  }

  borrar_orden( id_orden ){
    let url = URL_SERVICIOS + "/pedidos/delete_orden/"+id_orden;
    return this.http.delete( url, { headers: this.headers })
                    .map( resp => resp.json() );
  }

}
