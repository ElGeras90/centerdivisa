import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { cp, rol, Sucursal, Empresa, regimenfiscal, paises, cl, divisa, Enc, Divisasucursal, clienteempresa, pld, matrizriesgo, regulatorios, conta, Reportediario, Documento, PerfilTransaccional, AlertasMontos } from "./constantes"; // Importa LoginConstante directamente

@Injectable({
  providedIn: 'root'
})
export class cpservice {
  constructor(private _apiServicio: ApiService) { }

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
  regimen(data: any) {
    return this._apiServicio.Post(data, regimenfiscal.URLregimen);
  }
  pais(data: any) {
    return this._apiServicio.Post(data, paises.URLpais);
  }
  accesos(data: any) {
    return this._apiServicio.Post(data, rol.UrlAcces);

  }
  menus(data: any) {
    return this._apiServicio.Post(data, rol.Urlmenu);

  }

  ident(data: any) {
    return this._apiServicio.Post(data, rol.Urlident);

  }
  grupo(data: any) {
    return this._apiServicio.Post(data, rol.UrlGrupo);

  }
  estadopais(data: any) {
    return this._apiServicio.Post(data, paises.URLedo);
  }
  ocupacion(data: any) {
    return this._apiServicio.Post(data, paises.URLocu);
  }
  nacionalidad(data: any) {
    return this._apiServicio.Post(data, paises.URLnac);
  }
  clientes(data: any) {
    return this._apiServicio.Post(data, cl.URLcliente);
  }
  obtenerclientes(data?: any) {
    return this._apiServicio.Post(data, cl.URLobtenerclientes);
  }
  divisas(data: any) {
    return this._apiServicio.Post(data, divisa.URLdivisa);
  }
  divisasi(data: any) {
    return this._apiServicio.Post(data, divisa.URLdivisai);
  }
  Encargados(data: any) {
    return this._apiServicio.Post(data, Enc.URLencargado);
  }
  Encargados_permiso(data: any) {
    return this._apiServicio.Post(data, Enc.URLencpermiso);
  }
  Divisasucursal(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.URLdivsuc);
  }
  Formulario(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.UrlFormulario);
  }
  infosuc(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.URLinfodivisa);
  }
  infosucdiv(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.Urlinfod);
  }
  saldoactual(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.URLsaldoida);
  }
  operaciones(data: any) {
    return this._apiServicio.Post(data, Divisasucursal.URLOperaciones);
  }
  empresacliente(data: any) {
    return this._apiServicio.Post(data, clienteempresa.URLcliemp);
  }
  dll(data: any) {
    return this._apiServicio.Post(data, clienteempresa.URLv);
  }
  buscarlistado(data: any) {
    return this._apiServicio.search(data, pld.URLpld);

  }
  crudprod(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLpro);
  }
  crudorigen(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLorigen);
  }
  crudmonto(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLmonto);
  }
  crudinstrumento(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLinst);
  }
  crudfrecuencia(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLfre);
  }
  crudtiposuer(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLtipouser);
  }
  crudocupacion(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLocupacion);
  }
  crudestados(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLestados);
  }
  crudpaises(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLpaises);
  }
  alertas(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLalert);
  }
  anonimus(data: any) {
    return this._apiServicio.Post(data, matrizriesgo.URLanonimo);
  }
  alertar() {
    return this._apiServicio.Post('', matrizriesgo.URLcantidad);
  }
  reportemontos(data: any) {
    return this._apiServicio.Download(data, regulatorios.URLmontos);

  }
  saldosdia(data: any) {
    return this._apiServicio.Post(data, Reportediario.URLreported);

  }
  DocCorteCaja(datos: any) {
    return this._apiServicio.Download(datos, Documento.Urldoccorte)
  }
  Docmovimientos(datos: any) {
    return this._apiServicio.Download(datos, Documento.Urldoclista)
  }
  CorteCaja(datos: any) {
    return this._apiServicio.Post(datos, Documento.Urlvistacorte)
  }
  movimientos(datos: any) {
    return this._apiServicio.Post(datos, Documento.Urlvistalista)
  }

  reportedolares(data: any) {
    return this._apiServicio.Download(data, regulatorios.URLdolares);
  }
  reporte24h(data: any) {
    return this._apiServicio.Post(data, regulatorios.URLreporte24h);
  }
  reporteinusuales(data: any) {
    return this._apiServicio.Post(data, regulatorios.URLinusuales);
  }
  reporterelevantes(data: any) {
    return this._apiServicio.Post(data, regulatorios.URLrelevantes);
  }
  reportemontosvista(data: any) {
    return this._apiServicio.Download(data, regulatorios.URLmontos);
  }

  propositoVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLproposito);
  }

  frecuenciaVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLfrecuencia);
  }

  tipoOperacionesVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLtipoOperaciones);
  }

  actuaNombreVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLactuaNombre);
  }

  medioPagoVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLmedioPago);
  }

  origenRecursosVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLorigenRecursos);
  }

  destinoRecursosVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLdestinoRecursos);
  }

  relacionTerceroVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLrelacionTercero);
  }

  pepTipoVista(data: any) {
    return this._apiServicio.Post(data, PerfilTransaccional.URLpepTipo);
  }
  alertasMontosConsultar(data: any) {
  return this._apiServicio.Post(data, AlertasMontos.URLconsultar);
}

alertasMontosActualizar(data: any) {
  return this._apiServicio.Post(data, AlertasMontos.URLactualizar);
}

}
