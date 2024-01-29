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

const routes: Routes = [
    {
        path:'' , component: ApiComponent, children: [
            {path:'',component: InicioComponent,data: {animation: 'HomePage'}},
            {path:'Usuarios',component: UsuariosComponent,data: {animation: 'Usuarios'}},
            {path:'Empresas',component: EmpresasComponent,data: {animation: 'Empresas'}},
            {path:'Sucursales',component: SucursalesComponent,data: {animation: 'Sucursales'}},
            {path:'Roles',component: RolesComponent,data: {animation: 'Roles'}},
            {path:'Accesos',component: AccesosComponent,data: {animation: 'Accesos'}},
            {path:'Clientes',component: ClientesComponent,data: {animation: 'Clientes'}},
            {path:'Divisas',component: DivisasComponent,data: {animation: 'Divisas'}},
            {path:'GrupoDivisas',component: GrupoComponent,data: {animation: 'GrupoDivisas'}},
            {path:'Identifiacion',component: IdentificaionComponent,data: {animation: 'Identifiacion'}},
            {path:'Encargado',component: EncargadoComponent},
            {path:'Compra',component: CompraComponent},
            {path:'Venta',component: VentaComponent},
            {path:'Boveda',component: BobedaComponent},
            {path:'Riesgo',component:RiesgoComponent},
            {path:'Relevantes',component:RelevantesComponent},
            {path:'Inusuales',component:OperacionesinusualesComponent},
            {path:'Montos',component:MontosComponent},
            {path:'Reporte',component:Reporte24Component},
            {path:'AltoRiesgo',component:AltoriesgoComponent},
            {path:'Dolar',component:DolaresComponent},
            {path:'Enviomensaje',component:AnonimoComponent},
            {path:'AlertaAnonimas',component:AnonimosComponent},
            {path:'AlertasGenerales',component:MovComponent},

        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApiRoutingModule{

  }