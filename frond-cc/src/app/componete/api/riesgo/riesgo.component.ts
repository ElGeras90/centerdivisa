import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cpservice } from '../../servicios/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-riesgo',
  templateUrl: './riesgo.component.html',
  styleUrls: ['./riesgo.component.css']
})
export class RiesgoComponent {
  @ViewChild("prod", { static: false })
  pro: any;
  @ViewChild("porigen", { static: false })
  porigen: any;
  @ViewChild("mmes", { static: false })
  mmes: any;
  @ViewChild("inst", { static: false })
  inst: any;
  @ViewChild("tusr", { static: false })
  tusr: any;
  @ViewChild("frec", { static: false })
  frec: any;
  @ViewChild("paises", { static: false })
  paises: any;
  @ViewChild("edos", { static: false })
  edos: any;
  @ViewChild("ocup", { static: false })
  ocup: any;
@ViewChild("proposito", { static: false }) proposito1: any;
@ViewChild("frecuencia", { static: false }) frecuencia1: any;
@ViewChild("tipooperaciones", { static: false }) tipooperaciones1: any;
@ViewChild("actuanombre", { static: false }) actuanombre1: any;
@ViewChild("mediopago", { static: false }) mediopago1: any;
@ViewChild("origenrecursos", { static: false }) origenrecursos1: any;
@ViewChild("destinorecursos", { static: false }) destinorecursos1: any;
@ViewChild("relaciontercero", { static: false }) relaciontercero1: any;


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator1!: MatPaginator;
  @ViewChild('paginator3') paginator2!: MatPaginator;
  @ViewChild('paginator4') paginator3!: MatPaginator;
  @ViewChild('paginator5') paginator4!: MatPaginator;
  @ViewChild('paginator6') paginator5!: MatPaginator;
  @ViewChild('paginator7') paginator6!: MatPaginator;
  @ViewChild('paginator8') paginator7!: MatPaginator;
  @ViewChild('paginator9') paginator8!: MatPaginator;
  @ViewChild('paginator10') paginator10!: MatPaginator;
  @ViewChild('paginator11') paginator11!: MatPaginator;
  @ViewChild('paginator12') paginator12!: MatPaginator;
  @ViewChild('paginator13') paginator13!: MatPaginator;
  @ViewChild('paginator14') paginator14!: MatPaginator;
  @ViewChild('paginator15') paginator15!: MatPaginator;
  @ViewChild('paginator16') paginator16!: MatPaginator;
  @ViewChild('paginator17') paginator17!: MatPaginator;
  propositoModal: any;
  frecuenciaModal: any;
  tipoOperacionesModal: any;
  actuaNombreModal: any;
  medioPagoModal: any;
  origenRecursosModal: any;
  destinoRecursosModal: any;
  relacionTerceroModal: any;

  /**inicio variables para productos*/
  dataSourceproducto = new MatTableDataSource<any>([]);
  //dataSourceproducto = new MatTableDataSource<any>();

  displayedColumns: string[] = ['descripcion', 'puntos', 'acciones'];


  descricion: any;
  puntos: any;
  idproducto: any;

  /**fin variables */
  /**
   * 
   * monto por mes variable
   */
  dataSourcemontomes = new MatTableDataSource<any>([]);
  displayedColumnsmontomes: string[] = ['nivel', 'montominimo', 'montomaximo', 'puntuacion', 'acciones'];

  nivel: any;
  minmonto: any;
  maxmonto: any;
  puntuacion: any;
  idnivel: any;
  /**fin variables */
  /**
   * 
   * pais origen variable
   */
  dataSourcepaisorigen = new MatTableDataSource<any>([]);
  displayedColumnspaisorigen: string[] = ['descripcion', 'puntos', 'acciones'];
  descorigen: any;
  puntosorigen: any;
  id: any;
  /**fin variables */
  /**
   * 
   * Instrumentos variable
   */
  dataSourceinstrumento = new MatTableDataSource<any>([]);
  displayedColumnsinstrumento: string[] = ['descripcion', 'puntos', 'acciones'];
  descinst: any;
  puntosinst: any;
  idtipo: any;
  /**fin variables */

  /**
   * 
   * Frecuencia mes variable
   */
  dataSourcefrecuencia = new MatTableDataSource<any>([]);
  displayedColumnsfrecuencia: string[] = ['frecuencia', 'puntos', 'acciones'];
  frecuencia: any;
  puntuacionfrec: any;
  idfrecuencia: any;
  /**fin variables */

  /**
   * 
   * tuser variable
   */
  dataSourcetuser = new MatTableDataSource<any>([]);
  displayedColumnstuser: string[] = ['descripcion', 'puntos', 'acciones'];
  descripcion: any;
  puntostuser: any;
  idtipousuario: any;

  /**fin variables */

  /**
   * 
   * paises mes variable
   */
  dataSourcepaises = new MatTableDataSource<any>([]);
  displayedColumnspaises: string[] = ['Pais', 'Codigo', 'nivel', 'Paraiso', 'Bloqueados', 'acciones'];
  nombre: any;
  codigo: any;
  nlist: any;
  nivelp: any;
  paraisofiscal: any;
  bloqueado: any;
  idpais: any;

  /**fin variables */


  /**
   * 
   * estados ariable
   */
  dataSourceestados = new MatTableDataSource<any>([]);
  displayedColumnsestados: string[] = ['Estado', 'puntuacion', 'acciones'];
  estadocodigo: any;
  puntuacionedo: any;
  idedo: any;


  /**fin variables */

  /**
   * 
   * estados ariable
   */
  dataSourcesocupacion = new MatTableDataSource<any>([]);
  displayedColumnsocupacion: string[] = ['Ocupacion', 'Clave', 'puntuacion', 'acciones'];
  ocupaciondescrip: any;
  claveof: any;
  nivelxd: any;
  idactividad: any;

  dataSourceProposito = new MatTableDataSource<any>([]);
  displayedColumnsProposito: string[] = ['idproposito', 'descripcion', 'acciones'];
  idproposito: any; descripcionProposito: any;

  dataSourceFrecuencia = new MatTableDataSource<any>([]);
  displayedColumnsFrecuencia: string[] = ['idfrecuencia', 'descripcion', 'acciones'];
  idfrecuencias: any; descripcionFrecuencia: any;

  dataSourceTipoOperaciones = new MatTableDataSource<any>([]);
  displayedColumnsTipoOperaciones: string[] = ['idtipo', 'descripcion', 'acciones'];
  idtipos: any; descripcionTipoOperaciones: any;

  dataSourceActuaNombre = new MatTableDataSource<any>([]);
  displayedColumnsActuaNombre: string[] = ['idactua', 'descripcion', 'acciones'];
  idactua: any; descripcionActuaNombre: any;

  dataSourceMedioPago = new MatTableDataSource<any>([]);
  displayedColumnsMedioPago: string[] = ['idmedio', 'descripcion', 'acciones'];
  idmedio: any; descripcionMedioPago: any;

  dataSourceOrigenRecursos = new MatTableDataSource<any>([]);
  displayedColumnsOrigenRecursos: string[] = ['idorigen', 'descripcion', 'acciones'];
  idorigen: any; descripcionOrigenRecursos: any;

  dataSourceDestinoRecursos = new MatTableDataSource<any>([]);
  displayedColumnsDestinoRecursos: string[] = ['iddestino', 'descripcion', 'acciones'];
  iddestino: any; descripcionDestinoRecursos: any;

  dataSourceRelacionTercero = new MatTableDataSource<any>([]);
  displayedColumnsRelacionTercero: string[] = ['idrelacion', 'descripcion', 'acciones'];
  idrelacion: any; descripcionRelacionTercero: any;

  dataSourcePepTipo = new MatTableDataSource<any>([]);
  displayedColumnsPepTipo: string[] = ['idpep', 'descripcion', 'acciones'];
  idpep: any; descripcionPepTipo: any;
  /**fin variables */
  constructor(
    private cp: cpservice) { }
  async ngOnInit(): Promise<void> {
    await this.consultardatos();
    this.consultarProposito()
    this.consultarFrecuencia()
    this.consultarTipoOperaciones()
    this.consultarActuaNombre()
    this.consultarMedioPago()
    this.consultarOrigenRecursos()
    this.consultarDestinoRecursos()
    this.consultarRelacionTercero()

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSourceproducto.paginator = this.paginator; // Configurar el paginador
      this.dataSourcepaisorigen.paginator = this.paginator1;
      this.dataSourcemontomes.paginator = this.paginator2;
      this.dataSourceinstrumento.paginator = this.paginator3;
      this.dataSourcefrecuencia.paginator = this.paginator4;
      this.dataSourcetuser.paginator = this.paginator5;
      this.dataSourcepaises.paginator = this.paginator6;
      this.dataSourceestados.paginator = this.paginator7;
      this.dataSourcesocupacion.paginator = this.paginator8;
      this.dataSourceProposito.paginator = this.paginator10;
      this.dataSourceFrecuencia.paginator = this.paginator11;
      this.dataSourceTipoOperaciones.paginator = this.paginator12;
      this.dataSourceActuaNombre.paginator = this.paginator13;
      this.dataSourceMedioPago.paginator = this.paginator14;
      this.dataSourceOrigenRecursos.paginator = this.paginator15;
      this.dataSourceDestinoRecursos.paginator = this.paginator16;
      this.dataSourceRelacionTercero.paginator = this.paginator17;
      this.paginator.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator1.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator2.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator3.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator4.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator5.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator6.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator7.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator8.pageSize = 5; // Establecer el tamaño de página predeterminado
      this.paginator10.pageSize = 5;
      this.paginator11.pageSize = 5;
      this.paginator12.pageSize = 5;
      this.paginator13.pageSize = 5;
      this.paginator14.pageSize = 5;
      this.paginator15.pageSize = 5;
      this.paginator16.pageSize = 5;
      this.paginator17.pageSize = 5;
    });
  }


  propositox(info: any) { this.descripcionProposito = info.descripcion; this.idproposito = info.idproposito; this.propositoModal?.show(); }
  frecuenciax(info: any) { this.descripcionFrecuencia = info.descripcion; this.idfrecuencia = info.idfrecuencia; this.frecuenciaModal?.show(); }
  tipooperaciones(info: any) { this.descripcionTipoOperaciones = info.descripcion; this.idtipo = info.idtipo; this.tipoOperacionesModal?.show(); }
  actuanombre(info: any) { this.descripcionActuaNombre = info.descripcion; this.idactua = info.idactua; this.actuaNombreModal?.show(); }
  mediopago(info: any) { this.descripcionMedioPago = info.descripcion; this.idmedio = info.idmedio; this.medioPagoModal?.show(); }
  origenrecursos(info: any) { this.descripcionOrigenRecursos = info.descripcion; this.idorigen = info.idorigen; this.origenRecursosModal?.show(); }
  destinorecursos(info: any) { this.descripcionDestinoRecursos = info.descripcion; this.iddestino = info.iddestino; this.destinoRecursosModal?.show(); }
  relaciontercero(info: any) { this.descripcionRelacionTercero = info.descripcion; this.idrelacion = info.idrelacion; this.relacionTerceroModal?.show(); }


  async consultardatos() {
    const a = {
      option: 5
    }
    this.cp.crudprod(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_producto.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_producto.action,
            title: data.resultado[0].manage_producto.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourceproducto.data = data.info[0].manage_producto.data;
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
    this.cp.crudorigen(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_pais_origen.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_pais_origen.action,
            title: data.resultado[0].manage_pais_origen.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcepaisorigen.data = data.info[0].manage_pais_origen.data;
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
    this.cp.crudmonto(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_montos_mes.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_montos_mes.action,
            title: data.resultado[0].manage_montos_mes.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcemontomes.data = data.info[0].manage_montos_mes.data;
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
    this.cp.crudinstrumento(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_instrumentos.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_instrumentos.action,
            title: data.resultado[0].manage_instrumentos.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourceinstrumento.data = data.info[0].manage_instrumentos.data;
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
    this.cp.crudfrecuencia(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_frecuencia_mes.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_frecuencia_mes.action,
            title: data.resultado[0].manage_frecuencia_mes.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcefrecuencia.data = data.info[0].manage_frecuencia_mes.data;
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
    this.cp.crudtiposuer(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_cat_tuser.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cat_tuser.action,
            title: data.resultado[0].manage_cat_tuser.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcetuser.data = data.info[0].manage_cat_tuser.data;
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
    this.cp.crudpaises(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_cat_paises.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cat_paises.action,
            title: data.resultado[0].manage_cat_paises.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcepaises.data = data.info[0].manage_cat_paises.data;
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
    this.cp.crudestados(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_cat_estados.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cat_estados.action,
            title: data.resultado[0].manage_cat_estados.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourceestados.data = data.info[0].manage_cat_estados.data;
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
    this.cp.crudocupacion(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_cat_ocupaciones.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_cat_ocupaciones.action,
            title: data.resultado[0].manage_cat_ocupaciones.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcesocupacion.data = data.info[0].manage_cat_ocupaciones.data;
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
  //FILTROS DE BUSQUEDA
  filtroproducto(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceproducto.filter = filterValue.trim().toLowerCase();
  }
  filtropaisorigen(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcepaisorigen.filter = filterValue.trim().toLowerCase();
  }
  filtromontomes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcemontomes.filter = filterValue.trim().toLowerCase();
  }
  filtroinstrumento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceinstrumento.filter = filterValue.trim().toLowerCase();
  }
  filtrofrecuencia(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcefrecuencia.filter = filterValue.trim().toLowerCase();
  }
  filtrotuser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcetuser.filter = filterValue.trim().toLowerCase();
  }
  filtropais(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcepaises.filter = filterValue.trim().toLowerCase();
  }
  filtroestado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceestados.filter = filterValue.trim().toLowerCase();
  }
  filtroocupacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourcesocupacion.filter = filterValue.trim().toLowerCase();
  }
  //ABRIR ACTUALIZAR
  producto(info: any) {
    this.descricion = info.descripcion;
    this.puntos = info.puntos;
    this.idproducto = info.idproducto;
    this.pro.show();
  }
  paisorigen(info: any) {
    this.descorigen = info.desc;
    this.puntosorigen = info.puntos;
    this.id = info.id;
    this.porigen.show();

  }
  montomes(info: any) {
    this.nivel = info.nivel;
    this.minmonto = info.minmonto;
    this.maxmonto = info.maxmonto;
    this.puntuacion = info.puntuacion;
    this.idnivel = info.idnivel;
    this.mmes.show();
  }
  instrumento(info: any) {
    this.descinst = info.descripcion;
    this.puntosinst = info.puntos;
    this.idtipo = info.idtipo;
    this.inst.show();
  }
  frecuencias(info: any) {
    this.frecuencia = info.frecuencia;
    this.puntuacionfrec = info.puntuacion;
    this.idfrecuencia = info.idfrecuencia;
    this.frec.show();
  }
  tuser(info: any) {
    this.descripcion = info.descripcion;
    this.puntostuser = info.puntos;
    this.idtipousuario = info.idtipousuario;
    this.tusr.show();
  }
  pais(info: any) {
    this.nombre = info.nombre;
    this.codigo = info.codigo;
    this.nlist = info.nlist;
    this.nivelp = info.nivel;
    this.paraisofiscal = info.paraisofiscal;
    this.bloqueado = info.bloqueado;
    this.idpais = info.idpais;
    this.paises.show();
  }
  estado(info: any) {
    this.estadocodigo = info.estado;
    this.puntuacionedo = info.puntuacion;
    this.idedo = info.idest;
    this.edos.show();
  }
  ocupacion(info: any) {
    this.ocupaciondescrip = info.descricion;
    this.claveof = info.claveof;
    this.nivelxd = info.nivel;
    this.idactividad = info.idactividad;
    this.ocup.show();
  }
  //update
  gproducto() {

    const a = {
      option: 2,
      descripcion: this.descripcion,
      idproducto: this.idproducto,
      puntos: this.puntos
    }
    this.cp.crudprod(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_producto.action,
          title: data.resultado[0].manage_producto.message,
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
  }
  gpaisorigen() {
    const a = {
      option: 2,
      id: this.id,
      desc: this.descorigen,
      puntos: this.puntosorigen
    }
    this.cp.crudorigen(a).subscribe(
      (data: any) => {
        Swal.fire({
          icon: data.resultado[0].manage_pais_origen.action,
          title: data.resultado[0].manage_pais_origen.message,
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
  }
  gmontomes() {
    const a = {
      option: 2,
      idnivel: this.idnivel,
      maxmonto: this.maxmonto,
      minmonto: this.minmonto,
      nivel: this.nivel,
      puntuacion: this.puntuacion,
    }
    this.cp.crudmonto(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_montos_mes.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_montos_mes.action,
            title: data.resultado[0].manage_montos_mes.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.dataSourcemontomes.data = data.info[0].manage_montos_mes.data;
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
  ginstrumento() {
    const a = {
      option: 2,
      idtipo: this.idtipo,
      puntos: this.puntosinst,
      descripcion: this.descinst
    }
    this.cp.crudinstrumento(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_instrumentos.action,
          title: data.resultado[0].manage_instrumentos.message,
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
  }
  gfrecuencias() {
    const a = {
      option: 2,
      frecuencia: this.frecuencia, puntuacion: this.puntuacionfrec, idfrecuencia: this.idfrecuencia
    }
    this.cp.crudfrecuencia(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_frecuencia_mes.action,
          title: data.resultado[0].manage_frecuencia_mes.message,
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
  }
  gtuser() {
    const a = {
      option: 2,
      puntos: this.puntostuser, descripcion: this.descripcion, idtipousuario: this.idtipousuario
    }
    this.cp.crudtiposuer(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_tuser.action,
          title: data.resultado[0].manage_cat_tuser.message,
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
  }
  gpais() {

    const a = {
      option: 2,
      nivel: this.nivelp, nlist: this.nlist, codigo: this.codigo, idpais: this.idpais, nombre: this.nombre, paraisofiscal: this.paraisofiscal, bloqueado: this.bloqueado
    }
    this.cp.crudpaises(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_paises.action,
          title: data.resultado[0].manage_cat_paises.message,
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


  }
  gestado() {
    const a = {
      option: 2,
      idest: this.idedo, estado: this.estadocodigo, puntuacion: this.puntuacionedo
    }

    this.cp.crudestados(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_estados.action,
          title: data.resultado[0].manage_cat_estados.message,
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

  }
  gocupacion() {

    const a = {
      option: 2,
      nivel: this.nivelxd, claveof: this.claveof, idacividad: this.idactividad, descripcion: this.ocupaciondescrip
    }
    this.cp.crudocupacion(a).subscribe(
      (data: any) => {

        Swal.fire({
          icon: data.resultado[0].manage_cat_ocupaciones.action,
          title: data.resultado[0].manage_cat_ocupaciones.message,
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
  }

  //limpiar
  clean() {
    this.descricion = '';
    this.puntos = '';
    this.idproducto = '';
  }

  // =========================
  // 🟦 Métodos de búsqueda
  // =========================
  filtroProposito(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceProposito.filter = valor.trim().toLowerCase();
  }

  filtroFrecuencia(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceFrecuencia.filter = valor.trim().toLowerCase();
  }

  filtroTipoOperaciones(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceTipoOperaciones.filter = valor.trim().toLowerCase();
  }

  filtroActuaNombre(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceActuaNombre.filter = valor.trim().toLowerCase();
  }

  filtroMedioPago(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceMedioPago.filter = valor.trim().toLowerCase();
  }

  filtroOrigenRecursos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceOrigenRecursos.filter = valor.trim().toLowerCase();
  }

  filtroDestinoRecursos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceDestinoRecursos.filter = valor.trim().toLowerCase();
  }

  filtroRelacionTercero(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceRelacionTercero.filter = valor.trim().toLowerCase();
  }
  // =====================================================
  // 🟦 PROPOSITO DE RELACIÓN
  // =====================================================
  @ViewChild("propositom", { static: false })
  propositom: any;

  consultarProposito() {
    const data = { option: 5 };
    this.cp.propositoVista(data).subscribe(
      (resp: any) => {
        this.dataSourceProposito.data = resp.info[0].manage_proposito_relacion.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar propósitos' })
    );
  }

  guardarProposito() {
    const data = {
      option: this.idproposito ? 2 : 1,
      idproposito: this.idproposito || 0,
      descripcion: this.descripcionProposito
    };

    this.cp.propositoVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_proposito_relacion;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.propositom.hide();
          this.consultarProposito();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar propósito' })
    );
  }

  mostrarProposito() {
    this.idproposito = null;
    this.descripcionProposito = '';
    this.propositom.show();
  }

  proposito(info: any) {
    this.idproposito = info.idproposito;
    this.descripcionProposito = info.descripcion;
    this.propositom.show();
  }

  // =====================================================
  // 🟦 FRECUENCIA DE OPERACIONES
  // =====================================================
  @ViewChild("frecuenciam", { static: false })
  frecuenciam: any;

  consultarFrecuencia() {
    const data = { option: 5 };
    this.cp.frecuenciaVista(data).subscribe(
      (resp: any) => {
        this.dataSourceFrecuencia.data = resp.info[0].manage_frecuencia_operaciones.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar frecuencias' })
    );
  }

  guardarFrecuencia() {
    const data = {
      option: this.idfrecuencia ? 2 : 1,
      idfrecuencia: this.idfrecuencia || 0,
      descripcion: this.descripcionFrecuencia
    };

    this.cp.frecuenciaVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_frecuencia_operaciones;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.frecuenciam.hide();
          this.consultarFrecuencia();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar frecuencia' })
    );
  }

  mostrarFrecuencia() {
    this.idfrecuencia = null;
    this.descripcionFrecuencia = '';
    this.frecuenciam.show();
  }

  frecuenciasa(info: any) {
    this.idfrecuencia = info.idfrecuencia;
    this.descripcionFrecuencia = info.descripcion;
    this.frecuenciam.show();
  }

  // =====================================================
  // 🟦 TIPO DE OPERACIONES
  // =====================================================
  @ViewChild("tipooperacionesm", { static: false })
  tipooperacionesm: any;

  consultarTipoOperaciones() {
    const data = { option: 5 };
    this.cp.tipoOperacionesVista(data).subscribe(
      (resp: any) => {
        this.dataSourceTipoOperaciones.data = resp.info[0].manage_tipo_operaciones.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar tipos de operaciones' })
    );
  }

  guardarTipoOperaciones() {
    const data = {
      option: this.idtipo ? 2 : 1,
      idtipo: this.idtipo || 0,
      descripcion: this.descripcionTipoOperaciones
    };

    this.cp.tipoOperacionesVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_tipo_operaciones;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.tipooperacionesm.hide();
          this.consultarTipoOperaciones();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar tipo de operación' })
    );
  }

  mostrarTipoOperaciones() {
    this.idtipo = null;
    this.descripcionTipoOperaciones = '';
    this.tipooperacionesm.show();
  }

  tipoOperaciones(info: any) {
    this.idtipo = info.idtipo;
    this.descripcionTipoOperaciones = info.descripcion;
    this.tipooperacionesm.show();
  }

  // =====================================================
  // 🟦 ACTÚA EN NOMBRE
  // =====================================================
  @ViewChild("actuanombrem", { static: false })
  actuanombrem: any;

  consultarActuaNombre() {
    const data = { option: 5 };
    this.cp.actuaNombreVista(data).subscribe(
      (resp: any) => {
        this.dataSourceActuaNombre.data = resp.info[0].manage_actua_en_nombre.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar actúa en nombre' })
    );
  }

  guardarActuaNombre() {
    const data = {
      option: this.idactua ? 2 : 1,
      idactua: this.idactua || 0,
      descripcion: this.descripcionActuaNombre
    };

    this.cp.actuaNombreVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_actua_en_nombre;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.actuanombrem.hide();
          this.consultarActuaNombre();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar registro' })
    );
  }

  mostrarActuaNombre() {
    this.idactua = null;
    this.descripcionActuaNombre = '';
    this.actuanombrem.show();
  }

  actuaNombre(info: any) {
    this.idactua = info.idactua;
    this.descripcionActuaNombre = info.descripcion;
    this.actuanombrem.show();
  }

  // =====================================================
  // 🟦 MEDIO DE PAGO
  // =====================================================
  @ViewChild("mediopagom", { static: false })
  mediopagom: any;

  consultarMedioPago() {
    const data = { option: 5 };
    this.cp.medioPagoVista(data).subscribe(
      (resp: any) => {
        this.dataSourceMedioPago.data = resp.info[0].manage_medio_pago.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar medio de pago' })
    );
  }

  guardarMedioPago() {
    const data = {
      option: this.idmedio ? 2 : 1,
      idmedio: this.idmedio || 0,
      descripcion: this.descripcionMedioPago
    };

    this.cp.medioPagoVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_medio_pago;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.mediopagom.hide();
          this.consultarMedioPago();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar medio de pago' })
    );
  }

  mostrarMedioPago() {
    this.idmedio = null;
    this.descripcionMedioPago = '';
    this.mediopagom.show();
  }

  medioPago(info: any) {
    this.idmedio = info.idmedio;
    this.descripcionMedioPago = info.descripcion;
    this.mediopagom.show();
  }

  // =====================================================
  // 🟦 ORIGEN DE RECURSOS
  // =====================================================
  @ViewChild("origenrecursosm", { static: false })
  origenrecursosm: any;

  consultarOrigenRecursos() {
    const data = { option: 5 };
    this.cp.origenRecursosVista(data).subscribe(
      (resp: any) => {
        this.dataSourceOrigenRecursos.data = resp.info[0].manage_origen_recursos.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar origen de recursos' })
    );
  }

  guardarOrigenRecursos() {
    const data = {
      option: this.idorigen ? 2 : 1,
      idorigen: this.idorigen || 0,
      descripcion: this.descripcionOrigenRecursos
    };

    this.cp.origenRecursosVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_origen_recursos;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.origenrecursosm.hide();
          this.consultarOrigenRecursos();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar origen' })
    );
  }

  mostrarOrigenRecursos() {
    this.idorigen = null;
    this.descripcionOrigenRecursos = '';
    this.origenrecursosm.show();
  }

  origenRecursos(info: any) {
    this.idorigen = info.idorigen;
    this.descripcionOrigenRecursos = info.descripcion;
    this.origenrecursosm.show();
  }

  // =====================================================
  // 🟦 DESTINO DE RECURSOS
  // =====================================================
  @ViewChild("destinorecursosm", { static: false })
  destinorecursosm: any;

  consultarDestinoRecursos() {
    const data = { option: 5 };
    this.cp.destinoRecursosVista(data).subscribe(
      (resp: any) => {
        this.dataSourceDestinoRecursos.data = resp.info[0].manage_destino_recursos.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar destino de recursos' })
    );
  }

  guardarDestinoRecursos() {
    const data = {
      option: this.iddestino ? 2 : 1,
      iddestino: this.iddestino || 0,
      descripcion: this.descripcionDestinoRecursos
    };

    this.cp.destinoRecursosVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_destino_recursos;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.destinorecursosm.hide();
          this.consultarDestinoRecursos();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar destino' })
    );
  }

  mostrarDestinoRecursos() {
    this.iddestino = null;
    this.descripcionDestinoRecursos = '';
    this.destinorecursosm.show();
  }

  destinoRecursos(info: any) {
    this.iddestino = info.iddestino;
    this.descripcionDestinoRecursos = info.descripcion;
    this.destinorecursosm.show();
  }

  // =====================================================
  // 🟦 RELACIÓN CON TERCERO
  // =====================================================
  @ViewChild("relaciontercerom", { static: false })
  relaciontercerom: any;

  consultarRelacionTercero() {
    const data = { option: 5 };
    this.cp.relacionTerceroVista(data).subscribe(
      (resp: any) => {
        this.dataSourceRelacionTercero.data = resp.info[0].manage_relacion_tercero.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar relación con tercero' })
    );
  }

  guardarRelacionTercero() {
    const data = {
      option: this.idrelacion ? 2 : 1,
      idrelacion: this.idrelacion || 0,
      descripcion: this.descripcionRelacionTercero
    };

    this.cp.relacionTerceroVista(data).subscribe(
      (resp: any) => {
        const info = resp.info[0].manage_relacion_tercero;
        if (info.action === 'error') Swal.fire({ icon: 'error', title: info.message });
        else {
          Swal.fire({ icon: 'success', title: 'Registro guardado correctamente' });
          this.relaciontercerom.hide();
          this.consultarRelacionTercero();
        }
      },
      () => Swal.fire({ icon: 'error', title: 'Error al guardar registro' })
    );
  }

  mostrarRelacionTercero() {
    this.idrelacion = null;
    this.descripcionRelacionTercero = '';
    this.relaciontercerom.show();
  }

  relacionTercero(info: any) {
    this.idrelacion = info.idrelacion;
    this.descripcionRelacionTercero = info.descripcion;
    this.relaciontercerom.show();
  }

}


