import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { usuarios } from "./constantes"; // Importa LoginConstante directamente

@Injectable({
  providedIn: 'root'
})
export class userservice {
  constructor(
    private _apiServicio: ApiService
  ) {
  }

  Login(datos: any) {
    return this._apiServicio.Post(datos, usuarios.URLUsuarios); // Usa LoginConstante directamente
  }


}
