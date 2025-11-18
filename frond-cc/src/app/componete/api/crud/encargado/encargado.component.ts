import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent {
  usuarios: any;

  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  empresaid: any;
  displayedColumns: string[] = ['Sucursal', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  /**fin del paginador y modal */
  info: boolean = false;
  empresas: any;
  idrol: any;
  user: any;
  resultado: boolean = false;
  constructor(
    private us: userservice,
    private cp: cpservice) { }


  empresa: any;
  ngOnInit(): void {

    this.idrol = localStorage.getItem('idrol')

    if (this.idrol == 1) {
      this.consultar_empresas();
    } else {
      this.empresa = localStorage.getItem('emp')

      this.consultar(this.empresa)
    }
  }

  consultar(emp: any) {


    const info = {
      option: 6,
      empresa: emp
    }
    this.us.User(info).subscribe(
      (data: any) => {
        this.usuarios = data.resultado[0].manage_user.data; // Llenar dataSource con los datos
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

  activar(info: any) {
    let a = {};
    if (info.datos == false) {
      a = {
        option: 1,
        idusuario: this.user,
        sucursalid: info.sucursalid
      }
    } else {
      a = {
        option: 2,
        idencargado: info.idencargado
      }
    }

    this.cp.Encargados_permiso(a).subscribe(
      (data: any) => {

        this.consultarEncargado(this.user);

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
  consultarEncargado(users: any) {

    const a = {
      user: users
    }

    this.cp.Encargados(a).subscribe(
      (data: any) => {
        this.dataSource.data = data.resultado; // Llenar dataSource con los datos
        this.resultado = true;
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
  limpiarcampo() {
    this.dataSource.data = []
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
  suc(event: any) {
    this.consultar(event.target.value)
  }
}
