import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { SharedDataService } from 'src/app/componete/servicios/request.info';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bobeda',
  templateUrl: './bobeda.component.html',
  styleUrls: ['./bobeda.component.css']
})
export class BobedaComponent {

  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Sucursal', 'Divisa', 'Entrada', 'Salida', 'Descripcion'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  activar: boolean = false;


  idusuario: any;
  /**
   * variables de las divisas
   */

  grupo: any;
  salida: number = 0;
  entrada: number = 0;
  idsaldos: number = 0;
  descripcion: string = '';
  idsucursalid: number = 0;
  idgrupodivisa: number = 0;
  idsucursal:any;
  tipo: any = 2;
  sucursales: any;
  administrador :any;
  encargado : any;
  sinsucursal:boolean=false; 
  grupodivisa:any;
  isChecked:boolean=true;
  /**
   * fin de variables de las divisas
   */

  constructor(
    private datos: cpservice,
    private shared: SharedDataService,
  ) { }
  /**fin del paginador y modal */
  ngOnInit(): void {
    this.idusuario = localStorage.getItem('ID');
    this.administrador = localStorage.getItem('idrol')
    this.encargado = localStorage.getItem('encargado')
    this.activar = this.shared.getActivo();
    this.consultar();
    this.grupodivisas();
    if(this.administrador == 1 || this.encargado==true){
      this.sinsucursal=true;
        this.suc();
    }else{
      this.idsucursal=localStorage.getItem('sucursalid');
      this.sinsucursal=false;
    }

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
  abrirwill() {
    this.info = true;
    this.will.show();
  }

  abrirwill2(row:any) {
    this.info = false;
    this.llenarcampos(row)
    this.will.show();
  }
  async consultar() {


    const info = {
      idusuario: this.idusuario
    }

    this.datos.infosuc(info).subscribe(
      (data: any) => {
        this.dataSource.data = data.info[0].divisas_suc_usuario;
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

  crearjson(){
    this.descripcion=this.descripcion;
    console.log(this.descripcion)
    const a = {
      idsucursalid:this.idsucursalid,
      idgrupodivisa:this.idgrupodivisa,
      entrada:this.entrada,
      salida:this.salida,
      idusuario:this.idusuario,
      tipo:this.tipo,
      idsaldos: this.idsaldos,
      descripcion: this.descripcion,
      option:0
    }
    return a;
  }

  suc() {

    let info = {}
    
    if(this.administrador == 1 ){

      info= {
        option: 5,
      }
    }else{
      info= {
        option: 7,
        userid:this.idusuario
      }
    }
    
    this.datos.sucursal(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_sucursal.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.sucursales = data.resultado[0].manage_sucursal.data;
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
 
  grupodivisas() {
    const a = {
      option: 5
    }
    this.datos.grupo(a).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_grupo_divisa.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_grupo_divisa.action,
            title: data.resultado[0].manage_grupo_divisa.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.grupodivisa = data.resultado[0].manage_grupo_divisa.data;
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


  async guardarmovimiento() {

  
      Swal.fire({
        imageUrl: '../../../../assets/img/unnamed.png',
        title: '¿Desea Realizar el registro?',
        text: 'puede verificar antes de aceptar',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: false,
      }).then((result:any) => {
        if (result.isConfirmed) {
          const a = this.crearjson();
          a.option = 1;
           this.datos.infosucdiv(a).subscribe(
             (data: any) => { 
               this.consultar()
       
                 Swal.fire({
                   icon: data.info[0].manage_saldo_dvisas.action,
                   title: data.info[0].manage_saldo_dvisas.message,
                   allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
                   allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
                 });
             
             }, (error: any) => {
               Swal.fire({
                 icon: 'error',
                 title: 'Ocurrio un problema al intentar realizar la accion ',
                 allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
                 allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
               });
             }
             
           )
           this.limpiar()
           this.will.hide();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
         
        }
      });
 



  }

  
  actualizarmovimiento() {
    const a = this.crearjson();
    a.option = 2;
     this.datos.infosucdiv(a).subscribe(
       (data: any) => {
        this.dataSource.data = [];
        

           Swal.fire({
             icon: data.info[0].manage_saldo_dvisas.action,
             title: data.info[0].manage_saldo_dvisas.message,
             allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
             allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
           });
       
       }, (error: any) => {
         Swal.fire({
           icon: 'error',
           title: 'Ocurrio un problema al intentar realizar la accion ',
           allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
           allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
         });
       }
     )
     this.consultar()
     this.limpiar()

     this.will.hide();
   }

   limpiar(){
    this.idsucursalid=0
      this.idgrupodivisa=0
      this.entrada=0
     this.salida=0
       this.descripcion='';
   }
   llenarcampos(row : any){
    this.idsucursalid = row.idsucursalid,
    this.idgrupodivisa=row.idgrupodivisa
    this.entrada = row.entrada
    this.salida = row.salida
    this.idusuario = row.idusuario
    this.tipo = row.tipo
    this.idsaldos = row.idsaldos
    this.descripcion = row.descripcion
   }

}
