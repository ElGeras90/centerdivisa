import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { userservice } from '../../../servicios/userService';
import { MatPaginator } from '@angular/material/paginator';
import { cpservice } from '../../../servicios/all.service';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  /**variables para formulario */
  idempresa: any;
  razonsocial: any;
  rfc: any;
  calle: any;
  numero: any;
  idcp: any;
  idpais: any;
  telefono: any;
  idregimenfiscal: any;
  fechainicioop: any;
  emailoc: any;
  avisoprivasidad: any;
  activo: any;
  fechacierre: any;
  /*** fin variables formulario */


  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Razon Social', 'telefono', 'Activo', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  /**fin del paginador y modal */
  info: boolean = false;
  regfis: any;
  colonia: any;
  estado: any;
  municipio: any;
  paises: any;
  codigopostal: any;

  constructor(
    private user: userservice,
    private cp: cpservice) { }


  ngOnInit(): void {
    this.consultar(); 
    this.regimenfiscal();
    this.pais()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }

  //metodo para limpiar las variables del formulario
  clean() {
    this.idempresa = null;
    this.razonsocial = null;
    this.rfc = null;
    this.calle = null;
    this.numero = null;
    this.idcp = null;
    this.idpais = null;
    this.telefono = null;
    this.idregimenfiscal = null;
    this.fechainicioop = null;
    this.emailoc = null;
    this.avisoprivasidad = null;
    this.activo = null;
    this.fechacierre = null;
    this.estado = null;
    this.municipio = null;
    this.codigopostal = null;
  }

  regimenfiscal() {
    const info = {
      option: 5
    }
    this.cp.regimen(info).subscribe(
      (data: any) => {
        console.log(data)
        if (data.resultado[0].manage_cat_reg.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.regfis = data.resultado[0].manage_cat_reg.data;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  consultarDespuesDe5Digitos() {
    const codigoControl = this.codigopostal;

    if (codigoControl && codigoControl.length === 5) {
      this.consultarCodigosPostales(codigoControl);
    }

  }
  consultarCodigosPostales(dato: any) {

    const info = {
      cp: dato
    }
    this.cp.codigopostarl(info).subscribe(
      (data: any) => {
        if (data.info.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.colonia = data.info.data;
          
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
    const selectedValue = this.idcp;
    if (selectedValue !== null) {
      const selectedColonia = this.colonia.find((item: any) => item.id == selectedValue);
      if (selectedColonia) {

        this.municipio = selectedColonia.municipio,
        this.estado = selectedColonia.estado
      }
    }
  }
  pais() {
    const info = {
      option: 5
    }
    this.cp.pais(info).subscribe(
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
  }

  consultar(){

    const a = {option:5}
    
    this.cp.Empresax(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_empresa.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data  = data.resultado[0].manage_empresa.data;
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

  guardarempresa() {

    const a = {
      //idempresa: this.idempresa,
      razonsocial: this.razonsocial,
      rfc: this.rfc,
      calle: this.calle,
      numero: this.numero,
      idcp: this.idcp,
      idpais: this.idpais,
      telefono: this.telefono,
      idregimenfiscal: this.idregimenfiscal,
      fechainicioop: this.fechainicioop,
      emailoc: this.emailoc,
      avisoprivasidad: this.avisoprivasidad,
      activo: this.activo,
     // fechacierre: this.fechacierre,
      option: 1

    }

    this.cp.Empresax(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_empresa.action,
          title: data.resultado[0].manage_empresa.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }
    )

  }

  actualizarempresa() {
    const a = {
      razonsocial: this.razonsocial,
      rfc: this.rfc,
      calle: this.calle,
      numero: this.numero,
      idcp: this.idcp,
      idpais: this.idpais,
      telefono: this.telefono,
      idregimenfiscal: this.idregimenfiscal,
      fechainicioop: this.fechainicioop,
      emailoc: this.emailoc,
      avisoprivasidad: this.avisoprivasidad,
      activo: this.activo,
      fechacierre: this.fechacierre,
      idempresa: this.idempresa,
      option:2
    }

    this.cp.Empresax(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_empresa.action,
          title: data.resultado[0].manage_empresa.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }
    )

  }

  abrirgurdar(){
    this.info = true;
    this.will.show()
  }

  async actualizar(datos:any){

    this.info = false;
    this.idempresa = datos.idempresa;
    this.razonsocial = datos.razonsocial;
    this.rfc = datos.rfc;
    this.calle = datos.calle;
    this.numero = datos.numero;
    this.idcp = datos.idcp;
    this.idpais = datos.idpais;
    this.telefono = datos.telefono;
    this.idregimenfiscal = datos.idregimenfiscal;
    this.fechainicioop = datos.fechainicioop;
    this.emailoc = datos.emailoc;
    this.avisoprivasidad = datos.avisoprivasidad;
    this.activo = datos.activo;
    this.fechacierre = datos.fechacierre;

    const info2 = {
      cp: datos.idcp
    };

    const data2: any = await this.cp.codigopostar(info2).toPromise(); // Convertir el observable a una promesa

    this.codigopostal = data2.info.data[0].cp;
    this.estado = data2.info.data[0].estado;
    this.municipio = data2.info.data[0].municipio;

 
    this.will.show()
  }

  eliminar(datos:any){
    const a = {
      idempresa: datos.idempresa,
      option:3
    }

    this.cp.Empresax(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_empresa.action,
          title: data.resultado[0].manage_empresa.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.consultar()
      }
    )
  }
}
