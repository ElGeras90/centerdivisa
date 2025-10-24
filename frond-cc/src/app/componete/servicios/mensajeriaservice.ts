// src/app/socket.service.ts
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

    private socket: any= io('http://3.149.144.183:3069');
  
  
    ngOnDestroy() {
      // Desconecta del servidor al salir del componente
      this.socket.disconnect();
    }
  
     // Método para unirse a una sala específica (para notificaciones de usuario)
     joinSala(userId: string) {
      this.socket.emit('join', userId);
      this.socket.emit('nuevoUsuarioConectado',userId)
    }
  
    // Método para enviar una notificación al servidor
    enviarNotificacion(userId: string, mensaje: any) {
      const mensajeConRemitente = {
        contenido: mensaje,
        remitente: mensaje
      };
      this.socket.emit('enviarNotificacion', userId, mensajeConRemitente);
    }
  
    // Método para recibir notificaciones en tiempo real
    recibirNotificacion(): Observable<string> {
      return new Observable<string>((observer) => {
        this.socket.on('notificacion', (mensaje: string) => {
          observer.next(mensaje);
        });
      });
    }
     // Método para enviar un mensaje al servidor
     enviarMensaje(destinatario: string, mensaje: any) {
      const mensajeConRemitente = {
        contenido: mensaje,
        remitente: mensaje
      };
      this.socket.emit('enviarMensaje', destinatario, mensajeConRemitente); 
    }
  
    // Método para recibir mensajes del servidor
    recibirMensaje(): Observable<any> {
      return new Observable((observer) => {
        this.socket.on('mensaje', (mensaje:any) => {
          observer.next(mensaje);
        });
      });
    }
  
    // Método para recibir la lista de usuarios en línea
    recibirUsuariosEnLinea(): Observable<string[]> {
      return new Observable((observer) => {
        this.socket.on('usuariosEnLinea', (usuarios:any) => {
          observer.next(usuarios);
        });
      });
    }
}
