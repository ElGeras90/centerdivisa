import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { imports } from '../import';
import { InicioComponent } from './inicio/inicio.component';
import { NavComponent } from './nav/nav.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ApiRoutingModule } from './api-routing.component';

@NgModule({
    declarations:[
        ApiComponent,
        InicioComponent,
        UsuariosComponent,
        NavComponent
    ],
    imports:[
       CommonModule,
       imports ,
       ApiRoutingModule
    ]
})
export class ApiMdoule{
    
}