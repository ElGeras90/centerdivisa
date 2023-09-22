import { Component, ViewChild } from '@angular/core';
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
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Nombre', 'Telefono','Fecha','correo','calle', 'acciones'];

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



  estadosselect: any;
  nacionalidades: any;
  colonias: any;
  estadosselect_: any;

  constructor(
    private datos: cpservice,
    private shared: SharedDataService) { }
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


  /** consultas de pais, estados, nacionalidades e ocupacion */

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

        this.ocupaciones = data.info;

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
    const selectedValue = dat.target.value;;
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
    this.idcp = 0

  }

  estructuraguardar():any {
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
    }
    return a;
  }

  abrirwill() {
    this.limpiar();
    this.info = true;
    this.will.show();
  }

  abrirupdate(data: any) {

    this.idcliente = data.idcliente;
    this.paterno = data.paterno;
    this.materno = data.materno;
    this.nombres = data.nombre;
    this.paisnaci = data.idpnaci;
    this.nacionalidad = data.nacionalidad;
    this.genero = data.genero;
    this.estanaci = data.idesncaci;
    this.ocupacion = data.ocupacion;
    this.numerotelefono = data.telefono;
    this.correoelectronico = data.correo;
    this.curp = data.curp;
    this.rfc = data.rfc;
    this.numeroidentificacionfiscal = data.nif;
    this.pais = data.pais;
    this.identificacion = data.ididentificacion;
    this.numerodeidentificacion = data.nident;
    this.fechanacimiento = data.fechanacimiento;
    this.calle = data.calle;
    this.numerointerior = data.nint;
    this.numeroexterior = data.n_ext;
    this.colonia = data.colonia;
    this.municipio = data.municipio;
    this.estado = data.estado;
    this.pais_ = data.idpais;
    this.codigopostal = data.cp;
    this.idcp = data.idcp;


  }


  consultar(){


   const info = {
      option : 4
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_clientes.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_clientes.action,
            title: data.resultado[0].manage_clientes.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data = data.resultado[0].manage_clientes.data.clientes;
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



  guardar(){

    let info = this.estructuraguardar();

    info = {
      ...info,
      option : 1
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_clientes.action,
          title: data.resultado[0].manage_clientes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
      }
    )

  }

  actualizar(){

    let info = this.estructuraguardar();

    info = {
      ...info,
      option : 2
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_clientes.action,
          title: data.resultado[0].manage_clientes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
      }
    )

  }
}
