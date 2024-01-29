import { Injectable } from "@angular/core";
@Injectable({
	providedIn: 'root'
})

export class ConfiguracionConstante {
	public API_ENDPOINT = "http://localhost:3001/";
	//public API_ENDPOINT = "http://172.17.10.23:3001/";
}
export class pld_data {
	public API_ENDPOINT_PLD = "http://localhost:3000/";
	//public API_ENDPOINT_PLD = "http://172.17.10.23:3001/";
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
	public static URLv = 'accsosrol/v'
}
export class pld{
	public static URLpld = 'api/buscar'
}
export class matrizriesgo{
	public static URLpro = 'matriz/productos'
	public static URLorigen = 'matriz/paisorigen'
	public static URLmonto = 'matriz/montomes'
	public static URLinst = 'matriz/instrumento'
	public static URLfre = 'matriz/frecuenciames'
	public static URLtipouser = 'matriz/tipousuario'
	public static URLocupacion = 'matriz/ocupacion'
	public static URLestados = 'matriz/estados'
	public static URLpaises = 'matriz/paises'

	
}