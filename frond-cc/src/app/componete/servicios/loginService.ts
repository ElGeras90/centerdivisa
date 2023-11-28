import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginConstante } from "./constantes"; // Importa LoginConstante directamente
import { EncryptDataService } from './encriptar';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _apiServicio: ApiService,
    private enc : EncryptDataService

  ) {
  }

  Login(usuario: any) {
    return this._apiServicio.Post(usuario, LoginConstante.URLLogin)
  }

  OlvidePassword(usuario: any){
    return usuario;
  }
}
