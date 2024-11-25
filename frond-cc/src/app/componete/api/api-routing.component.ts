import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './crud/usuarios/usuarios.component';
import { EmpresasComponent } from './crud/empresas/empresas.component';
import { SucursalesComponent } from './crud/sucursales/sucursales.component';
import { RolesComponent } from './crud/roles/roles.component';
import { AccesosComponent } from './crud/accesos/accesos.component';
import { ClientesComponent } from './crud/clientes/clientes.component';
import { DivisasComponent } from './crud/divisas/divisas.component';
import { GrupoComponent } from './crud/grupo/grupo.component';
import { IdentificaionComponent } from './crud/identificaion/identificaion.component';
import { EncargadoComponent } from './crud/encargado/encargado.component';
import { CompraComponent } from './operacion/compra/compra.component';
import { VentaComponent } from './operacion/venta/venta.component';
import { BobedaComponent } from './operacion/bobeda/bobeda.component';
import { RiesgoComponent } from './riesgo/riesgo.component';
import { RelevantesComponent } from './regulatorios/relevantes/relevantes.component';
import { DolaresComponent } from './regulatorios/dolares/dolares.component';
import { OperacionesinusualesComponent } from './regulatorios/operacionesinusuales/operacionesinusuales.component';
import { MontosComponent } from './regulatorios/montos/montos.component';
import { Reporte24Component } from './regulatorios/reporte24/reporte24.component';
import { AltoriesgoComponent } from './reporte/altoriesgo/altoriesgo.component';
import { AnonimoComponent } from './anonimo/anonimo.component';
import { AnonimosComponent } from './alertas/anonimos/anonimos.component';
import { MovComponent } from './alertas/mov/mov.component';
import { GalertComponent } from './alertas/galert/galert.component';
import { MovimientosComponent } from './contable/movimientos/movimientos.component';

const routes: Routes = [
    {
        path: '', component: ApiComponent, children: [
            { path: '', component: InicioComponent },
            { path: 'Usuarios', component: UsuariosComponent },
            { path: 'Empresas', component: EmpresasComponent },
            { path: 'Sucursales', component: SucursalesComponent },
            { path: 'Roles', component: RolesComponent },
            { path: 'Accesos', component: AccesosComponent },
            { path: 'Clientes', component: ClientesComponent },
            { path: 'Divisas', component: DivisasComponent },
            { path: 'GrupoDivisas', component: GrupoComponent },
            { path: 'Identifiacion', component: IdentificaionComponent },
            { path: 'Encargado', component: EncargadoComponent },
            { path: 'Compra', component: CompraComponent },
            { path: 'Venta', component: VentaComponent },
            { path: 'Boveda', component: BobedaComponent },
            { path: 'Riesgo', component: RiesgoComponent },
            { path: 'Relevantes', component: RelevantesComponent },
            { path: 'Inusuales', component: OperacionesinusualesComponent },
            { path: 'Montos', component: MontosComponent },
            { path: 'Reporte', component: Reporte24Component },
            { path: 'AltoRiesgo', component: AltoriesgoComponent },
            { path: 'Dolar', component: DolaresComponent },
            { path: 'Enviomensaje', component: AnonimoComponent },
            { path: 'AlertaAnonimas', component: AnonimosComponent },
            { path: 'AlertasGenerales', component: MovComponent },
            { path: 'AlertasRegistros', component: GalertComponent },
            { path: 'Reportediario', component: MovimientosComponent },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApiRoutingModule {

}