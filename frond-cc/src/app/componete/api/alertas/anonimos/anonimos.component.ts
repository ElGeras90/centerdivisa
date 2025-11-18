import { Component } from '@angular/core';
import { cpservice } from 'src/app/componete/servicios/all.service';
import { SocketService } from 'src/app/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anonimos',
  templateUrl: './anonimos.component.html',
  styleUrls: ['./anonimos.component.css']
})
export class AnonimosComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  mensajes: any;
  constructor(
    private cp: cpservice,
    private socketService: SocketService) { }
  buscar() {
    const a = {
      option:5,
      fecha:this.fechaInicio,
      fecha1:this.fechaFin
    }
    this.cp.anonimus(a).subscribe(
      (data: any) => {
       this.mensajes=data.info[0].manage_anonimosmsj.data;           
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
  ngOnInit(): void {
    this.consultardia();
  }

  consultardia(){
    const a = {
      option:4
    }
    this.cp.anonimus(a).subscribe(
      (data: any) => {
       this.mensajes=data.info[0].manage_anonimosmsj.data;
          //this.socketService.sendPrivateMessage('cc-'+registro.usuario,'1');
           
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
