import { Component } from '@angular/core';
import { slideInAnimation } from '../../servicios/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [slideInAnimation], // Asegúrate de que slideInAnimation esté importado y disponible aquí.

})
export class InicioComponent {
  name: any;
  ngOnInit(): void {
   this.name = localStorage.getItem('nombre');
}
}
