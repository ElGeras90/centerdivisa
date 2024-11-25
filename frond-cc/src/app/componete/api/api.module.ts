import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { imports } from '../import';
import { InicioComponent } from './inicio/inicio.component';
import { NavComponent } from './nav/nav.component';
import { UsuariosComponent } from './crud/usuarios/usuarios.component';
import { ApiRoutingModule } from './api-routing.component';
import { EmpresasComponent } from './crud/empresas/empresas.component';
import { SucursalesComponent } from './crud/sucursales/sucursales.component';
import { RolesComponent } from './crud/roles/roles.component';
import { AccesosComponent } from './crud/accesos/accesos.component';
import { IdentificaionComponent } from './crud/identificaion/identificaion.component';
import { GrupoComponent } from './crud/grupo/grupo.component';
import { ClientesComponent } from './crud/clientes/clientes.component';
import { DivisasComponent } from './crud/divisas/divisas.component';
import { EncargadoComponent } from './crud/encargado/encargado.component';
import { CompraComponent } from './operacion/compra/compra.component';
import { VentaComponent } from './operacion/venta/venta.component';
import { BobedaComponent } from './operacion/bobeda/bobeda.component';
import { RiesgoComponent } from './riesgo/riesgo.component';
import { RelevantesComponent } from './regulatorios/relevantes/relevantes.component';
import { MontosComponent } from './regulatorios/montos/montos.component';
import { DolaresComponent } from './regulatorios/dolares/dolares.component';
import { Reporte24Component } from './regulatorios/reporte24/reporte24.component';
import { OperacionesinusualesComponent } from './regulatorios/operacionesinusuales/operacionesinusuales.component';
import { PepsComponent } from './reporte/peps/peps.component';
import { AltoriesgoComponent } from './reporte/altoriesgo/altoriesgo.component';
import { InusualesComponent } from './reporte/inusuales/inusuales.component';
import { OpeinternaspreocupantesComponent } from './reporte/opeinternaspreocupantes/opeinternaspreocupantes.component';
import { AnonimoComponent } from './anonimo/anonimo.component';
import { AnonimosComponent } from './alertas/anonimos/anonimos.component';
import { MovComponent } from './alertas/mov/mov.component';
import { AlertaFlotanteComponent } from '../alerta-flotante/alerta-flotante.component';
import { GalertComponent } from './alertas/galert/galert.component';
import { PieComponent } from './pie/pie.component';
import { MovimientosComponent } from './contable/movimientos/movimientos.component';



@NgModule({
    declarations: [
        ApiComponent,
        InicioComponent,
        UsuariosComponent,
        NavComponent,
        EmpresasComponent,
        SucursalesComponent,
        RolesComponent,
        AccesosComponent,
        IdentificaionComponent,
        GrupoComponent,
        ClientesComponent,
        DivisasComponent,
        EncargadoComponent,
        CompraComponent,
        VentaComponent,
        BobedaComponent,
        RiesgoComponent,
        RelevantesComponent,
        MontosComponent,
        DolaresComponent,
        Reporte24Component,
        OperacionesinusualesComponent,
        MovimientosComponent,
        PepsComponent,
        AltoriesgoComponent,
        InusualesComponent,
        OpeinternaspreocupantesComponent,
        AnonimoComponent,
        AnonimosComponent,
        MovComponent,
        AlertaFlotanteComponent,
        GalertComponent,
        PieComponent
    ],
    imports: [
        CommonModule,
        imports,
        ApiRoutingModule
    ]
})
export class ApiMdoule {

}