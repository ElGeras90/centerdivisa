import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//Constantes
import {
  ConfiguracionConstante, pld_data
} from './constantes';
import { EncryptDataService } from './encriptar';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    public http: HttpClient,
    private _constante: ConfiguracionConstante,
    private _constantepld: pld_data,
    private enc: EncryptDataService
  ) {
  }

  Delete(ruta: string) {
    return this.http.delete(this._constante.API_ENDPOINT + ruta, { headers: this.Cabeceros() });
  }

  Put(objeto: any, ruta: string) {
    return this.http.put(this._constante.API_ENDPOINT + ruta, objeto, { headers: this.Cabeceros() });
  }

  Post(objeto: any, ruta: string) {
    return this.http.post(this._constante.API_ENDPOINT + ruta, { resultado: btoa(JSON.stringify(objeto)) }, { headers: this.Cabeceros() }).pipe(
      map((response: any) => {
        // Parsea y decodifica el resultado
        const bytes = new Uint8Array(atob(response.resultado).split('').map(char => char.charCodeAt(0)));
        const jsonDecifrado = new TextDecoder().decode(bytes);
        let resultado = JSON.parse(jsonDecifrado);

       

        // Devuelve el resultado con el tipo especificado
        return resultado;
      })
    );
  }

  search(objeto: any, ruta: string) {
    return this.http.post(this._constantepld.API_ENDPOINT_PLD + ruta, objeto, { headers: this.Cabeceros() }).pipe(
      map((response: any) => {
        // Parsea y decodifica el resultado
        const bytes = new Uint8Array(atob(response.resultado).split('').map(char => char.charCodeAt(0)));
        const jsonDecifrado = new TextDecoder().decode(bytes);
        let resultado = JSON.parse(jsonDecifrado);

       

        // Devuelve el resultado con el tipo especificado
        return resultado;
      })
    );
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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser
      });
    }

    // Agregar un valor de retorno predeterminado
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }



}