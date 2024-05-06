import { Component } from '@angular/core';
import { cpservice } from '../../servicios/all.service';
import { SocketService } from 'src/app/socket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anonimo',
  templateUrl: './anonimo.component.html',
  styleUrls: ['./anonimo.component.css']
})
export class AnonimoComponent {
  textContent: string = '';
  constructor(
    private cp: cpservice,
    private socketService: SocketService) { }



    gemessag(){
      const a = {
        option:1,
        mensaje:this.textContent
      }
      this.cp.anonimus(a).subscribe(
        (data: any) => {
         
           
            this.socketService.sendPrivateMessage('cc-PLD','MENASAJE ANONIMO');
            Swal.fire({
              icon: 'success',
              title: data.info[0].manage_anonimosmsj.message,
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
      this.textContent = '';
    }
  onSubmit() {
    this.gemessag();
  }
}
