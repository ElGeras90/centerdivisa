import { Component, ViewChild } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import Swal from 'sweetalert2';
import { NgxPrinterService } from 'ngx-printer';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {


  currentDate!: Date;
  formattedDate: string = '';
  nombreusuario: any;
  idusuario: any;
  sucursalid: any;
  divisas: any;
  compra: any = '{}';
  cambio: number = 0.00;
  resultado: any//number = 0.00;
  cotizacion: number = 0.00;
  clienteid: number = 1;
  @ViewChild("will", { static: false })
  will: any;
  fechaYHoraActual!: Date;

  async ngOnInit() {
    this.fechaYHoraActual = new Date();
    this.currentDate = new Date();
    this.formattedDate = this.formatDate(this.currentDate);
    this.nombreusuario = localStorage.getItem('nombre');
    this.idusuario = localStorage.getItem('ID');

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

  constructor(private cp: cpservice,
    private printerService: NgxPrinterService) {
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

      const a = this.cotizacion * codigoValue;

      this.resultado = a.toFixed(0);

    }

  }

  formulario: any;
  continuar: boolean = false;
  json: any;

  async verificar() {

    //verifica el saldo que tiene el cajero
    if (this.saldomn < this.resultado) {

      Swal.fire({
        icon: 'warning',
        title: 'El MONTO SUPERA A LO QUE HAY EN BOVEDA ',
        allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
        allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
      });

      return;
    }

    const data = {
      info: this.resultado
    }

    const data2: any = await this.cp.Formulario(data).toPromise(); // Convertir el observable a una promesa

    this.formulario = data2.info[0].valida_formulario.data.formulario
    if (data2.info[0].valida_formulario.data.info == 1) {
      Swal.fire({
        title: 'Registro',
        text: 'Elige una opción:',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Registrar',
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.continuar = true
          this.json = this.crearjson();
          this.json.clienteid = 1;
          this.guardar(this.json);
        } else if (result.dismiss === Swal.DismissReason.cancel) {

          this.will.show();
        }
      });
    } else {
      this.will.show();
    }

  }

  i: any;

  manejarRespuesta(respuesta: any) {
    console.log('respuesta');
    console.log(respuesta)
    this.i = respuesta;
    this.json = this.crearjson();
    this.json.clienteid = this.i.idcliente;
    this.guardar(this.json);
    this.will.hide();
  }

  printTicket(x: any) {

    let suc = localStorage.getItem('nombresucursal');
    let dom = localStorage.getItem('domicilio');
    let rfc = localStorage.getItem('rfc');
    const fechaFormateada: string = this.fechaYHoraActual.toISOString(); // o el formato que desees
    let nombres = localStorage.getItem('nombre')
    let z: any = this.i.rfc;
    let resultado: any;

    // Usar la expresión condicional para asignar un valor predeterminado si x es null o undefined
    resultado = z !== null && z !== undefined ? z : 'xxxx';

    console.log(this.i)

    const ticketContent = `
     
<html>

<head>
</head>

<body>
  <div style="margin: 0 auto; text-align: center;">
    <h3>Inmtec Centro Cambiario SA de CV</h3>
    <p>Numero de registro: Numero de registro del Centro Cambiario</p>
    <p>Sucursal: ${suc}</p>
    <p>Domicilio:${dom}</p>
    <p>RFC: ${rfc}</p>
    <p>Folio: ${x}</p>
    <p>Fecha y hora: ${fechaFormateada}</p>
    <p>Operación: COMPRA</p>
    <p>Monto de la operación: ${this.cambio} - ${this.tipodivisa} </p>
    <p>Tipo de cambio: ${this.cotizacion} - MXN</p>
    <p>Contravalor: ${this.resultado} - MXN</p>
    <p>Usuario: ${this.i.nombre} ${this.i.paterno} ${this.i.materno}</p>
    <p>RFC: ${z}</p>
    <p>Cajero:${nombres}</p>
  </div>

</body>

</html>
    `;

    const popupWin = window.open('', '_blank', 'width=600,height=600');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(ticketContent);
      popupWin.document.close();
      popupWin.print();
      popupWin.onafterprint = () => {
        popupWin.close();
      };
    } else {
      // Manejo de errores, por ejemplo, si el navegador bloquea la ventana emergente.
      console.error('No se pudo abrir la ventana de impresión');
    }
  }

  saldosiniciales: any;
  saldomn: any;
  tdivisa: any;
  tipodivisa: any;
  async captura(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    const x = this.divisas.find((item: any) => item.iddivisa == filterValue);

    console.log(this.divisas)

    this.cotizacion = x.compra;
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
      tipo: 1,
      grupoid: this.tdivisa,
      mn: this.resultado,
      me: this.cambio,
      sucursalid: this.sucursalid,
      usuarioid: this.idusuario,
      clienteid: 1,
      tipocambio: this.cotizacion
    }

    return guardadivisa;

  }

  ticket: any;

  async guardar(r: any) {
    this.ticket = await this.cp.operaciones(r).toPromise();

    console.log(this.ticket)

    const numeroRecibido: Number = this.ticket.info[0].manage_operaciones.operacion;

    // Convierte el número a una cadena y aplica el relleno con ceros
    const numeroFormateado: string = numeroRecibido.toString().padStart(10, '0');

    console.log(numeroFormateado);
    this.printTicket(numeroFormateado);
  }

}
