import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';

const routes: Routes = [
    {
        path:'' , component: ApiComponent, children: [
            {path:'',component: InicioComponent},
            {path:'Usuarios',component: UsuariosComponent},
            {path:'Empresas',component: EmpresasComponent}
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApiRoutingModule{

  }