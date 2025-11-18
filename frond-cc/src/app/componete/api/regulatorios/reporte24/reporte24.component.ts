import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { userservice } from 'src/app/componete/servicios/userService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte24',
  templateUrl: './reporte24.component.html',
  styleUrls: ['./reporte24.component.css']
})
export class Reporte24Component implements OnInit {
  formulario!: FormGroup;
  sucursales: any[] = [];
  resultados: any[] = [];
  total_mn = 0;
  total_me = 0;
  total_ops = 0;
  cargando = false;
  empresa: any;
  idrol: any;
  empresas: any;

  constructor(
    private user: userservice,
    private cp: cpservice,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.idrol = localStorage.getItem('idrol')


    if (this.idrol == 1) {
      this.consultar_empresas();
      this.consultar()
    } else {
      this.empresa = localStorage.getItem('emp')
      this.suc(this.empresa)
    }
  }
  suc(event: any) {
    let selectedValue: any;
    if (this.idrol == 1) {
      selectedValue = event.target.value;
    } else {
      selectedValue = event;
    }


    const info = {
      option: 6,
      empresaid: selectedValue
    }
    this.cp.sucursal(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_sucursal.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this._cdr.detectChanges();
          this.sucursales = data.resultado[0].manage_sucursal.data;
          this._cdr.detectChanges();

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
          this._cdr.detectChanges();
          this.sucursales = data.resultado[0].manage_sucursal.data;
          this._cdr.detectChanges();
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

  generarReporte() {
    let sucursalid = (document.getElementById('sucursalid') as HTMLInputElement).value;
    const info = {
      pid_empresa: this.empresa,
      pid_sucursal: sucursalid
    }
    this.cp.reporte24h(info).subscribe(
      (data: any) => {
        if (data.resultado.total_operaciones == 0) {
          Swal.fire({
            icon: "error",
            title: data.resultado.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
        } else {
          this.resultados =data.resultado.resultados || [];
        }
      }, (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }
  exportarExcel() {
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.resultados);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Operaciones 24h');
    // XLSX.writeFile(wb, 'reporte_operaciones_24h.xlsx');
  }
}
