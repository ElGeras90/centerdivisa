import { Injectable } from '@angular/core';

import { LoginService } from './loginService';
import { SocketService } from './mensajeriaservice';

@Injectable({
	providedIn: 'root'
  })

export class AuthenticationService {
    currentUser: any = {};
	
    constructor(
		private _loginService: LoginService) {

    }

    Login(username: string, password: string) {
		let usuario = {usuario : username, password : password};
        return this._loginService.Login(usuario);
    }
	
	OlvidePassword(usuario: any){
		return usuario;
	}
	
	public  loginUser(item:any,token:any){
		//const agencia = JSON.stringify(item.agencia);
		//const menus = JSON.stringify(item.menus);
	
		
		 
		  localStorage.setItem('token',token)
		  const empresa = JSON.stringify(item.empresa);
		  const menus = JSON.stringify(item.menus);
		  const sucursal = JSON.stringify(item.agencia);

		  localStorage.setItem('ID', item.usuario.idusuario);
		  localStorage.setItem('idrol', item.usuario.idrol);
		  localStorage.setItem('rol', item.usuario.nombre_rol);
		  localStorage.setItem('nombre', item.usuario.nombre_usuario);
		  localStorage.setItem('usuario', item.usuario.usuario);
		  localStorage.setItem('encargado', item.usuario.encargado);
		  localStorage.setItem('sucursalid', item.empresa.sucursalid);
		  localStorage.setItem('menus', menus);
		  localStorage.setItem('empresa',empresa);
		  localStorage.setItem('nombresucursal',item.empresa.nombresucursal)
		  localStorage.setItem('domicilio',item.empresa.domicilio)
		  localStorage.setItem('rfc',item.empresa.rfc)
		  localStorage.setItem('emp', item.empresa.idempresa)
		  
		return true; 
	  }
	  public logout(){
		
		  localStorage.removeItem('token')
		  localStorage.removeItem('ID');
		  localStorage.removeItem('idrol');
		  localStorage.removeItem('rol');
		  localStorage.removeItem('nombre');
		  localStorage.removeItem('usuario');
		  localStorage.removeItem('menus');
		  localStorage.removeItem('empresa');
		  localStorage.removeItem('encargado');
		  localStorage.removeItem('nombresucursal');
		  localStorage.removeItem('domicilio')
		  localStorage.removeItem('rfc')
		  localStorage.removeItem('emp')
		return true;
	  }
}