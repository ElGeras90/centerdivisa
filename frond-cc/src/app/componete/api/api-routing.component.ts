import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './crud/usuarios/usuarios.component';
import { EmpresasComponent } from './crud/empresas/empresas.component';
import { SucursalesComponent } from './crud/sucursales/sucursales.component';
import { RolesComponent } from './crud/roles/roles.component';
import { AccesosComponent } from './crud/accesos/accesos.component';

const routes: Routes = [
    {
        path:'' , component: ApiComponent, children: [
            {path:'',component: InicioComponent},
            {path:'Usuarios',component: UsuariosComponent},
            {path:'Empresas',component: EmpresasComponent},
            {path:'Sucursales',component: SucursalesComponent},
            {path:'Roles',component: RolesComponent},
            {path:'Accesos',component: AccesosComponent},
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApiRoutingModule{

  }