import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { SharedDataService } from 'src/app/componete/servicios/request.info';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.css']
})
export class DivisasComponent {
  abrirgurdar() {
    throw new Error('Method not implemented.');
  }

  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['sucursal', 'moneda', 'fecha', 'compra', 'venta', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  divisas: any;
  info: boolean = false;
  sucursales: any;
  /**
   * inicio de variables para guardar tipo de cambio
   * 
   */

  compra: any;
  venta: any;
  idgrupo: any;
  sucursalid_: any;
  nombregrupo: any;
  nombresucursal:any;

  /**
   * 
   * @param datos 
   */
  rol: any;
  encargado: any;
  id: any;
  constructor(
    private datos: cpservice,
    private _cdr: ChangeDetectorRef) { }
  /**fin del paginador y modal */
  ngOnInit(): void {


    this.id = localStorage.getItem('ID')
    this.catalogos();
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


  /** consultas de pais, estados, nacionalidades e ocupacion */

  catalogos() {

    const info = {
      idusuario: this.id
    }
    this.datos.divisas(info).subscribe(
      (data: any) => {
        this.dataSource.data = data.resultado[0].divisas_dia.valores;

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


    this.compra = '';
    this.venta = '';

  }

  estructuraguardar(): any {
    const a = {

      compra: this.compra,
      venta: this.venta,
      grupoid:this.idgrupo,
      sucursal:this.sucursalid_

    }
    return a;
  }

  mensaje:any = '';
  guardar() {
    if(this.compra == null || this.venta==null || this.compra=='' || this.venta == ''){

      this.mensaje='Favor de llenar los 2 campos'
      return;
    }else{
      this.mensaje='';
    }

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 1
    }

    this.datos.divisasi(info).subscribe(
      (data: any) => {
        this.limpiar();
        this.will.hide();
        this.catalogos();
        Swal.fire({
          icon: data.resultado[0].manage_clientes.action,
          title: data.resultado[0].manage_clientes.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
        
      }, (error: any) => {
        this.limpiar();
        this.will.hide();
        this.catalogos();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
   

  }



  nuevo(info: any) {
    this.idgrupo = info.idgrupo;
    this.sucursalid_ = info.sucursalid;
    this.nombregrupo = info.grupo;
    this.nombresucursal = info.sucursal;
    this.will.show();
  }
}


