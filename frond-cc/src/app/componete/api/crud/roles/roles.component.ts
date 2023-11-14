import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['rol', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  rol:any;
  id: any;
  constructor(
    private cp: cpservice) { }
  /**fin del paginador y modal */
  ngOnInit(): void {
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

  consultar(){
    const a = {
      option:5
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
          this.dataSource.data = data.resultado[0].manage_rol.data;
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
  abrirgurdar(){
    this.limpiar();
    this.info = true;
    this.will.show();
  }

  actualizar(datos:any){
    this.info = false;
    this.id = datos.idrol;
    this.rol = datos.descripcion
    this.will.show();
  }

  limpiar(){
    this.id = 0;
    this.rol = ''
  }
  eliminar(datos:any){
    const a = {
      descripcion:datos.descripcion,
      idrol:datos.idrol,
      option : 3
    }
    this.cp.roles(a).subscribe(
      (data: any) => {
       
          Swal.fire({
            icon: data.resultado[0].manage_rol.action,
            title: data.resultado[0].manage_rol.message,
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
  guardarrol(){
    const a = {
      descripcion:this.rol,
      option : 1
    }
    this.cp.roles(a).subscribe(
      (data: any) => {
       
          Swal.fire({
            icon: data.resultado[0].manage_rol.action,
            title: data.resultado[0].manage_rol.message,
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

  actualizarrol(){
    const a = {
      descripcion:this.rol,
      idrol:this.id,
      option : 2
    }
    this.cp.roles(a).subscribe(
      (data: any) => {
       
          Swal.fire({
            icon: data.resultado[0].manage_rol.action,
            title: data.resultado[0].manage_rol.message,
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
}
