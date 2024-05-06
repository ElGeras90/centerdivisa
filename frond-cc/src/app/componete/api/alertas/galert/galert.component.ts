import { Component } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { SocketService } from 'src/app/socket.service';
import Swal from 'sweetalert2';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-galert',
  templateUrl: './galert.component.html',
  styleUrls: ['./galert.component.css']
})
export class GalertComponent {
  constructor(
    private cp: cpservice,
    private socketService: SocketService,
    ) { }
    registros:any;


    ngOnInit(): void {
      this.alertas();
    }


  autorizar(registro: any) {
    const a ={
      option:2,
      accion:2,
      idalert:registro.idalert
    }
    this.cp.alertas(a).subscribe(
      (data: any) => {
       
          console.log(data)
          if(registro.alerta.includes(' pertenece a la lista ')){
            this.socketService.sendPrivateMessage('cc-'+registro.usuario,'3');
           }else{
          this.socketService.sendPrivateMessage('cc-'+registro.usuario,'1');
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
    this.alertas();
  }

  denegar(registro: any) {
    const a ={
      option:2,
      accion:3,
      idalert:registro.idalert
    }
    this.cp.alertas(a).subscribe(
      (data: any) => {
      
        this.socketService.sendPrivateMessage('cc-'+registro.usuario,'2');
               
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un problema al intentar realizar la accion ',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      }
    )
    this.alertas();
  }

  alertas() {
    const a ={
      option:5
    }
    this.cp.alertas(a).subscribe(
      (data: any) => {
        console.log(data)
        if (data.info[0].manage_alertasregistros.action == 'error') {
          Swal.fire({
            icon: data.info[0].manage_alertasregistros.action,
            title: data.info[0].manage_alertasregistros.message,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });

        } else {
          this.registros = data.info[0].manage_alertasregistros.data;
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
