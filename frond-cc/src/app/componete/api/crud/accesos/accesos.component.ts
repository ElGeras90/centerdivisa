import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent {
  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['rol', 'menu', 'estatus', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  rol: any;
  id: any;
  estatus: boolean = false;
  idrol: any;
  roles: any;
  menus: any;
  idr: any;
  constructor(
    private cp: cpservice) { }
  /**fin del paginador y modal */
  ngOnInit(): void {
    this.idr = localStorage.getItem('idrol')
    this.consulstarrolesmenus();
    this.consultar();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  consultar() {
    const a = {
      option: 5,
      rol: this.idr
    }
    this.cp.accesos(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_acceso_rol.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_acceso_rol.action,
            title: data.resultado[0].manage_acceso_rol.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data = data.resultado[0].manage_acceso_rol.data;
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
  abrirgurdar() {
    this.limpiar()
    this.info = true;
    this.will.show();
  }

  actualizar(datos: any) {
    this.info = false;
    this.id = datos.idacceso
    this.idrol = datos.idrol;
    this.rol = datos.idcomponete;
    this.estatus = datos.status
    this.will.show();
  }

  eliminar(datos: any) {
    const a = {

      idacceso: datos.idacceso,
      option: 3
    }
    this.cp.accesos(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_acceso_rol.action,
          title: data.resultado[0].manage_acceso_rol.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }
    )
  }
  guardarrol() {
    const a = {
      option: 1,
      idrol: this.idrol,
      idcomponete: this.rol,
      status: this.estatus
    }
    this.cp.accesos(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_acceso_rol.action,
          title: data.resultado[0].manage_acceso_rol.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }
    )
  }

  actualizarrol() {
    const a = {
      idrol: this.idrol,
      idcomponete: this.rol,
      status: this.estatus,
      idacceso: this.id,
      option: 2
    }
    this.cp.accesos(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_acceso_rol.action,
          title: data.resultado[0].manage_acceso_rol.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        this.will.hide()
        this.consultar();
      }
    )
  }

  consulstarrolesmenus() {
    const a = {
      option: 5,
      rol: this.idr
    }
    this.cp.roles(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_rol.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_rol.action,
            title: data.resultado[0].manage_rol.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.roles = data.resultado[0].manage_rol.data;
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

    this.cp.menus(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_menu.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_menu.action,
            title: data.resultado[0].manage_menu.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.menus = data.resultado[0].manage_menu.data;
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
  limpiar() {
    this.idrol = 0
    this.rol = ''
    this.estatus = false
  }
}
