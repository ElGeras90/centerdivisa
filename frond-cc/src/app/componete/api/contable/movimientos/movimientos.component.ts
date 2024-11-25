import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['usuario', 'cliente', 'desc', 'freg', 'me', 'cant', 'tc', 'mn'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private cp: cpservice) { }
  ngOnInit(): void {
    this.consultar()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator; // Configurar el paginador
      this.paginator.pageSize = 10; // Establecer el tamaño de página predeterminado
    });
  }
  consultar() {
    const x = localStorage.getItem('ID');
    const a = { idusuario: x }

    this.cp.saldosdia(a).subscribe(
      (data: any) => {
        console.log('Error entre')
        this.dataSource.data = data.info.valores;
        console.log(this.dataSource.data)

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
}