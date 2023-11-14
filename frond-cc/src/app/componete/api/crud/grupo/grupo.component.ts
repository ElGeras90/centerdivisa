import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent {

  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['grupo', 'riesgo', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  descripcion: any;
  idgrupo: any;
  grupo: any;
  riesgo: boolean = false;
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
      this.paginator.pageSize = 5; // Establecer el tamaño de página predeterminado
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
    this.cp.grupo(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_grupo_divisa.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_grupo_divisa.action,
            title: data.resultado[0].manage_grupo_divisa.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSource.data = data.resultado[0].manage_grupo_divisa.data;
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
    this.idgrupo = datos.idgrupo
    this.grupo = datos.grupo
    this.riesgo = datos.riesgo
    this.will.show();
  }

  eliminar(datos: any) {
    const a = {

      idacceso: datos.idgrupoificacion,
      option: 3
    }
    this.cp.grupo(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_grupo_divisa.action,
          title: data.resultado[0].manage_grupo_divisa.message,
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

  limpiar(){
    this.idgrupo =0
    this.grupo=''
    this.riesgo=false;
  }
  guardar() {

    const a = {
      option: 1,
      idgrupo: this.idgrupo,
      grupo: this.grupo,
      riesgo:this.riesgo
    }

    this.cp.grupo(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_grupo_divisa.action,
          title: data.resultado[0].manage_grupo_divisa.message,
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

  actualizar_() {
    const a = {
     idgrupo: this.idgrupo,
      grupo: this.grupo,
      riesgo:this.riesgo,
      option: 2
    } 
    this.cp.grupo(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_grupo_divisa.action,
          title: data.resultado[0].manage_grupo_divisa.message,
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
