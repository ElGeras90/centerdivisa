import { Component } from '@angular/core';
import { slideInAnimation } from '../../servicios/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [slideInAnimation], // Asegúrate de que slideInAnimation esté importado y disponible aquí.

})
export class InicioComponent {

}
