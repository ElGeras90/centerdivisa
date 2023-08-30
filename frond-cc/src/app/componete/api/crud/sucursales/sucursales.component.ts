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
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent {
  /**variables para formulario */
  sucursalid: any
  nombre_sucursal: any
  calle: any
  numero: any
  idcp: any
  fecharegistro: any
  fechacierre: any
  activa: any
  empresaid: any

  /*** fin variables formulario */


  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['empresas', 'sucursales', 'Activo', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  /**fin del paginador y modal */
  info: boolean = false;
  empresas: any;
  colonia: any;
  estado: any;
  municipio: any;
  paises: any;
  codigopostal: any;

  constructor(
    private user: userservice,
    private cp: cpservice) { }


  ngOnInit(): void {
    this.consultar_empresas();
    this.consultar()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }

  //metodo para limpiar las variables del formulario
  clean() {
    this.sucursalid = null
    this.nombre_sucursal = null
    this.calle = null
    this.numero = null
    this.idcp = null
    this.fecharegistro = null
    this.fechacierre = null
    this.activa = null
    this.empresaid = null
    this.municipio = null
    this.paises = null
    this.codigopostal = null

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


  consultar_empresas() {

    const a = { option: 5 }

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
          this.empresas = data.resultado[0].manage_empresa.data;
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

  consultar() {
    const a = { option: 5 }

    this.cp.sucursal(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_sucursal.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data = data.resultado[0].manage_sucursal.data;
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

  guardarsucursal() {

    const a = {

      //sucursalid: sucursalid
      nombre_sucursal: this.nombre_sucursal,
      calle: this.calle,
      numero: this.numero,
      idcp: this.idcp,
      fecharegistro: this.fecharegistro,
      fechacierre: this.fechacierre,
      activa: this.activa,
      empresaid: this.empresaid,
      option: 1

    }

    this.cp.sucursal(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_sucursal.action,
          title: data.resultado[0].manage_sucursal.message,
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

  actualizarsucursal() {
    const a = {
      sucursalid: this.sucursalid,
      nombre_sucursal: this.nombre_sucursal,
      calle: this.calle,
      numero: this.numero,
      idcp: this.idcp,
      fecharegistro: this.fecharegistro,
      fechacierre: this.fechacierre,
      activa: this.activa,
      empresaid: this.empresaid,
      option: 2
    }

    this.cp.sucursal(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_sucursal.action,
          title: data.resultado[0].manage_sucursal.message,
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

  abrirgurdar() {
    this.info = true;
    this.will.show()
  }

  async actualizar(datos: any) {

    this.sucursalid= datos.sucursalid
    this.nombre_sucursal=datos.nombre_sucursal
      this.calle = datos.calle
      this.numero = datos.numero
      this.idcp = datos.idcp
      this.fecharegistro = datos.fecharegistro
      this.fechacierre = datos.fechacierre
      this.activa= datos.activa
      this.empresaid= datos.empresaid

    const info2 = {
      cp: datos.idcp
    };

    const data2: any = await this.cp.codigopostar(info2).toPromise(); // Convertir el observable a una promesa

    this.codigopostal = data2.info.data[0].cp;
    this.estado = data2.info.data[0].estado;
    this.municipio = data2.info.data[0].municipio;


    this.will.show()
  }

  eliminar(datos: any) {
    const a = {
      sucursalid: datos.sucursalid,
      option: 3
    }

    this.cp.sucursal(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_sucursal.action,
          title: data.resultado[0].manage_sucursal.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.will.hide()
        this.consultar()
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.clean();
        this.will.hide()
        this.consultar()
      }
    )
  }
  getsucursalName(empresaid: number): string {
    console.log(empresaid)
    const agency = this.empresas.find((a:any) => a.idempresa == empresaid);
    return agency ? agency.razonsocial : 'Unknown';
  }
}
