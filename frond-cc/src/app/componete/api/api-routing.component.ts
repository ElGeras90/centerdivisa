import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
    {
        path:'' , component: ApiComponent, children: [
            {path:'',component: InicioComponent},
            {path:'Usuarios',component: UsuariosComponent},
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApiRoutingModule{

  }