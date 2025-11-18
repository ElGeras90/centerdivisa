import { Component, ViewChild } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css', 'venta.component.scss']
})
export class VentaComponent {
  currentDate!: Date;
  formattedDate: string = '';
  nombreusuario: any;
  idusuario: any;
  sucursalid: any;
  divisas: any;
  compra: any = 0;
  cambio: number = 0.00;
  resultado: any = 0.00;
  cotizacion: number = 0.00;
  clienteid: number = 1;
  @ViewChild("will", { static: false })
  will: any;
  fechaYHoraActual!: Date;
  @ViewChild("enviocorrecto", { static: false })
  enviocorrecto: any;
  tipopersona: string | undefined;
  instrumento: any =0;
  instrumentos: any;
  nombre: any;
  rfc: any;
  instrumentoDescripcion: any;

  async ngOnInit() {
    this.fechaYHoraActual = new Date();
    this.currentDate = new Date();
    this.formattedDate = this.formatDate(this.currentDate);
    this.nombreusuario = localStorage.getItem('nombre');
    this.idusuario = localStorage.getItem('ID');
    this.consultarinstrumento();
    const dmnues = localStorage.getItem('empresa');
    if (dmnues !== null) {
      const dmo = JSON.parse(dmnues);


      this.sucursalid = dmo.sucursalid;

    }

    this.consultadivisas();

  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }

  constructor(private cp: cpservice) {
  }

  async consultadivisas() {

    const s = {
      tdivisa: 1,
      sucursal: this.sucursalid
    }

    this.saldomn = await this.cp.saldoactual(s).toPromise(); // Convertir el observable a una promesa
    this.saldomn = this.saldomn.info[0].saldosdia.saldosfinales;

    const a = {
      sucursal: this.sucursalid
    }

    this.cp.Divisasucursal(a).subscribe(
      (data: any) => {
        this.divisas = data.info[0].divisas_sucursal.data;
        if (this.divisas == null) {
          Swal.fire({
            icon: 'warning',
            title: 'No hay divisas Registradas al dia de hoy, Registre una o pidale al encargado que la ingrese',
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
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

  convertir(d: any) {
    const codigoValue = d.target.value;

    this.cambio = codigoValue;

    if (codigoValue && codigoValue.length > 0) {

      const a = codigoValue / this.cotizacion;

      this.resultado = Math.floor(a);

    }

  }

  formulario: any;
  continuar: boolean = false;
  json: any;

  async verificar() {

    //verifica el saldo que tiene el cajero
    if (this.saldosiniciales < this.resultado) {

      Swal.fire({
        icon: 'warning',
        title: 'El MONTO SUPERA A LO QUE HAY EN BOVEDA ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });

      return;
    }

    const data = {
      monto: this.cambio,
      tipopersona: this.tipopersona || 'fisica', // 'fisica' o 'moral'
      instrumento: this.instrumento || 1   // efectivo por defecto
    }

    try {
      const data2: any = await this.cp.Formulario(data).toPromise();

      // Manejo del resultado general
      const result = data2?.info?.[0]?.valida_formulario?.data;
      if (!result) {
        Swal.fire({
          icon: 'error',
          title: 'Error al validar el formulario',
          text: 'No se obtuvo respuesta del servidor.',
        });
        return;
      }

      const nivel = result.nivel;
      const mensaje = result.mensaje || '';
      this.formulario = result.formulario;

      // 🚫 Caso de operación relevante o fuera de rango
      if (nivel === 'relevante') {
        // Swal.fire({
        //   icon: 'warning',
        //   title: 'Operación relevante',
        //   text: mensaje,
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        // });
        this.continuar = false;
        this.will.show(); // abre el modal de registro de cliente
        return;
      }

      // ✅ Caso de operación menuda (no requiere registro)
      if (nivel === 'menuda') {
        Swal.fire({
          title: 'Operación Menuda',
          text: 'No es necesario registrar cliente. ¿Desea continuar con la operación?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
        }).then((resultSwal) => {
          if (resultSwal.isConfirmed) {
            this.continuar = true;
            this.json = this.crearjson();
            this.json.clienteid = 1; // cliente genérico
            this.guardar(this.json);
          }
        });
        return;
      }

      // 🧾 Caso de operación básica o completa
      if (nivel === 'básica' || nivel === 'completa') {
        Swal.fire({
          title: 'Formulario requerido',
          text: mensaje + ' ¿Desea registrar o continuar con cliente existente?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Registrar',
        }).then((resultSwal) => {
          if (resultSwal.isConfirmed) {
            this.continuar = true;
            this.json = this.crearjson();
            this.json.clienteid = 1;
            this.guardar(this.json);
          } else if (resultSwal.dismiss === Swal.DismissReason.cancel) {
            this.continuar = false;
            this.will.show(); // abre el modal de registro de cliente
          }
        });
        return;
      }

      // ⚠️ Caso por defecto
      Swal.fire({
        icon: 'info',
        title: 'Validación',
        text: mensaje || 'Verificación completada sin categoría definida.',
      });
    } catch (error) {
      console.error('Error en verificación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo procesar la verificación del formulario.',
      });
    }

  }

  i: any;

  async manejarRespuesta(respuesta: any) {
    console.log(respuesta)
    this.i = respuesta;
    console.log(this.i);
    if (this.i.idcliente != null && this.i.idcliente != undefined) {
      console.log('Cliente físico');
      this.json = {
        tipo: 1,
        grupoid: this.tdivisa,
        mn: this.resultado,
        me: this.cambio,
        sucursalid: this.sucursalid,
        usuarioid: this.idusuario,
        clienteid: this.i.idcliente,
        tipopago: this.instrumento,
        tipocambio: this.cotizacion,
        empresaid: 0

      }
      this.nombre = `${this.i.nombre || ''} ${this.i.paterno || ''} ${this.i.materno || ''}`.trim();
      this.rfc = this.i.rfc;
    } else if (this.i.idempresa != null && this.i.idempresa != undefined) {
      console.log('Cliente moral');
      this.json = {
        tipo: 1,
        grupoid: this.tdivisa,
        mn: this.resultado,
        me: this.cambio,
        sucursalid: this.sucursalid,
        usuarioid: this.idusuario,
        tipocambio: this.cotizacion,
        tipopago: this.instrumento,
        empresaid: this.i.idempresa,
        clienteid: 0
      }
      this.nombre = this.i.razonsocial;
      this.rfc = this.i.rfc;
    } else {
      console.log('Sin cliente asociado');
    }
    console.log("---------------------------------------")
    console.log(this.json)
    // this.json = this.crearjson();
    // this.json.clienteid = this.i.idcliente;
    this.instrumentoDescripcion = this.instrumentos?.find((inst: any) => inst.id === this.instrumento)?.descripcion;
    this.guardar(this.json);
    this.will.hide();

  }

  printTicket(x: any) {

    let suc = localStorage.getItem('nombresucursal');
    let dom = localStorage.getItem('domicilio');
    let rfc = localStorage.getItem('rfc');
    const fechaFormateada: string = new Date().toLocaleString('es-MX', {
      dateStyle: 'full',
      timeStyle: 'medium',
    });
    let nombres = localStorage.getItem('nombre');
    let z: any = this.i?.rfc;
    let resultado: any;
    let nombre: any;
    if (this.continuar == true) {
      nombre = 'PÚBLICO EN GENERAL';
    } else {
      nombre = `${this.i.nombre || ''} ${this.i.paterno || ''} ${this.i.materno || ''}`.trim();
    }

    resultado = z !== null && z !== undefined ? z : 'XXXX000000XXX';

    const ticketContent = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: 'Courier New', monospace;
          margin: 0;
          padding: 20px;
          color: #000;
          background: #fff;
        }
        .ticket {
          max-width: 400px;
          margin: 0 auto;
          border: 1px dashed #555;
          padding: 15px;
          border-radius: 6px;
          background: #fafafa;
        }
        .header {
          text-align: center;
          border-bottom: 1px solid #888;
          margin-bottom: 10px;
          padding-bottom: 8px;
        }
        .header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }
        .section {
          margin-bottom: 8px;
          font-size: 14px;
        }
        .section strong {
          display: inline-block;
          width: 160px;
        }
        .footer {
          text-align: center;
          border-top: 1px solid #888;
          margin-top: 10px;
          padding-top: 8px;
          font-size: 11px;
          color: #555;
        }
        .titulo {
          text-align: center;
          margin: 8px 0;
          font-weight: bold;
          font-size: 16px;
        }
      </style>
    </head>

    <body>
      <div class="ticket">
        <div class="header">
          <h3>INMTEC CENTRO CAMBIARIO S.A. DE C.V.</h3>
          <p><strong>No. de Registro CNBV:</strong> CC123456789</p>
          <p><strong>RFC:</strong> ${rfc}</p>
        </div>

        <div class="section">
          <strong>Sucursal:</strong> ${suc}<br />
          <strong>Domicilio:</strong> ${dom}<br />
          <strong>Folio Operación:</strong> ${x}<br />
          <strong>Fecha y hora:</strong> ${fechaFormateada}<br />
          <strong>Operación:</strong> VENTA<br />
          <strong>Divisa:</strong> ${this.tipodivisa}<br />
          <strong>Monto:</strong> ${this.cambio} ${this.tipodivisa}<br />
          <strong>Tipo de cambio:</strong> ${this.cotizacion} MXN<br />
          <strong>Contravalor:</strong> ${this.resultado} MXN<br />
          <strong>Instrumento:</strong> ${this.instrumentoDescripcion || 'EFECTIVO'}<br />
        </div>

        <div class="titulo">DATOS DEL CLIENTE</div>
        <div class="section">
          <strong>Nombre:</strong> ${this.nombre}<br />
          <strong>RFC:</strong> ${this.rfc}<br />
        </div>

        <div class="section">
          <strong>Cajero:</strong> ${nombres}<br />
        </div>

        <div class="footer">
          <p>“Esta operación se realiza conforme a las disposiciones aplicables a los Centros Cambiarios emitidas por la CNBV.”</p>
          <p>“La operación no constituye depósito bancario ni cuenta de ahorro.”</p>
          <p>Fecha de impresión: ${new Date().toLocaleString('es-MX')}</p>
          <p>__________________________<br />Firma del Cliente</p>
        </div>
      </div>
    </body>
  </html>
  `;

    const popupWin = window.open('', '_blank', 'width=600,height=800');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(ticketContent);
      popupWin.document.close();
      popupWin.print();
      popupWin.onafterprint = () => popupWin.close();
    } else {
      console.error('No se pudo abrir la ventana de impresión. El navegador bloqueó el popup.');
    }
  }

  saldosiniciales: any;
  saldomn: any;
  tdivisa: any;
  tipodivisa: any;
  async captura(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    const x = this.divisas.find((item: any) => item.iddivisa == filterValue);


    this.cotizacion = x.venta;
    this.tdivisa = x.grupoid;
    this.tipodivisa = x.tipo;
    const r = {
      tdivisa: x.grupoid,
      sucursal: this.sucursalid
    }

    this.saldosiniciales = await this.cp.saldoactual(r).toPromise(); // Convertir el observable a una promesa

    this.saldosiniciales = this.saldosiniciales.info[0].saldosdia.saldosfinales

  }

  crearjson() {
    const guardadivisa = {
      tipo: 2,
      grupoid: this.tdivisa,
      mn: this.cambio,
      me: this.resultado,
      sucursalid: this.sucursalid,
      usuarioid: this.idusuario,
      clienteid: 1,
      tipocambio: this.cotizacion,
      tipopago: this.instrumento,
    }

    return guardadivisa;

  }

  ticket: any;
  numeroFormateado: any;
  async guardar(r: any) {
    this.ticket = await this.cp.operaciones(r).toPromise();


    const numeroRecibido: Number = this.ticket.info[0].manage_operaciones.operacion;

    // Convierte el número a una cadena y aplica el relleno con ceros
    this.numeroFormateado = numeroRecibido.toString().padStart(10, '0');

    this.enviocorrecto.show();
  }

  limpiar() {
    this.cambio = 0;
    this.resultado = 0;
    this.cotizacion = 0;
    this.tdivisa = 0;
    this.tipodivisa = 0;
  }

  cerrar1() {
    this.enviocorrecto.hide();
    this.limpiar()

  }
  consultarinstrumento() {
    const a = {
      option: 5
    }
    this.cp.crudinstrumento(a).subscribe(
      (data: any) => {

        if (data.info[0].manage_instrumentos.action == 'error') {
          Swal.fire({
            icon: data.resultado[0].manage_instrumentos.action,
            title: data.resultado[0].manage_instrumentos.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.instrumentos = data.info[0].manage_instrumentos.data;
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
  async cambios(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.instrumento = filterValue;

    const dat = this.instrumentos.filter((c: { idtipo: string; }) => c.idtipo == (event.target as HTMLInputElement).value);
    this.instrumentoDescripcion = dat[0].descripcion
  }

}
