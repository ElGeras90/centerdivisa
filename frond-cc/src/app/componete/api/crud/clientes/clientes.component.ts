import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { usuarios } from 'src/app/componete/servicios/constantes';
import { SharedDataService } from 'src/app/componete/servicios/request.info';
import { SocketService } from 'src/app/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  /** paginador y modal*/
  @ViewChild("will", { static: false })
  will: any;

  @ViewChild("will2", { static: false })
  will2: any;

  @ViewChild("will3", { static: false })
  will3: any;

  @ViewChild("will4", { static: false })
  will4: any;

  @ViewChild("riesgo", { static: false })
  riesgo: any;
  @ViewChild('modalAccionista', { static: false }) modalAccionista: any;

  riesgos: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['Nombre', 'Telefono', 'correo', 'calle', 'acciones'];

  dataSource = new MatTableDataSource<any>([]);
  info: boolean = false;
  activar: boolean = false;

  //variables de formulario para cliente fisico y extranjero
  paterno: any;
  materno: any
  nombres: any
  paisnaci: any
  nacionalidad: any
  fechanacimiento: any
  genero: any
  //pedir si el ingreso es mayor a 4999
  estanaci: any
  ocupacion: any
  numerotelefono: any
  correoelectronico: any
  //en caso de ser mexicano
  curp: any
  rfc: any
  //si es extranjero 
  numeroidentificacionfiscal: any
  pais: any
  cuentacondomicilioenelpais: any

  identificacion: any
  numerodeidentificacion: any
  idcliente: any = 0;

  //fin formulario para cliente fisico y extranjero 

  // inicio Formulario de domicilio 

  calle: any;
  numerointerior: any;
  numeroexterior: any;
  colonia: any;
  municipio: any;
  estado: any;
  pais_: any;
  codigopostal: any;
  idcp: any
  //fin formulario domicilio 


  //variables de catalogos
  identificaciones: any;
  estadospais: any[] = []
  paises: any;
  ocupaciones: any;
  //fin catalogos

  //variables para mostrar los campos

  montomayor: boolean = false;
  sermexicano: boolean = false;

  /**variables de formulario de empresa */

  razonsocial: any;
  nacionalidadempresa: any;
  rfcempresa: any;
  domiciliofiscal: any;
  rfcserie: any;
  telemp: any;
  correoempr: any;
  fechaconst: any;

  actividad: string = '';
  numeroescritura: string = '';
  foliomercantil: string = '';

  /**fin variable de empresa */

  estadosselect: any;
  nacionalidades: any;
  colonias: any;
  estadosselect_: any;
  clientes: any;
  empresas: any;
  proposito_relacion: string = '';
  frecuencia_operaciones: string = '';
  monto_promedio: number | null = null;
  tipo_operaciones: string = '';
  medio_pago: string = '';
  paises_operaciones: string = '';
  actua_en_nombre: string = 'No'; // o boolean si prefieres
  tercero_nombre: string = '';
  es_pep: boolean = false;
  comentarios: string = '';
  /** variable de usuarios empresa */
  cliempr: any;
  @Input() formulario: any;
  @Input() status: boolean = false;
  @Output() respuestaEnviada = new EventEmitter<string>();
  messages: any;
  empresa: any;
  origen_recursos: any;
  destino_recursos: any;
  maneja_fondos_terceros: any;
  nombre_tercero_fondos: any;
  relacion_tercero_fondos: any;
  monto_mensual_estimado: any;
  pais_procedencia_fondos: any;
  pais_destino_fondos: any;
  cantidad_operaciones_mes: any;


  accionistas: any[] = [];
  tipopersona: number = 1;
  idaccionista_editar: number | null = null;
  frecuencias: any;
  tiposOperaciones: any;
  actuaNombres: any;
  mediosPago: any;
  origenesRecursos: any;
  destinosRecursos: any;
  relacionesTercero: any;
  proposito: any;

  constructor(
    private datos: cpservice,
    private shared: SharedDataService,
    private socketService: SocketService,
    private router: Router
  ) { }
  /**fin del paginador y modal */
  user: any;
  ngOnInit(): void {
    this.empresa = localStorage.getItem('emp')
    console.log('empresa de sesion', this.empresa)
    this.activar = this.shared.getActivo();
    this.catalogos();
    this.consultar();
    this.consultarProposito()
    this.consultarFrecuencia()
    this.consultarTipoOperaciones()
    this.consultarActuaNombre()
    this.consultarMedioPago()
    this.consultarOrigenRecursos()
    this.consultarDestinoRecursos()
    this.consultarRelacionTercero()
    this.user = localStorage.getItem('usuario');
    // Escuchar mensajes del servidor
    this.socketService.onMessageReceived().subscribe((data: any) => {
      if (data.message == '1') {
        console.log('opcion 1')
        Swal.close();
        Swal.fire('Operación autorizada!', '', 'success');
      } else if (data.message == '2') {
        console.log('opcion 2 Denegada')
        Swal.close();
        this.router.navigate(['api']);
        Swal.fire('Operación cancelada', '', 'error');
      } else if (data.message = '3') {
        console.log('opcion 3 autorizada')
        Swal.close();
        Swal.fire('Operación autorizada!', '', 'success');
        let info = this.estructuraguardar();

        info = {
          ...info,
          option: 1
        }
        this.save(info);
      }

    });

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

  catalogos() {

    const info = {
      option: 5,
    }
    this.datos.ident(info).subscribe(
      (data: any) => {
        if (data.resultado[0].manage_identificacion.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_identificacion.action,
            title: data.resultado[0].manage_identificacion.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
        } else {
          this.identificaciones = data.resultado[0].manage_identificacion.data
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

    this.datos.estadopais(info).subscribe(
      (data: any) => {

        this.estadospais = data.info;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )
    this.datos.pais(info).subscribe(
      (data: any) => {
        console.log('paises', data.info)
        this.paises = data.info;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )

    this.datos.ocupacion(info).subscribe(
      (data: any) => {
        const datosOrdenados = data.info.slice().sort((a: any, b: any) => {
          const descripcionA = a.descripcion.toUpperCase();
          const descripcionB = b.descripcion.toUpperCase();

          if (descripcionA < descripcionB) {
            return -1;
          }
          if (descripcionA > descripcionB) {
            return 1;
          }

          return 0;
        });
        this.ocupaciones = datosOrdenados;

      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });

      }
    )

    this.datos.nacionalidad(info).subscribe(
      (data: any) => {

        this.nacionalidades = data.info;

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

  estados(dat: any) {
    const selectedValue = dat.target.value;;
    this.estadosselect = this.estadospais.filter((item: any) => item.idcatpais == selectedValue);

  }
  getnacionalidad(d: any) {
    const selectedValue = d.target.value;

    const data = this.nacionalidades.filter((item: any) => item.idnaci == selectedValue)
    if (data[0].clave === "MEX") {
      this.sermexicano = true;
      this.pais_ = 'MEXICO'
    } else {
      this.sermexicano = false;

    }

  }

  consultarDespuesDe5Digitos(d: any) {

    const codigoValue = d.target.value;
    if (this.sermexicano == true) {
      if (codigoValue && codigoValue.length === 5) {
        this.consultarCodigosPostales(codigoValue);
      }

    }
    else {
      this.idcp = 0;
    }
  }
  consultacp(d: any) {

    const codigoValue = d.target.value;
    if (codigoValue && codigoValue.length === 5) {
      this.consultarCodigosPostales(codigoValue);
    }
  }

  consultarCodigosPostales(dato: any) {

    const info = {
      cp: dato
    }
    this.datos.codigopostarl(info).subscribe(
      (data: any) => {
        if (data.info.action == 'error') {
          Swal.fire({
            icon: data.info.action,
            title: data.info.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.colonias = data.info.data;
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

  seleccionarColonia(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue !== null) {
      // Verifica si colonia es un arreglo antes de intentar filtrarlo
      if (Array.isArray(this.colonias)) {
        const selectedColonia = this.colonias.find((item: any) => item.id == selectedValue);
        if (selectedColonia) {
          this.municipio = selectedColonia.municipio;
          this.estado = selectedColonia.estado;
          this.pais_ = selectedColonia.pais;
        }
      }
    }
  }

  estados_(dat: any) {
    const selectedValue = dat.target.value;
    let v = this.paises.filter((item: any) => item.idpais == selectedValue);

    if (v[0].paraisofiscal == true) {
      this.socketService.sendPrivateMessage('cc-PLD', 'Alerta de posible operación inusual y/o de alto riesgo. <br>' +
        'El usuario pertenece a un país incluido en la lista de paraísos fiscales :' + v[0].nombre);
      this.cargardata(this.user, ('Alerta de posible operación inusual y/o de alto riesgo. ' +
        'El usuario pertenece a un país incluido en la lista de paraísos fiscales :' + v[0].nombre))


      Swal.fire({
        // icon: 'warning',
        imageUrl: '../../../../assets/img/unnamed.png',
        title: 'Alerta de posible operación inusual y/o de alto riesgo. <br>' +
          'El usuario pertenece a un país incluido en la lista de paraísos fiscales :' + v[0].nombre +
          '<br> Esperar autorización del oficial de cumplimiento para ' + 'realizar la operación.',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        showConfirmButton: false,
        showCancelButton: false,
        // cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Si se cancela la operación, cerrar la alerta y mostrar mensaje de cancelación
          Swal.fire('Operación cancelada', '', 'error');
        }
      });

    }


    if (v[0].bloqueado == true) {
      this.socketService.sendPrivateMessage('cc-PLD', 'Alerta de posible operación inusual y/o de alto riesgo.' +
        'El usuario pertenece a un país incluido en la lista negra: ' + v[0].nombre);
      this.cargardata(this.user, ('Alerta de posible operación inusual y/o de alto riesgo.' +
        'El usuario pertenece a un país incluido en la lista negra: ' + v[0].nombre))

      Swal.fire({
        imageUrl: '../../../../assets/img/unnamed.png',
        title: 'Alerta de posible operación inusual y/o de alto riesgo.<br>' +
          'El usuario pertenece a un país incluido en la lista negra: ' + v[0].nombre +
          '<br>No operar con este usuario, esperar indicaciones del Oficial de Cumplimiento.',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        showConfirmButton: false,
        showCancelButton: false,
        //cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Si se cancela la operación, cerrar la alerta y mostrar mensaje de cancelación
          Swal.fire('Operación cancelada', '', 'error');
        }
      });

      return;
    }

    this.estadosselect_ = this.estadospais.filter((item: any) => item.idcatpais == selectedValue);

  }

  limpiar() {
    // 🧍 Datos personales
    this.paterno = '';
    this.materno = '';
    this.nombres = '';
    this.paisnaci = '';
    this.nacionalidad = '';
    this.fechanacimiento = '';
    this.genero = '';
    this.estanaci = '';
    this.ocupacion = '';
    this.numerotelefono = '';
    this.correoelectronico = '';
    this.curp = '';
    this.rfc = '';
    this.numeroidentificacionfiscal = '';
    this.pais = '';
    this.identificacion = '';
    this.numerodeidentificacion = '';

    // 🏠 Domicilio
    this.calle = '';
    this.numerointerior = '';
    this.numeroexterior = '';
    this.colonia = '';
    this.municipio = '';
    this.estado = '';
    this.pais_ = '';
    this.codigopostal = '';
    this.idcp = 0;

    // 🧾 Perfil transaccional
    this.proposito_relacion = '';
    this.frecuencia_operaciones = '';
    this.monto_promedio = null;
    this.tipo_operaciones = '';
    this.medio_pago = '';
    this.paises_operaciones = '';
    this.actua_en_nombre = 'No';   // o false si usas boolean
    this.tercero_nombre = '';
    this.es_pep = false;
    this.comentarios = '';

    this.origen_recursos = '';
    this.destino_recursos = '';
    this.maneja_fondos_terceros = '';
    this.nombre_tercero_fondos = '';
    this.relacion_tercero_fondos = '';
    this.monto_mensual_estimado = '';
    this.pais_procedencia_fondos = '';
    this.pais_destino_fondos = '';
    this.cantidad_operaciones_mes = '';
  }

  estructuraguardar(): any {
    return {
      idcliente: this.idcliente,
      tipopersona: 1,
      paterno: this.paterno,
      materno: this.materno,
      nombre: this.nombres,
      idpnaci: this.paisnaci,
      nacionalidad: this.nacionalidad,
      genero: this.genero,
      estanaci: this.estanaci,
      ocupacion: this.ocupacion,
      telefono: this.numerotelefono,
      correo: this.correoelectronico,
      curp: this.curp,
      rfc: this.rfc,
      nif: this.numeroidentificacionfiscal,
      pais: this.pais,
      ididentificaion: this.identificacion,
      nident: this.numerodeidentificacion,
      fechanacimiento: this.fechanacimiento,
      calle: this.calle,
      nient: this.numerointerior,
      n_ext: this.numeroexterior,
      colonia: this.colonia,
      municipio: this.municipio,
      estado: this.estado,
      idpais: this.pais_,
      cp: this.codigopostal,
      idcp: this.idcp,
      sucursalderegistro: this.empresa,

      // 💼 Perfil transaccional
      proposito_relacion: this.proposito_relacion,
      frecuencia_operaciones: this.frecuencia_operaciones,
      monto_promedio: this.monto_promedio,
      tipo_operaciones: this.tipo_operaciones,
      medio_pago: this.medio_pago,
      paises_operaciones: this.paises_operaciones,
      actua_en_nombre: this.actua_en_nombre,
      tercero_nombre: this.tercero_nombre,
      es_pep: this.es_pep,
      comentarios: this.comentarios,

      // 🧾 Campos nuevos del perfil
      origen_recursos: this.origen_recursos,
      destino_recursos: this.destino_recursos,
      maneja_fondos_terceros: this.maneja_fondos_terceros,
      nombre_tercero_fondos: this.nombre_tercero_fondos,
      relacion_tercero_fondos: this.relacion_tercero_fondos,
      monto_mensual_estimado: this.monto_mensual_estimado,
      pais_procedencia_fondos: this.pais_procedencia_fondos,
      pais_destino_fondos: this.pais_destino_fondos,
      cantidad_operaciones_mes: this.cantidad_operaciones_mes
    };
  }

  abrirwill() {
    Swal.fire({
      title: 'Registro',
      text: 'Que deseas registrar un :',
      showCancelButton: true,
      confirmButtonText: 'Persona',
      cancelButtonText: 'Empresa',
      showCloseButton: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.limpiar();
        this.info = true;
        this.visibleemp = false;

        this.will.show();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.limpiar();
        this.info = true;
        this.visibleemp = false;

        this.will2.show();
      }
    });

  }

  abrirupdate(data: any) {
    if (data?.tipo == 'Persona Física') {
      const cliente = this.clientes.find((c: any) => c.idcliente === data.id);
      console.log(cliente);
      this.clienteupdate(cliente);
    } else {
      const cliente = this.empresas.find((c: any) => c.idempresa === data.id);
      console.log(cliente);
      this.cargarDatosEmpresa(cliente)
    }

  }

  async clienteupdate(data: any) {
    // 🧩 Datos generales del cliente
    this.idcliente = data.idcliente;
    this.paterno = data.paterno;
    this.materno = data.materno;
    this.nombres = data.nombre;
    // this.tipocliente = data.tipopersona;
    this.paisnaci = data.idpnaci;
    this.nacionalidad = data.nacionalidad;
    this.genero = data.genero;
    this.estanaci = data.estanaci;
    this.ocupacion = data.ocupacion;
    this.numerotelefono = data.telefono;
    this.correoelectronico = data.correo;
    this.curp = data.curp;
    this.rfc = data.rfc;
    this.numeroidentificacionfiscal = data.nif;
    this.pais = data.pais;
    this.identificacion = data.ididentificaion;
    this.numerodeidentificacion = data.nident;
    this.fechanacimiento = data.fechanacimiento;
    this.calle = data.calle;
    this.numerointerior = data.nient;
    this.numeroexterior = data.n_ext;
    this.colonia = data.colonia;
    this.municipio = data.municipio;
    this.estado = data.estado;
    this.pais_ = data.pais;
    this.codigopostal = data.cp;
    this.idcp = data.idcp;
    this.info = false;

    // 🧾 Perfil transaccional
    this.proposito_relacion = data.perfil_transaccional.proposito_relacion;
    this.frecuencia_operaciones = data.perfil_transaccional.frecuencia_operaciones;
    this.monto_promedio = data.perfil_transaccional.monto_promedio;
    this.tipo_operaciones = data.perfil_transaccional.tipo_operaciones;
    this.medio_pago = data.perfil_transaccional.medio_pago;
    this.paises_operaciones = data.perfil_transaccional.paises_operaciones;
    this.actua_en_nombre = data.perfil_transaccional.actua_en_nombre;
    this.tercero_nombre = data.perfil_transaccional.tercero_nombre;
    this.es_pep = data.perfil_transaccional.es_pep;
    this.comentarios = data.perfil_transaccional.comentarios;
    this.origen_recursos = data.perfil_transaccional.origen_recursos;
    this.destino_recursos = data.perfil_transaccional.destino_recursos;
    this.maneja_fondos_terceros = data.perfil_transaccional.maneja_fondos_terceros;
    this.nombre_tercero_fondos = data.perfil_transaccional.nombre_tercero_fondos;
    this.relacion_tercero_fondos = data.perfil_transaccional.relacion_tercero_fondos;
    this.monto_mensual_estimado = data.perfil_transaccional.monto_mensual_estimado;
    this.pais_procedencia_fondos = data.perfil_transaccional.pais_procedencia_fondos;
    this.pais_destino_fondos = data.perfil_transaccional.pais_destino_fondos;
    this.cantidad_operaciones_mes = data.perfil_transaccional.cantidad_operaciones_mes;

    // 🧮 Datos de riesgo
    this.riesgos = data.riesgo || '';

    // 🗺️ Estados y nacionalidades
    this.estadosselect = this.estadospais.filter((item: any) => item.idcatpais == this.paisnaci);
    if (data.idcp > 0) {
      const info2 = { cp: data.idcp };
      const data2: any = await this.datos.codigopostar(info2).toPromise();
      this.codigopostal = data2.info.data[0].cp;
      this.estado = data2.info.data[0].estado;
      this.municipio = data2.info.data[0].municipio;
      this.consultarCodigosPostales(this.codigopostal);
    } else {
      this.estadosselect_ = this.estadospais.filter((item: any) => item.idcatpais == this.pais_);
    }

    // 🇲🇽 Validar nacionalidad mexicana
    const dataa = this.nacionalidades.filter((item: any) => item.idnaci == this.nacionalidad);
    if (dataa.length > 0 && dataa[0].clave === "MEX") {
      this.sermexicano = true;
      this.pais_ = 'MEXICO';
    } else {
      this.sermexicano = false;
    }

    // 📂 Abrir modal de edición
    this.will.show();
  }


  // clienteempresa(data: any) {
  //   this.razonsocial = data.nombre;
  //   this.rfcempresa = data.calle;
  //   this.idempresa = data.idempresa;

  //   const info = {
  //     option: 5,
  //     idempresa: this.idempresa
  //   };


  //   this.consultarclientesempresa();

  //   this.will3.show();
  // }

  consultar() {
    const info = {
      empresa: this.empresa
    }

    this.datos.obtenerclientes(info).subscribe(
      (data: any) => {
        console.log(data);

        const resultado = data.resultado[0].obtenerdatosclientes;

        if (resultado.action === 'error') {
          Swal.fire({
            icon: resultado.action,
            title: resultado.message,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        } else {
          // 🔹 Extraer clientes y empresas
          this.clientes = resultado.data.clientes?.flat(1) || [];
          this.empresas = resultado.data.empresas?.flat(1) || [];

          // 🔹 Normalizar datos para que ambos tengan las mismas columnas
          const normalizados = [
            ...this.clientes.map((c: any) => ({
              id: c.idcliente,
              tipo: 'Persona Física',
              nombre: `${c.nombre || ''} ${c.paterno || ''} ${c.materno || ''}`.trim(),
              telefono: c.telefono || '',
              correo: c.correo || '',
              direccion: `${c.calle || ''}, ${c.n_ext || ''}`.trim(),
              perfil: c.perfil_transaccional || null,
            })),
            ...this.empresas.map((e: any) => ({
              id: e.idempresa,
              tipo: 'Empresa',
              nombre: e.razonsocial || '',
              telefono: e.telefono || '',
              correo: e.correo || '',
              direccion: e.domicilio || '',
              perfil: e.perfil_transaccional || null,
            })),
          ];

          // 🔹 Asignar a la tabla Angular Material
          this.dataSource.data = normalizados;
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un problema al intentar realizar la acción',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      }
    );


  }

  guardar() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 1,
      empresa: this.empresa
    }
    const name = {
      nombre: info.nombre,
      paterno: info.paterno,
      materno: info.materno
    };

    this.datos.buscarlistado(name).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].buscar_listado?.message == 'sin coincidencias.') {
          this.save(info);
          this.consultar();
          this.limpiar();
          this.will.hide();
        } else {
          this.socketService.sendPrivateMessage('cc-PLD', 'El usuario <b>' + data.info[0].buscar_listado.Nombre + '</b> pertenece a la lista <b>' + data.info[0].buscar_listado.lista + '</b>');
          this.cargardata(this.user, ('El usuario ' + data.info[0].buscar_listado.Nombre + ' pertenece a la lista ' + data.info[0].buscar_listado.lista))

          Swal.fire({
            //icon: 'warning',
            imageUrl: '../../../../assets/img/unnamed.png',
            title: 'El usuario <b>' + data.info[0].buscar_listado.Nombre + '</b> pertenece a la lista <b>' + data.info[0].buscar_listado.lista + '</b>' +
              '<br> Esperar autorización del oficial de cumplimiento para ' + 'realizar la operación.',
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
            showConfirmButton: false,
            showCancelButton: false,
            //cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              // Si se cancela la operación, cerrar la alerta y mostrar mensaje de cancelación
              Swal.fire('Operación cancelada', '', 'error');
            }
          });
          return;
        }
      }, (error: any) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )

  }
  save(info: any) {
    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();

        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  actualizar() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 2
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  async cargardatos(d: any) {
    if (d?.id == 1) {
      Swal.fire({
        icon: 'warning',
        title: 'No puede seleccionar PUBLICO EN GENERAL selecciona otro',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });
      return;
    } else if (d?.tipo == 'Persona Física') {
      const cliente = this.clientes.find((c: any) => c.idcliente === d.id);
      console.log(cliente);
      this.shared.setSelectedData(cliente)

      this.respuestaEnviada.emit(cliente);
      this.will.hide();
      this.will3.hide();
    } else {

      const cliente = this.empresas.find((c: any) => c.idempresa === d.id);
      console.log(cliente);

      this.shared.setSelectedData(cliente)

      this.respuestaEnviada.emit(cliente);
      this.will.hide();
      this.will3.hide();
    }


  }

  resultado: any;
  visibleemp: boolean = false;
  idempresa: number = 0;

  // async guardarempresa() {
  //   const d = this.crearjsonempresa();
  //   d.option = 1;
  //   d.empresa = this.empresa
  //   this.resultado = await this.datos.empresacliente(d).toPromise(); // Convertir el observable a una promesa
  //   console.log(this.resultado)
  //   if (this.resultado.resultado.action === "success") {
  //     this.idempresa = this.resultado.idempresa;
  //     this.visibleemp = true;

  //   } else {
  //     this.visibleemp = false;
  //   }


  // }

  // guardarclienteempresa() {

  //   let info = this.estructuraguardar();
  //   info.idempresa = this.idempresa
  //   info = {
  //     ...info,
  //     option: 3,
  //     empresa: this.empresa
  //   }

  //   this.datos.empresacliente(info).subscribe(
  //     (data: any) => {
  //       this.consultar();
  //       this.limpiarempresa();
  //       this.will2.hide();

  //       Swal.fire({
  //         icon: data.action,
  //         title: data.message,
  //         allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //         allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //       });
  //     }, (error: any) => {
  //       this.consultar();
  //       this.limpiarempresa();
  //       this.will2.hide();
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Ocurrio un problema al intentar realizar la accion ',
  //         allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //         allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //       });
  //     }
  //   )
  // }

  // consultarclientesempresa() {


  //   const info = {
  //     option: 5,
  //     idempresa: this.idempresa
  //   }

  //   this.datos.clientes(info).subscribe(
  //     (data: any) => {
  //       if (data.resultado[0].manage_cliente.action == 'error') {
  //         Swal.fire({
  //           icon: data.resultado[0].manage_cliente.action,
  //           title: data.resultado[0].manage_cliente.message,
  //           allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //           allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //         });

  //       } else {
  //         this.cliempr = data.resultado[0].manage_cliente.data;
  //       }
  //     }, (error: any) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Ocurrio un problema al intentar realizar la accion ',
  //         allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //         allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //       });
  //     }
  //   )

  // }

  // guardarcliente() {

  //   let info = this.estructuraguardar();
  //   info.idempresa = this.idempresa
  //   info.tipopersona = 2
  //   info = {
  //     ...info,
  //     option: 3
  //   }

  //   this.datos.empresacliente(info).subscribe(
  //     (data: any) => {
  //       this.consultarclientesempresa();
  //       this.limpiar();
  //       this.will4.hide();

  //       /** Swal.fire({
  //          icon: data.resultado[0].manage_cliente.action,
  //          title: data.resultado[0].manage_cliente.message,
  //          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //        });*/
  //     }, (error: any) => {
  //       this.consultarclientesempresa();
  //       this.limpiar();
  //       this.will4.hide();
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Ocurrio un problema al intentar realizar la accion ',
  //         allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
  //         allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
  //       });
  //     }
  //   )


  // }

  actualizarcliente() {

    let info = this.estructuraguardar();

    info = {
      ...info,
      option: 2
    }

    this.datos.clientes(info).subscribe(
      (data: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: data.resultado[0].manage_cliente.action,
          title: data.resultado[0].manage_cliente.message,
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }, (error: any) => {
        this.consultar();
        this.limpiar();
        this.will.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
  }

  abrirclienteempresa(e: any) {

    if (e == 1) {
      this.info = true
      this.will4.show()
    } else {
      this.info = false
      this.will4.show()
    }

  }

  cerrar(valor: any) {

    if (valor == 1) {
      this.limpiar();
      this.will.hide();
    }
    if (valor == 2) {
      //this.limpiarempresa();
      this.will2.hide();
    }
    if (valor == 3) {
      // this.limpiarempresa();
      this.will3.hide();
    }
    if (valor == 4) {
      this.limpiar();
      this.will4.hide()
    }
  }

  ocupacionvalidar(event: any) {
    const selectedValue = event.target.value;
    let v = this.ocupaciones.filter((item: any) => item.idacividad == selectedValue);
    if (v[0].nivel == 10) {
      this.socketService.sendPrivateMessage('cc-PLD', 'El usuario mantiene una actividad económica de alto riesgo. :' + v[0].descripcion);
      this.cargardata(this.user, ('El usuario mantiene una actividad económica de alto riesgo. :' + v[0].descripcion))
      Swal.fire({
        // icon: 'warning',
        imageUrl: '../../../../assets/img/unnamed.png',
        title: 'Alerta de posible operación inusual y/o de alto riesgo. <br>' +
          'El usuario mantiene una actividad económica de alto riesgo. :' + v[0].descripcion +
          '<br> Esperar autorización del oficial de cumplimiento para ' + 'realizar la operación.',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        showConfirmButton: false,
        showCancelButton: false,
        //cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Si se cancela la operación, cerrar la alerta y mostrar mensaje de cancelación
          Swal.fire('Operación cancelada', '', 'error');
        }
      });
    }
  }

  cargardata(usuario: any, alerta: any) {
    const a = {
      option: 1,
      usuario: usuario,
      alerta: alerta,
      accion: 0
    }
    this.datos.alertas(a).subscribe(
      (data: any) => {

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

  // ============================================================
  // 🔧 CREAR JSON DE EMPRESA
  // ============================================================
  crearjsonempresa(option: number = 1) {
    const data = {
      option,
      idempresa: this.idempresa || 0,
      empresa: this.empresa,
      razonsocial: this.razonsocial,
      rfc: this.rfcempresa,
      rfcserie: this.rfcserie,
      nacionalidad: this.nacionalidadempresa,
      domicilio: this.domiciliofiscal,
      telefono: this.telemp,
      correo: this.correoempr,
      fechaconstitucion: this.fechaconst,
      actividad: this.actividad,
      numeroescritura: this.numeroescritura,
      foliomercantil: this.foliomercantil,
      idcp: this.idcp,
      calle: this.calle,
      n_ext: this.numeroexterior,
      n_int: this.numerointerior,
      // 🟢 PERFIL TRANSACCIONAL
      proposito_relacion: this.proposito_relacion,
      frecuencia_operaciones: this.frecuencia_operaciones,
      monto_promedio: this.monto_promedio,
      tipo_operaciones: this.tipo_operaciones,
      medio_pago: this.medio_pago,
      paises_operaciones: this.paises_operaciones,
      actua_en_nombre: this.actua_en_nombre,
      tercero_nombre: this.tercero_nombre,
      es_pep: this.es_pep,
      comentarios: this.comentarios,
      origen_recursos: this.origen_recursos,
      destino_recursos: this.destino_recursos,
      maneja_fondos_terceros: this.maneja_fondos_terceros,
      nombre_tercero_fondos: this.nombre_tercero_fondos,
      relacion_tercero_fondos: this.relacion_tercero_fondos,
      monto_mensual_estimado: this.monto_mensual_estimado,
      pais_procedencia_fondos: this.pais_procedencia_fondos,
      pais_destino_fondos: this.pais_destino_fondos,
      cantidad_operaciones_mes: this.cantidad_operaciones_mes,

      // 🟢 ESTRUCTURA DE LA EMPRESA
      accionistas: this.accionistas
    };

    return data;
  }

  async cargarDatosEmpresa(empresa: any) {
    if (!empresa) return;
    console.log(empresa);
    // 🟦 DATOS GENERALES DE EMPRESA
    this.idempresa = empresa.idempresa;
    this.razonsocial = empresa.razonsocial;
    this.rfcempresa = empresa.rfc;
    this.rfcserie = empresa.rfcserie;
    this.nacionalidadempresa = empresa.nacionalidad;
    this.domiciliofiscal = empresa.domicilio;
    this.telemp = empresa.telefono;
    this.correoempr = empresa.correo;
    this.fechaconst = empresa.fechaconstitucion;
    this.actividad = empresa.actividad;
    this.numeroescritura = empresa.numeroescritura;
    this.foliomercantil = empresa.foliomercantil;
    const info2 = { cp: empresa.idcp };
    const data2: any = await this.datos.codigopostar(info2).toPromise();
    console.log(data2)
    this.codigopostal = data2.info.data[0].cp;
    this.estado = data2.info.data[0].estado;
    this.municipio = data2.info.data[0].municipio;
    this.consultarCodigosPostales(this.codigopostal);
    this.calle = empresa.calle,
      this.numeroexterior = empresa.n_ext,
      this.numerointerior = empresa.n_int
    // 🟩 PERFIL TRANSACCIONAL
    if (empresa.perfil_transaccional) {
      const perfil = empresa.perfil_transaccional;

      this.proposito_relacion = perfil.proposito_relacion || '';
      this.frecuencia_operaciones = perfil.frecuencia_operaciones || '';
      this.monto_promedio = perfil.monto_promedio || 0;
      this.tipo_operaciones = perfil.tipo_operaciones || '';
      this.medio_pago = perfil.medio_pago || '';
      this.paises_operaciones = perfil.paises_operaciones || '';
      this.actua_en_nombre = perfil.actua_en_nombre || 'No';
      this.tercero_nombre = perfil.tercero_nombre || '';
      this.es_pep = perfil.es_pep || false;
      this.comentarios = perfil.comentarios || '';
      this.origen_recursos = perfil.origen_recursos || '';
      this.destino_recursos = perfil.destino_recursos || '';
      this.maneja_fondos_terceros = perfil.maneja_fondos_terceros || false;
      this.nombre_tercero_fondos = perfil.nombre_tercero_fondos || '';
      this.relacion_tercero_fondos = perfil.relacion_tercero_fondos || '';
      this.monto_mensual_estimado = perfil.monto_mensual_estimado || 0;
      this.pais_procedencia_fondos = perfil.pais_procedencia_fondos || '';
      this.pais_destino_fondos = perfil.pais_destino_fondos || '';
      this.cantidad_operaciones_mes = perfil.cantidad_operaciones_mes || 0;
    }

    // 🟨 ACCIONISTAS (array)
    this.accionistas = [];
    if (empresa.accionistas && Array.isArray(empresa.accionistas)) {
      this.accionistas = empresa.accionistas.map((a: any) => ({
        id: a.id || 0,
        tipopersona: a.tipopersona || 1,
        nombre: a.nombre || '',
        paterno: a.paterno || '',
        materno: a.materno || '',
        nacionalidad: a.nacionalidad || '',
        ocupacion: a.ocupacion || '',
        correo: a.correo || '',
        telefono: a.telefono || '',
        rfc: a.rfc || '',
        curp: a.curp || '',
        riesgo: a.riesgo || 'Bajo'
      }));
    }

    // 🟧 Configuración visual
    this.visibleemp = false;  // mostrar modal de empresa
    this.info = false;        // modo edición
    this.will2.show();

  }

  // ============================================================
  // 🟢 GUARDAR EMPRESA
  // ============================================================
  async guardarempresa() {
    try {
      const data = this.crearjsonempresa(1); // option 1 → insertar empresa + perfil + accionistas
      const resultado: any = await this.datos.empresacliente(data).toPromise();
      console.log(resultado)

      if (resultado.resultado?.action === "success") {
        this.idempresa = resultado.idempresa;
        this.visibleemp = true;

        Swal.fire({
          icon: "success",
          title: "Empresa registrada con éxito",
          text: "Ahora puedes agregar accionistas o representantes.",
          timer: 2500,
          showConfirmButton: false
        });
      } else {
        Swal.fire("Error", "Ocurrió un problema al guardar la empresa", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  }

  // ============================================================
  // 🟡 ACTUALIZAR EMPRESA
  // ============================================================
  async actualizarempresa() {
    try {
      let data = this.crearjsonempresa(2); // option 2 → actualizar empresa y perfil

      const resultado: any = await this.datos.empresacliente(data).toPromise();
      console.log(resultado);
      if (resultado.resultado.action === "success") {
        Swal.fire({
          icon: "success",
          title: "Datos actualizados",
          text: "La empresa se actualizó correctamente.",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire("Error", resultado.message || "No se pudo actualizar", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error al actualizar la empresa", "error");
    }
  }

  // ==================== GUARDAR ESTRUCTURA (ACCIONISTAS NUEVOS) ====================

  guardarclienteempresa() {
    const data = {
      option: 3, // insertar accionistas
      idempresa: this.idempresa,
      empresa: this.empresa,
      accionistas: this.accionistas
    };

    this.datos.empresacliente(data).subscribe(
      (res: any) => {
        Swal.fire({
          icon: res.action,
          title: res.message,
          timer: 2000,
          showConfirmButton: false
        });
        this.consultar();
        this.will2.hide();
      },
      () => {
        Swal.fire("Error", "Ocurrió un problema al guardar los accionistas", "error");
      }
    );
  }

  // ==================== MANEJO DEL MODAL DE ACCIONISTAS ====================
  accionistaEditando: boolean = false;
  indexAccionistaEditando: number | null = null;
  // Objeto temporal para agregar o editar
  accionista: any = {
    tipopersona: 1,
    nombre: '',
    paterno: '',
    materno: '',
    nacionalidad: null,
    ocupacion: null,
    correo: '',
    telefono: '',
    rfc: '',
    curp: '',
    riesgo: 'Bajo'
  };
  abrirModalAccionista() {
    this.accionista = {
      tipopersona: 1,
      nombre: '',
      paterno: '',
      materno: '',
      nacionalidad: null,
      ocupacion: null,
      correo: '',
      telefono: '',
      rfc: '',
      curp: '',
      riesgo: 'Bajo'
    };
    this.accionistaEditando = false;
    this.indexAccionistaEditando = null;
    this.modalAccionista.show();
  }

  editarAccionista(a: any, index: number) {
    this.accionista = { ...this.accionistas[index] };
    this.accionistaEditando = true;
    this.indexAccionistaEditando = index;
    this.modalAccionista.show();
  }

  eliminarAccionista(accionista: any, index: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Se eliminará este accionista del listado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async result => {
      if (result.isConfirmed) {

        try {
          let data = {
            option: 4, // eliminar accionista
            idempresa: this.idempresa,
            empresa: this.empresa,
            accionista_id: accionista.id
          };
          const resultado: any = await this.datos.empresacliente(data).toPromise();
          console.log(resultado);
          if (resultado.resultado.action === "success") {
            Swal.fire({
              icon: "success",
              title: "Datos actualizados",
              text: "La empresa se actualizó correctamente.",
              timer: 2000,
              showConfirmButton: false
            });
            this.accionistas.splice(index, 1);
          } else {
            Swal.fire("Error", resultado.message || "No se pudo actualizar", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Error al actualizar la empresa", "error");
        }
        Swal.fire('Eliminado', 'El accionista ha sido eliminado', 'success');
      }
    });
  }

  guardarAccionista() {
    if (!this.accionista.nombre || !this.accionista.correo) {
      Swal.fire('Campos requeridos', 'Debes ingresar al menos nombre y correo', 'warning');
      return;
    }

    if (this.accionistaEditando && this.indexAccionistaEditando !== null) {
      this.accionistas[this.indexAccionistaEditando] = { ...this.accionista };
    } else {
      this.accionistas.push({ ...this.accionista });
    }

    this.modalAccionista.hide();
  }
  consultarFrecuencia() {
    const body = { option: 5 };
    this.datos.frecuenciaVista(body).subscribe(
      (resp: any) => {
        this.frecuencias = resp.info[0].manage_frecuencia_operaciones.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar frecuencias' })
    );
  }

  consultarTipoOperaciones() {
    const body = { option: 5 };
    this.datos.tipoOperacionesVista(body).subscribe(
      (resp: any) => {
        this.tiposOperaciones = resp.info[0].manage_tipo_operaciones.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar tipos de operaciones' })
    );
  }

  consultarActuaNombre() {
    const body = { option: 5 };
    this.datos.actuaNombreVista(body).subscribe(
      (resp: any) => {
        this.actuaNombres = resp.info[0].manage_actua_en_nombre.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar actúa en nombre' })
    );
  }

  consultarMedioPago() {
    const body = { option: 5 };
    this.datos.medioPagoVista(body).subscribe(
      (resp: any) => {
        this.mediosPago = resp.info[0].manage_medio_pago.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar medio de pago' })
    );
  }

  consultarOrigenRecursos() {
    const body = { option: 5 };
    this.datos.origenRecursosVista(body).subscribe(
      (resp: any) => {
        this.origenesRecursos = resp.info[0].manage_origen_recursos.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar origen de recursos' })
    );
  }

  consultarDestinoRecursos() {
    const body = { option: 5 };
    this.datos.destinoRecursosVista(body).subscribe(
      (resp: any) => {
        this.destinosRecursos = resp.info[0].manage_destino_recursos.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar destino de recursos' })
    );
  }

  consultarRelacionTercero() {
    const body = { option: 5 };
    this.datos.relacionTerceroVista(body).subscribe(
      (resp: any) => {
        this.relacionesTercero = resp.info[0].manage_relacion_tercero.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar relación con tercero' })
    );
  }
  consultarProposito() {
    const data = { option: 5 };
    this.datos.propositoVista(data).subscribe(
      (resp: any) => {
        this.proposito = resp.info[0].manage_proposito_relacion.data;
      },
      () => Swal.fire({ icon: 'error', title: 'Error al consultar propósitos' })
    );
  }

  valorOriginal = {
    pais_procedencia_fondos: "",
    pais_destino_fondos: ""
  };


  verificarCambio(campo: string) {

    console.log(`✖ Sin cambio en: ${campo}`);
  }

}