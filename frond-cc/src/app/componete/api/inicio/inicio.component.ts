import { Component } from '@angular/core';
import { slideInAnimation } from '../../servicios/animations';
import Swal from 'sweetalert2';
import { cpservice } from '../../servicios/all.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [slideInAnimation], // Asegúrate de que slideInAnimation esté importado y disponible aquí.

})

export class InicioComponent {
  name: any;
  divisas: any;
  sucursalid: any;
  dmo:any;
  constructor(private cp: cpservice,
  ) {
 }
 
  ngOnInit(): void {
    const dmnues = localStorage.getItem('empresa');
    if (dmnues !== null) {
       this.dmo = JSON.parse(dmnues);


      this.sucursalid = this.dmo.sucursalid;

    }
   this.name = localStorage.getItem('nombre');
   this.consultadivisas()
}

async consultadivisas() {

  const s = {
    tdivisa: 1,
    sucursal: this.sucursalid
  }


  const a = {
    sucursal: this.sucursalid
  }

  this.cp.Divisasucursal(a).subscribe(
    (data: any) => {
      this.divisas = data?.info[0]?.divisas_sucursal?.data;
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
}
