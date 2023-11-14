import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { cp,rol,Sucursal,Empresa,regimenfiscal, paises, cl, divisa, Enc, Divisasucursal, clienteempresa } from "./constantes"; // Importa LoginConstante directamente

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
  accesos(data:any){
    return this._apiServicio.Post(data, rol.UrlAcces);

  }
  menus(data:any){
    return this._apiServicio.Post(data, rol.Urlmenu);

  }

  ident(data:any){
    return this._apiServicio.Post(data, rol.Urlident);

  }
  grupo(data:any){
    return this._apiServicio.Post(data, rol.UrlGrupo);

  }
  estadopais(data:any){
    return this._apiServicio.Post(data, paises.URLedo);
  }
  ocupacion(data:any){
    return this._apiServicio.Post(data, paises.URLocu);
  }
  nacionalidad(data:any){
    return this._apiServicio.Post(data, paises.URLnac);
  }
  clientes(data:any){
    return this._apiServicio.Post(data, cl.URLcliente);
  }
  divisas(data:any){
    return this._apiServicio.Post(data, divisa.URLdivisa);
  }
  divisasi(data:any){
    return this._apiServicio.Post(data, divisa.URLdivisai);
  }
  Encargados(data:any){
    return this._apiServicio.Post(data, Enc.URLencargado);
  }
  Encargados_permiso(data:any){
    return this._apiServicio.Post(data, Enc.URLencpermiso);
  }
  Divisasucursal(data:any){
    return this._apiServicio.Post(data, Divisasucursal.URLdivsuc);
  }
  Formulario(data:any){
    return this._apiServicio.Post(data, Divisasucursal.UrlFormulario);
  }
  infosuc(data:any){
    return this._apiServicio.Post(data, Divisasucursal.URLinfodivisa);
  }
  infosucdiv(data:any){
    return this._apiServicio.Post(data, Divisasucursal.Urlinfod);
  }
  saldoactual(data:any){
    return this._apiServicio.Post(data, Divisasucursal.URLsaldoida);
  }
  operaciones(data:any){
    return this._apiServicio.Post(data, Divisasucursal.URLOperaciones);
  }
  empresacliente(data:any){
    return this._apiServicio.Post(data, clienteempresa.URLcliemp);
  }
}
