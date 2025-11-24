import { Component, HostListener, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../../servicios/AuthenticationService';
import { animate, style, transition, trigger } from '@angular/animations';
import { SocketService } from 'src/app/socket.service';
import { cp } from '../../servicios/constantes';
import { cpservice } from '../../servicios/all.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', './nav.component.scss']
})
export class NavComponent implements OnInit {
  menus: any[] | null = null;
  divisas: any;
  constructor(private snack: MatSnackBar, private router: Router, private auth: AuthenticationService,
    private socketService: SocketService, private xd: cpservice,) {
    this.screenWidth = window.innerWidth;

  }

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav; // <- Agregamos "{ static: true }" aquí
  screenWidth: number | undefined;
  messagess: boolean = false;
  enviar: any;
  @HostListener('window:resize', ['$event'])
  calert: any = 0;
  onResize() {
    this.screenWidth = window.innerWidth;
  }
  nombre: any;
  menu: any;
  notificaciones: { mensaje: string; usuario: string; tiempoRestante: number }[] = [];
  mensajes: Array<any> = []; // Variable para almacenar los mensajes

  mensaje: string = '';
  showChat: boolean = false;
  user: any;
  usuariosEnLinea: string[] = [];
  conversacion: any[] = [];
  nuevoMensaje: string = '';
  mostrarLista: boolean = true;
  usuarioSeleccionado!: string;
  messages: any[] = [];
  rol: any;
  inactividadTemporizador: any;
  sucursalid: any;
  @ViewChild("riesgo", { static: false })
  riesgo: any;
  ngOnInit(): void {
    const dmnues = localStorage.getItem('menus');
    if (dmnues !== null) {
      const dmo = JSON.parse(dmnues);
      console.log(dmo)
      this.menus = dmo
      this.user = localStorage.getItem('usuario');
      this.rol = localStorage.getItem('rol');
    }
    if (localStorage.getItem('ID') == null) {
      this.router.navigate(['login']);
    }
    this.detectarInactividad();
    this.socketService.initializeSocket();
    if (this.rol == 'PLD') {
      this.xdalert();
      this.socketService.authenticate('cc-PLD');
      this.socketService.onMessageReceived().subscribe((data: any) => {
        this.xdalert();
        this.messages.push(data);
      });
    } else {
      this.socketService.authenticate('cc-' + this.user);
    }
    const d = localStorage.getItem('empresa');

    if (d !== null) {
      const dd = JSON.parse(d);


      this.sucursalid = dd.sucursalid;

    }
    this.consultadivisas();

  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }


  noti(mensaje: string, usuario: string) {
    // Agregar una nueva notificación a la lista
    const nuevaNotificacion = { mensaje, usuario: usuario, tiempoRestante: 5 }; // 5 segundos
    this.notificaciones.unshift(nuevaNotificacion);

    // Iniciar un temporizador para actualizar el tiempo restante
    const timer = setInterval(() => {
      nuevaNotificacion.tiempoRestante -= 1;
      if (nuevaNotificacion.tiempoRestante === 0) {
        // Eliminar la notificación cuando el tiempo restante sea 0
        this.notificaciones.pop();
        clearInterval(timer);
      }
    }, 1000); // Actualizar cada segundo
  }

  mensajesNoLeidos: { [usuario: string]: number } = {};
  chatsIndividuales: any[] = []; // Arreglo de chats individuales
  toggleChat() {
    this.showChat = !this.showChat;
  }
  closeAlert(index: number): void {
    this.messages.splice(index, 1); // Eliminar la alerta del array
  }
  xdalert() {
    this.xd.alertar().subscribe({
      next: (data: any) => {
        this.calert = data.info[0].total_alertas;
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
      complete: () => {
        console.log("La operación ha sido completada");
      }
    });
  }


  ngOnDestroy(): void {
    clearTimeout(this.inactividadTemporizador);
  }

  detectarInactividad(): void {
    this.resetearInactividadTemporizador();

    document.addEventListener('mousemove', this.resetearInactividadTemporizador.bind(this));
    document.addEventListener('keypress', this.resetearInactividadTemporizador.bind(this));
    document.addEventListener('click', this.resetearInactividadTemporizador.bind(this));
  }

  resetearInactividadTemporizador(): void {
    clearTimeout(this.inactividadTemporizador);
    this.inactividadTemporizador = setTimeout(() => {
      this.logout();
    }, 50 * 60 * 1000);
  }

  async consultadivisas() {

    const a = {
      sucursal: this.sucursalid
    }

    this.xd.Divisasucursal(a).subscribe(
      (data: any) => {
        this.divisas = data?.info[0]?.divisas_sucursal?.data;
        if (this.divisas == null) {
          Swal.fire({
            icon: 'warning',
            title: 'No hay divisas Registradas al dia de hoy, Registre una o pidale al encargado que la ingrese',
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
            allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
          });
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

  sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

toggleSubmenu(menu: any) {
  menu.open = !menu.open;
}
pauseTicker() {
  const ticker = document.querySelector('.ticker-content');
  if (ticker) ticker.classList.add('paused');
}

resumeTicker() {
  const ticker = document.querySelector('.ticker-content');
  if (ticker) ticker.classList.remove('paused');
}

}
