import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-identificaion',
  templateUrl: './identificaion.component.html',
  styleUrls: ['./identificaion.component.css']
})
export class IdentificaionComponent {

    /** paginador y modal*/
    @ViewChild("will", { static: false })
    will: any;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
  
    displayedColumns: string[] = ['Descripcion', 'acciones'];
  
    dataSource = new MatTableDataSource<any>([]);
    info: boolean = false;
    descripcion: any;
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
  
    consultar() {
      const a = {
        option: 5
      }
      this.cp.ident(a).subscribe(
        (data: any) => {
          if (data.resultado[0].manage_identificacion.action == 'error') {
            Swal.fire({
              icon: data.resultado[0].manage_identificacion.action,
              title: data.resultado[0].manage_identificacion.message,
              allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
              allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
            });
  
          } else {
            this.dataSource.data = data.resultado[0].manage_identificacion.data;
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
      this.info = true;
      this.will.show();
    }
  
    actualizar(datos: any) {
      this.info = false;
      this.id = datos.ididentificacion
      this.descripcion = datos.descripcion
      this.will.show();
    }
  
    eliminar(datos: any) {
      const a = {
  
        idacceso: datos.ididentificacion,
        option: 3
      }
      this.cp.ident(a).subscribe(
        (data: any) => {
  
          Swal.fire({
            icon: data.resultado[0].manage_identificacion.action,
            title: data.resultado[0].manage_identificacion.message,
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
        ididentificacion:this.id,
        descripcion:this.descripcion
      }
      this.cp.ident(a).subscribe(
        (data: any) => {
  
          Swal.fire({
            icon: data.resultado[0].manage_identificacion.action,
            title: data.resultado[0].manage_identificacion.message,
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
        ididentificacion:this.id,
        descripcion:this.descripcion,
        option: 2
      }
      this.cp.ident(a).subscribe(
        (data: any) => {
  
          Swal.fire({
            icon: data.resultado[0].manage_identificacion.action,
            title: data.resultado[0].manage_identificacion.message,
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
  