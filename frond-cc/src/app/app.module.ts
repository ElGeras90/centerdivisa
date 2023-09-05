import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {imports} from './componete/import'
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './componete/servicios/AuthenticationService';
import { LoginService } from './componete/servicios/loginService';
import { EncryptDataService } from './componete/servicios/encriptar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    imports,
    HttpClientModule
  ],
  providers: [EncryptDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
