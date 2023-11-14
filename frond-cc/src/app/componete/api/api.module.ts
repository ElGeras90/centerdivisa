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


@NgModule({
    declarations:[
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
        BobedaComponent
    ],
    imports:[
       CommonModule,
       imports ,
       ApiRoutingModule
    ]
})
export class ApiMdoule{
    
}