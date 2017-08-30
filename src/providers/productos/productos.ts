import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UsuarioService } from '../usuario/usuario';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosService {

  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];
  resultados:any[] = [];
  headers:any;

  constructor(public http: Http,
              private _us: UsuarioService) {
    console.log('Hello ProductosProvider Provider');
    this.headers = new Headers({
        'Content-Type': 'application/json'
    });
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas(){
    let url = URL_SERVICIOS + "/lineas/get_lineas";
    this.http.get( url, { headers: this.headers })
             .map( resp => resp.json() )
             .subscribe( data => {
               if(data.status == "error"){
                 //Trabajr con errores
               }else{
                 this.lineas = data.data;
               }
             })
  }

  cargar_por_categoria( categoria:number, pagina:number ){
      console.log("Categoria: "+ categoria+" pagina: "+ pagina);
      let promesa = new Promise( (resolve, reject)=> {
        let url = URL_SERVICIOS + "/productos/por_tipo/"+ categoria +"/"+ pagina;
        console.log(url);
        this.http.get(url, { headers: this.headers })
                 .map( resp => resp.json() )
                 .subscribe( data => {
                   if( data.status == "error"){
                    //Trabajr con error
                   }else{
                     console.log( data.data );
                    // let nuevaData = this.agrupar( data.data, 2 );
                     this.por_categoria.push( ...data.data );
                     console.log(this.por_categoria);
                     //this.pagina += 1;
                   }
                   resolve();
                 })
      });
      return promesa;
  }

  cargar_todos(){
      let promesa = new Promise( (resolve, reject)=>{
        let url = URL_SERVICIOS + "/productos/obtener_productos/" + this.pagina;
        this.http.get( url, { headers: this.headers })
                 .map( resp => resp.json() )
                 .subscribe( data =>{
                   console.log(data);
                   if( data.status == "error"){

                   }else{

                  //  let nuevaData =this.agrupar( data.data, 2 );
                     this.productos.push( ...data.data );
                     this.pagina += 1;
                   }
                   resolve();
                 })
      });
      return promesa;
  }

  private agrupar( arr:any, tamano: number){
    let nuevoArreglo = [];
    console.log(arr);
    for ( let i=0; i <= arr.length; i+=tamano){
      nuevoArreglo.push( arr.slice(i, i+tamano ));
    }
    console.log(nuevoArreglo);
    return nuevoArreglo;
  }

  buscar_producto( termino:string){
      let url = URL_SERVICIOS + "/productos/buscar/"+termino;
      this.http.get(url, { headers: this.headers })
               .subscribe( resp =>{
                  let data = resp.json();
                  this.resultados = data.data;
               })
  }

}
