import { Component } from '@angular/core';

@Component({
  selector: 'app-anonimos',
  templateUrl: './anonimos.component.html',
  styleUrls: ['./anonimos.component.css']
})
export class AnonimosComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  mensajes: string[] = ['Mensaje de prueba de auditoría 2023 - Fecha: 23/11/2023'];

  buscar() {
    // Lógica de búsqueda aquí (puedes implementarla según tus necesidades)
    // En este ejemplo, simplemente mostramos todos los mensajes existentes
    this.mensajes = ['Mensaje de prueba de auditoría 2023 - Fecha: 23/11/2023'];
  }
}
