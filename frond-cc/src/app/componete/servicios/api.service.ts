import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Constantes
import { 
	ConfiguracionConstante 
} from './constantes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    public http: HttpClient,
	private _constante : ConfiguracionConstante,
  ) {
  }

  Delete(ruta: string) {
    return this.http.delete(this._constante.API_ENDPOINT + ruta, { headers: this.Cabeceros() });
  }

  Put(objeto: any, ruta: string) {
    return this.http.put(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabeceros() });
  }

  Post(objeto: any, ruta: string) {
    return this.http.post(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabeceros() });
  }
  

  Get(ruta: string, parametros: HttpParams = new HttpParams()) {

    return this.http.get(this._constante.API_ENDPOINT + ruta, {
      headers: this.Cabeceros(),
      params: parametros
    });
  }


  Download(ruta: string, parametros: HttpParams = new HttpParams()) {
    return this.http.get(this._constante.API_ENDPOINT + ruta, {
      headers: this.Cabeceros(),
      params: parametros,
      responseType: 'blob'
    });
  }


  private Cabeceros() {
    let currentUser = localStorage.getItem('token');
    
    if (currentUser) {
      return new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + currentUser 
      });
    }
    
    // Agregar un valor de retorno predeterminado
    return new HttpHeaders({
      'Content-Type':  'application/json'
    });
  }



}