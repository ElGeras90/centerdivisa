import { Injectable } from '@angular/core';

import { LoginService } from './loginService';

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
	
	public loginUser(item:any){
		//const agencia = JSON.stringify(item.agencia);
		//const menus = JSON.stringify(item.menus);
	
		
		 
		  localStorage.setItem('token',item.agencia[0].token)
		  
	
		  
		return true; 
	  }
	  public logout(){
		
		  localStorage.removeItem('token')
	
	
		return true;
	  }
}