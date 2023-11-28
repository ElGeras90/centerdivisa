import { Injectable } from "@angular/core";
@Injectable({
	providedIn: 'root'
})

export class ConfiguracionConstante {
	//public API_ENDPOINT = "http://127.0.0.1:3000/api/";
	public API_ENDPOINT = "https://localhost:3000/";

}

export class LoginConstante {
	public static URLLogin = "auth/login";
}

export class usuarios {
	public static URLUsuarios = "accsosrol/user";
}

export class cp {
	public static URLcp = "cp/cp";
	public static URLcpid = "cp/cp/id"
}

export class rol {
	public static URLrol = "accsosrol/rol";
	public static UrlAcces = "accsosrol/accrol";
	public static Urlmenu = "accsosrol/menu";
	public static Urlident = "accsosrol/identificacion";
	public static UrlGrupo = "accsosrol/grupo";
}

export class Sucursal {
	public static URLsucursal = "accsosrol/sucursal";
}

export class Empresa {
	public static URLempresa = "accsosrol/empresa";
}

export class regimenfiscal {
	public static URLregimen = "accsosrol/regimen";
}

export class paises {
	public static URLpais = "pais/pais";
	public static URLedo = "pais/estado";
	public static URLocu = "pais/ocupacion";
	public static URLnac = "pais/nacionalidad";
}

export class cl {
	public static URLcliente = "accsosrol/cliente";
	
}
export class divisa {
	public static URLdivisa = "encargado/divisa";
	public static URLdivisai = "accsosrol/divisa";
}
export class Enc{
	public static URLencargado = 'encargado/encargado'
	public static URLencpermiso = 'encargado/permiso'
}
export class Divisasucursal{
	public static URLdivsuc = 'divisa/sucursal'
	public static UrlFormulario = 'divisa/formulario'
	public static URLinfodivisa = 'divisa/infodivisa'
	public static Urlinfod = 'divisa/infod'
	public static URLsaldoida= 'divisa/saldoactual'
	public static URLOperaciones = 'divisa/operacion'
}
export class clienteempresa{
	public static URLcliemp = 'accsosrol/cliemp'
}