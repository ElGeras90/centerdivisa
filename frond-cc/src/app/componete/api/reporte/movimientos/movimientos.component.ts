import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent {
  displayedColumns: string[] = ['Cliente', 'Tipo', 'Fecha', 'Divisa', 'Cambio', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  
  constructor(
    private datos: cpservice,
   
  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  abrirwill(){

  }
  abrirupdate(dato:any){}
}
