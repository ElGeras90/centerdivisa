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

export class cp{
	public static URLcp = "cp";
	public static URLcpid= "cp/id"
}

export class rol{
	public static URLrol = "rol";
}
export class Sucursal{
	public static URLsucursal = "sucursal";
}
export class Empresa{
	public static URLempresa = "empresa";
}