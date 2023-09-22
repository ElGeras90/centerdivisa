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

        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApiRoutingModule{

  }