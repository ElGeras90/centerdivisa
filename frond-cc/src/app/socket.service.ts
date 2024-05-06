import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  //private readonly serverUrl = 'http://localhost:3069'; // URL del servidor Socket.IO
  private readonly serverUrl  = "http://binmtec.co:3003/";
  constructor() { }

  // Inicializar la conexión con el servidor
  public initializeSocket(): void {
    this.socket = io(this.serverUrl);
  }

  // Autenticar al usuario en el servidor
  public authenticate(username: string): void {
    console.log(username)
    this.socket.emit('authenticate', username);
  }

  // Enviar un mensaje al servidor
  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

    // Enviar un mensaje privado al servidor
    public sendPrivateMessage(recipient: string, message: string): void {
      this.socket.emit('privateMessage', { recipient: recipient, message: message });
    }

  // Escuchar mensajes del servidor
  public onMessageReceived(): any {
    return new Observable((observer) => {
      this.socket.on('privateMessage', (data: any) => {
        observer.next(data);
      });
    });
  }
}
