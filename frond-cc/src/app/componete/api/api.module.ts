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


@NgModule({
    declarations:[
        ApiComponent,
        InicioComponent,
        UsuariosComponent,
        NavComponent,
        EmpresasComponent,
        SucursalesComponent,
        RolesComponent
    ],
    imports:[
       CommonModule,
       imports ,
       ApiRoutingModule
    ]
})
export class ApiMdoule{
    
}