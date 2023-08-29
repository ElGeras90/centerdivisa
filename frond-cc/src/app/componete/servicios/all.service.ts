import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { cp,rol,Sucursal,Empresa,regimenfiscal, paises } from "./constantes"; // Importa LoginConstante directamente

@Injectable({
  providedIn: 'root'
})
export class cpservice {
  constructor(private _apiServicio: ApiService) {}

  codigopostarl(codigo: any) {
    return this._apiServicio.Post(codigo, cp.URLcp);
  }
  codigopostar(codigo: any) {
    return this._apiServicio.Post(codigo, cp.URLcpid);
  }
  roles(codigo: any) {
    return this._apiServicio.Post(codigo, rol.URLrol); 
  }
  sucursal(codigo: any) {
    return this._apiServicio.Post(codigo, Sucursal.URLsucursal); 
  }
  Empresax(codigo: any) {
    return this._apiServicio.Post(codigo, Empresa.URLempresa);
  }
  regimen(data:any){
    return this._apiServicio.Post(data, regimenfiscal.URLregimen);
  }
  pais(data:any){
    return this._apiServicio.Post(data, paises.URLpais);
  }
}
