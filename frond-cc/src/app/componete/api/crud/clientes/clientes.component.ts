import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { SharedDataService } from 'src/app/componete/servicios/request.info';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;

  @ViewChild("will2", { static: false })
  will2: any;

  @ViewChild("will3", { static: false })
  will3: any;

  @ViewChild("will4", { static: false })
  will4: any;

  @ViewChild("riesgo", { static: false })
  riesgo: any;

  riesgos:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Nombre', 'Telefono', 'Fecha', 'correo', 'calle', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  activar: boolean = false;

  //variables de formulario para cliente fisico y extranjero
  paterno: any;
  materno: any
  nombres: any
  paisnaci: any
  nacionalidad: any
  fechanacimiento: any
  genero: any
  //pedir si el ingreso es mayor a 4999
  estanaci: any
  ocupacion: any
  numerotelefono: any
  correoelectronico: any
  //en caso de ser mexicano
  curp: any
  rfc: any
  //si es extranjero 
  numeroidentificacionfiscal: any
  pais: any
  cuentacondomicilioenelpais: any

  identificacion: any
  numerodeidentificacion: any
  idcliente: any = 0;

  //fin formulario para cliente fisico y extranjero 

  // inicio Formulario de domicilio 

  calle: any;
  numerointerior: any;
  numeroexterior: any;
  colonia: any;
  municipio: any;
  estado: any;
  pais_: any;
  codigopostal: any;
  idcp: any
  //fin formulario domicilio 


  //variables de catalogos
  identificaciones: any;
  estadospais: any[] = []
  paises: any;
  ocupaciones: any;
  //fin catalogos

  //variables para mostrar los campos

  montomayor: boolean = false;
  sermexicano: boolean = false;

  /**variables de formulario de empresa */

  razonsocial: any;
  nacionalidadempresa: any;
  rfcempresa: any;
  domiciliofiscal: any;
  rfcserie: any;
  telemp: any;
  correoempr: any;
  fechaconst: any;


  /**fin variable de empresa */

  estadosselect: any;
  nacionalidades: any;
  colonias: any;
  estadosselect_: any;

  /** variable de usuarios empresa */
  cliempr: any;
  @Input() formulario: any;
  @Input() status: boolean = false;
  @Output() respuestaEnviada = new EventEmitter<string>();

  constructor(
    private datos: cpservice,
    private shared: SharedDataService,
  ) { }
  /**fin del paginador y modal */
  ngOnInit(): void {
    this.activar = this.shared.getActivo();
    this.catalogos();
    this.consultar();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 5; // Establecer el tamaño de página predeterminado
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  catalogos() {

    const info = {
      option: 5,
    }
    this.datos.ident(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_identificacion.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_identificacion.action,
            title: data.resultado[0].manage_identificacion.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
        } else {
          this.identificaciones = data.resultado[0].manage_identificacion.data
        }
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )

    this.datos.estadopais(info).subscribe(
      (data: any) => {

        this.estadospais = data.info;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )
    this.datos.pais(info).subscribe(
      (data: any) => {

        this.paises = data.info;
        console.log(this.paises);

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )

    this.datos.ocupacion(info).subscribe(
      (data: any) => {
        const datosOrdenados = data.info.slice().sort((a:any, b:any) => {
          const descripcionA = a.descripcion.toUpperCase();
          const descripcionB = b.descripcion.toUpperCase();
    
          if (descripcionA < descripcionB) {
            return -1;
          }
          if (descripcionA > descripcionB) {
            return 1;
          }
    
          return 0;
        });
        this.ocupaciones = datosOrdenados;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )

    this.datos.nacionalidad(info).subscribe(
      (data: any) => {

        this.nacionalidades = data.info;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )
  }

  estados(dat: any) {
    const selectedValue = dat.target.value;;
    this.estadosselect = this.estadospais.filter((item: any) => item.idcatpais == selectedValue);

  }
  getnacionalidad(d: any) {
    const selectedValue = d.target.value;

    const data = this.nacionalidades.filter((item: any) => item.idnaci == selectedValue)
    if (data[0].clave === "MEX") {
      this.sermexicano = true;
      this.pais_ = 'MEXICO'
    } else {
      this.sermexicano = false;

    }

  }

  consultarDespuesDe5Digitos(d: any) {

    const codigoValue = d.target.value;
    if (this.sermexicano == true) {
      if (codigoValue && codigoValue.length === 5) {
        this.consultarCodigosPostales(codigoValue);
      }

    }
    else {
      this.idcp = 0;
    }
  }

  consultarCodigosPostales(dato: any) {

    const info = {
      cp: dato
    }
    this.datos.codigopostarl(info).subscribe(
      (data: any) => {
        if (data.info.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.colonias = data.info.data;
        }
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  seleccionarColonia(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue !== null) {
      // Verifica si colonia es un arreglo antes de intentar filtrarlo
      if (Array.isArray(this.colonias)) {
        const selectedColonia = this.colonias.find((item: any) => item.id == selectedValue);
        if (selectedColonia) {
          this.municipio = selectedColonia.municipio;
          this.estado = selectedColonia.estado;
          this.pais_ = selectedColonia.pais;
        }
      }
    }
  }

  estados_(dat: any) {
    const selectedValue = dat.target.value;
    let v = this.paises.filter((item: any) => item.idpais == selectedValue);

    console.log(v[0])
    if (v[0].paraisofiscal == true){

      Swal.fire({
       // icon: 'warning',
       imageUrl:'../../../../assets/img/unnamed.png', 
       title: 'Alerta de posible operación inusual y/o de alto riesgo. <br>'+ 
       'El usuario pertenece a un país incluido en la lista de paraísos fiscales :' + v[0].nombre +
       '<br> Esperar autorización del oficial de cumplimiento para '+   'realizar la operación.',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });

    }

    
    if (v[0].bloqueado == true){
      Swal.fire({
        imageUrl:'../../../../assets/img/unnamed.png',
        title:'Alerta de posible operación inusual y/o de alto riesgo.<br>'+
        'El usuario pertenece a un país incluido en la lista negra: '+v[0].nombre +
        '<br>No operar con este usuario, esperar indicaciones del Oficial de Cumplimiento.',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });

      return;
    }

    this.estadosselect_ = this.estadospais.filter((item: any) => item.idcatpais == selectedValue);

  }

  limpiar() {
    this.paterno = '';
    this.materno = '';
    this.nombres = '';
    this.paisnaci = '';
    this.nacionalidad = '';
    this.fechanacimiento = '';
    this.genero = '';
    this.estanaci = '';
    this.ocupacion = '';
    this.numerotelefono = '';
    this.correoelectronico = '';
    this.curp = '';
    this.rfc = '';
    this.numeroidentificacionfiscal = '';
    this.pais = '';
    this.cuentacondomicilioenelpais = '';
    this.identificacion = '';
    this.numerodeidentificacion = '';
    this.calle = '';
    this.numerointerior = '';
    this.numeroexterior = '';
    this.colonia = '';
    this.municipio = '';
    this.estado = '';
    this.pais_ = '';
    this.codigopostal = '';
    this.idcp = 0;
    this.idcliente = 0

  }

  limpiarempresa() {
    this.razonsocial = ''
    this.rfcempresa = ''
    this.nacionalidadempresa = 0
    this.domiciliofiscal = ''
    this.rfcserie = ''
  }
  estructuraguardar(): any {
    const a = {
      idcliente: this.idcliente,
      tipopersona: 1,
      paterno: this.paterno,
      materno: this.materno,
      nombre: this.nombres,
      idpnaci: this.paisnaci,
      nacionalidad: this.nacionalidad,
      genero: this.genero,
      estanaci: this.estanaci,
      ocupacion: this.ocupacion,
      telefono: this.numerotelefono,
      correo: this.correoelectronico,
      curp: this.curp,
      rfc: this.rfc,
      nif: this.numeroidentificacionfiscal,
      pais: this.pais,
      ididentificaion: this.identificacion,
      nident: this.numerodeidentificacion,
      fechanacimiento: this.fechanacimiento,
      calle: this.calle,
      nient: this.numerointerior,
      n_ext: this.numeroexterior,
      colonia: this.colonia,
      municipio: this.municipio,
      estado: this.estado,
      idpais: this.pais_,
      cp: this.codigopostal,
      idcp: this.idcp,
      idempresa: 0
    }
    return a;
  }

  abrirwill() {
    Swal.fire({
      title: 'Registro',
      text: 'Elige una opción:',
      showCancelButton: true,
      confirmButtonText: 'Persona',
      cancelButtonText: 'Empresa',
      showCloseButton: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.limpiar();
        this.info = true;
        this.visibleemp = false;

        this.will.show();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.limpiar();
        this.info = true;
        this.visibleemp = false;

        this.will2.show();
      }
    });

  }

  abrirupdate(data: any) {
    if (data?.idcliente) {
      this.clienteupdate(data);
    } else {
      this.clienteempresa(data)
    }

  }

  async clienteupdate(data: any) {
    console.log(data)
    this.riesgos = data.riesgo;
    this.idcliente = data.idcliente;
    this.paterno = data.paterno;
    this.materno = data.materno;
    this.nombres = data.nombre;
    this.paisnaci = data.idpnaci;
    this.nacionalidad = data.nacionalidad;
    this.genero = data.genero;
    this.estanaci = data.estanaci;
    this.ocupacion = data.ocupacion;
    this.numerotelefono = data.telefono;
    this.correoelectronico = data.correo;
    this.curp = data.curp;
    this.rfc = data.rfc;
    this.numeroidentificacionfiscal = data.nif;
    this.pais = data.pais;
    this.identificacion = data.ididentificaion;
    this.numerodeidentificacion = data.nident;
    this.fechanacimiento = data.fechanacimiento;
    this.calle = data.calle;
    this.numerointerior = data.nient;
    this.numeroexterior = data.n_ext;
    this.colonia = data.colonia;
    this.municipio = data.municipio;
    this.estado = data.estado;
    this.pais_ = data.pais;
    this.codigopostal = data.cp;
    this.idcp = data.idcp;
    this.info = false;


    this.estadosselect = this.estadospais.filter((item: any) => item.idcatpais == this.paisnaci);
if(data.idcp>0){
    const info2 = {
      cp: data.idcp
    };

    const data2: any = await this.datos.codigopostar(info2).toPromise(); // Convertir el observable a una promesa

    this.codigopostal = data2.info.data[0].cp;
    this.estado = data2.info.data[0].estado;
    this.municipio = data2.info.data[0].municipio;

    this.consultarCodigosPostales(this.codigopostal);
  }else{
   // this.pais_ = data.idpais;
    this.estadosselect_ = this.estadospais.filter((item: any) => item.idcatpais == this.pais_);
  }
    const dataa = this.nacionalidades.filter((item: any) => item.idnaci == this.nacionalidad)
    if (dataa[0].clave === "MEX") {
      this.sermexicano = true;
      this.pais_ = 'MEXICO'
    } else {
      this.sermexicano = false;

    }

    this.will.show();
  }

  clienteempresa(data: any) {
    this.razonsocial = data.nombre;
    this.rfcempresa = data.calle;
    this.idempresa = data.idempresa;

    const info = {
      option: 5,
      idempresa: this.idempresa
    };


    this.consultarclientesempresa();

    this.will3.show();
  }

  consultar() {


    const info = {
      option: 4
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_cliente.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cliente.action,
            title: data.resultado[0].manage_cliente.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data = data.resultado[0].manage_cliente.data[0].clientes[0];
        }
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )

  }

  guardar() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 1
    }
    const name = {
      nombre:info.nombre,
      paterno:info.paterno,
      materno:info.materno
    };

    console.log(name)
    this.datos.buscarlistado(name).subscribe(
      (data: any) => {
       
        console.log(data)
        if(data.info[0].buscar_listado?.message == 'sin coincidencias.'){
            this.save(info);
        }else{

        Swal.fire({
          //icon: 'warning',
          imageUrl:'../../../../assets/img/unnamed.png', 
          title: 'El usuario <b>'+data.info[0].buscar_listado.Nombre+'</b> pertenece a la lista <b>'+  data.info[0].buscar_listado.lista +'</b>'+
          '<br> Esperar autorización del oficial de cumplimiento para '+   'realizar la operación.',
           allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
           allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
         });
        return;
        }
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )

  }
  save(info:any){
    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();

        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  actualizar() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 2
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }
  async cargardatos(d: any) {
    if (d?.idcliente == 1) {
      Swal.fire({
        icon: 'warning',
        title: 'No puede seleccionar PUBLICO EN GENERAL selecciona otro',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
      return;
    } else if(d?.idcliente > 0) {
      this.shared.setSelectedData(d)
      
      this.respuestaEnviada.emit(d);
      this.will.hide();
      this.will3.hide();
    }else{
      this.clienteempresa(d)
    }
  }

  crearjsonempresa() {
    const a = {
      razonsocial: this.razonsocial,
      rfc: this.rfcempresa,
      rfcserie: this.rfcserie,
      nacionalidad: this.nacionalidadempresa,
      domicilio: this.domiciliofiscal,
      idempresa: 0,
      option: 0,
      telefono: this.telemp,
      correo: this.correoempr,
      fechaconstitucion: this.fechaconst
    };
    return a;
  }
  resultado: any;
  visibleemp: boolean = false;
  idempresa: number = 0;
  async guardarempresa() {
    const d = this.crearjsonempresa();
    d.option = 1;
    this.resultado = await this.datos.empresacliente(d).toPromise(); // Convertir el observable a una promesa

    if (this.resultado.resultado.action === "success") {
      this.idempresa = this.resultado.idempresa;
      this.visibleemp = true;

    } else {
      this.visibleemp = false;
    }


  }

  guardarclienteempresa() {

    let info = this.estructuraguardar();
    info.idempresa = this.idempresa
    info = {
      ...info,
      option: 3
    }

    this.datos.empresacliente(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiarempresa();
        this.will2.hide();

        Swal.fire({
          icon: data.action,
          title: data.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiarempresa();
        this.will2.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  consultarclientesempresa() {


    const info = {
      option: 5,
      idempresa: this.idempresa
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_cliente.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cliente.action,
            title: data.resultado[0].manage_cliente.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.cliempr = data.resultado[0].manage_cliente.data;
        }
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )

  }

  guardarcliente() {

    let info = this.estructuraguardar();
    info.idempresa = this.idempresa
    info.tipopersona = 2
    info = {
      ...info,
      option: 3
    }

    this.datos.empresacliente(info).subscribe(
      (data: any) => {
        this.consultarclientesempresa();
        this.limpiar();
        this.will4.hide();

        /** Swal.fire({
           icon: data.resultado[0].manage_cliente.action,
           title: data.resultado[0].manage_cliente.message,
           allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
           allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
         });*/
      }, (error: any) => {
        this.consultarclientesempresa();
        this.limpiar();
        this.will4.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )


  }

  actualizarcliente() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 2
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  abrirclienteempresa(e: any) {

    if (e == 1) {
      this.info = true
      this.will4.show()
    } else {
      this.info = false
      this.will4.show()
    }

  }

  cerrar(valor: any) {

    if (valor == 1) {
      this.limpiar();
      this.will.hide();
    }
    if (valor == 2) {
      this.limpiarempresa();
      this.will2.hide();
    }
    if (valor == 3) {
      this.limpiarempresa();
      this.will3.hide();
    }
    if (valor == 4) {
      this.limpiar();
      this.will4.hide()
    }
  }

  ocupacionvalidar(event: any) {
   const selectedValue =  event.target.value;
    let v = this.ocupaciones.filter((item: any) => item.idacividad == selectedValue);
    console.log(v)
    if(v[0].nivel == 10){
      Swal.fire({
        // icon: 'warning',
        imageUrl:'../../../../assets/img/unnamed.png', 
        title: 'Alerta de posible operación inusual y/o de alto riesgo. <br>'+ 
        'El usuario mantiene una actividad económica de alto riesgo. :' + v[0].descripcion +
        '<br> Esperar autorización del oficial de cumplimiento para '+   'realizar la operación.',
         allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
         allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
       });
    }
    }
}
