import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { imports } from './componete/import'
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './componete/servicios/AuthenticationService';
import { LoginService } from './componete/servicios/loginService';
import { EncryptDataService } from './componete/servicios/encriptar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { pld_data } from './componete/servicios/constantes';
import { AlertaFlotanteComponent } from './componete/alerta-flotante/alerta-flotante.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    imports,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [EncryptDataService, pld_data
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
