import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alerta-flotante',
  templateUrl: './alerta-flotante.component.html',
  styleUrls: ['./alerta-flotante.component.css']
})
export class AlertaFlotanteComponent implements OnInit {
  @Input() message: any;
  @Input() duration: number = 5000; // Duración predeterminada de 5 segundos
  @Output() closed = new EventEmitter<void>(); // Evento emitido cuando se cierra la alerta

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      // Eliminar la alerta después de la duración especificada
      this.close();
    }, this.duration);
  }

  onMouseEnter(): void {
    // Detener el temporizador al pasar el mouse sobre la alerta
    clearTimeout(this.timer);
  }

  onMouseLeave(): void {
    // Continuar el temporizador cuando se retira el mouse de la alerta
    this.restartTimer();
  }

  close(): void {
    this.closed.emit();
  }

  private timer: any;

  private restartTimer(): void {
    // Reiniciar el temporizador
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }
}
