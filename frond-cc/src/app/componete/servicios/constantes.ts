import { Injectable } from "@angular/core";
@Injectable({
	providedIn: 'root'
  })

export class ConfiguracionConstante {
	//public API_ENDPOINT = "http://127.0.0.1:3000/api/";
	public API_ENDPOINT = "http://localhost:3000/api/";
	
}

export class LoginConstante {
    public static URLLogin = "login";
}

export class usuarios{
	public static URLUsuarios = "user";
}