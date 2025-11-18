import { Component } from '@angular/core';



interface RegistroAuditoria {
  usuario: string;
  cliente: string;
  tipo: string;
  accion: string;
}


@Component({
  selector: 'app-mov',
  templateUrl: './mov.component.html',
  styleUrls: ['./mov.component.css']
})
export class MovComponent {
  beneficiario: any;
  registros: RegistroAuditoria[] = [
    { usuario: 'Auditoria2023', cliente: 'Luis Bernardo Nava Guerrero', tipo: 'pep', accion: 'Operacion usuario riesgo ALTO' }
    // Puedes agregar más registros según tus necesidades
  ];

  autorizar(registro: RegistroAuditoria) {
    // Lógica para autorizar aquí (puedes implementarla según tus necesidades)
    console.log('Autorizar:', registro);
  }

  denegar(registro: RegistroAuditoria) {
    // Lógica para denegar aquí (puedes implementarla según tus necesidades)
    console.log('Denegar:', registro);
  }

  clienteIdBuscar: string = '';
  montoEnviar: string = '';
  beni:boolean=false;
  buscarCliente() {
    // Lógica para buscar el cliente según el ID (puedes implementarla según tus necesidades)
    // En este ejemplo, simplemente mostramos un beneficiario de prueba
    this.beneficiario = {
      nombre: 'Nombre de Prueba',
      calle: 'Calle de Prueba',
      numero: '123',
      colonia: 'Colonia de Prueba',
      municipio: 'Municipio de Prueba',
      estado: 'Estado de Prueba'
    };
    this.beni=true;
  }

  enviarMonto() {
    // Lógica para enviar el monto (puedes implementarla según tus necesidades)
  }
  
}
