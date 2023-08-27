import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginConstante } from "./constantes"; // Importa LoginConstante directamente

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _apiServicio: ApiService
  ) {
  }

  Login(usuario: any) {
    return this._apiServicio.Post(usuario, LoginConstante.URLLogin); // Usa LoginConstante directamente
  }

  OlvidePassword(usuario: any){
    return usuario;
  }
}
