import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cortecajam',
  templateUrl: './cortecajam.component.html',
  styleUrls: ['./cortecajam.component.css']
})
export class CortecajamComponent {
  fechaSeleccionada: string = '';
  sucursal: any;
  info: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Fecha', 'Operacion', 'Moneda', 'Monto', 'Tasa', 'Valor']
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private consultar: cpservice,
  ) { }

  ngOnInit(): void {

    this.sucursal = localStorage.getItem('sucursalid');
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 5; // Establecer el tamaño de página predeterminado
    });
  }
  buscar() {
    if (this.fechaSeleccionada == '' || this.fechaSeleccionada == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione la Fecha',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
      return;
    }
    const data = {
      fecha: this.fechaSeleccionada,
      sucursal: this.sucursal
    }
    this.consultar.movimientos(data).subscribe(
      {
        next: (v) => {
          if (v === null || v.info === null) {
            Swal.fire({
              icon: 'warning',
              title: 'No se encontraron registros \n en la fecha: ' + this.fechaSeleccionada,
              allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
              allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
            });
            return
          }
          console.log(v)
          const allDetails = v.info.map((item: { detalles: any; }) => item.detalles).flat();

          this.dataSource.data = allDetails
        },
        error: (e) => {
          Swal.fire({
            icon: 'warning',
            title: 'Ocurrio un error al procesar tu solicitud',
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
        },
        complete: () => console.log('completado')
      }
    );


  }

  descargarExcel(): void {
    if (this.fechaSeleccionada == '' || this.fechaSeleccionada == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione la Fecha',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
      return;
    }
    const data = {
      fecha: this.fechaSeleccionada,
      sucursal: this.sucursal
    }
    this.consultar.Docmovimientos(data).subscribe(
      {
        next: (response) => {
          this.downLoadFile(response, "application/xlsx")
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: 'Ocurrio un error al procesar tu solicitud',
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
        },
        complete: () => {
          console.log('Descarga completada.');
        }
      });

  }
  public downLoadFile(data: any, type: string) {

    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = 'ReporteMovimietos' + this.fechaSeleccionada + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);

  }
}


